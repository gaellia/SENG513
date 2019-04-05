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
    // update database
    //model.user(user.uid)
})