(() => {
    const LEFT = $("#left-container")
    const RIGHT = $("#right-container")
    const MID = $("#middle-container")
    const OUT = $("#outer-midddle-container")
    const CHAT_BTN = $('#chat-btn')

    const hide = arr => arr.map(e => e.hide())
    const show = arr => arr.map(e => e.show())

    const mediaCheck = () => {
        // banner
        if($(window).width() < 768) {
            console.log("SMALL:", $(window).width())
    
            hide([RIGHT, LEFT])
            CHAT_BTN.show()
        }
        // desktop
        else {
            console.log("BIG:", $(window).width())
            show([LEFT, RIGHT])
            CHAT_BTN.hide()
    
        }
    }
    
    // init and watch
    mediaCheck()
    $(window).resize(mediaCheck)
    
    $('#chat-btn').click(() => {
        if(!RIGHT.is(':visible')) {
            hide([MID, OUT, LEFT])
            RIGHT.show()
            $("html, body").animate({ scrollTop: $(document).height() }, "slow")
        } else {
            mediaCheck()
        }
    })

        
    $('#bar-menu').click(() => {
        if(!LEFT.is(':visible')) {
            hide([MID, OUT, RIGHT])
            LEFT.show()
            $("html, body").animate({ scrollTop: $(document).height() }, "slow")
        } else {
            mediaCheck()
        }
    })
})()