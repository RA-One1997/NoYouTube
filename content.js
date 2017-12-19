var remove_time = 150
var remove_time_string = String(remove_time/1000) + "s";

function no_opacity(obj)
{
    if(obj)
    {
        obj.style.transition = "opacity "+remove_time_string;
        obj.style.opacity = "0";
    }
}

function remove(obj)
{
    if(obj)
    {
        obj.outerHTML = ""
        delete obj
    }
}

function reload(s)
{
    var browse = document.getElementsByTagName("ytd-browse")[0]
    if(!browse)
        browse = document.getElementById("feed")

    var masthead_nav = document.getElementById("masthead-appbar-container")

    var browse_trending = document.getElementById("browse-items-primary")

    var guide_button = document.getElementById("guide-button")
    if(!guide_button)
        guide_button = document.getElementById("appbar-guide-button")

    var guide = document.getElementById("guide")

    var comments = document.getElementsByTagName("ytd-comments")[0]
    if(!comments)
        comments = document.getElementById("watch-discussion")

    var watch_next = document.getElementsByTagName("ytd-watch-next-secondary-results-renderer")[0]
    if(!watch_next)
        watch_next = document.getElementById("watch7-sidebar")

    if(s.recomended)
    {
        no_opacity(browse)
        no_opacity(masthead_nav)
        no_opacity(browse_trending)
    }
    if(s.next)
    {
        no_opacity(watch_next)
    }
    if(s.guide)
    {
        no_opacity(guide)
        no_opacity(guide_button)
    }
    if(s.comments)
    {
        no_opacity(comments)
    }

    setTimeout(function(){
        if(s.recomended)
        {
            remove(browse)
            remove(masthead_nav)
            remove(browse_trending)
        }
        if(s.next)
        {
            remove(watch_next)
        }
        if(s.guide)
        {
            remove(guide)
            remove(guide_button)
        }
        if(s.comments)
        {
            remove(comments)
        }
    }, remove_time);
}

function noyoutube()
{
    htmls = document.getElementsByTagName("html")
    for (var i = htmls.length - 1; i >= 0; i--) {
        htmls[i].innerHTML = ""
    }
    htmls[0].innerHTML = '<head><style>body{top:0;left:0;margin:0;padding:0;}h1{margin:0;text-align: center;line-height: 100vh;font-size: 80px;font-family: sans;font-weight: 300;color:#333;}#you{font-weight:normal;color:#111;}#tube{color:#f9f9f9;background-color:#C3272B;padding:5px;margin:5px;font-weight:normal;border-radius:10px;}</style></head><body><h1>No <span id="you">You</span><span id="tube">Tube</span> For You</h1></body>'
}

var myPort = browser.runtime.connect({name:"port-from-cs"});

myPort.onMessage.addListener(function(m) {
    if(m.settings){
        if(m.settings.youtube)
            noyoutube()
        else
            reload(m.settings)
    }
});
