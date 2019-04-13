const settingModalView = () => {
    const user = model.local('user')
    const box = model.local('currentBox')
    const members = model.local('currentBox').memberEmails

    $(".modal-title").html("Settings")

    $(".modal-footer").html(`
        <div id="show-delete-box"></div>
        <button type="button" class="btn btn-secondary ml-auto" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal" id="save-box">Save</button>
    `)

    // check ownership
    model.shoebox().where('boxID', '==', box.boxID).get().then(response => {
        response.docs.map(doc => {
            model.shoebox(doc.id).collection('members').where('role', '==', "owner").get().then(res => {
                res.docs.map(memberDoc => {

                    if (memberDoc.data().email == user.email) {
                        $('#show-delete-box').html('<button type="button" class="btn btn-outline-danger mr-auto" data-dismiss="modal" id="delete-box">Delete Box</button>')
                    }

                })
            })
        })
    })

    $('.modal-body').html(`
        <div class="row">
            <h6 class="col-3">Name:</h6>
            <h6 class="col-6" id="editboxname-name">${model.local('currentBox').name}</h6>
            <p class="col-2"><button id="editboxname-btn" class="btn btn-link"><i class="fas fa-pencil-alt"></i></button></p>    
        </div>
        <div class="row">
            <h6 class="col-3">Description:</h6>
            <h6 class="col-6" id="editboxdescription-name">${model.local('currentBox').description}</h6>
            <p class="col-2"><button id="editboxdescription-btn" class="btn btn-link"><i class="fas fa-pencil-alt"></i></button></p>
        </div>
        <div class="row">
            <h6 class="col-3">Cover Image:</h6>
            <div class="col-6"><input type="file" class="file"></div>
            <p class="col-3"><button class="btn btn-light btn-sm" id="uploadButton">Submit</button></p>
        </div>
        <div class="row d-flex justify-content-center">
        <img style="height: 80px; width: 80px; text-align: center" id="shoebox-image" src=${model.local('currentBox').logoURL}>

        </div>
        <br><br>
        <h6>Members:</h6>
        <div id="members-list"></div>
    `)
    
    // find the owner of the box
    model.shoebox().where('boxID', '==', box.boxID).get().then(response => {
        response.docs.map(doc => {
            model.shoebox(doc.id).collection('members').where('role', '==', "owner").get().then(res => {
                res.docs.map(memberDoc => {
                    let ownerMail = memberDoc.data().email

                    let count = 0
                    let deleteButton = ""
                    for(let member of members) {
                        count = count + 1

                        if (user.email === ownerMail) {
                            deleteButton = '<button id="deleteMember' +count+"\" "+  'class="col-2 btn btn-danger fas fa-times"></button>'
                            if (user.email === member) {
                                // don't delete the owner
                                deleteButton = "(Owner)"
                            }
                        } else {
                            deleteButton = ""
                            if (ownerMail === member) {
                                // indicate the owner
                                deleteButton = "(Owner)"
                            }
                            if (member === user.email) {
                                // you can remove yourself
                                deleteButton = '<button id="deleteMember' +count+"\" "+  'class="col-2 btn btn-danger fas fa-times"></button>'
                            }
                        }

                        $('#members-list').append(
                            '<div class="row" >' +
                                '<h6 class="col-10">' + member + '</h6>' + deleteButton +
                            '</div>'
                        )
                    }

                })
            })
        })
    })
}