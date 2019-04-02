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
            <form actions="">
                <input id="m" autocomplete="off" /><button><i class="far fa-paper-plane"></i></button>
            </form>
        </div>

    </div>`)

    // testing with the only shoebox that exists lol
    model.shoebox("vET5va5u3J5V2gPieine").get().then(doc => {
        if(doc.exists) {
            const messages = doc.data().messages
            console.log('messages', messages)

            // show all messages in the shoebox
            for (let i in messages) {
                let timestamp = messages[i].timestamp.toDate().toString()
                timestamp = timestamp.substr(0, timestamp.indexOf(':')+3)   //goes up to the minute 

                $('#chat').append($('<li>').html(`<i class='fas fa-user'><span id='username'>${messages[i].displayName}</span></i><br>
                                                  <p id='message'>${messages[i].message}</p>
                                                  <span id='time'>${timestamp}</span>`))
            }

            // scroll to bottom
            $('#chat').scrollTop($('#chat')[0].scrollHeight);

        } else {
            console.log("no doc ")
        }
    })
})