/////////////////////////////////////デバッグ用/////////////////////////////////////
function DevTools(tool, input) {
	switch (tool) {
		case 'log':
			console.log(input);
		break;
		case 'type':
			console.log(Object.prototype.toString.call(input));
		break;
	};
};
/////////////////////////////////////デバッグ用/////////////////////////////////////

///////////////////////////////////////本文///////////////////////////////////////
(function main() {
	format();

	$('#item-scroller').append('<div id="item-offset-plugin" class="style-scope yt-live-chat-item-list-renderer"></div>');	//拡張チャット欄の生成
	$('#item-offset-plugin').append('<div id="items-plugin" class="style-scope yt-live-chat-item-list-renderer"></div>');	//拡張チャット欄の生成

	HElement_item_offset = document.getElementById('item-offset');
	HElement_item_scroller = document.getElementById('item-scroller');
	HElement_items_plugin = document.getElementById('items-plugin');

	//表示するチャットの数だけ要素を追加
	createChatSpace();

	//元々あったチャットを表示
	var ChatList = HElement_item_offset.querySelectorAll('yt-live-chat-text-message-renderer');
	ChatList.forEach(Chat => {
		appendChat(Chat);
	});

	//新しいチャットを表示
	var observeElement = HElement_item_offset.firstElementChild;
	var observer = new MutationObserver(NewChatObject => {
		NewChatObject.forEach(NewChatList => {
			for (var i = 0; i < NewChatList.addedNodes.length; i++) {
				appendChat(NewChatList.addedNodes[i]);
				format();
			};
		});
	});
	observer.observe(observeElement, {
		childList: true
	});

})();

//リロード時にフレーム再読み込み
(function reloadAtResize() {
	$(window).resize(function() {
		location.reload();
	});
})();


//CSS初期化
function format() {
	//$('#item-scroller').css('overflow-y', 'clip')

	$('yt-live-chat-text-message-renderer').css({'height': '23px', "padding-top": "5px", "padding-bottom": "5px"});	//コメントのCSSを設定

	$('yt-live-chat-paid-message-renderer').css('display', 'none');	//スパチャ非表示

	$('yt-live-chat-viewer-engagement-message-renderer').remove();	//最初に表示されるアレを削除する。

	$('#item-offset').css('display', 'none');	//既存のチャット欄非表示

	$('#show-more').remove();	//下までスクロールするやつ削除
};

//表示するチャットの数だけ要素を生成
function createChatSpace() {
	var MaxViewChat = Math.floor(HElement_item_scroller.clientHeight / 33);
	for (var n = 1; n <= MaxViewChat; n++) {
		$('#items-plugin').append('<div></div>')
	};
};

//要素を更新
var chatNum = 0;
function appendChat(node) {
	var MaxViewChat = Math.floor(HElement_item_scroller.clientHeight / 33);
	var pluginChat = HElement_items_plugin.childNodes;

	if (chatNum < MaxViewChat-1) {
		chatNum++
	} else {
		chatNum = 0;
	};
	$('#items-plugin yt-live-chat-text-message-renderer').eq(chatNum).css('opacity', 1);
	HElement_items_plugin.replaceChild(node, pluginChat.item(chatNum));
	$('#items-plugin yt-live-chat-text-message-renderer').eq(chatNum+1).css('opacity', 0.5);
	$('#items-plugin yt-live-chat-text-message-renderer').eq(chatNum+2).css('opacity', 0.8);
};