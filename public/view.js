const v = () => {

    // For parsing cards (TODO get it out of here)
    
    // Returns HTML for a given card
    const getHTMLFor = card => {
        let cardBody = `<div style="text-align: center"><div class="card" style="width: 18rem;"><div class="card-header">
        <div class="delete-card-icon">
            <i class="fas fa-trash"></i>
        </div></div>`
        if (card.mediaType !== "text"){
            cardBody += `<img class="card-img-top" src="${card.resourceURL}">`
        }
        cardBody += `<div class="card-body"><h5 class="card-title">${card.title}</h5><p class="card-text">${card.text}</p></div></div></div>`

        return cardBody;
    }

    // Returns an array containing the HTML of each column in the main view as a string
    const loadCards = cards => {
        let cols = ["", "", ""]

        let index = 0

        cards.forEach(card => {
            cols[index%cols.length] += getHTMLFor(card.data())
            index++
        });

        return cols
    }

    const boxRepeat = boxes => {
        let pending = model.local('pendingBoxes')
        let result = ``
        if(boxes.length!==0) {
            boxes.forEach(box => {
                if (pending.includes(box.boxID)) {
                    result = `${result}
                    <li class="list-group-item">
                        <div class="row">
                            <button class="btn view-box-btn maxw col-8">
                                <h5 id="div-${box.boxID}">
                                    <image id="img-${box.boxID}" src="${box.logoURL}" style="width: 64px; height: 64px; margin-right: 16px">
                                    ${box.name}
                                </h5>
                                <button class="col-2 btn btn-primary btn-accept-invite" id="accept-${box.boxID}">Accept</button>
                                <button class="col-2 btn btn-danger btn-reject-invite" id="reject-${box.boxID}">Reject</button>
                            </button>
                        </div>
                    </li>`
                } else {
                    result = `${result}
                    <li class="list-group-item">
                        <div class="row">
                            <button class="btn view-box-btn maxw">
                                <h5 id="div-${box.boxID}">
                                    <image id="img-${box.boxID}" src="${box.logoURL}" style="width: 64px; height: 64px; margin-right: 16px">
                                    ${box.name}
                                </h5>
                            </button>
                        </div>
                    </li>`
                }
            })
        }
        return result
    }

    const viewBoxRepeat = boxes => {
        let result = ``
        if(boxes.length!==0) {
            boxes.forEach(box => {
                result = `${result}
                <li class="list-group-item view-box-btn">
                    <button class="btn maxw" style="text-align: center">
                        <div id="div-${box.boxID}">
                            <image id="img-${box.boxID}" src="${box.logoURL}" style="width: 64px; height: 64px""></image>
                            <br>
                            <span id="lab-${box.boxID}" class="time">${box.name}</span>
                        </div>
                    </button>
                </li>`
            })
        }
        return result
    }

    const views = {
        MID: $('#middle-container'),
        LEFT: $('#left-container'),
        RIGHT: $('#right-container')
    }

    return {
        auth: () => authView(views),
        selectShoeBox: () => selectShoeBoxView(views, boxRepeat),
        createShoeBox: () => createShoeBoxView(views),
        viewShoeBox: box => viewShoeBoxView(views, box, viewBoxRepeat, loadCards),
        inviteMember: () => inviteMemberView(views),
        profileModal: () => profileModalView(views),
        settingsModal: () => settingModalView(views),

    }
} 

const view = v()