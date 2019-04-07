const profileModalView = () => {
    const user = model.local('user')
    $(".modal-title").html(`Hello, ${user.displayName}`)

    $(".modal-footer").html(`
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal" id="save">Save</button>
    `)

    $('.modal-body').html(`
        <div class="row">
            <h6 class="col-1"><i class="fas fa-envelope"></i></h6>
            <h6 class="col-2">Email:</h6>
            <h6 class="col-9">${user.email}</h6>
        </div>
        <div class="row">
            <h6 class="col-1"><i class="fas fa-user-edit"></i></h6>
            <h6 class="col-2">Name:</h6>
            <h6 class="col-7" id="edit-name">${user.displayName}</h6>
            <p class="col-2"><button id="edit-btn" class="btn btn-link">Edit...</button></p>
        </div>
        <div class="row><div class="col-12"><br><br></div></div>
        <div class="row">
            <div class="col-12">
                <button type="button" class="btn btn-warning logout" style="color: white"><i class="fas fa-sign-out-alt"></i>  Logout</button>
            </div>
        </div>`)
}