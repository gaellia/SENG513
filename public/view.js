const v = () => {
    
    // Returns HTML for a given card
    const getHTMLFor = {
        cards: card => {
            let cardBody = `<button id="cardButton" class="btn" data-toggle="modal" data-target="#modal-container" value="${card.id}"><div class="card" style="width: 18rem;">`
            if (card.mediaType !== "text"){
                cardBody += `<img class="card-img-top" src="${card.resourceURL}">`
            }
            cardBody += `<div class="card-body"><h5 class="card-title">${card.title}</h5><p class="card-text">${card.text}</p></div></div></button>`
    
            return cardBody;
        },
        placeholder: () => [``, `
            <div style="text-align: center">
                <div class="card" style="width: 18rem;">
                    <div class="card-header"></div>
                    <div class="card-body">
                        <h5 class="card-title">Your cards will go here</h5>
                        <p class="card-text">Post the first card in this shoebox!</p>
                        <button id="addButton" class="btn btn-lg btn-light" style="width:100%"  data-toggle="modal" data-target="#modal-container">
                            <h1 style="font-size: 5rem">
                                <i class="fas fa-plus"></i>
                            </h1>
                        </button>
                    </div>
                </div>
            </div>`, ``],

        addButton: () => `
            <div style="text-align: center">
                <div class="card" style="width: 18rem;">
                    <div class="card-body" style="padding: 0!important">
                        <button id="addButton" style="width: 100%; height: 18rem; margin:0" class="btn btn-light"  data-toggle="modal" data-target="#modal-container">
                            <h1 style="font-size: 7rem">
                                <i class="fas fa-plus"></i>
                            </h1>
                        </button>
                    </div>
                </div>
            </div>
        `
    }

    // Returns an array containing the HTML of each column in the main view as a string
    const loadCards = cards => {
        let cols = ["", "", ""]

        let index = 0

        cards.forEach(card => {
            cols[index%cols.length] += getHTMLFor.cards(card.data())
            index++
        })
        cols[(index+1)%cols.length] += getHTMLFor.addButton()

        return index===0? getHTMLFor.placeholder(): cols
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
                            <div class="btn maxw col-8">
                                <h5 id="div-${box.boxID}">
                                    <image id="img-${box.boxID}" src="${box.logoURL}" style="width: 64px; height: 64px; margin-right: 16px">
                                    ${box.name}
                                </h5>
                            </div>
                            <button class="col-2 btn btn-primary btn-accept-invite" id="accept-${box.boxID}">Accept</button>
                            <button class="col-2 btn btn-danger btn-reject-invite" id="reject-${box.boxID}">Reject</button>
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
        createCard: () => createCardView(),
        editCard: () => editCardView()
    }
} 

const view = v()