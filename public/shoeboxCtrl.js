$(document).on('click', '.box-btn', e => {
    if (e.target.id === "box-new") {
        view.createShoebox()
    } else if (e.target.id === "invite-new") {
        view.inviteMember()
    }
})

$(document).on('click', '#upload-button', e => {
    e.preventDefault() // access form elements here
    let members = new Array()
    let inviteList = $('#invite-list li input')
    members.push({
        email: model.local('user').email,
        role: "owner"
    })
    for (let i = 0; i < inviteList.length; i++) {
        members.push({
            email: inviteList[i].value,
            role: "invited"
        })
    }

    model.shoebox().add({
        name: $('#shoebox-name').val(),
        description: $('#shoebox-description').val(),
        members: members,
        messages: new Array(),
        media: new Array()
    })

    alert('New Shoebox created!')
})