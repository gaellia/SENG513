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
                TESTING
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