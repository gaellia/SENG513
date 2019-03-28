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
    let inviteList = $('#invite-list li input')

    let members = inviteList.map(({value}) => ({email: value, role: 'invited'}))
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