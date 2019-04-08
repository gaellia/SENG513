// listener for the edit button
$(document).on('click', '#editboxname-btn', () => {
    // toggle edits
    if ($('#editboxname-name').find('#change-name').length > 0) {
        $('#editboxname-name').html($('#change-name').val())
        $('#editboxname-btn').html('Edit...')

        // only shows save when it is not editable
        $('#save').show()
    } else {
        $('#editboxname-name').html(`<input id="change-name" value="${$('#editboxname-name').html()}"></input>`)
        $('#editboxname-btn').html('Save')

        $('#save').hide()
    }
})

// listener for the save button
$(document).on('click', '#save', () => {
    const user = model.local('user')
    const box = model.local('currentBox')

    let newName = $('#editboxname-name').html()

    if (box.name !== newName) {
        // update database with edited name
        model.shoebox().where('name', '==', box.name).get().then(response => {
            response.docs.map(doc => {
                // update database with edited name
                model.shoebox(doc.id).update({"name": newName})
            })
        })

        // update local with edited name
        model.local('currentBox', {name: newName})

        // update auth profile with edited name
        // let authUser = firebase.auth().currentUser
        // authUser.updateProfile({name: newName})
    }
})