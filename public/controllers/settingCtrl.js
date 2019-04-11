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

$(document).on('click', '.col-2.btn-danger', (e) => {
    let id = "#" +e.target.id
    let username =  $( id ).prev().text();

    const box = model.local('currentBox')
    const user = model.local('user')

    if (confirm("Are you sure you want to delete this user?")) {
        $( id ).prev().hide();
        $( id ).hide();

        model.shoebox().where('boxID', '==', box.boxID).get().then(response => {
            response.docs.map(doc => {
                model.shoebox(doc.id).update({"memberEmails": (box.memberEmails).filter(function(e) { return e !== username })})

                model.shoebox(doc.id).collection('members').where('email', '==', username).get().then(res => {
                    res.docs.map(memberDoc => {
                        model.shoebox(doc.id).collection('members').doc(memberDoc.id).delete().then( () => {
                            console.log("Successfully deleted member")
                        })
                    })

                    // if you remove yourself, refresh
                    if (username === user.email) {
                        location.reload()
                    }
                })
            })
            //console.error(box.memberEmails)
        })

        model.local('currentBox', {boxID: box.boxID, name: box.name, description: box.description, memberEmails: (box.memberEmails).filter(function(e) { return e !== username }), logoURL: box.logoURL})

    } else {
        //console.log("cancel")
    }

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


// listener to delete the box
$(document).on('click', '#delete-box', () => {

    const box = model.local('currentBox')

    if (confirm("Are you sure you want to delete this box?")) {
        console.log("Starting delete...")

        // delete from database
        model.shoebox().where('boxID', '==', box.boxID).get().then(response => {
            response.docs.map(doc => {
                // delete messages
                model.shoebox(doc.id).collection('messages').get().then( s => {
                    s.forEach(chatDoc => {
                        model.shoebox(doc.id).collection('messages').doc(chatDoc.id).delete()
                    })
                })
                console.log("Chat deleted.")

                // delete members
                model.shoebox(doc.id).collection('members').get().then( s => {
                    s.forEach(memDoc => {
                        model.shoebox(doc.id).collection('members').doc(memDoc.id).delete()
                    })
                })
                console.log("Members deleted.")

                // delete cards
                model.shoebox(doc.id).collection('cards').get().then( s => {
                    s.forEach(cardDoc => {
                        model.shoebox(doc.id).collection('cards').doc(cardDoc.id).delete()
                    })
                })
                console.log("Cards deleted.")

                // delete box
                model.shoebox(doc.id).delete().then( () => {
                    console.log("Deleted Box.")        
                    // refresh the page
                    location.reload()
                })
            })
        })   
    }
})



// listener for the save button
$(document).on('click', '#save-box', () => {
    const box = model.local('currentBox')

    let newName = $('#editboxname-name').html()
    let newPhoto =  $('#shoebox-image').attr("src")
    let newDescription = $('#editboxdescription-name').html()

    if (box.name !== newName) {
        chatGlobal.bot(`${model.local('user').displayName} renamed this box to <strong>${newName}</strong>.`)

        // update database with edited name
        model.shoebox().where('boxID', '==', box.boxID).get().then(response => {
            response.docs.forEach(({id}) => {
                // update database with edited name
                model.shoebox(id).update({"name": newName})
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
        chatGlobal.bot(`${model.local('user').displayName} changed the box photo.`)

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
        chatGlobal.bot(`${model.local('user').displayName} changed the description.`)

        model.shoebox().where('boxID', '==', box.boxID).get().then(response => {
            response.docs.map(doc => {
                model.shoebox(doc.id).update({"description": newDescription})
            })
        })

    }

    // update local for all
    model.local('currentBox', {boxID: box.boxID, name: newName, description: newDescription, memberEmails: box.memberEmails, logoURL: newPhoto})

    
})