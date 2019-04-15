const editCardView = (cardID) => {

    // Retrieve card ID here and get the card

    model.shoebox(model.local('currentBox').boxID).collection('cards').doc(cardID).get().then(response => {
        let card = response.data()

        if (card.title)
            $('#modal-title').html(card.title)

        $("#modal-footer").html(`
            <div id="show-delete-card"></div>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" id="create-card-submit" data-dismiss="modal" id="save">Create</button>
        `)

        $('#modal-body').html(`
            <div style="text-align: center">
                <img style="width: 90%; text-align: center" id="card-image" src="${card.resourceURL}">
                <form id="create-card-form">
                    <div class="form-group">
                        <hr>
                        <label for="card-name">Card Title</label>
                        <input type="text" class="form-control" id="card-name" value="${card.title}">
                        <br>
                        <label for="card-text">Card Text</label>
                        <textarea type="text" class="form-control" id="card-text" rows="6">${card.text}</textarea>
                    </div>
                </form>
            </div>
        `)

        if (card.author === model.local('user').email)
            $('#show-delete-card').html(`<button type="button" class="btn btn-outline-danger mr-auto delete-card-btn" data-dismiss="modal" id="delete-card-${cardID}">Delete Card</button>`)
    })
}