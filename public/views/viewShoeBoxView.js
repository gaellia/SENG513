const viewShoeBoxView = ({LEFT, RIGHT, MID}, box, viewBoxRepeat, loadCards) => {
    const user = model.local('user')
    const boxes = model.local('boxes')
    const boxList = viewBoxRepeat(boxes)

    $("#banner").css({'visibility': 'visible'})

    LEFT.html(`
    <div class="drawer" style="text-align: left; padding-top: 20px">
        <div class="card">
            <button class="btn btn-light" id="profile-btn" data-toggle="modal" data-target="#modal-container">
            <h5 style="text-align: center; padding: 0.75em"><i class="far fa-user-circle"></i> ${user.displayName}</h5>
            </button>
        </div>
    </div>

    <div class="main-wrapper">
        <div class="drawer">
            <div class="card" style="text-align: left">
                <ul class="list-group list-group-flush">
                    ${boxList}
                </ul>
            </div>
        </div>
    </div>`)

    MID.html(`
        <div style="text-align: center;">
            <h2>${box.name}</h2>
        </div>
        <div class="loader"></div>

    `)

    
    // Asynchronously access the cards from the shoebox
    model.getByBoxID(box.boxID, "cards").then(res => {
        res.get().then(cards => {

            let columnHTML = loadCards(cards)

            MID.html(`
                <div class="row d-flex justify-content-between">
                    <div class="p-2" style="text-align: center;">
                        <h2>${box.name}</h2>
                    </div>
                    <div class="p-2" style="text-align: left; padding-bottom: 20px;">
                        <button class="btn btn-secondary" id="setting-btn" data-toggle="modal" data-target="#modal-container">
                        <h6 style="text-align: center; padding-top: 0.5em"><i class="fas fa-cog"></i> Settings</h6>
                        </button>
                    </div>
                </div>
                <div class="row middle-cards d-flex justify-content-center">
                    <div class="col-auto">
                        ${columnHTML[0]}
                    </div>
                    <div class="col-auto">
                        ${columnHTML[1]}
                    </div>
                    <div class="col-auto">
                        ${columnHTML[2]}
                    </div>
                </div>
                <div class="row d-flex justify-content-end">
                    <button class="fas fa-plus add-btn"></button>
                </div>

            `)
   
            RIGHT.html(`
            <div id='chat-container'>
                <ul id='chat'>
                </ul>

                <!-- Message input -->
                <div class="send">
                    <form id="msg-form" actions="">
                        <textarea rows="3" id="m" autocomplete="off" /><button><i class="far fa-paper-plane"></i></button>
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