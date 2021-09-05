//resources
const livechatHistoryIconUrl = chrome.runtime.getURL('/resources/livechatHistory.svg')

const livechatHistoryUI = (function(param) {return param[0].replace(/\n|\r/g, "");})`
    <div id="contents" class="live-chat-history-viewer">
        <div id="history-panel" class="style-scope yt-live-chat-renderer">
            <div id="close-button" class="chat-history">×</div>
            <div id="tab-select-bar">
                <div id="history-selector" class="tab-selector active">チャットの履歴</div>
                <div id="channel-chat-selector" class="tab-selector">チャンネル</div>
                <div id="global-chat-selector" class="tab-selector">グローバル</div>
            </div>
            <div id="tabs">
                <div id="history-tab" class="tab-content active">
                    <div id="history" class="chat-select-field"></div>
                </div>
                <div id="channel-chat-tab" class="tab-content">
                    <div id="channel-chat" class="chat-select-field"></div>
                </div>
                <div id="global-chat-tab" class="tab-content">
                    <div id="global-chat" class="chat-select-field"></div>
                </div>
            </div>
        </div>
    </div>
`;
const historyMenuUI = (function(param) {return param[0].replace(/\n|\r/g, "");})`
    <div class="chat-selector">
        <div id="item" class="chat-selector"></div>
        <div id="menu" class="chat-selector">
            <div id="menu-icon" class="chat-selector">
                <img src="" width="20" height="20"></img>
            </div>
            <div id="menu-panel" class="chat-selector">
                <div id="entry-chat-button" class="menu-selector">
                    <img src="" width="20" height="20"></img>
                    <p id="entry-chat-selector" class="menu">登録する</p>
                </div>
                <div id="delete-chat-button" class="menu-selector">
                    <img src="" width="20" height="20"></img>
                    <p id="delete-chat" class="menu">削除</p>
                </div>
            </div>
        </div>
    </div>
`;
const categorySelectUI = (function(param) {return param[0].replace(/\n|\r/g, "");})`
    <div id="category-select-background" hidden>
        <div id="category-select-field">
            <div id="category-selector-headder">
                <div id="category-select" class="category-selector-headder">登録先…</div>
                <div id="close-button">×</div>
            </div>
            <div id="category-selector-checkbox">
                <input type="checkbox" name="category-selector-input" id="input-channel">
                <label for="input-channel" class="category-selector-input">チャンネル</label>
                <input type="checkbox" name="category-selector-input" id="input-global">
                <label for="input-global" class="category-selector-input">グローバル</label>
            </div>
        </div>
    </div>
`;
const cautionElement = (function(param) {return param[0].replace(/\n|\r/g, "");})`
    <div id="clickBlock" hidden>
        <div id="spamBlockField">
            <div id="spamBlockMessage">チャットの連投を検知しました。</div>
            <div id="spamBlockMessage2">短時間で大量のチャットを送信する行為は、配信者の方や他の視聴者の方に迷惑になる場合があります。</div>
        </div>
    </div>
`;
const livechatHistoryIcon = '<svg xmlns="http://www.w3.org/2000/svg" id="chat-history-icon" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px"><rect fill="none" height="24" width="24"/><path d="M3,14h4v-4H3V14z M3,19h4v-4H3V19z M3,9h4V5H3V9z M8,14h13v-4H8V14z M8,19h13v-4H8V19z M8,5v4h13V5H8z"/></svg>';
