var chatHistoryField = (function(param) {return param[0].replace(/\n|\r/g, "");})`
<div id="chat-history" class="style-scope yt-live-chat-renderer">
	<div id="history-panel" class="style-scope yt-live-chat-renderer">
		<div id="close-button">×</div>
		<div id="tab-select-bar">
			<div id="history-selecter" class="tab-selecter active">チャットの履歴</div>
			<div id="channel-chat-selecter" class="tab-selecter">チャンネル</div>
			<div id="global-chat-selecter" class="tab-selecter">グローバル</div>
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

var chatHistoryIcon = '<svg version="1.1" id="chat-history-icon" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 512 512" style="width:20px;height:20px" xml:space="preserve"><g><path d="M497.753 215.156l-71.457-109.364c-11.07-16.928-29.93-27.152-50.169-27.152H135.872c-20.239 0-39.099 10.224-50.169 27.144L14.246 215.156A87.558 87.558 0 000 263.018v112.248a58.026 58.026 0 0017.017 41.077 57.991 57.991 0 0041.077 17.017h395.812a57.989 57.989 0 0041.076-17.017A58.025 58.025 0 00512 375.266V263.018a87.56 87.56 0 00-14.247-47.862zm-174.896 32.11l-1.588 4.884c-8.913 27.556-34.74 47.54-65.27 47.525-30.53.015-56.371-19.969-65.27-47.525l-1.588-4.884H37.795c1.423-4.494 3.401-8.816 6.007-12.808l71.441-109.357a24.654 24.654 0 0120.628-11.168h240.255a24.654 24.654 0 0120.628 11.168l71.441 109.357c2.607 3.992 4.584 8.314 6.007 12.808H322.857z"/></g></svg>';

$('div#input-container').after(chatHistoryIcon);

$('#contents > #panel-pages').before(chatHistoryField);

var icon = document.getElementById('chat-history-icon');
var itemList = document.getElementById('item-list');
var buttons = document.getElementById('buttons');
var closeButton = document.getElementById('close-button');

var toggleIcon = false;
icon.addEventListener('click', (event) => {
	if (toggleIcon == false) {
		$('#chat-history').animate({'height': '150px'}, 200, 'swing');
		$('svg#chat-history-icon').addClass('active');
		toggleIcon = true;
	} else {
		$('#chat-history').animate({'height': '0px'}, 200, 'swing');
		$('svg#chat-history-icon').removeClass('active');
		toggleIcon = false;
	}
}, true);
itemList.addEventListener('click', (event) => {
	$('#chat-history').animate({'height': '0px'}, 200, 'swing');
	$('svg#chat-history-icon').removeClass('active');
});
buttons.addEventListener('click', (event) => {
	$('#chat-history').animate({'height': '0px'}, 200, 'swing');
	$('svg#chat-history-icon').removeClass('active');
});
closeButton.addEventListener('click', (event) => {
	$('#chat-history').animate({'height': '0px'}, 200, 'swing');
	$('svg#chat-history-icon').removeClass('active');
});

$('#tab-select-bar div').click(function() {
	$('#tab-select-bar div').removeClass('active');
	$(this).addClass('active');
	var index = $(this).index();

	$('.tab-content').removeClass('active');
	$('.tab-content').eq(index).addClass('active');
});