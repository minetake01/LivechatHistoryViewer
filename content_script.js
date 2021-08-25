//UIとアイコン追加
(function addHTML() {
	//UI追加
	const chatHistoryField = (function(param) {return param[0].replace(/\n|\r/g, "");})`
	<div id="chat-history" class="style-scope yt-live-chat-renderer">
		<div id="history-panel" class="style-scope yt-live-chat-renderer">
			<div id="close-button" class="chat-history">×</div>
			<div id="tab-select-bar">
				<div id="history-selector" class="tab-selector active">チャットの履歴</div>
				<div id="channel-chat-selector" class="tab-selector">チャンネル</div>
				<div id="global-chat-selector" class="tab-selector">グローバル</div>
			</div>
			<div id="tabs">
				<div id="history-tab" class="tab-content active">
					<div id="history" class="chat-select-field"></div>
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
    //上位チャット切り替え時に再追加
	const observer = new MutationObserver(function() {
		$('div#input-container').after(chatHistory_icon);
	});
	try {
		observer.observe(document.getElementsByClassName('ticker'), {attributes: true});
	} catch(e) {};

	//登録カテゴリー選択画面追加
	const categorySelectField = (function(param) {return param[0].replace(/\n|\r/g, "");})`
		<div id="category-select-background" hidden>
			<div id="category-select-field">
				<div id="category-selector-headder">
					<div id="category-select" class="category-selector-headder">登録先…</div>
					<div id="close-button">×</div>
				</div>
				<div id="category-selector-checkbox">
					<input type="checkbox" name="category-selector-input" id="input-channel">
					<label for="input-channel" class="category-selector-input">チャンネル</label>
					<input type="checkbox" name="category-selector-input" id="input-global">
					<label for="input-global" class="category-selector-input">グローバル</label>
				</div>
			</div>
		</div>
	`;
	$('body').prepend(categorySelectField)

	//警告
	$('body').prepend('<div id="clickBlock" hidden><div id="spamBlockField"><div id="spamBlockMessage">チャットの連投を検知しました。</div><div id="spamBlockMessage2">短時間で大量のチャットを送信する行為は、配信者の方や他の視聴者の方に迷惑になる場合があります。</div></div></div>')
})();

//UI開閉
(function UI_OC() {
	$('#chat-history-icon').click(function() {
		$('#chat-history').toggleClass('opened');
		$('#chat-history-icon').toggleClass('active');
		$('#menu-panel.chat-selector').removeClass('opened');
	});
	$('#item-list, #buttons, #close-button.chat-history').click(function() {
		$('#chat-history').removeClass('opened');
		$('#chat-history-icon').removeClass('active');
		$('#menu-panel.chat-selector').removeClass('opened');
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
		if ($('div#input').html() != "" && event.key === 'Enter') {
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

//メニュー
(function viewMenu() {
	$('div#history').on('click', '#menu-icon.chat-selector', function(event) {
		$('#menu-panel.chat-selector').not($(event.target).next()).removeClass('opened');
		$(event.target).next().toggleClass('opened');
		noscroll_toggle();
	});
	$('div#history-panel').on('click', '#tab-select-bar', function() {
		$('#menu-panel.chat-selector').removeClass('opened');
		document.removeEventListener("wheel", notscroll, { passive: false });
	});
})();

//登録先選択画面表示
(function viewCategorySelector() {
	$('div#history').on('click', '#entry-chat-button', function(event) {
		$('#category-select-background').removeAttr('hidden');
	});
	$('#category-select-background').on('click', function(event) {
		if (!$(event.target).closest('#category-select-field').length) {
			$('#category-select-background').prop('hidden', true)
		};
	});
	$('#close-button').click(function(event) {
		$('#category-select-background').prop('hidden', true)
	});
})();

//ストレージからデータ取得
function getStorageData(target) {
	$(target).empty();
	chrome.storage.sync.get({historyArray: []}, function(value) {
		historyArray = value.historyArray;
		let itemElement;
		historyArray.forEach(function(item) {
			itemElement = (function(param) {return param[0].replace(/\n|\r/g, "");})`
				<div class="chat-selector">
					<div id="item" class="chat-selector">` + item + `</div>
					<div id="menu" class="chat-selector">
						<div id="menu-icon" class="chat-selector">
							<svg version="1.1" id="menu-icon" class="chat-selector" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 512 512" style="width:18px;height:18px" xml:space="preserve"><g><circle cx="256" cy="55.091" r="55.091"/><circle cx="256" cy="256" r="55.091"/><circle cx="256" cy="456.909" r="55.091"/></g></svg>
						</div>
						<div id="menu-panel" class="chat-selector">
							<div id="entry-chat-button" class="menu-selector">
								<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" class="menu-icon" style="pointer-events: none; display: block; width: 28px; height: 28px;"><g class="style-scope yt-icon"><path d="M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z" class="style-scope yt-icon"></path></g></svg>
								<p id="entry-chat-selector" class="menu">登録する</p>
							</div>
							<div id="delete-chat-button" class="menu-selector">
								<svg version="1.1" id="delete-chat-icon" class="menu-icon" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 512 512" style="width:20px;height:20px;padding-top:2px;padding-bottom:6px;padding-left:0px;padding-right:8px" xml:space="preserve"><g><path class="st0" d="M94.296 463.359C95.853 490.118 119.045 512 145.837 512h218.3c26.792 0 49.992-21.882 51.55-48.641l17.746-306.165H76.542l17.754 306.165zM433.696 80.591c-5.446-2.34-52.875-19.6-124.124-26.059.009-.322.026-.634.026-.948C309.589 23.983 285.597 0 256.004 0c-29.602 0-53.592 23.983-53.6 53.584 0 .313.017.626.024.948C131.18 60.991 83.734 78.251 78.297 80.591c-9.491 4.07-10.851 9.491-10.851 17.63v35.278h377.108V98.221c0-8.139-1.359-13.56-10.858-17.63zm-177.7-28.489c-7.909 0-15.612.173-23.142.47.56-12.326 10.685-22.154 23.15-22.17 12.457.016 22.583 9.844 23.143 22.17a584.486 584.486 0 00-23.151-.47z"/></g></svg>
								<p id="delete-chat" class="menu">削除</p>
							</div>
						</div>
					</div>
				</div>
			`;
			$(target).append(itemElement);
		});
	});
};

//backgroundページに送信
let toBackgroundPort = chrome.runtime.connect();
function toBackground(message) {
	let streamID;
	if (window === window.parent) {
		streamID = location.search.replace('?is_popout=1&v=', '');
	} else {
		streamID = location.search.replace('?continuation=', '');
	};

	toBackgroundPort.postMessage({
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

// スクロール禁止
let noscroll_count = 0;
function noscroll_toggle() {
	if (noscroll_count === 0) {
		noscroll_count++;
		document.addEventListener("wheel", notscroll, { passive: false });
	} else {
		noscroll_count--;
		document.removeEventListener("wheel", notscroll, { passive: false });
	}
}

// スクロール禁止関数
function notscroll(e) {
	e.preventDefault();
}