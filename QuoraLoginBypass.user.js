// ==UserScript==
// @name        NoQuoraLogin
// @description Allows you to view Quora pages without being prompted to login or sign up.
// @version     1.3
// @icon        logo.png
// @grant       none
// @run-at      document-start
// @match       https://www.quora.com/*
// @namespace   https://github.com/
// @downloadURL https://github.com/glob-bruh/NoQuoraLogin/raw/main/QuoraLoginBypass.user.js
// @updateURL   https://github.com/glob-bruh/NoQuoraLogin/raw/main/QuoraLoginBypass.user.js
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
