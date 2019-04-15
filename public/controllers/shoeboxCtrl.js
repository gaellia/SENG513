// create new shoebox workflow button listeners
$(document).on('click', '.box-new', () => {
    view.createShoeBox()

    $(".file").on("change", function(event) {
        GLOBAL_FILE = event.target.files[0]
    })

    $('#shoebox-image').attr("src", DEFAULT_LOGOS[Math.floor(Math.random()*DEFAULT_LOGOS.length)])
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

                    chatGlobal.bot(`<strong>${model.local(`user`).displayName}</strong> has joined this shoebox!`)
                    model.local('currentBox', box)

                    // update local pendingBoxes
                    let tmpPending = model.local('pendingBoxes').filter( e => e !== id)
                    model.local('pendingBoxes', tmpPending)

                    view.viewShoeBox(box)
                })
            })
        })
    })
})

$(document).on('click', '.btn-reject-invite', ({target: {id}}) => {
    id = id.substr(7)
    model.shoebox().where('boxID', '==', id).get().then(response => {
        let box = response.docs.map(docs => docs.data())[0]
        model.shoebox(id).update({"memberEmails": (box.memberEmails).filter(function(e) { return e !== model.local('user').email })})
        response.docs.map(docs => {
            model.shoebox(id).collection('members').where('email', '==', model.local('user').email).get().then(res => {
                res.docs.map(doc => {
                    model.shoebox(id).collection('members').doc(doc.id).delete().then(function() {
                        location.reload()
                    })
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
        MSG_LISTENER = chatGlobal.msgREF(response.docs[0].id).onSnapshot(s => {
            s.docChanges().forEach(({type, doc}) => {
                if (type === 'added') {
                    chatGlobal.display(doc.data())
                    chatGlobal.toBottom()
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
         const boxObject = {
            name: $('#shoebox-name').val(),
            description: $('#shoebox-description').val(),
            boxID: id,
            memberEmails: members.map(({email}) => email),
            logoURL: $('#shoebox-image').attr('src')
        }

        // send invite emails
        requestService(`/sendInvites`, "POST", {
            boxObject,
            members,
            user: model.local('user')
            })

        model.shoebox(id).set(boxObject).then(() => {  

            for(let member of members) {
                model.shoebox(id).collection('members').add(member)
            }       
            
            // update local
            model.local('currentBox', boxObject)
            let tempBoxes = model.local('boxes')
            tempBoxes.push(boxObject)
            model.local('boxes', tempBoxes)
            // change view to the newly created box
            view.viewShoeBox(boxObject)
        })

    }).catch(err => {
        console.log('err', err)
    })
})