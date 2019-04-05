(() => {
    const LEFT = $("#left-container")
    const RIGHT = $("#right-container")
    const MID = $("#middle-container")
    const CHAT_BTN = $('#chat-btn')
    const BAR_MENU = $('#bar-menu')
    const WINDOW = $(window)
    const BANNER = $("#banner")

    const hide = (arr, speed) => arr.forEach(e => e.hide(speed))
    const show = (arr, speed) => arr.forEach(e => e.show(speed))

    const mediaCheck = () => {
        // banner
        if(WINDOW.width() < 768) {
            hide([RIGHT, LEFT], 'fast')
            show([CHAT_BTN, MID, BAR_MENU], 'fast')
        }
        // desktop
        else {
            show([LEFT, RIGHT, MID], 'fast')
            hide([CHAT_BTN, BAR_MENU], 'fast')
    
        }
    }
    
    // init and watch
    mediaCheck()
    WINDOW.resize(mediaCheck)

    BANNER.click(() => {
        if(!MID.is(':visible')) {
            show([MID])
            hide([RIGHT, LEFT], 'fast')
        }
    })
    
    CHAT_BTN.click(() => {
        if(!RIGHT.is(':visible')) {
            hide([MID, LEFT], 'fast')
            show([RIGHT], 'fast')
            $("html, body").animate({ scrollTop: $(document).height() }, "slow")
        } else {
            mediaCheck()
        }
    })

        
    BAR_MENU.click(() => {
        if(!LEFT.is(':visible')) {
            hide([MID, RIGHT], 'fast')
            show([LEFT], 'fast')
        } else {
            mediaCheck()
        }
    })
})()