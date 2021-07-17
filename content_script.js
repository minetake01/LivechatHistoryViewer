var chatHistoryField = (function(param) {return param[0].replace(/\n|\r/g, "");})`
<div id="chat-history" class="style-scope yt-live-chat-renderer">
	<div id="history-panel" class="style-scope yt-live-chat-renderer">
		<div id="tab-select-bar">
			<div id="history">チャットの履歴</div>
			<div id="channel-chat">チャンネル</div>
			<div id="global-chat">グローバル</div>
		</div>
	</div>
</div>`;

$('#contents > #panel-pages').before(chatHistoryField);

var form = document.getElementById('input')

form.addEventListener('focus', (event) => {
	console.log(event);
}, true);
form.addEventListener('blur', (event) => {
	console.log(event);
}, true);