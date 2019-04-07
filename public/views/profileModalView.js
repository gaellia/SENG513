const profileModalView = () => {
    const user = model.local('user')
    $(".modal-title").html(`Hello, ${user.displayName}`)
    $('.modal-body').html(`
        <div class="row">
            <div class="col-1"><i class="fas fa-envelope"></i></div>
            <div class="col-2">Email:</div>
            <div class="col-9">${user.email}</div>
        </div>
        <div class="row">
            <div class="col-1"><i class="fas fa-user-edit"></i></div>
            <div class="col-2">Name:</div>
            <div class="col-7" id="edit-name">${user.displayName}</div>
            <div class="col-2"><button id="edit-btn" class="btn btn-secondary">Edit</button></div>
        </div>
        <div class="row><div class="col-12"><br><br></div></div>
        <div class="row">
            <div class="col-12">
                <button type="button" class="btn btn-warning logout"><i class="fas fa-sign-out-alt"></i>  Logout</button>
            </div>
        </div>`)
}