$(document).on('click', '.box-btn', ({target: {id}}) => {
    switch(id) {
        case "box-new":
            view.createShoebox()
            break

        case 'invite-new':
            view.inviteMember()
    }
})

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

    model.shoebox().add({
        name: $('#shoebox-name').val(),
        description: $('#shoebox-description').val(),
        members,
        messages: [],
        cards: []
    })

    alert('New Shoebox created!')
    authGlobal.fetchBoxes(model.local('user'))
    view.selectShoeBox()
})