//初期処理
(function start() {
    $('#panel-pages').before(livechatHistoryUI);
    $('#input-container').after(livechatHistoryIcon);
    $('body').prepend(categorySelectUI);
    $('body').prepend(cautionElement);

    const observer = new MutationObserver(records => {
        if (!$('#icon.live-chat-history-viewer').length) {
            $('#input-container').after(livechatHistoryIcon);
        };
    });

    observer.observe(document.getElementById('continuations'), {
        childList: true
    });
})();

//UIイベント処理
(function UIevent() {
    $('#icon.live-chat-history-viewer').click(function() {
        $('#contents.live-chat-history-viewer').toggleClass('opened');
    });
    $('#item-list, #buttons').click(function() {
        $('#contents.live-chat-history-viewer').removeClass('opened');
    })

    $('#tab-select-bar div').click(function(event) {
		$('.tab-selector').removeClass('active');
		$(event.target).addClass('active');

		$('.tab-content').removeClass('active');
		$('.tab-content').eq($(event.target).index()).addClass('active');

        updateContents(channelID(streamID()));
	});

    $('#contents.live-chat-history-viewer').on('click', '#content-menu-icon', function(event) {
        currentContent = $(event.target).closest('#chat-content').children('#content').html();
        $('#menu-panel.opened').not($(event.target).next()).removeClass('opened');
		$(event.target).next().toggleClass('opened');
    });
    $(document).click(function(event) {
        if(!$(event.target).closest('#content-menu').length) {
            $('#menu-panel.opened').removeClass('opened');
        };
    });

    $('#contents.live-chat-history-viewer').on('click', '#entry-content', function(event) {
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
        };
    });
    $('#input.yt-live-chat-text-input-field-renderer').keydown(function(event) {
        if ($('div#input').html() != "" && event.key === 'Enter') {
            let messageArray = {};
            messageArray.type = 'sendChat';
            messageArray.chatElement = $('div#input').html();

            sendBackground(messageArray);
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
    $('#contents.live-chat-history-viewer').on('click', '#delete-content', function(event) {
        if ($(event.target).closest('#history-tab-content').length) {
            let messageArray = {};
            messageArray.type = 'deleteHistory';
            messageArray.chatElement = currentContent;

            sendBackground(messageArray);
        } else if ($(event.target).closest('#channel-tab-content').length) {
            channelID(streamID()).then(function(channelID) {
                let messageArray = {};
                messageArray.type = 'deleteChannel';
                messageArray.channelID = channelID;
                messageArray.chatElement = currentContent;
    
                sendBackground(messageArray);
            });
        } else if ($(event.target).closest('#global-tab-content').length) {
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