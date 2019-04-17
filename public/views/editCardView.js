const editCardView = cardID => {

    // Retrieve card ID here and get the card

    model.shoebox(model.local('currentBox').boxID).collection('cards').doc(cardID).get().then(response => {
        let {title, resourceURL, text, author} = response.data()

        $('#modal-title').html(`${title? title : "Viewing Card"}`)

        $("#modal-footer").html(`
            <div id="show-delete-card"></div>
            <button type="button" class="btn btn-secondary ml-auto" data-dismiss="modal">Close</button>
            <div id="show-save-card"></div>
        `)

        // check box ownership
        model.shoebox().where('boxID', '==', model.local('currentBox').boxID).get().then(response => {
            response.docs.map(doc => {
                model.shoebox(doc.id).collection('members').where('role', '==', "owner").get().then(res => {
                    res.docs.map(memberDoc => {
            
                        if (memberDoc.data().email === model.local('user').email) {
                            $('#show-delete-card').html(`<button type="button" class="btn btn-danger mr-auto delete-card-btn" data-dismiss="modal" id="delete-card-${cardID}"><i class="fas fa-trash"></i></button>`)
                        }
            
                    })
                })
            })
        })

        $('#modal-body').html(`
            <div style="text-align: center">
                ${resourceURL ? `<img style="width: 90%; text-align: center" id="card-image" src="${resourceURL}"><hr>` : ``}
                <div id="card-body">${text ? text : ""}</div>
                <p class="time" style="text-align: left">Added by ${author}</p>
            </div>
        `)

        if (author===model.local('user').email) {
            $('#show-delete-card').html(`<button type="button" class="btn btn-danger mr-auto delete-card-btn" data-dismiss="modal" id="delete-card-${cardID}"><i class="fas fa-trash"></i></button>`)
            $('#show-save-card').html(`<button type="button" class="btn btn-primary save-card-btn" data-dismiss="modal" id="save-card-${cardID}">Save</button>`)
            $('#card-body').html(`
                <form id="create-card-form">
                    <div class="form-group">
                        <label for="card-name">Card Title</label>
                        <input type="text" class="form-control" id="card-name" value="${title}">
                        <br>
                        <textarea type="text" class="form-control" id="card-text" rows="6">${text}</textarea>
                    </div>
                </form>
            </div>`)

            $('#modal-title').html(`Editing ${title ? title : "Card"}`)
        }
    })
}