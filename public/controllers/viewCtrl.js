const viewGlobal = {
    mediaCheck: (() => {
        const LEFT = $("#left-container")
        const RIGHT = $("#right-container")
        const MID = $("#middle-container")
        const CHAT_BTN = $('#chat-btn-banner')
        const BAR_MENU = $('#bar-menu-banner')
        const WINDOW = $(window)
        const BANNER = $("#banner")
        
        const hide = (arr, speed) => arr.forEach(e => e.hide(speed))
        const show = (arr, speed) => arr.forEach(e => e.show(speed))

        let currentWidth = 0 // closure
    
        const mediaCheck = () => {
            if(currentWidth!==WINDOW.width()) {
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
            currentWidth = WINDOW.width()
            }
        }
        
        // init and watch
        mediaCheck()

        // resize listener if not mobile
        if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            WINDOW.resize(mediaCheck)
        }
    
        BANNER.click(({target: {id}}) => {
            if(!MID.is(':visible') && !id.includes('-banner')) {
                show([MID])
                hide([RIGHT, LEFT], 'fast')
            }
        })
        
        CHAT_BTN.click(() => {
            if(!RIGHT.is(':visible')) {
                hide([MID, LEFT], 'fast')
                show([RIGHT], 'fast')
                // scroll to bottom
                chatGlobal.toBottom()
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
        return mediaCheck
    })()
}