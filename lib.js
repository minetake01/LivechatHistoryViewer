//langage
const UI_History = chrome.i18n.getMessage('UI_History');
const UI_Channel = chrome.i18n.getMessage('UI_Channel');
const UI_Global = chrome.i18n.getMessage('UI_Global');
const menu_register = chrome.i18n.getMessage('menu_register');
const menu_delete = chrome.i18n.getMessage('menu_delete');
const registerUI_header = chrome.i18n.getMessage('registerUI_header');
const caution_header = chrome.i18n.getMessage('caution_header');
const caution_message= chrome.i18n.getMessage('caution_message');

const livechatHistoryIcon = '<svg version="1.0" id="icon" class="live-chat-history-viewer" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 24 24" xml:space="preserve" height="24" width="24"><path style="fill: var(--iron-icon-fill-color, currentcolor); stroke: var(--iron-icon-stroke-color, none)" d="M17 15v2h-6v-2h6zm-6-4v2h6v-2h-6zm0-4v2h6V7h-6zm9-3H4v16h16V4m1-1v18H3V3h18zM9 15v2H7v-2h2zm-2-4v2h2v-2H7zm0-4v2h2V7H7z"/></svg>';
const contentMenuIcon = '<svg version="1.0" id="menu-icon" class="live-chat-history-menu" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 24 24" xml:space="preserve" height="24" width="24"><path style="fill: var(--iron-icon-fill-color, currentcolor); stroke: var(--iron-icon-stroke-color, none)" d="M12 16.5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5zM10.5 12c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5-.7-1.5-1.5-1.5-1.5.7-1.5 1.5zm0-6c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5-.7-1.5-1.5-1.5-1.5.7-1.5 1.5z"/></svg>';
const entryContentIcon = '<svg version="1.0" id="entry-icon" class="live-chat-history-menu menu-content-icon" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 24 24" xml:space="preserve" height="24" width="24"><path style="fill: var(--iron-icon-fill-color, currentcolor); stroke: var(--iron-icon-stroke-color, none)" d="M22 13h-4v4h-2v-4h-4v-2h4V7h2v4h4v2zm-8-6H2v1h12V7zM2 12h8v-1H2v1zm0 4h8v-1H2v1z"/></svg>';
const deleteContentIcon = '<svg version="1.0" id="delete-icon" class="live-chat-history-menu menu-content-icon" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 24 24" xml:space="preserve" height="24" width="24"><path style="fill: var(--iron-icon-fill-color, currentcolor); stroke: var(--iron-icon-stroke-color, none)" d="M11 17H9V8h2v9zm4-9h-2v9h2V8zm4-4v1h-1v16H6V5H5V4h4V3h6v1h4zm-2 1H7v15h10V5z"/></svg>';
const closeIcon = '<svg version="1.0" id="close-icon" class="live-chat-history-category-dialog" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 24 24" xml:space="preserve" height="24" width="24"><path style="fill: var(--yt-spec-icon-active-other);" d="m12.7 12 6.6 6.6-.7.7-6.6-6.6-6.6 6.6-.7-.7 6.6-6.6-6.7-6.6.7-.7 6.6 6.6 6.6-6.6.7.7-6.5 6.6z"/></svg>';

let currentContent;

