const viewUtil = (() => {
    const containers = {
        MID: $('#middle-container'),
        LEFT: $('#left-container'),
        RIGHT: $('#right-container')
    }
    
    const templates = {
        cards: ({id, data: {mediaType, resourceURL, title, text}}) => {
            let cardBody = `
            <button id="card-${id}" class="btn edit-card-btn" data-toggle="modal" data-target="#modal-container" value="${id}">
                <div class="card" style="width: 18rem;">`
            if (mediaType !== "text") cardBody += `
                    <img class="card-img-top" src="${resourceURL}">`
            if (title || text){
            cardBody += `
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${text}</p>
                    </div>`
            }
            cardBody +=
                `</div>
            </button>`
    
            return cardBody
        },
        placeholder: () => [``, `
                <div class="card" style="width: 18rem;">
                    <div class="card-header"></div>
                    <div class="card-body">
                        <h4 class="card-title">Your cards will go here</h4>
                        <br>
                        <p class="card-text">Post the first card in this shoebox!</p>
                        <button id="addButton" class="btn btn-lg btn-light" style="width:100%"  data-toggle="modal" data-target="#modal-container">
                            <h1 style="font-size: 5rem">
                                <i class="fas fa-plus"></i>
                            </h1>
                        </button>
                    </div>
            </div>`, ``],
    
        addButton: () => `
                <div class="card" style="width: 18rem;">
                    <div class="card-body" style="padding: 0!important">
                        <button id="addButton" style="width: 100%; height: 18rem; margin:0" class="btn btn-light"  data-toggle="modal" data-target="#modal-container">
                            <h1 style="font-size: 7rem">
                                <i class="fas fa-plus"></i>
                            </h1>
                        </button>
                    </div>
            </div>`,

        pendingBox: ({boxID, logoURL, name}) => `
        <li class="list-group-item">
            <div class="row">
                <div class="btn maxw col-sm-8">
                    <h5>
                        <image id="img-${boxID}" src="${logoURL}" style="width: 64px; height: 64px; margin-right: 16px">
                        ${name}
                    </h5>
                </div><!-- label col -->

                <div class="col-sm-3">
                    <div class="d-flex justify-content-between">
                        <div class="p-2">
                            <button class="btn btn-info center-card btn-accept-invite" id="accept-${boxID}">
                                <i class="fas fa-check"></i>
                            </button>
                        </div><!-- p2 -->
                        <div class="p-2">
                            <button class="btn btn-danger center-card btn-reject-invite" id="reject-${boxID}">
                                <i class="fas fa-times"></i>
                            </button>
                        </div><!-- p2 -->
                    </div><!--flexbox-->
                </div><!-- button col -->
            </div><!-- row -->
        </li>`,

        notPendingBox: ({boxID, logoURL, name}) => `
        <li class="list-group-item">
            <div class="row">
                <button class="btn view-box-btn maxw">
                    <h5 id="div-${boxID}">
                        <image id="img-${boxID}" src="${logoURL}" style="width: 64px; height: 64px; margin-right: 16px">
                        ${name}
                    </h5>
                </button>
            </div>
        </li>`
    }

    return ({ templates, containers })
})()