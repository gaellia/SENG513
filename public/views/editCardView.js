const editCardView = cardID => {

    // Retrieve card ID here and get the card

    model.shoebox(model.local('currentBox').boxID).collection('cards').doc(cardID).get().then(response => {
        let {title, resourceURL, text, author} = response.data()

        console.log(response.data())

        if (title)
            $('#modal-title').html(title)

        $("#modal-footer").html(`
            <div id="show-delete-card"></div>
            <button type="button" class="btn btn-secondary ml-auto" data-dismiss="modal">Close</button>
            <div id="show-save-card"></div>
        `)

        $('#modal-body').html(`
            <div style="text-align: center">
                ${resourceURL ? `<img style="width: 90%; text-align: center" id="card-image" src="${resourceURL}">` : ``}
                <form id="create-card-form">
                    <div class="form-group">
                        <hr>
                        <label for="card-name">Card Title</label>
                        <input type="text" class="form-control" id="card-name" value="${title}" disabled>
                        <br>
                        <label for="card-text">Card Text</label>
                        <textarea type="text" class="form-control" id="card-text" rows="6" disabled>${text}</textarea>
                    </div>
                </form>
            </div>
        `)

        if (author===model.local('user').email) {
            $('#show-delete-card').html(`<button type="button" class="btn btn-danger mr-auto delete-card-btn" data-dismiss="modal" id="delete-card-${cardID}"><i class="fas fa-trash"></i></button>`)
            $('#show-save-card').html(`<button type="button" class="btn btn-primary save-card-btn" data-dismiss="modal" id="save-card-${cardID}">Save</button>`)
            $('#card-name').prop("disabled", false)
            $('#card-text').prop("disabled", false)
        }
    })
}