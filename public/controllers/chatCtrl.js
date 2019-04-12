const chatGlobal = {
    getTime: () => firebase.firestore.Timestamp.fromDate(new Date()),
    sanitize: msg => msg.replace(/</g, "&lt").replace(/>/g, "&gt"),
    msgREF: (id = model.local('currentBox').boxID) => model.shoebox(id).collection('messages'),

    bot(message){
        chatGlobal.msgREF().add({
            message,
            displayName: 'BOT',
            timestamp: chatGlobal.getTime()
        })
    },

    toBottom(){
        if($('#chat')[0]) $('#chat').scrollTop($('#chat')[0].scrollHeight)
    },

    display({message, displayName, timestamp}){
        // show all messages in the shoebox
        timestamp = timestamp.toDate().toString().substr(4, 17) //goes up to the minute 

        const GLYPH_CODE = displayName==='BOT'?'robot':'user'
        $('#chat').append($('<li>').html(`
            <div style="font-size: 12px">
                <i class='fas fa-${GLYPH_CODE}'><span id='username'>${displayName}</span></i><br>
                <span class='time' style="text-align: right!important;">${timestamp}</span>
                <p id='message' style="margin-bottom: 0px">${message}</p>
            </div>
            `))
    }
}

// listener for sending a message
$(document).on('submit', '#msg-form', e => {
    e.preventDefault()
    const MSG = $('#m').val()
    if (MSG!== "") {
        // add to database
        chatGlobal.msgREF().add({
            displayName: model.local('user').displayName, 
            message: chatGlobal.sanitize(MSG),
            timestamp: chatGlobal.getTime()
        })
    
        $('#m').val("") // clear send box
    }
})

// listen for enter keypress
$(document).on('keypress', '#m', e => {
    if(e.which == 13) {
        console.log("HI")
        e.preventDefault()
        $('#msg-form').submit()
    }
})