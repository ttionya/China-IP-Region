// ==UserScript==
// @name         China IP Region
// @namespace    https://github.com/ttionya
// @version      1.0.1
// @encoding     utf-8
// @description  设定远程地址，获得 IP 所属区域（中国）
// @author       ttionya
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @updateURL    https://raw.githubusercontent.com/ttionya/China-IP-Region/master/tampermonkey-script/China-IP-Region.user.js
// @downloadURL  https://raw.githubusercontent.com/ttionya/China-IP-Region/master/tampermonkey-script/China-IP-Region.user.js
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @connect      *
// @run-at       document-end
// ==/UserScript==

(function() {
  'use strict';

  var API = 'http://192.168.1.196:3000/', // 接口地址
    DEBUG = false;

  GM_addStyle('.cipr-tips-container { position: fixed; z-index: 9999999; right: 10px; bottom: 10px; padding: 10px 20px; border-radius: 20px; color: #fff; background-color: #333; }');

  // 弹窗
  var dialog = {
    show: function (text) {
      this.hide();

      var $tipsContainer = $('<div class="cipr-tips-container"></div>');

      $tipsContainer.text(text);

      $(document.body).append($tipsContainer);
    },
    hide: function () {
      $('.cipr-tips-container').remove();
    }
  };

  if (document.getSelection) {
    // 释放鼠标
    $(document).on('mouseup', function () {
      // 取消的时候不会再次触发
      setTimeout(function () {
        var text = document.getSelection().toString();
        var matched = /((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/.exec(text);

        // 有匹配
        if (matched) {
          GM_xmlhttpRequest({
            method: 'GET',
            url: API + '?ip=' + matched[0],
            onerror: function (error) {
              console.error(error);
            },
            onload: function (result) {
              DEBUG && console.log(result);

              var res = result.responseText,
                region = '';

              try {
                region = JSON.parse(res).data;
              }
              catch (e) {}

              // 存在 IP 信息
              if (region) {
                dialog.show(region);
              }
            }
          });
        }
        else {
          dialog.hide();
        }
      }, 0);
    });
  }
})();
