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