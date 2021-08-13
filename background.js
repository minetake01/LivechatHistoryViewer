(function main() {
    chrome.runtime.onMessage.addListener(function (input) {
        console.log(input.livechatType);    //チャットページがポップアップされているかiframeか
        console.log(input.chatElement);    //送信したチャットの要素
        console.log(input.streamID);    //配信ID
        console.log(input.livechatID);  //チャットID
        console.log(input.channelID);   //チャンネルID
        console.log(input.gameChannelID);   //ゲームチャンネルID
        
        history(input.chatElement);
    });
})();

//履歴データをストレージに保存
let historyArray = [];
function history(chatElement) {
    var maxMemHistory = 10

    try {
        chrome.storage.sync.get({historyArray: []}, function(value) {
            historyArray = value.historyArray;

            historyArray.forEach(function(history, index) {
                if (history === chatElement) {
                    historyArray.splice(index, 1);
                };
            });
            historyArray.unshift(chatElement);
            if (historyArray.length > maxMemHistory) {
                historyArray.length = maxMemHistory;
            };
            chrome.storage.sync.set({'historyArray': historyArray});
        });
    } catch (e) {
        console.log(e);
    };
};