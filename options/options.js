const language = (window.navigator.languages && window.navigator.languages[0]) ||
            window.navigator.language ||
            window.navigator.userLanguage ||
            window.navigator.browserLanguage;

$(window).on('load', function() {
    (function lang() {
        switch (language) {
            case 'ja':
                $('.lang[lang!="ja"]').prop('hidden', true);
                $('.lang[lang="ja"]').prop('hidden', false);
            break;
            default:
                $('.lang[lang!="en"]').prop('hidden', true);
                $('.lang[lang="en"]').prop('hidden', false);
            break;
        };
    })();
    
    (function dataExport() {
        $('#export').click(function() {
            chrome.storage.local.get(null, function(value) {
                let blob = new Blob([JSON.stringify(value)], {type: 'text.json'});
                let link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'export.json';
                link.click();
            });
        });
    })();

    (function dataImport() {
        $('#import').click(function() {
            $('#import-file').click();
            $('#import-file').change(function(event) {
                let input = event.target;
                if (!input.files.length) {
                    return;
                };
                let file = input.files[0];
                let reader = new FileReader();
                reader.onload = () => {
                    let array = JSON.parse(reader.result);
                    chrome.storage.local.set(array);
                };
                reader.readAsText(file);
            });
        });
    })();

    (function deleteAll() {
        $('#delete-all').click(function() {
            chrome.storage.local.clear();
        });
    })();
});