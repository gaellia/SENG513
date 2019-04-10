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















$(document).on('click', '.col-1.btn-danger', (e) => {
    console.error(e)
    let id = "#" +e.target.id
    console.error(id)
    let username =  $( id ).prev().text();

    const box = model.local('currentBox')

    if (confirm("Are you Sure you want to delete this user")) {
        $( id ).prev().hide();

        model.shoebox().where('name', '==', box.name).get().then(response => {
            response.docs.map(doc => {
                model.shoebox(doc.id).update({"memberEmails": (box.memberEmails).filter(function(e) { return e !== username })})
            })
            console.error(box.memberEmails)
        })

        model.local('currentBox',{"memberEmails": (box.memberEmails).filter(function(e) { return e !== username })})

    } else {
        console.error("cancel")
        // txt = "You pressed Cancel!";
    }


        // update database with edited name










})













$(document).on('click', '#editboxdescription-btn', () => {
    // toggle edits
    if ($('#editboxdescription-name').find('#change-name').length > 0) {
        $('#editboxdescription-name').html($('#change-name').val())
        $('#editboxdescription-btn').html('Edit...')

        // only shows save when it is not editable
        $('#save').show()
    } else {
        $('#editboxdescription-name').html(`<input id="change-name" value="${$('#editboxdescription-name').html()}"></input>`)
        $('#editboxdescription-btn').html('Save')

        $('#save').hide()
    }
})






// listener for the save button
$(document).on('click', '#save', () => {
    const user = model.local('user')
    const box = model.local('currentBox')

    let newName = $('#editboxname-name').html()
    let newPhoto =  $('#shoebox-image').attr("src")
    let newDescription = $('#editboxdescription-name').html()

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




    if (box.logoURL !== newPhoto) {
        model.shoebox().where('name', '==', box.name).get().then(response => {
            response.docs.map(doc => {
                model.shoebox(doc.id).update({"logoURL": newPhoto})
            })
        })
        model.local('currentBox', {logoURL: newPhoto})

    }
    if (box.description !== newDescription) {
        model.shoebox().where('name', '==', box.name).get().then(response => {
            response.docs.map(doc => {
                model.shoebox(doc.id).update({"description": newDescription})
            })
        })
        model.local('currentBox', {description: newDescription})

    }




})