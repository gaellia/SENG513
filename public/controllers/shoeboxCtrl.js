// create new shoebox workflow button listeners
$(document).on('click', '.box-btn', ({target: {id}}) => {
    switch(id) {
        case "box-new":
            view.createShoebox()
            $("#file").on("change", function(event) {
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
        let bid = response.docs.map(docs => docs.data())[0]
        
        // listen for added messages
        if (MSG_LISTENER) 
            MSG_LISTENER()
        MSG_LISTENER = model.shoebox(response.docs[0].id).collection('messages').onSnapshot(s => {
            s.docChanges().forEach( change => {
                if (change.type === 'added') {
                    // display new messages
                    let timestamp = change.doc.data().timestamp.toDate().toString()
                    timestamp = timestamp.substr(0, timestamp.indexOf(':')+3)   //goes up to the minute 

                    $('#chat').append($('<li>').html(`<i class='fas fa-user'><span id='username'>${change.doc.data().displayName}</span></i><br>
                    <p id='message'>${change.doc.data().message}</p>
                    <span class='time'>${timestamp}</span>`))

                    // scroll to bottom
                    if($('#chat')[0]) $('#chat').scrollTop($('#chat')[0].scrollHeight)
                }
            })
        })
        model.local('currentBox', bid)
        view.viewShoebox(bid)
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
        if (!DOWNLOAD_URL)
            DOWNLOAD_URL = DEFAULT_LOGOS[Math.floor(Math.random()*DEFAULT_LOGOS.length)]

        model.shoebox(id).set({
            name: $('#shoebox-name').val(),
            description: $('#shoebox-description').val(),
            boxID: id,
            memberEmails: members.map(({email}) => email),
            logoURL: $('#shoebox-image').attr('src')
        })
        
        for(let member of members)
            model.shoebox(id).collection('members').add(member)

            authGlobal.fetchBoxes(model.local('user'))
            view.selectShoeBox()

    }).catch(err => {
        console.log('err', err)
    })
})