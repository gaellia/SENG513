const profileModalView = () => {
    $(".modal-footer").html(`
            <button type="button" class="btn btn-warning mr-auto logout" style="color: white" data-dismiss="modal"> <i class="fas fa-sign-out-alt"></i> Logout</button>
            <button type="button" class="btn btn-secondary ml-auto" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" id="save">Save</button>
    `)

    const user = model.local('user')
    $(".modal-title").html(`Hello, ${user.displayName}`)

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
            <p class="col-2"><button id="edit-btn" class="btn btn-link"><i class="fas fa-pencil-alt"></i></button></p>
        </div>
        <div class="row><div class="col-12"><br><br></div></div>`)
}