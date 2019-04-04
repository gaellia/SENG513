// init
view.chatButton()

// show chatbox listener
$('#load-chatbox').click(() => {
    
    RIGHT.html(`
    <div id='chat-container'>
        <ul id='chat'>
            <li>
                <i class='fas fa-user'><span id='username'>USERNAME</span></i><br>
                <p id='message'>This is a message a user has sent</p>
                <span id='time'>10:30</span>
            </li>
            <li>
                <i class='fas fa-user'><span id='username'>USERNAME 2</span></i><br>
                <p id='message'>This is a message a user has sent</p>
                <span id='time'>10:30</span>
            </li>
            <li>
                <i class='fas fa-user'><span id='username'>USERNAME 2</span></i><br>
                <p id='message'>This is a message a user has sent</p>
                <span id='time'>10:30</span>
            </li>
            <li>
                <i class='fas fa-user'><span id='username'>USERNAME 2</span></i><br>
                <p id='message'>This is a message a user has sent</p>
                <span id='time'>10:30</span>
            </li>
            <li>
                <i class='fas fa-user'><span id='username'>USERNAME 2</span></i><br>
                <p id='message'>This is a message a user has sent</p>
                <span id='time'>10:30</span>
            </li>
            <li>
                <i class='fas fa-user'><span id='username'>USERNAME 2</span></i><br>
                <p id='message'>This is a message a user has sent</p>
                <span id='time'>10:30</span>
            </li>
            <li>
                <i class='fas fa-user'><span id='username'>USERNAME 2</span></i><br>
                <p id='message'>This is a message a user has sent</p>
                <span id='time'>10:30</span>
            </li>
            <li>
                <i class='fas fa-user'><span id='username'>USERNAME 2</span></i><br>
                <p id='message'>This is a message a user has sent</p>
                <span id='time'>10:30</span>
            </li>
        </ul>

        <!-- Message input -->
        <div class="send">
            <form id="msg-form" actions="">
                <input id="m" autocomplete="off" /><button><i class="far fa-paper-plane"></i></button>
            </form>
        </div>

    </div>`)

    // testing with the 'Mexico' shoebox
    model.shoebox('0nixBz2gEv0vP0yZlY4p').collection('messages').orderBy('timestamp').get().then(snapshot => {
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
    console.log($('#m').val())
    let currentTime = firebase.firestore.Timestamp.fromDate(new Date()) // for storing into database

    // Testing
    let simpleTime = currentTime.toDate().toString()
    simpleTime = simpleTime.substr(0, simpleTime.indexOf(':')+3)
    console.log(simpleTime)

    $('#m').val("") // clear send box
})