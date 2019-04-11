// create new shoebox workflow button listeners
$(document).on('click', '.box-new', () => {
    view.createShoeBox()

    $(".file").on("change", function(event) {
        GLOBAL_FILE = event.target.files[0]

    })
})

$(document).on('click', '#setting-btn', () => {
    view.settingsModal()
    $(".file").on("change", function(event) {
        GLOBAL_FILE = event.target.files[0]
    })
})

$(document).on('click', '#invite-new', e => {
    e.preventDefault()

    if(e.target.id==='invite-members-new')
        view.inviteMember()
})

$(document).on('click', '.btn-accept-invite', ({target: {id}}) => {
    id = id.substr(7)
    model.shoebox().where('boxID', '==', id).get().then(response => {
        let box = response.docs.map(docs => docs.data())[0]
        response.docs.map(docs => {
            model.shoebox(id).collection('members').where('email', '==', model.local('user').email).get().then(res => {
                res.docs.map(doc => {
                    model.shoebox(id).collection('members').doc(doc.id).update({'role': 'member'})
                    view.viewShoeBox(box)
                })
            })
        })
    })
})

// view all shoeboxes button listener
$(document).on('click', '.view-box-btn', ({target: {id}}) => {
    id = id.substr(4)
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
        view.viewShoeBox(bid)
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

    // send invite emails
    let request = new XMLHttpRequest()
    request.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            console.log('emails sent')
        }
    }

    request.open("POST","http://localhost:5000/shoebox513/us-central1/app/sendInvites",true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader('Access-Control-Allow-Headers', '*');
    request.send(JSON.stringify(members));
})