// ==UserScript==
// @name        NoQuoraLogin
// @description Allows Quora pages to be viewed without being prompted to login or sign up.
// @version     2.0
// @icon        logo.png
// @grant       none
// @run-at      document-end
// @match       https://www.quora.com/*
// @namespace   https://github.com/
// @downloadURL https://github.com/glob-bruh/NoQuoraLogin/raw/main/NoQuoraLogin.user.js
// @updateURL   https://github.com/glob-bruh/NoQuoraLogin/raw/main/NoQuoraLogin.user.js
// @author      https://github.com/glob-bruh/NoQuoraLogin/graphs/contributors
// @homepage    https://github.com/glob-bruh/NoQuoraLogin
// @supportURL  https://github.com/glob-bruh/NoQuoraLogin/issues
// ==/UserScript==

// Whitelisted URL's:
const whitelistURL = [
    "https://www.quora.com/",
    "https://www.quora.com/about/*",
    "https://www.quora.com/careers/*",
    "https://www.quora.com/press/*",
    "https://www.quora.com/profile/*"
]

function shareCheck() {
    var url = window.location.href;
    var changeURL = true;
    for (let i = 0, constLen = whitelistURL.length ; i < constLen ; i++) {
        if (whitelistURL[i].slice(-1) == "*") {
            if (RegExp(whitelistURL[i]).test(url)) {
                changeURL = false
            }
        } else {
            if (url == whitelistURL[i]) {
                changeURL = false
            }
        }
    }
    if (changeURL == false || url.indexOf("share=1") != -1) {
        return false
    } else {
        if (url.indexOf("?") != -1) {
            url += "&share=1";
        } else {
            url += "?share=1";
        }
        window.location.replace(url)
    }
}

function changeThemeCookie() {
    alert("Button works! Feature not implemented.")
}

// Figure out how to wait until the page is fully
// loaded before (with run-at:document-start) executing this.
function addThemeButton(text) {
    var x = document.createElement("button");
    x.onclick = changeThemeCookie;
    x.style.color = "#fff";
    x.style.height = "30px";
    x.style.fontSize = "13px";
    x.style.paddingLeft = "15px";
    x.style.paddingRight = "15px";
    x.style.borderRadius = "1000px";
    x.style.borderWidth = "0px";
    x.style.backgroundColor = "#b92b27";
    x.appendChild(document.createTextNode(text))
    document.getElementsByClassName("q-flex")[4].appendChild(x)
}

function themeLogic() {
    x = decodeURIComponent(document.cookie).split(";");
    for (i = 0; i < x.length; i++) {
        y = x[i].split("=")
        if (y[0].trim() == "m-theme") {
            if (y[1] == "light") {
                addThemeButton("Dark mode")
            } 
            else if (y[1] == "dark") {
                addThemeButton("Light mode")
            }
        }
    }
}

shareCheck()
themeLogic()