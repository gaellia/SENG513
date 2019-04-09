const createShoeBoxView = () => {
    $('#modal-title').html(`New Shoebox`)

    $("#modal-footer").html(`
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" id="create-shoebox-submit" data-dismiss="modal" id="save">Create</button>
    `)

    $('#modal-body').html(`
    <div style="text-align: center">
        <div class="loader" id="up-loader" style="margin-top: -15.2em; display: none"></div>
        <img style="height: 80px; width: 80px; text-align: center" id="shoebox-image" src="Illustration.png">
        <div id="loader-container" style="padding-top:80px; display: none"></div>
        <br>
        <form id="create-shoebox-form">
            <div class="form-group">
                <div> <!-- file upload -->
                    <br>
                    <span class="time"><i class="fas fa-camera"></i> Assign a picture to this shoebox</span>
                    <br><br>
                    <input type="file" class="file">
                    <button class="btn btn-light btn-sm" id="uploadButton">Submit</button>
                </div><!-- file upload-->
                <hr>
                <label for="shoebox-name">Shoebox Name</label>
                <input type="text" class="form-control" id="shoebox-name">
                <br>
                <label for="shoebox-description">Description</label>
                <input type="text" class="form-control" id="shoebox-description">
            </div><!-- form group -->
            <div> <!-- invite members -->
                <ul class="list-group list-group-flush" id="invite-list">
                    <li class="list-group-item">
                        <button class="btn btn-light" id="invite-new">
                            <br>
                            <span id="invite-members-new">
                                <i class="fas fa-plus-circle"></i>
                                Invite members by email
                            </span>
                        </button>
                    </li>
                </ul>
            </div> <!-- invite members -->
        </form>
    </div>
    `)
}