$('iframe').on('load', function() {
    let streamID = location.search.replace('?v=', '');
    let livechatID = $('iframe').attr('src').replace('/live_chat?continuation=', '');
    let channelID = $('#text > a.yt-simple-endpoint.style-scope.yt-formatted-string').attr('href').replace('/channel/', '');
    if ($('a.yt-simple-endpoint.style-scope.ytd-rich-metadata-renderer').length) {
        var gameChannelID = $('a.yt-simple-endpoint.style-scope.ytd-rich-metadata-renderer').attr('href').replace('/channel/', '')
    };
    
    chrome.runtime.sendMessage({
        streamID: streamID,
        livechatID: livechatID,
        channelID: channelID,
        gameChannelID: gameChannelID
    });
});