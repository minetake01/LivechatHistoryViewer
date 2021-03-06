chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(request) {
        if (request.getStreamDetail === 'LCHVget') {
            let streamID = location.search.replace('?v=', '');
            let channelID = $('#text > a.yt-simple-endpoint.style-scope.yt-formatted-string').attr('href').replace('/channel/', '');
            
            port.postMessage({
                getter_streamID: streamID,
                getter_channelID: channelID
            });
        };
    });
});