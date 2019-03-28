view.chatButton()

$('#load-chatbox').click(() => {
    console.log("HELLEREE")
    RIGHT.html(`
    <div id='chat-container'>
        <ul id='chat'>
            <li>
                <i class='fas fa-user'><span id='username'>USERNAME</span></i>
            </li>
        </ul>
    </div>`)
    // model.shoebox()
})