const viewGlobal = {
    mediaCheck: (({containers: {MID, LEFT, RIGHT, WINDOW, BANNER, CHAT_BTN, BAR_MENU}}) => {
        const hide = (arr, speed) => arr.forEach(e => e.hide(speed))
        const show = (arr, speed) => arr.forEach(e => e.show(speed))
        const shown = container => container.is(':visible')
        const textIsFocus = () => $(document.activeElement).prop('type') !== 'text'

        let currentWidth = 0 // closure
    
        const mediaCheck = override => {
            const WIDTH = WINDOW.width()
            if(override || (currentWidth!==WIDTH && textIsFocus())) {
                // banner
                if(WIDTH < 768) {
                    hide([RIGHT, LEFT], 'fast')
                    show([CHAT_BTN, MID], 'fast')
                }
                // desktop
                else {

                    // before view shoebox
                    if(BANNER.css('visibility')==="hidden") { // shown(BANNER) will not work
                        MID.css({'padding-left': '0'}).attr('class', 'col-md-6')

                        show([LEFT, RIGHT, MID], 'fast')
                        hide([CHAT_BTN, BAR_MENU], 'fast')

                    // after view shoebox
                    } else {
                        console.log("HERE")
                        MID.css({'padding-left': '40px'}).attr('class', 'col-md-9')

                        show([RIGHT, MID, BAR_MENU], 'fast')
                        hide([CHAT_BTN, LEFT], 'fast')
                    }
                }
            currentWidth = WIDTH
            }
        }
        
        // init and watch
        mediaCheck()

        // resize listener if not mobile
        if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(navigator.userAgent) ) {
            WINDOW.resize(mediaCheck)
        }
    
        BANNER.click(({target: {id}}) => {
            if(!id.includes(`-banner`)) {
                if(!shown(MID)) {
                    show([MID], 'fast')
                    hide([RIGHT, LEFT], 'fast')
                } else if(shown(LEFT) && shown(MID) && !shown(RIGHT)) {
                    mediaCheck(true)
                }
            }
        })
        
        CHAT_BTN.click(() => {
            if(!shown(RIGHT)) {
                hide([MID, LEFT], 'fast')
                show([RIGHT], 'fast')

                // scroll to bottom
                chatGlobal.toBottom()
                $("html, body").animate({ scrollTop: $(document).height() }, "slow")
            } else {
                mediaCheck(true)
            }
        })
    
            
        BAR_MENU.click(() => {
            if(!shown(LEFT)) {
                hide([RIGHT], 'fast')
                show([LEFT], 'fast')

            } else mediaCheck(true)
        })
        return mediaCheck
    })(viewUtil),
    showBanner: (() => $("#banner").hide().css({'visibility': 'visible'}).show('slow')),
    switchBoxLogo: url => $('#box-pic').hide('fast').attr('src', url).show('fast')
}