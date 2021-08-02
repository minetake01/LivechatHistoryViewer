const ChannelID = $('#text > a.yt-simple-endpoint.style-scope.yt-formatted-string').attr('href');
const gameChannelID = $('a.yt-simple-endpoint.style-scope.ytd-rich-metadata-renderer').attr('href');

chrome.runtime.sendMessage({
    ChannelID: ChannelID.replace('/channel/', ''),
    gameChannelID: gameChannelID.replace('/channel/', '')
});