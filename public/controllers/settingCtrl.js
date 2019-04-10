// listener for the edit button
$(document).on('click', '#editboxname-btn', () => {
    // toggle edits
    if ($('#editboxname-name').find('#change-name').length > 0) {
        $('#editboxname-name').html($('#change-name').val())
        $('#editboxname-btn').html('Edit...')

        // only shows save when it is not editable
        $('#save-box').show()
        // only one thing editable at a time
        $('#editboxdescription-btn').show()

    } else {
        $('#editboxname-name').html(`<input id="change-name" value="${$('#editboxname-name').html()}"></input>`)
        $('#editboxname-btn').html('Save')

        $('#save-box').hide()
        $('#editboxdescription-btn').hide()
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
    if ($('#editboxdescription-name').find('#change-desc').length > 0) {
        $('#editboxdescription-name').html($('#change-desc').val())
        $('#editboxdescription-btn').html('Edit...')

        // only shows save when it is not editable
        $('#save-box').show()
        // only one thing editable at a time
        $('#editboxname-btn').show()
        
    } else {
        $('#editboxdescription-name').html(`<textarea rows="4" id="change-desc" style="min-width: 100%">${$('#editboxdescription-name').html()}</textarea>`)
        $('#editboxdescription-btn').html('Save')

        $('#save-box').hide()
        $('#editboxname-btn').hide()
    }
})






// listener for the save button
$(document).on('click', '#save-box', () => {
    const box = model.local('currentBox')

    let newName = $('#editboxname-name').html()
    let newPhoto =  $('#shoebox-image').attr("src")
    let newDescription = $('#editboxdescription-name').html()

    if (box.name !== newName) {
        // update database with edited name
        model.shoebox().where('boxID', '==', box.boxID).get().then(response => {
            response.docs.map(doc => {
                // update database with edited name
                model.shoebox(doc.id).update({"name": newName})
            })
        })

        // update local boxes with edited name for drawer
        let tempBoxes = model.local('boxes')
        let index = model.local('boxes').findIndex(x => x.boxID === box.boxID)
        tempBoxes[index].name = newName
        model.local('boxes', tempBoxes)

        // update drawer with edited name
        $('#lab-' + box.boxID).text(newName)
        // update box title with edited name
        $('h2').text(newName)
    }




    if (box.logoURL !== newPhoto) {
        model.shoebox().where('boxID', '==', box.boxID).get().then(response => {
            response.docs.map(doc => {
                model.shoebox(doc.id).update({"logoURL": newPhoto})
            })
        })

        // update local boxes with new pic for drawer
        let tempBoxes = model.local('boxes')
        let index = model.local('boxes').findIndex(x => x.boxID === box.boxID)
        tempBoxes[index].logoURL = newPhoto
        model.local('boxes', tempBoxes)

        // update drawer with new pic
        $('#img-' + box.boxID).attr("src", newPhoto)
        // update header with new pic
        $('#box-pic').attr("src", newPhoto)

    }
    if (box.description !== newDescription) {
        model.shoebox().where('boxID', '==', box.boxID).get().then(response => {
            response.docs.map(doc => {
                model.shoebox(doc.id).update({"description": newDescription})
            })
        })

    }

    // update local for all
    model.local('currentBox', {boxID: box.boxID, name: newName, description: newDescription, memberEmails: box.memberEmails, logoURL: newPhoto})


})