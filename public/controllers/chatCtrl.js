// init
view.chatButton()

// show chatbox listener
$('#load-chatbox').click( () => {
    
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

    // testing with the 'Mexico' shoebox
    model.shoebox(model.local('currentBox').boxID).collection('messages').orderBy('timestamp').get().then(snapshot => {
        snapshot.forEach(doc => {

            // show all messages in the shoebox
            let timestamp = doc.data().timestamp.toDate().toString()
            timestamp = timestamp.substr(0, timestamp.indexOf(':')+3)   //goes up to the minute 

            $('#chat').append($('<li>').html(`<i class='fas fa-user'><span id='username'>${doc.data().displayName}</span></i><br>
                                            <p id='message'>${doc.data().message}</p>
                                            <span id='time'>${timestamp}</span>`))
        });

        // scroll to bottom
        $('#chat').scrollTop($('#chat')[0].scrollHeight);
    })
})

// listener for sending a message
$(document).on('submit', '#msg-form', e => {
    e.preventDefault()
    if ( $('#m').val() !== "") {
        let name = model.local('user').displayName
        let currentTime = firebase.firestore.Timestamp.fromDate(new Date()) // for storing into database
        let bid = model.local('currentBox').boxID
        
        let msg = {displayName: name, 
                    message: $('#m').val(),
                    timestamp: currentTime}
    
        // add to database
        model.shoebox(bid).collection('messages').add(msg)
    
        $('#m').val("") // clear send box
    }
})

// listen for added messages
let messageListener = model.shoebox(model.local('currentBox').boxID).collection('messages').onSnapshot(s => {
    s.docChanges().forEach( change => {
        if (change.type === 'added') {
            // display new messages
            let timestamp = change.doc.data().timestamp.toDate().toString()
            timestamp = timestamp.substr(0, timestamp.indexOf(':')+3)   //goes up to the minute 

            $('#chat').append($('<li>').html(`<i class='fas fa-user'><span id='username'>${change.doc.data().displayName}</span></i><br>
            <p id='message'>${change.doc.data().message}</p>
            <span id='time'>${timestamp}</span>`))

            // scroll to bottom
            $('#chat').scrollTop($('#chat')[0].scrollHeight);
        }
    })
})