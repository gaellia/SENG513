let GLOBAL_FILE
let downloadURL

// Temp(?) Solution for default logos
const default_logos = ["https://firebasestorage.googleapis.com/v0/b/shoebox513.appspot.com/o/images%2Fdefault_logos%2FShoebox0.png?alt=media&token=ea1cd29c-6939-498b-8717-711f56dc5f56",
                        "https://firebasestorage.googleapis.com/v0/b/shoebox513.appspot.com/o/images%2Fdefault_logos%2FShoebox1.png?alt=media&token=e22da256-c377-4749-9120-bf1004692c74",
                        "https://firebasestorage.googleapis.com/v0/b/shoebox513.appspot.com/o/images%2Fdefault_logos%2FShoebox2.png?alt=media&token=def9f899-17ad-4180-9f60-1db6c08ecf9c",
                        "https://firebasestorage.googleapis.com/v0/b/shoebox513.appspot.com/o/images%2Fdefault_logos%2FShoebox3.png?alt=media&token=a9b7e506-7125-4679-b707-24ed71d42474",
                        "https://firebasestorage.googleapis.com/v0/b/shoebox513.appspot.com/o/images%2Fdefault_logos%2FShoebox4.png?alt=media&token=8980d59a-c78f-4026-9321-56ce11978ff6"]

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

        // In the case that a logo image failed to upload, grab random default
        if (!downloadURL)
            downloadURL = default_logos[Math.floor(Math.random()*default_logos.length)]

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