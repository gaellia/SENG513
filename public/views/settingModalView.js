const settingModalView = () => {
    const user = model.local('user')
    const boxes = model.local('currentBox').name
    const members = model.local('currentBox').memberEmails

    // console.error(model.shoebox(model.local('currentBox')));

    $(".modal-title").html("Settings")

    $(".modal-footer").html(`
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal" id="save-box">Save</button>
    `)

    $('.modal-body').html(`
        <div class="row">
            <h6 class="col-3">Name:</h6>
            <h6 class="col-7" id="editboxname-name">${model.local('currentBox').name}</h6>
            <p class="col-2"><button id="editboxname-btn" class="btn btn-link">Edit...</button></p>    
        </div>
        <div class="row">
            <h6 class="col-3">Description:</h6>
            <h6 class="col-7" id="editboxdescription-name">${model.local('currentBox').description}</h6>
            <p class="col-2"><button id="editboxdescription-btn" class="btn btn-link">Edit...</button></p>
        </div>
        <div class="row">
            <h6 class="col-3">Cover Image:</h6>
            <div class="col-7"><input type="file" class="file"></div>
            <p class="col-2"><button class="btn btn-light btn-sm" id="uploadButton">Submit</button></p>
        </div>
        <div class="row d-flex justify-content-center">
        <img style="height: 80px; width: 80px; text-align: center" id="shoebox-image" src=${model.local('currentBox').logoURL}>
        <button class="btn btn-light btn-sm" id="uploadButton">Submit</button>

        </div>
        <br><br>
        <h6>Members:</h6>
        <div id="members-list"></div>
    `)
    let count = 0
    for(let member of members) {
        count = count + 1
        let deleteButton = '<button id="deleteMember' +count+"\" "+  'class="col-1 btn btn-danger btn-xs"><i class="fas fa-times"></i></button>'
            $('#members-list').append(
                '<div class="row" >' +
                '<h6 class="col-10">' + member + '</h6>' +
                deleteButton +
            '</div>'
        )
    }
}