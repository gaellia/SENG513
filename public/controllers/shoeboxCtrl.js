let GLOBAL_FILE

// create new shoebox workflow button listeners
$(document).on('click', '.box-btn', ({target: {id}}) => {
    switch(id) {
        case "box-new":
            view.createShoebox()
            $("#file").on("change", function(event) {
                console.log("WE HAVE CHANGED FILE ")
                GLOBAL_FILE = event.target.files[0]

            })

            break

        case 'invite-new':
            view.inviteMember()
    }
})

// view all shoeboxes button listener
$(document).on('click', '.view-box-btn', ({target: {id}}) => {
    model.shoebox().where('boxID', '==', id).get().then(response => {
        view.viewShoebox(response.docs.map(docs => docs.data())[0])
    })
})

// create new shoebox form submit
$(document).on('click', '#create-shoebox-submit', e => {
    e.preventDefault() // access form elements here
    const inviteList = $('#invite-list li input')

    const members = []
    for(let member of inviteList) {
        members.push({
            email: member.value,
            role: 'invited'
        })
    }

    members.push({
        email: model.local('user').email,
        role: "owner"
    })

    model.shoebox().add({}).then(({id}) => {
        model.shoebox(id).set({
            name: $('#shoebox-name').val(),
            description: $('#shoebox-description').val(),
            boxID: id,
            memberEmails: members.map(({email}) => email),
            logoURL: downloadURL
        })
        
        for(let member of members)
            model.shoebox(id).collection('members').add(member)

            authGlobal.fetchBoxes(model.local('user'))
            view.selectShoeBox()

    }).catch(err => {
        console.log('err', err)
    })
})