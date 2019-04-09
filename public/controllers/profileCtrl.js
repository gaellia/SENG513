// listener for the edit button
$(document).on('click', '#edit-btn', () => {
    console.error("THE EDIT BUTTON HAS BEEN TOGGLED")
    // toggle edits
    if ($('#edit-name').find('#change-name').length > 0) {
        $('#edit-name').html($('#change-name').val())
        $('#edit-btn').html('Edit...')

        // only shows save when it is not editable
        $('#save').show()
    } else {
        $('#edit-name').html(`<input id="change-name" value="${$('#edit-name').html()}"></input>`)
        $('#edit-btn').html('Save')

        $('#save').hide()
    }
})

// listener for the save button
$(document).on('click', '#save', () => {
    const user = model.local('user')
    let newName = $('#edit-name').html()

    if (user.displayName !== newName) {
        // update database with edited name
        model.user().where('uid', '==', user.uid).get().then(response => {
            response.docs.map(doc => {
                // update database with edited name
                model.user(doc.id).update({"displayName": newName})
            })
        })

        // update local with edited name
        model.local('user', {uid: user.uid, displayName: newName, email: user.email})

        // update auth profile with edited name
        let authUser = firebase.auth().currentUser
        authUser.updateProfile({displayName: newName})
    }
})