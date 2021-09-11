let historyArray = [];
let channelArray = [];
let globalArray = [];

let maxMemHistory = 10;

(function main() {
    chrome.runtime.onConnect.addListener(function(port) {
        port.onMessage.addListener(function(event) {
            console.log(event);
            switch (event.type) {
                case 'sendChat':
                    chrome.storage.sync.get({historyArray: []}, function(value) {
                        historyArray = value.historyArray;

                        historyArray.forEach(function(history, index) {
                            if (history === event.chatElement) {
                                historyArray.splice(index, 1);
                            };
                        });
                        historyArray.unshift(event.chatElement);
                        if (historyArray.length > maxMemHistory) {
                            historyArray.length = maxMemHistory;
                        };
                        chrome.storage.sync.set({'historyArray': historyArray});
                    });
                break;
                case 'getChannelID':
                    requestChannelID(event.streamID).then(function(result) {
                        let messageArray = {};
                        messageArray.type = 'responseChannelID';
                        messageArray.channelID = result;
                        port.postMessage(messageArray);
                    });
                break;
                case 'entryChannel':
                    chrome.storage.sync.get({[event.channelID]: []}, function(value) {
                        channelArray = value[event.channelID];
                        channelArray.unshift(event.chatElement);
                        chrome.storage.sync.set({[event.channelID]: channelArray});
                    });
                break;
                case 'entryGlobal':
                    chrome.storage.sync.get({globalArray: []}, function(value) {
                        globalArray = value.globalArray;
                        globalArray.unshift(event.chatElement);
                        chrome.storage.sync.set({globalArray: globalArray});
                    });
                break;
                case 'deleteHistory':
                    chrome.storage.sync.get({historyArray: []}, function(value) {
                        historyArray = value.historyArray;
                        let index  = historyArray.indexOf(event.chatElement);
                        if (index > -1) {
                            historyArray.splice(index, 1);
                        };
                        chrome.storage.sync.set({historyArray: historyArray});
                    });
                break;
                case 'deleteChannel':
                    chrome.storage.sync.get({[event.channelID]: []}, function(value) {
                        channelArray = value[event.channelID];
                        let index  = channelArray.indexOf(event.chatElement);
                        if (index > -1) {
                            channelArray.splice(index, 1);
                        };
                        chrome.storage.sync.set({[event.channelID]: channelArray});
                    });
                break;
                case 'deleteGlobal':
                    chrome.storage.sync.get({globalArray: []}, function(value) {
                        globalArray = value.globalArray;
                        let index  = globalArray.indexOf(event.chatElement);
                        if (index > -1) {
                            globalArray.splice(index, 1);
                        };
                        chrome.storage.sync.set({globalArray: globalArray});
                    });
                break;
            };
        });
    });
})();

function requestChannelID(streamID) {
    return new Promise(resolve => {
        chrome.tabs.query({url: 'https://www.youtube.com/watch*'}, function(tabs) {
            tabs.forEach(function(tab){
                let toGetterPort = chrome.tabs.connect(tab.id);
                toGetterPort.postMessage({getStreamDetail: 'get'});
                
                toGetterPort.onMessage.addListener(function(response) {
                    if (streamID === response.getter_streamID) {
                        resolve(response.getter_channelID);
                    } else {
                        reject();
                    };
                });
            });
        });
    });
};