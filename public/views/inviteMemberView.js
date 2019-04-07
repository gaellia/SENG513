const inviteMemberView = () => {
    $('#invite-new').prepend(`
        <li style="list-style-type: none;">
            <input type="text" class="form-control" placeholder="Email">
        </li>
    `)
}