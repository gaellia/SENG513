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
                <span id='message'>This is a message a user has sent</span>
            </li>
            <li>
            <i class='fas fa-user'><span id='username'>USERNAME 2</span></i><br>
            <span id='message'>Wazzup losers</span>
            </li>
            <li>
            <i class='fas fa-user'><span id='username'>USERNAME</span></i><br>
            <span id='message'>message</span>
            </li>
            <li>
            <i class='fas fa-user'><span id='username'>USERNAME</span></i><br>
            <span id='message'>message</span>
            </li>
            <li>
            <i class='fas fa-user'><span id='username'>USERNAME</span></i><br>
            <span id='message'>message</span>
            </li>
            <li>
            <i class='fas fa-user'><span id='username'>USERNAME</span></i><br>
            <span id='message'>message</span>
            </li>
            <li>
            <i class='fas fa-user'><span id='username'>USERNAME</span></i><br>
            <span id='message'>message</span>
            </li>
            <li>
            <i class='fas fa-user'><span id='username'>USERNAME</span></i><br>
            <span id='message'>message</span>
            </li>
            <li>
            <i class='fas fa-user'><span id='username'>USERNAME</span></i><br>
            <span id='message'>message qwekahwl wke jlkasjdlq wejklqwej klqwje lkqjl qwklejlqkwje  qwek jqlwkej lq qwek lkqw je</span>
            </li>
            <li>
            <i class='fas fa-user'><span id='username'>USERNAME</span></i><br>
            <span id='message'>message</span>
            </li>
            <li>
            <i class='fas fa-user'><span id='username'>USERNAME</span></i><br>
            <span id='message'>message</span>
            </li>
        </ul>
    </div>`)

    // testing with the only shoebox that exists lol
    model.shoebox("vET5va5u3J5V2gPieine").get().then(doc => {
        if(doc.exists) {
            const messages = doc.data().messages
            console.log('messages', messages)
        } else {
            console.log("no doc ")
        }
    })
})