const livechatHistoryUI = (function(param) {return param[0].replace(/\n|\r/g, "");})`
    <div id="contents" class="live-chat-history-viewer">
        <div id="content-panel" class="live-chat-history-viewer">
            <div id="tab-select-bar" class="live-chat-history-viewer">
                <div id="history-select-content" class="live-chat-history-viewer tab-selector active">` + UI_History + `</div>
                <div id="channel-select-content" class="live-chat-history-viewer tab-selector">` + UI_Channel + `</div>
                <div id="global-select-content" class="live-chat-history-viewer tab-selector">` + UI_Global + `</div>
            </div>
            <div id="tab-contents" class="live-chat-history-viewer">
                <div id="history-tab-content" class="live-chat-history-viewer tab-content active">
                    <div id="history-content" class="live-chat-history-viewer chat-content"></div>
                </div>
                <div id="channel-tab-content" class="live-chat-history-viewer tab-content">
                    <div id="channel-content" class="live-chat-history-viewer chat-content"></div>
                </div>
                <div id="global-tab-content" class="live-chat-history-viewer tab-content">
                    <div id="global-content" class="live-chat-history-viewer chat-content"></div>
                </div>
            </div>
        </div>
    </div>
`;
function contentElement(chatElement, target) {
    if (target === 'history') {
        return (function(param) {return param[0].replace(/\n|\r/g, "");})`
            <div id="chat-content" class="live-chat-history-menu">
                <div id="content" class="live-chat-history-menu">` + chatElement + `</div>
                <div id="content-menu" class="live-chat-history-menu">
                    <div id="content-menu-icon" class="live-chat-history-menu">` + contentMenuIcon + `</div>
                    <div id="menu-panel" class="live-chat-history-menu">
                        <div id="entry-content" class="live-chat-history-menu menu-content">
                            ` + entryContentIcon + `
                            <p id="entry-content-text" class="live-chat-history-menu menu-content-text">` + menu_register + `</p>
                        </div>
                        <div id="delete-content" class="live-chat-history-menu menu-content">
                            ` + deleteContentIcon + `
                            <p id="delete-content-text" class="live-chat-history-menu menu-content-text">` + menu_delete + `</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        return (function(param) {return param[0].replace(/\n|\r/g, "");})`
            <div id="chat-content" class="live-chat-history-menu">
                <div id="content" class="live-chat-history-menu">` + chatElement + `</div>
                <div id="content-menu" class="live-chat-history-menu">
                    <div id="content-menu-icon" class="live-chat-history-menu">` + contentMenuIcon + `</div>
                    <div id="menu-panel" class="live-chat-history-menu">
                        <div id="delete-content" class="live-chat-history-menu menu-content">
                            ` + deleteContentIcon + `
                            <p id="delete-content-text" class="live-chat-history-menu menu-content-text">` + menu_delete + `</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    };
};
const categorySelectUI = (function(param) {return param[0].replace(/\n|\r/g, "");})`
    <div id="category-select-dialog" class="live-chat-history-category-dialog" hidden>
        <div id="background" class="live-chat-history-category-dialog"></div>
        <div id="content-panel" class="live-chat-history-category-dialog">
                <div id="content-headder" class="live-chat-history-category-dialog">
                    <div id="content-headder-text" class="live-chat-history-category-dialog">` + registerUI_header + `</div>
                    ` + closeIcon + `
                </div>
                <div id="content-checkbox" class="live-chat-history-category-dialog">
                    <input type="checkbox" name="channel" id="channel-checkbox" class="live-chat-history-category-dialog" style="display: none;">
                    <label for="channel-checkbox" class="live-chat-history-category-dialog">` + UI_Channel + `</label>
                    <input type="checkbox" name="global" id="global-checkbox" class="live-chat-history-category-dialog" style="display: none;">
                    <label for="global-checkbox" class="live-chat-history-category-dialog">` + UI_Global + `</label>
                </div>
            </div>
    </div>
`;
const cautionElement = (function(param) {return param[0].replace(/\n|\r/g, "");})`
    <div id="clickBlocker" class="live-chat-history-blocker" hidden>
        <div id="background" class="live-chat-history-blocker">
            <div id="content-panel" class="live-chat-history-blocker">
                <div id="content-panel-message-header" class="live-chat-history-blocker">` + caution_header + `</div>
                <div id="content-panel-message" class="live-chat-history-blocker">` + caution_message + `</div>
            </div>
        </div>
    </div>
`;

function sendBackground(messageArray) {
    let port = chrome.runtime.connect();
    port.postMessage(messageArray);
};

function streamID() {
    if (window === window.parent) {
        return location.search.replace('?is_popout=1&v=', '');
    } else {
        return parent.location.search.replace('?v=', '');
    };
};

function channelID(streamID) {
    let messageArray = {};
    messageArray.type = 'getChannelID';
    messageArray.streamID = streamID;

    return new Promise(resolve => {
        let port = chrome.runtime.connect();
        port.onMessage.addListener(function(response) {
            if (response.type === 'responseChannelID') {
                resolve(response.channelID);
            };
        });
        
        port.postMessage(messageArray);
    });
};

function updateContents(channelIDPromise) {
    $('#history-content').empty();
    chrome.storage.sync.get({historyArray: []}, function(value) {
        historyArray = value.historyArray;
        historyArray.forEach(function(item) {
            $('#history-content').append(contentElement(item, 'history'));
        });
    });
    $('#global-content').empty();
    chrome.storage.sync.get({globalArray: []}, function(value) {
        globalArray = value.globalArray;
        globalArray.forEach(function(item) {
            $('#global-content').append(contentElement(item));
        });
    });
    channelIDPromise.then(function(channelID) {
        $('#channel-content').empty();
        chrome.storage.sync.get({[channelID]: []}, function(value) {
            channelArray = value[channelID];
            channelArray.forEach(function(item) {
                $('#channel-content').append(contentElement(item));
            });
        });
    });
};

function contentCheck(channelIDPromise, chatElement) {
    channelIDPromise.then(function(channelID) {
        chrome.storage.sync.get({[channelID]: []}, function(value) {
            channelArray = value[channelID];
            if ($.inArray(chatElement, channelArray) !== -1) {
                $('#channel-checkbox.live-chat-history-category-dialog').prop('checked', true);
            };
        });
    });
    chrome.storage.sync.get({globalArray: []}, function(value) {
        globalArray = value.globalArray;
        console.log(globalArray)
        if ($.inArray(chatElement, globalArray) !== -1) {
            $('#global-checkbox.live-chat-history-category-dialog').prop('checked', true);
        };
    });
};

function sendChat(chatElement) {
    if ($('#input.yt-live-chat-text-input-field-renderer').html() === chatElement) {
        $('#send-button yt-icon-button').click();
    } else {
		$('#input.yt-live-chat-text-input-field-renderer').html(chatElement);
		document.querySelector('#input.yt-live-chat-text-input-field-renderer').dispatchEvent(new InputEvent('input'));
	};
};