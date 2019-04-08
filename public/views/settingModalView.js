const settingModalView = () => {
    const user = model.local('user')
    const boxes = model.local('currentBox').name
    console.error("THESE ARE THE BOXES")
    console.error(model.local('currentBox'))
    console.error("ANOTHER THING I WANT TO CONSOLE LOG ")
    // console.error(model.shoebox(model.local('currentBox')));

    $(".modal-title").html("Settings")

    $(".modal-footer").html(`
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal" id="save">Save</button>
    `)

    $('.modal-body').html(`
        <div class="row">
            <!--<img class="col-1"><i class="fas fa-envelope"></i></img>-->
             <!--<img style="height: 40px; width: 40px; text-align: center" id="shoebox-image" src="Illustration.png">-->
            <h6 class="col-2">Shoebox name: </h6>
             <h6 class="col-7" id="editboxname-name">${model.local('currentBox').name}</h6>

            <p class="col-2"><button id="editboxname-btn" class="btn btn-link">Edit...</button></p>
            
            
            <h6 class="col-4">Shoebox Cover Image </h6>
           
              <img style="height: 80px; width: 80px; text-align: center" id="shoebox-image" src=${model.local('currentBox').logoURL}>
                    <input type="file" class="file">
                    <button class="btn btn-light btn-sm" id="uploadButton">Submit</button>

            <!--<p class="col-2"><button id="editboxphoto-btn" class="btn btn-link">Edit...</button></p>-->
            
            
            

        </div>
 
        <div class="row><div class="col-12"><br><br></div></div>
        <div class="row">
    
        </div>`)
}