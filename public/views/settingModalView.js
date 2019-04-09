const settingModalView = () => {
    const user = model.local('user')
    const boxes = model.local('currentBox').name
    const members = model.local('currentBox').memberEmails
    console.error("THESE ARE THE BOXES")
    console.error(model.local('currentBox'))
    console.error("ANOTHER THING I WANT TO CONSOLE LOG ")
    console.error("MEMBERS IN THE SHOEBOX ")

    // console.error(model.shoebox(model.local('currentBox')));

    $(".modal-title").html("Settings")

    $(".modal-footer").html(`
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal" id="save">Save</button>
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
            <div class="col-9"><input type="file" class="file"></div>
            <!--<button class="btn btn-light btn-sm" id="uploadButton">Submit</button>-->
        </div>
        <img style="height: 80px; width: 80px; text-align: center" id="shoebox-image" src=${model.local('currentBox').logoURL}>
        <br><br>
        <h6>Members:</h6>
        <div id="members-list"></div>
    `)

    for(let member of members) {
        $('#members-list').append(
            '<div class="row">' +
                '<h6 class="col-11">' + member + '</h6>' +
                '<button class="col-1 btn-danger">X</button>' +
            '</div>'
        )
    }
}