$(document).on('click', '.box-btn', e => {
    if (e.target.id === "box-new") {
        view.createShoebox()
    } else if (e.target.id === "invite-new") {
        view.inviteMember()
    }
})

$(document).on('click', '#create-shoebox-submit', e => {
    e.preventDefault()
    $('#create-shoebox-form') // access form elements here
})