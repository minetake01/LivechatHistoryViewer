chrome.runtime.onMessage.addListener(function (input, sender) {
    console.log(sender);    //送信者の情報
    console.log(input.livechatType);    //チャットページがポップアップされているかiframeか
    console.log(input.inputElement);    //送信したチャットの要素
    console.log(input.streamID);    //配信ID
    console.log(input.livechatID);  //チャットID
    console.log(input.channelID);   //チャンネルID
    console.log(input.gameChannelID);   //ゲームチャンネルID
});