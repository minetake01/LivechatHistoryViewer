//初期処理
(function start() {
    $('#panel-pages.yt-live-chat-renderer').before(livechatHistoryUI);
    $('#input-container.yt-live-chat-message-input-renderer').after(livechatHistoryIcon);
    $('body').prepend(contentMenu);
    $('body').prepend(categorySelectUI);
    $('body').prepend(cautionElement);
        
    const changeChat = new MutationObserver(function(){
        if (!$('#icon.live-chat-history-viewer').length) {
            $('#input-container.yt-live-chat-message-input-renderer').after(livechatHistoryIcon);
        };
    });

    changeChat.observe(document.getElementById('continuations'), {
        childList: true
    });
})();

//UIイベント処理
(function UIevent() {
    $('#panel-pages').on('click', '#icon.live-chat-history-viewer', function() {
        $('#contents.live-chat-history-viewer').toggleClass('opened');
    });
    $('#item-list, #buttons').click(function() {
        $('#contents.live-chat-history-viewer').removeClass('opened');
    });

    $('#tab-select-bar div').click(function(event) {
        updateContents(channelID(streamID()));
		$('.tab-selector').removeClass('active');
		$(event.target).addClass('active');

		$('.tab-content').removeClass('active');
		$('.tab-content').eq($(event.target).index()).addClass('active');
	});

    $(document).keydown(function(event) {
        switch (event.keyCode) {
            case 40:
                eventBlock(event);
                if (!$('.tab-content.active #chat-content.focused').length) {
                    $('.tab-content.active #chat-content:first').addClass('focused');
                } else {
                    $('.tab-content.active #chat-content.focused').next().addClass('focused');
                    $('.tab-content.active #chat-content.focused:first').removeClass('focused');
                };
                $('.tab-content.active > .chat-content').animate({scrollTop: $('.tab-content.active #chat-content.focused').position().top + $('.tab-content.active > .chat-content').scrollTop()}, 200);
            break;
            case 38:
                eventBlock(event);
                if (!$('.tab-content.active #chat-content.focused').length) {
                    $('.tab-content.active #chat-content:last').addClass('focused');
                } else {
                    $('.tab-content.active #chat-content.focused').prev().addClass('focused');
                    $('.tab-content.active #chat-content.focused:last').removeClass('focused');
                };
                $('.tab-content.active > .chat-content').animate({scrollTop: $('.tab-content.active #chat-content.focused').position().top + $('.tab-content.active > .chat-content').scrollTop()}, 200);
            break;
            case 9:
                eventBlock(event);
                if (!event.shiftKey) {
                    if (!$('.tab-content.active #chat-content.focused').length) {
                        $('.tab-content.active #chat-content:first').addClass('focused');
                    } else {
                        $('.tab-content.active #chat-content.focused').next().addClass('focused');
                        $('.tab-content.active #chat-content.focused:first').removeClass('focused');
                    };
                    $('.tab-content.active > .chat-content').animate({scrollTop: $('.tab-content.active #chat-content.focused').position().top + $('.tab-content.active > .chat-content').scrollTop()}, 200);
                } else {
                    if (!$('.tab-content.active #chat-content.focused').length) {
                        $('.tab-content.active #chat-content:last').addClass('focused');
                    } else {
                        $('.tab-content.active #chat-content.focused').prev().addClass('focused');
                        $('.tab-content.active #chat-content.focused:last').removeClass('focused');
                    };
                    $('.tab-content.active > .chat-content').animate({scrollTop: $('.tab-content.active #chat-content.focused').position().top + $('.tab-content.active > .chat-content').scrollTop()}, 200);
                };
            break;
            case 39:
                updateContents(channelID(streamID()));
                if ($('.tab-selector.active').next().length) {
                    $('.tab-selector.active').next().addClass('active');
                    $('.tab-selector.active:first').removeClass('active');
                    $('.tab-content.active').next().addClass('active');
                    $('.tab-content.active:first').removeClass('active');
                } else {
                    $('.tab-selector:first').addClass('active');
                    $('.tab-selector.active:last').removeClass('active');
                    $('.tab-content:first').addClass('active');
                    $('.tab-content.active:last').removeClass('active');
                };
            break;
            case 37:
                updateContents(channelID(streamID()));
                if ($('.tab-selector.active').prev().length) {
                    $('.tab-selector.active').prev().addClass('active');
                    $('.tab-selector.active:last').removeClass('active');
                    $('.tab-content.active').prev().addClass('active');
                    $('.tab-content.active:last').removeClass('active');
                } else {
                    $('.tab-selector:last').addClass('active');
                    $('.tab-selector.active:first').removeClass('active');
                    $('.tab-content:last').addClass('active');
                    $('.tab-content.active:first').removeClass('active');
                };
            break;
        };
    });
    $(document).click(function() {
        $('.tab-content.active #chat-content.focused').removeClass('focused');
    })

    $('#contents.live-chat-history-viewer').on('click', '#content-menu-icon', function(event) {
        currentContent = $(event.target).closest('#chat-content').children('#content').html();
        if ($(event.target).closest('#history-tab-content').length) {
            currentCategory = 'history';
        } else if ($(event.target).closest('#channel-tab-content').length) {
            currentCategory = 'channel';
        } else if ($(event.target).closest('#global-tab-content').length) {
            currentCategory = 'global';
        };

        if ($(event.target).closest('#history-content').length) {
            $('#entry-content').prop('hidden', false);
        } else {
            $('#entry-content').prop('hidden', true);
        };

        if ($('#menu-panel').attr('hidden') || $(event.target).offset().top !== $('#menu-panel').offset().top) {
            $('#menu-panel').css('top', $(event.target).offset().top);
            $('#menu-panel').prop('hidden', false);
            document.getElementById('tab-contents').addEventListener('mousewheel', eventBlock, {passive: false});
        } else {
            $('#menu-panel').prop('hidden', true);
            document.getElementById('tab-contents').removeEventListener('mousewheel', eventBlock, {passive: false});
        };
    });
    $(document).click(function(event) {
        if(!$(event.target).closest('#menu-panel').length && !$(event.target).closest('#chat-content').length) {
            $('#menu-panel').prop('hidden', true);
            document.getElementById('tab-contents').removeEventListener('mousewheel', eventBlock, {passive: false});
        };
    });

    $('#menu-panel.live-chat-history-menu').on('click', '#entry-content', function() {
        $('#menu-panel').prop('hidden', true);
        contentCheck(channelID(streamID()), currentContent);
        $('#category-select-dialog').prop('hidden', false);
    });
    $('#close-icon.live-chat-history-category-dialog, #background.live-chat-history-category-dialog').click(function() {
        $('#category-select-dialog').prop('hidden', true);
        $('input.live-chat-history-category-dialog').prop('checked', false);
    });
})();

