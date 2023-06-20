import React, { useEffect, useState } from "react";
import Script from "next/script";
import { isMobileDevice } from "@sehatq/utils";

export function PubMaticScript() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    setIsMobile(isMobileDevice(window?.navigator?.userAgent));
  }, []);

  if (isMobile === null) return null;

  return (
    <Script
      id="pubmatics"
      dangerouslySetInnerHTML={{
        __html: `
        var PWT={}; //Initialize Namespace
        var googletag = googletag || {};
        googletag.cmd = googletag.cmd || [];
        var gptRan = false;
        PWT.jsLoaded = function(){ //PubMatic pwt.js on load callback is used to load GPT
            loadGPT();
        };
        var loadGPT = function() {
            // Check the gptRan flag
            if (!gptRan) {
                gptRan = true;
                var gads = document.createElement('script');
                var useSSL = 'https:' == document.location.protocol;
                gads.src = (useSSL ? 'https:' : 'http:') + '//securepubads.g.doubleclick.net/tag/js/gpt.js';
                var node = document.getElementsByTagName('script')[0];
                node.parentNode.insertBefore(gads, node);
            }
        };
        // Failsafe to call gpt
        setTimeout(loadGPT, 500);

        (function() {
          var purl = window.location.href;
          var url = '//ads.pubmatic.com/AdServer/js/pwt/160902/${
            isMobile ? 5862 : 5861
          }';
          var profileVersionId = '';
          if (purl.indexOf('pwtv=')>0) {
            var regexp = /pwtv=(.*?)(&|$)/g;
            var matches = regexp.exec(purl);
            if (matches.length >= 2 && matches[1].length > 0) {
              profileVersionId = '/'+matches[1];
            }
          }
          var wtads = document.createElement('script');
          wtads.async = true;
          wtads.type = 'text/javascript';
          wtads.src = url+profileVersionId+'/pwt.js';
          var node = document.getElementsByTagName('script')[0];
          node.parentNode.insertBefore(wtads, node);
        })();
        `,
      }}
    />
  );
}
