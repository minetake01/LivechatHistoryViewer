$('iframe').on('load', () => {
    var streamID = location.search;
    var livechatID = $('iframe').attr('src');
    var channelID = $('#text > a.yt-simple-endpoint.style-scope.yt-formatted-string').attr('href');
    var gameChannelID = $('a.yt-simple-endpoint.style-scope.ytd-rich-metadata-renderer').attr('href');
    
    chrome.runtime.sendMessage({
        streamID: streamID.replace('?v=', ''),
        livechatID: livechatID.replace('/live_chat?continuation=', ''),
        channelID: channelID.replace('/channel/', ''),
        gameChannelID: gameChannelID.replace('/channel/', '')
    });
});
