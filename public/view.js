const v = ({templates, containers}) => {

    const boxRepeat = (boxes, shouldIncludePending) => {
        let pending = model.local('pendingBoxes'), result = ``
        
        if(boxes.length!==0) boxes.forEach(box => {
            if (pending.includes(box.boxID)) {
                if(shouldIncludePending)
                    result = `${result}${templates.pendingBox(box)}`

            } else result = `${result}${templates.notPendingBox(box)}`
        })
        return result
    }

    const loadCards = cards => {
        let count = 1, cardArr = []
        cards.forEach(card => {
            cardArr.push({data: card.data(), id: card.id})
            count++
        })

        const cols = ["", "", ""], getIDX = i => Math.floor((i*cols.length)/count)

        cardArr.forEach((card, i) => {
            cols[getIDX(i)] += templates.cards(card)
        })
        
        switch(cardArr.length) {
            case 0:
                return templates.placeholder()
            
            case 1:
                cols[1] += templates.addButton()
                return cols

            default:
                cols[2] += templates.addButton()
                return cols
        }
    }

    return {
        auth: () => authView(containers),
        selectShoeBox: () => selectShoeBoxView(containers, boxRepeat),
        createShoeBox: () => createShoeBoxView(containers),
        viewShoeBox: box => viewShoeBoxView(containers, box, boxRepeat, loadCards),
        inviteMember: () => inviteMemberView(containers),
        profileModal: () => profileModalView(containers),
        settingsModal: () => settingModalView(containers),
        createCard: () => createCardView(),
        editCard: cardID => editCardView(cardID)
    }
} 

const view = v(viewUtil)