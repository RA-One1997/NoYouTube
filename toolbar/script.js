var settings;
var youtube = document.getElementById("youtube")
var recomended = document.getElementById("recomended")
var comments = document.getElementById("comments")
var next = document.getElementById("next")
var guide = document.getElementById("guide")

function disable_youtube()
{
    var youtube = document.getElementById("youtube")
    youtube.style.backgroundColor = "#fbfbfb"
    var child = youtube.getElementsByTagName("span")
    child[0].style.color = "#777"
    child[1].style.color = "#777"
    var blocking = document.getElementById("blocking")
    blocking.style.display = "block"
    var options = document.getElementById("options")
    options.style.opacity = "0.5"
    settings.youtube = true
    browser.storage.local.set({settings});
}

function enable_youtube()
{
    var youtube = document.getElementById("youtube")
    youtube.style.backgroundColor = "#f2f2f2"
    var child = youtube.getElementsByTagName("span")
    child[0].style.color = "red"
    child[1].style.color = "#000"
    var blocking = document.getElementById("blocking")
    blocking.style.display = "none"
    var options = document.getElementById("options")
    options.style.opacity = "1"
    settings.youtube = false
    browser.storage.local.set({settings});
}

function updateSettings() {
    if(recomended.checked)
        settings.recomended = true
    else
        settings.recomended = false

    if(comments.checked)
        settings.comments = true
    else
        settings.comments = false

    if(next.checked)
        settings.next = true
    else
        settings.next = false

    if(guide.checked)
        settings.guide = true
    else
        settings.guide = false

    browser.storage.local.set({settings});
}

function toggle_youtube() {
    if(!settings.youtube)
        disable_youtube()
    else
        enable_youtube()
}

function storeSettings(s)
{
    if(!s.settings)
        return;
    settings = s.settings
    if(settings.youtube)
        disable_youtube()
    else
        enable_youtube()
    if(settings.recomended)
        recomended.checked = true
    if(settings.comments)
        comments.checked = true
    if(settings.next)
        next.checked = true
    if(settings.guide)
        guide.checked = true

}

function onError(e)
{
    console.log(e)
}

const gettingSettings = browser.storage.local.get();
gettingSettings.then(storeSettings, onError);


youtube.addEventListener("click", toggle_youtube);

var options = document.getElementsByTagName("li")
for (var i = 0; i < options.length; i++) {
    options[i].addEventListener('click', updateSettings, false);
}

