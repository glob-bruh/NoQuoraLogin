// ==UserScript==
// @name        NoQuoraLogin
// @description Allows Quora pages to be viewed without being prompted to login or sign up.
// @version     2.0.2
// @icon        logo.png
// @grant       none
// @run-at      document-start
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
    x = new Date();
    x.setTime(x.getTime() + (30 * 24 * 60 * 60 * 1000));
    expireDate = x.toUTCString();
    if (curTheme == "dark") {
        document.cookie = "m-theme=light; expires=" + expireDate + "; domain=.quora.com; path=/";
        document.cookie = "m-themeStrategy=light; expires=" + expireDate + "; domain=.quora.com; path=/";
    } else if (curTheme == "light") {
        document.cookie = "m-theme=dark; expires=" + expireDate + "; domain=.quora.com; path=/";
        document.cookie = "m-themeStrategy=dark; expires=" + expireDate + "; domain=.quora.com; path=/";
    }
    location.reload();
}

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
    if (curTheme == "dark") {
        x.style.backgroundColor = "#f52936";
        x.onmouseenter = function() {
          x.style.cursor = "pointer";
          x.style.backgroundColor = "#b92b27";
        };
        x.onmouseleave = function() {
          x.style.backgroundColor = "#f52936";
        }
    } else {
        x.style.backgroundColor = "#b92b27";
        x.onmouseenter = function() {
          x.style.cursor = "pointer";
          x.style.backgroundColor = "#f52936";
        };
        x.onmouseleave = function() {
          x.style.backgroundColor = "#b92b27"
        }
    }
    x.appendChild(document.createTextNode(text));
    document.getElementsByClassName("q-flex")[4].appendChild(x);
}

function themeLogic() {
    x = decodeURIComponent(document.cookie).split(";");
    for (i = 0; i < x.length; i++) {
        y = x[i].split("=")
        if (y[0].trim() == "m-theme") {
            curTheme = y[1]
            if (curTheme == "dark") {
                addThemeButton("Light Mode");
            } else {
                addThemeButton("Dark Mode");
            }
        }
    }
}

shareCheck();

document.addEventListener("DOMContentLoaded", (event) => {
    themeLogic();
});
