const viewShoeBoxView = ({LEFT, RIGHT, MID}, box, viewBoxRepeat, loadCards) => {
    const user = model.local('user')
    const boxes = model.local('boxes')
    const boxList = viewBoxRepeat(boxes)

    $("#banner").css({'visibility': 'visible'})

    LEFT.html(`
    <div class="main-wrapper">
 
    <div class="drawer">
       <div class="card" style="text-align: left">
                <button class="btn btn=default" id="profile-btn" data-toggle="modal" data-target="#modal-container">
                <h4 style="text-align: center; padding: 0.75em"><i class="far fa-user-circle"></i> ${user.displayName}</h4>
                </button>
                <ul class="list-group list-group-flush">
                    ${boxList}
                </ul>
            </div>
        </div>
    </div>`)

    MID.html(`
        <div style="text-align: center;">
            <h1>${box.name}</h1>
        </div>
        <div class="loader"></div>

    `)

    
    // Asynchronously access the cards from the shoebox
    model.getByBoxID(box.boxID, "cards").then(res => {
        res.get().then(cards => {
        cards.docs.map(doc => doc.data());
        
        let columnHTML = loadCards(cards)

    MID.html(`

        <div style="text-align: center;">
            <h1>${box.name}</h1>
        </div>
        <div class="col-sm">
            ${columnHTML[0]}
        </div>
        <div class="col-sm">
            ${columnHTML[1]}
        </div>
        <div class="col-sm">
            ${columnHTML[2]}
        </div>

        <button class="fas fa-plus"></button>

    `)
   
    RIGHT.html(`
    <div id='chat-container'>
        <ul id='chat'>
        </ul>

        <!-- Message input -->
        <div class="send">
            <form id="msg-form" actions="">
                <input id="m" autocomplete="off" /><button><i class="far fa-paper-plane"></i></button>
            </form>
        </div>

    </div>`)

    // loads the chat history for this box
    model.shoebox(model.local('currentBox').boxID).collection('messages').orderBy('timestamp').get().then(snapshot => {
        snapshot.forEach(doc => {

            // show all messages in the shoebox
            let timestamp = doc.data().timestamp.toDate().toString()
            timestamp = timestamp.substr(0, timestamp.indexOf(':')+3)   //goes up to the minute 

            $('#chat').append($('<li>').html(`<i class='fas fa-user'><span id='username'>${doc.data().displayName}</span></i><br>
                                            <p id='message'>${doc.data().message}</p>
                                            <span class='time'>${timestamp}</span>`))
        });

        // scroll to bottom
        $('#chat').scrollTop($('#chat')[0].scrollHeight)
    })

    })
})

}