(function background() {
    $('#button.yt-button-renderer').click(function() {
        if ($('div#input').html() != "") {
            let messageArray = {};
            messageArray.type = 'sendChat';
            messageArray.chatElement = $('div#input').html();

            sendBackground(messageArray);
            spamBlock();
        };
    });
    $('#input.yt-live-chat-text-input-field-renderer').keydown(function(event) {
        if ($('div#input').html() != "" && event.key === 'Enter') {
            let messageArray = {};
            messageArray.type = 'sendChat';
            messageArray.chatElement = $('div#input').html();

            sendBackground(messageArray);
            spamBlock();
        };
    });

    $('#channel-checkbox.live-chat-history-category-dialog').click(function(event) {
        if ($(event.target).prop('checked')) {
            channelID(streamID()).then(function(channelID) {
                let messageArray = {};
                messageArray.type = 'entryChannel';
                messageArray.channelID = channelID;
                messageArray.chatElement = currentContent;
    
                sendBackground(messageArray);
            });
        } else {
            channelID(streamID()).then(function(channelID) {
                let messageArray = {};
                messageArray.type = 'deleteChannel';
                messageArray.channelID = channelID;
                messageArray.chatElement = currentContent;
    
                sendBackground(messageArray);
            });
        };
    });
    $('#global-checkbox.live-chat-history-category-dialog').click(function(event) {
        if ($(event.target).prop('checked')) {
            let messageArray = {};
            messageArray.type = 'entryGlobal';
            messageArray.chatElement = currentContent;

            sendBackground(messageArray);
        } else {
            let messageArray = {};
            messageArray.type = 'deleteGlobal';
            messageArray.chatElement = currentContent;

            sendBackground(messageArray);
        };
    });
    $('#menu-panel.live-chat-history-menu').on('click', '#delete-content', function() {
        $('#menu-panel').prop('hidden', true);
        if (currentCategory === 'history') {
            let messageArray = {};
            messageArray.type = 'deleteHistory';
            messageArray.chatElement = currentContent;

            sendBackground(messageArray);
        } else if (currentCategory === 'channel') {
            channelID(streamID()).then(function(channelID) {
                let messageArray = {};
                messageArray.type = 'deleteChannel';
                messageArray.channelID = channelID;
                messageArray.chatElement = currentContent;
    
                sendBackground(messageArray);
            });
        } else if (currentCategory === 'global') {
            let messageArray = {};
            messageArray.type = 'deleteGlobal';
            messageArray.chatElement = currentContent;

            sendBackground(messageArray);
        };
    });
})();

(function main() {
    updateContents(channelID(streamID()));
    chrome.storage.onChanged.addListener(function() {
        updateContents(channelID(streamID()));
    });

    $('#contents.live-chat-history-viewer').on('click', '#content', function(event) {
        sendChat($(event.target).html());
    });
})();