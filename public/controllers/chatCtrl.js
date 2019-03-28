view.chatButton()

$(document).on('click', '.box-btn', e => {
    console.log(e) // im not sure what's inside e, but you'll be able to find the correct ID from here
})

$('#load-chatbox').click(() => {

    // model.shoebox(,)
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
                $('#chat').append($('<li>').html(`<i class='fas fa-user'><span id='username'>${model.user().where('email', '==', messages[i].email).displayName}</span></i><br>
                                                  <p id='message'>${messages[i].message}</p>
                                                  <span id='time'>${messages[i].timestamp}</span>`))
            }

        } else {
            console.log("no doc ")
        }
    })
})