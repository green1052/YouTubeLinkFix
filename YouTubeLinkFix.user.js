// ==UserScript==
// @name		YouTubeLinkFix
// @version		1.0.0
// @author		green1052
// @description 유튜브 추적 링크를 제거합니다.
// @homepageURL	https://github.com/green1052/YouTubeLinkFix
// @downloadURL	https://raw.githubusercontent.com/green1052/YouTubeLinkFix/main/YouTubeLinkFix.user.js
// @include		www.youtube.com/watch*
// @run-at		document-end
// ==/UserScript==

(function () {
    "use strict";

    const observer = new MutationObserver(() => {
        document.querySelectorAll("a.yt-simple-endpoint").forEach(query => {
            const href = query.getAttribute("href");

            if (!href || !href.includes("/redirect?")) return;

            const url = new URL(`https://www.youtube.com${href}`);

            query.setAttribute("href", url.searchParams.get("q"));
        });
    });

    observer.observe(document.body, {attributes: true, childList: true, characterData: true, subtree: true});
})();