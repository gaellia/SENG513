const createShoeBoxView = ({MID}) => {
    MID.html(`
        <img style="text-align: center">
            <br>
            <h1>New Shoebox</h1>
            <img style="height: 80px; width: 80px; text-align: center" id="shoebox-image" src="Illustration.png" </img>
            <br>
            <div>
                <form id="create-shoebox-form">
                    <div class="form-group">
                        <label for="shoebox-name">Shoebox Name</label>
                        <input type="text" class="form-control" id="shoebox-name">
                        <label for="shoebox-description">Description</label>
                        <input type="text" class="form-control" id="shoebox-description">
                        <br>

                        <div class="fas fa-camera"> 
                    <input type="file" id="file">
                <button type="button"  id="uploadButton">Submit</button>
                </div>
                        <br>
                        <label for="invite-list">Invite Members</label>
                        <ul class="list-group list-group-flush" id="invite-list">
                            <li class="list-group-item box-btn" id="invite-new">
                                <i class="fas fa-plus-circle"></i>
                                Invite by email
                            </li>
                        </ul>
                    </div>
                    <button id="create-shoebox-submit" class="btn btn-primary">Create</button>
                </form>
            </div>
        </div>
    `)
}