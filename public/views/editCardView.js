const editCardView = cardID => {

    // Retrieve card ID here and get the card

    model.shoebox(model.local('currentBox').boxID).collection('cards').doc(cardID).get().then(response => {
        let {title, resourceURL, text, author} = response.data()

        if (title) $('#modal-title').html(`Editting ${title}`)

        $("#modal-footer").html(`
            <div id="show-delete-card"></div>
            <button type="button" class="btn btn-secondary ml-auto" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" id="create-card-submit" data-dismiss="modal" id="save">Update</button>
        `)

        $('#modal-body').html(`
            <div style="text-align: center">
                ${resourceURL? `<img style="width: 90%; text-align: center" id="card-image" src="${resourceURL}"><hr>` :""}
                <form id="create-card-form">
                    <div class="form-group">
                        <input type="text" class="form-control" id="card-name" value="${title}">
                        <br>
                        <textarea type="text" class="form-control" id="card-text" rows="6">${text}</textarea>
                    </div>
                </form>
                <p class="time" style="text-align: left">Added by ${author}</p>
            </div>
        `)

        if (author===model.local('user').email)
            $('#show-delete-card').html(`<button type="button" class="btn btn-danger mr-auto delete-card-btn" data-dismiss="modal" id="delete-card-${cardID}"><i class="fas fa-trash"></i></button>`)
    })
}