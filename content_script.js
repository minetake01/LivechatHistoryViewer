//UIとアイコン追加
(function addHTML() {
	//UI追加
	const chatHistoryField = (function(param) {return param[0].replace(/\n|\r/g, "");})`
	<div id="chat-history" class="style-scope yt-live-chat-renderer">
		<div id="history-panel" class="style-scope yt-live-chat-renderer">
			<div id="close-button">×</div>
			<div id="tab-select-bar">
				<div id="history-selector" class="tab-selector active">チャットの履歴</div>
				<div id="game-chat-selector" class="tab-selector">ゲーム</div>
				<div id="channel-chat-selector" class="tab-selector">チャンネル</div>
				<div id="global-chat-selector" class="tab-selector">グローバル</div>
			</div>
			<div id="tabs">
				<div id="history-tab" class="tab-content active">
					<div id="history" class="chat-select-field"></div>
				</div>
				<div id="game-chat-tab" class="tab-content">
					<div id="game-chat" class="chat-select-field"></div>
				</div>
				<div id="channel-chat-tab" class="tab-content">
					<div id="channel-chat" class="chat-select-field"></div>
				</div>
				<div id="global-chat-tab" class="tab-content">
					<div id="global-chat" class="chat-select-field"></div>
				</div>
			</div>
		</div>
	</div>`;
	$('#contents > #panel-pages').before(chatHistoryField);

	//開閉アイコン追加
	const chatHistory_icon = '<svg version="1.1" id="chat-history-icon" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 512 512" style="width:20px;height:20px" xml:space="preserve"><g><path d="M497.753 215.156l-71.457-109.364c-11.07-16.928-29.93-27.152-50.169-27.152H135.872c-20.239 0-39.099 10.224-50.169 27.144L14.246 215.156A87.558 87.558 0 000 263.018v112.248a58.026 58.026 0 0017.017 41.077 57.991 57.991 0 0041.077 17.017h395.812a57.989 57.989 0 0041.076-17.017A58.025 58.025 0 00512 375.266V263.018a87.56 87.56 0 00-14.247-47.862zm-174.896 32.11l-1.588 4.884c-8.913 27.556-34.74 47.54-65.27 47.525-30.53.015-56.371-19.969-65.27-47.525l-1.588-4.884H37.795c1.423-4.494 3.401-8.816 6.007-12.808l71.441-109.357a24.654 24.654 0 0120.628-11.168h240.255a24.654 24.654 0 0120.628 11.168l71.441 109.357c2.607 3.992 4.584 8.314 6.007 12.808H322.857z"/></g></svg>';
	$('div#input-container').after(chatHistory_icon);
	const observer = new MutationObserver(function() {
		$('div#input-container').after(chatHistory_icon);
	});
	try {
		observer.observe(document.getElementsByClassName('ticker'), {attributes: true});
	} catch(e) {};

	//警告
	$('body').prepend('<div id="clickBlock" hidden><div id="spamBlockField"><div id="spamBlockMessage">チャットの連投を検知しました。</div><div id="spamBlockMessage2">短時間で大量のチャットを送信する行為は、配信者の方や他の視聴者の方に迷惑になる場合があります。</div></div></div>')
})();

//UI開閉
(function UI_OC() {
	$('#chat-history-icon').click(function() {
		$('#chat-history').toggleClass('opened');
		$('#chat-history-icon').toggleClass('active');
	});
	$('#item-list, #buttons, #close-button').click(function() {
		$('#chat-history').removeClass('opened');
		$('#chat-history-icon').removeClass('active');
	});
})();

//タブ切り替え
(function switchTabs() {
	$('#tab-select-bar div').click(function(event) {
		$('#tab-select-bar div').removeClass('active');
		$(event.target).addClass('active');

		$('.tab-content').removeClass('active');
		$('.tab-content').eq($(event.target).index()).addClass('active');
	});
})();

//送信したチャットを取得
(function getChat() {
	$('#send-button yt-icon-button#button').click(function() {
		if ($('div#input').html() != "") {
			spamBlock();
			toBackground($('div#input').html());
		};
	});
	$('div.style-scope yt-live-chat-text-input-field-renderer').keydown(function(event) {
		if (event.key === 'Enter') {
			spamBlock();
			toBackground($('div#input').html());
		};
	});
})();

//チャット送信
(function sendChat() {
	$('div#history').on('click', '#item.chat-selector', function(event) {
		let sendMessage = $(event.target).html();
		if ($('#input.yt-live-chat-text-input-field-renderer').html() === sendMessage) {
			$('#send-button yt-icon-button').click();
		} else {
		$('#input.yt-live-chat-text-input-field-renderer').html(sendMessage);
		document.querySelector('#input.yt-live-chat-text-input-field-renderer').dispatchEvent(new InputEvent('input'));
		};
	});
})();

//チャット追加
(function addChat() {
	getStorageData('#history.chat-select-field');
	chrome.storage.onChanged.addListener(function() {
		getStorageData('#history.chat-select-field');
	});
})();

//ストレージからデータ取得
let itemElement;
function getStorageData(target) {
	$(target).empty();
	chrome.storage.sync.get({historyArray: []}, function(value) {
		historyArray = value.historyArray;
		historyArray.forEach(function(item) {
			itemElement = (function(param) {return param[0].replace(/\n|\r/g, "");})`
				<div class="chat-selector">
					<div id="item" class="chat-selector">` + item + `</div>
					<div id="menu" class="chat-selector">
						<svg version="1.1" id="menu" class="chat-selector" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 512 512" style="width:16px;height:16px" xml:space="preserve"><g><circle cx="256" cy="55.091" r="55.091"/><circle cx="256" cy="256" r="55.091"/><circle cx="256" cy="456.909" r="55.091"/></g></svg>
					</div>
				</div>
			`;
			$(target).append(itemElement);
		});
	});
};

//backgroundページに送信
function toBackground(message) {
	//埋め込みページかポップアウトされているかの判定と、IDの取得。
	let livechatType;
	let streamID;
	if (window === window.parent) {
		livechatType = 'popout'
		streamID = location.search.replace('?is_popout=1&v=', '');
	} else {
		livechatType = 'iframe'
		streamID = streamID = location.search.replace('?continuation=', '');
	};

	chrome.runtime.sendMessage({
		livechatType: livechatType,
		streamID: streamID,
		chatElement: message
	});
};

let clicktime = 0
function spamBlock() {
	clicktime += 1
	if (clicktime == 1) {
		setTimeout(function(){clicktime = 0}, 60000);
	} else if (clicktime >= 6) {
		$('#clickBlock').removeAttr('hidden');
		setTimeout(function(){$('#clickBlock').prop('hidden', true)}, 60000);
	};
};