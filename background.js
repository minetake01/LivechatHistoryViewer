chrome.runtime.onMessage.addListener(function (input, sender) {
    console.log(sender);
    console.log(input.ChannelID);
    console.log(input.gameChannelID);
});
