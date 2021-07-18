var chatHistoryField = (function(param) {return param[0].replace(/\n|\r/g, "");})`
<div id="chat-history" class="style-scope yt-live-chat-renderer">
	<div id="history-panel" class="style-scope yt-live-chat-renderer">
		<div id="close-button">×</div>
		<div id="tab-selecter">
			<div id="tab-select-bar">
				<div id="history tab-select">チャットの履歴</div>
				<div id="channel-chat tab-select">チャンネル</div>
				<div id="global-chat tab-select">グローバル</div>
			</div>
		</div>
		<div id="tabs">
			<div id="history-tab">history</div>
			<div id="channel-chat-tab">channel-chat</div>
			<div id="global-chat-tab">global-chat</div>
	</div>
</div>`;

$('#contents > #panel-pages').before(chatHistoryField);

var form = document.getElementById('input');
var itemList = document.getElementById('item-list');
var closeButton = document.getElementById('close-button');

form.addEventListener('focus', (event) => {
	$('#chat-history').animate({'height': '200px'}, 200);
}, true);
itemList.addEventListener('click', (event) => {
	$('#chat-history').animate({'height': '0px'}, 200);
});
closeButton.addEventListener('click', (event) => {
	$('#chat-history').animate({'height': '0px'}, 200);
});

var tabSelectBar = document.getElementById('tab-select-bar');

tabSelectBar.addEventListener('click', (event) => {
	switch(event.target.getAttribute('id')) {
		case 'history tab-select':

		break;
		case 'channel-chat tab-select':

		break;
		case 'global-chat tab-select':

		break;
	};
});