const inviteMemberView = () => {
    $('#invite-new').prepend(`
        <li class="box-btn" style="list-style-type: none;">
            <input type="text" class="form-control" placeholder="Email">
        </li>
    `)
}