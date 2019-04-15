const createCardView = () => {
    $('#modal-title').html(`New Card`)

    $("#modal-footer").html(`
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" id="create-card-submit" data-dismiss="modal" id="save">Create</button>
    `)

    $('#modal-body').html(`
    <div style="text-align: center">
        <div class="loader" id="up-loader" style="margin-top: -15.2em; display: none"></div>
        <img style="width: 90%; text-align: center" id="card-image" src="//:0"> <!-- giving it an empty source -->
        <div id="loader-container" style="padding-top:80px; display: none"></div>
        <form id="create-card-form">
            <div class="form-group">
                <div> <!-- file upload -->
                    <span class="time"><i class="fas fa-camera"></i> Upload image with Card</span>
                    <br><br>
                    <input type="file" class="file">
                    <button class="btn btn-light btn-sm" id="uploadButton">Submit</button>
                </div><!-- file upload-->
                <hr>
                <label for="card-name">Card Title</label>
                <input type="text" class="form-control" id="card-name">
                <br>
                <label for="card-text">Card Text</label>
                <textarea type="text" class="form-control" id="card-text" rows="6"></textarea>
            </div>
        </form>
    </div>
    `)
}