$('iframe').on('load', function() {
    chrome.runtime.onConnect.addListener(function(port) {
        port.onMessage.addListener(function(request) {
            if (request.getStreamDetail === 'get') {
                console.log('get')
                let streamID = location.search.replace('?v=', '');
                let livechatID = $('iframe').attr('src').replace('/live_chat?continuation=', '');
                let channelID = $('#text > a.yt-simple-endpoint.style-scope.yt-formatted-string').attr('href').replace('/channel/', '');
                
                port.postMessage({
                    getter_streamID: streamID,
                    getter_livechatID: livechatID,
                    getter_channelID: channelID
                });
            };
        });
    });
});
