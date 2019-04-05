// listener for the edit button
$(document).on('click', '#edit-btn', () => {
    // toggle edits
    if ($('#edit-name').find('#change-name').length > 0) {
        $('#edit-name').html(`${$('#change-name').val()}`)
        // only shows save when it is not editable
        $('#save').show()
    } else {
        $('#edit-name').html(`<input id="change-name" value="${$('#edit-name').html()}"></input>`)
        $('#save').hide()
    }
})

// listener for the save button
$(document).on('click', '#save', () => {
    const user = model.local('user')
    if (user.displayName !== $('#edit-name').html()) {
        model.user().where('uid', '==', user.uid).get().then(response => {
            response.docs.map(doc => {
                // update database with edited name
                model.user(doc.id).update({"displayName": $('#edit-name').html()})
            })
        })
        // update local with edited name
        model.local('user', {uid: user.uid, displayName: $('#edit-name').html(), email: user.email})
    }
})