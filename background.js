(function main() {
    chrome.runtime.onConnect.addListener(function (port) {
        port.onMessage.addListener(function(input) {
            console.log('category     = ' + input.category); //登録するカテゴリ
            console.log('chatElement  = ' + input.chatElement);    //送信したチャットの要素
            console.log('streamID     = ' + input.streamID);    //配信ID
            
            history(input.chatElement);

            getChannelID(input.streamID).then(function(result) {
                console.log(result);
            });

            switch (input.category) {
                case 'channel':

                break;
                case 'global':

                break;
            };
        });
    })
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

//チャットを登録
function entryChat(category, chatElement) {

};

async function getChannelID(streamID) {
    function msgListener(streamID) {
        return new Promise(resolve => {
            chrome.tabs.query({url: 'https://www.youtube.com/watch*'}, function(tabs) {
                tabs.forEach(function(tab){
                    let toGetterPort = chrome.tabs.connect(tab.id);
                    toGetterPort.postMessage({getStreamDetail: 'get'});
                    
                    toGetterPort.onMessage.addListener(function(response) {
                        if (streamID === response.getter_streamID || streamID === response.getter_livechatID) {
                            resolve(response.getter_channelID);
                        } else {
                            resolve(false);
                        };
                    });
                });
            });
        });
    };
    let result = await msgListener(streamID);

    return result;
};