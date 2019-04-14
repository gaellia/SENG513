const editCardView = () => {

    // Retrieve card ID here and get the card
    // let card = get card

    if (card.title)
        $('#modal-title').html(card.title)

    $("#modal-footer").html(`
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
}