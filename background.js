var targetUrl = ["*://*.youtube.com/*", "*://i.ytimg.com/*", "*://yt3.ggpht.com/*"]
var portFromCS;
var settings;

function connected(p) {
    portFromCS = p;
}

browser.runtime.onConnect.addListener(connected);

function onError(e)
{
    console.log(e)
}

function saveSettings(s)
{
    settings = s.settings
}

function postMessage(s)
{
    settings = s.settings
    portFromCS.postMessage({settings: settings})
}

function sendMessage(e) {
    if(portFromCS)
    {
        const gettingSettings = browser.storage.local.get();
        gettingSettings.then(postMessage, onError);
    }
    return {};
}

function cancelRequest(e)
{
    if(settings.youtube)
    {
        if(portFromCS)
        {
            const gettingSettings = browser.storage.local.get();
            gettingSettings.then(postMessage, onError);
        }
        return {cancel: true}
    }
    else
        return {}
}

browser.webRequest.onBeforeRequest.addListener(
    cancelRequest,
    {urls: ["*://*.googlevideo.com/*", "*://*.ytimg.com/*", "*://yt3.ggpht.com/*"]},
    ["blocking"]
);

browser.webRequest.onCompleted.addListener(
    sendMessage,
    {urls: ["*://*.youtube.com/*"]},
    []
);

const getSettings = browser.storage.local.get();
getSettings.then(saveSettings, onError);

console.log("BACKGROUND WORKING")