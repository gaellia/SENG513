$(document).on('click', '.box-btn', e => {
    if (e.target.id === "box-new") {
        view.createShoebox()
    } else if (e.target.id === "invite-new") {
        view.inviteMember()
    }
})

$('#creat-shoebox').submit(() => {
    
})