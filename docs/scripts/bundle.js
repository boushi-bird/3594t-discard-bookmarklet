!function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t,n){"use strict";var r,i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};r=function(){return this}();try{r=r||Function("return this")()||(0,eval)("this")}catch(e){"object"===("undefined"==typeof window?"undefined":i(window))&&(r=window)}e.exports=r},function(e,t,n){"use strict";e.exports='\n<button id="close">Close</button>\n<h3>三国志大戦 解任ブックマークレット</h3>\n<button id="copy">選択した武将をコピー</button>\n<a href="https://3594t-touen.jp/recruitments/new" target="_blank">解任新規作成へ</a><small>(三国志大戦 桃園 に遷移します)</small>\n<div id="message" style="height: 30px;"></div>\n<div style="padding-left: 50px;">\n<button id="select_all">すべて選択</button>\n<button id="clear_all">すべて解除</button>\n</div>\n<div id="main">\n</div>\n'},function(e,t,n){"use strict";(function(t){var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var i=n(1);e.exports=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e);var n=t.createElement("iframe");n.style.position="absolute",n.style.top="0px",n.style.left="0px",n.style.width="90vw",n.style.minWidth="480px",n.style.height="98vh",n.style.backgroundColor="white",n.style.zIndex=1e3,t.body.appendChild(n),this.iframe=n,this.results=[],this._document=this.iframe.contentWindow.document,this._document.body.innerHTML=i,this._setupEvents()}return r(e,[{key:"_setupEvents",value:function(){var e=this;this._document.getElementById("close").addEventListener("click",function(){e.hide()}),this._document.getElementById("copy").addEventListener("click",function(){e._copy()}),this._document.getElementById("select_all").addEventListener("click",function(){e._selectionChangeAll(!0)}),this._document.getElementById("clear_all").addEventListener("click",function(){e._selectionChangeAll(!1)})}},{key:"show",value:function(){this.iframe.style.display="block"}},{key:"hide",value:function(){this.iframe.style.display="none"}},{key:"_selectionChangeAll",value:function(e){this.results.forEach(function(t){t.selected=e}),this._updateSelectList()}},{key:"_copy",value:function(){var e=this,n=this.results.filter(function(e){return e.selected});if(0!==n.length){var r=this._document.createElement("div");this._document.body.appendChild(r);var i=this._document.createElement("div");i.innerHTML="武将名のリンクから登用ページへ行けます\n<br /><br />",r.appendChild(i),n.forEach(function(t){var n=e._document.createElement("div");n.innerHTML=e._createCardInfoHtml(t),r.appendChild(n)});var a=this._document.createElement("div");a.innerHTML='<br /><br />\nこの投稿は 三国志大戦 解任ブックマークレット(<a href="https://boushi-bird.github.io/3594t-discard-bookmarklet/">https://boushi-bird.github.io/3594t-discard-bookmarklet/</a>)\nにより作成しています。',r.appendChild(a),this._document.body.appendChild(r),this._document.getSelection().selectAllChildren(r);var o=this._document.execCommand("copy");if(this._document.body.removeChild(r),o){var s=this._document.getElementById("message");s.innerHTML="<small>コピーしました!</small>",setTimeout(function(){s.innerHTML=""},2e3)}}else t.alert("1つ以上選択する必要があります")}},{key:"update",value:function(e,t){var n=this;this.results=[],e.forEach(function(e){var r=t.searchByCardIndex(e),i=r.card,a=r.general;i&&a&&n.results.push({selected:!0,card:i,general:a})}),this._updateSelectList()}},{key:"_updateSelectList",value:function(){var e=this,t=this._document.getElementById("main");!function(e){for(;e.firstChild;)e.removeChild(e.firstChild)}(t),this.results.forEach(function(n){var r=e._document.createElement("div"),i=e._document.createElement("input");i.setAttribute("type","checkbox"),i.setAttribute("style","-ms-transform:scale(1.5,1.5);-webkit-transform:scale(1.5,1.5);transform:scale(1.5,1.5);"),i.style.width="24px",i.style.height="24px",i.style.margin="10px",i.checked=n.selected,i.addEventListener("click",function(){n.selected=i.checked});var a=e._document.createElement("span");a.style.verticalAlign="super",a.innerHTML=e._createCardInfoHtml(n),r.appendChild(i),r.appendChild(a),t.appendChild(r)})}},{key:"_createCardInfoHtml",value:function(e){var t=e.card,n=e.general,r=t.genSubs.map(function(e){return e[0]}).join("");return t.number+'\n      <a href="'+n.url+'" target="_blank">'+n.version+" "+n.rarity+n.name+"</a>\n      "+t.genMain+" "+r}}]),e}()}).call(this,n(0))},function(e,t,n){"use strict";var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();e.exports=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.baseData=t,this.cardData=n}return r(e,[{key:"searchByCardIndex",value:function(e){var t=void 0,n=void 0;return n=(t=null!=e?this.cardData[parseInt(e)]:null)?this.baseData.GENERAL[parseInt(t.idx)]:null,{card:this._createLabeledCard(t),general:this._createLabeledGeneral(n)}}},{key:"_createLabeledCard",value:function(e){var t=this;if(!e)return null;var n=this.baseData.GEN_MAIN.filter(function(t){return t.key===e.gen_main}).map(function(e){return e.name_short})[0],r=[e.gen_sub0,e.gen_sub1,e.gen_sub2].filter(function(e){return""!==e}).map(function(e){return parseInt(e)}).map(function(e){return t.baseData.GEN_SUB[e].name_short});return{number:e.number,genMain:n,genSubs:r}}},{key:"_createLabeledGeneral",value:function(e){if(!e)return null;var t=this.baseData.PERSONAL[parseInt(e.personal)],n=e.major_version,r="Ex"===this.baseData.VER_TYPE[parseInt(e.ver_type)].name?"EX":e.add_version,i="0"===r?"第"+n+"弾":"第"+n+"弾-"+r,a="https://3594t.net/datalist/?v=GENERAL&amp;s=POPUP_GENERAL&amp;c="+e.code;return{name:t.name,rarity:e.rarity,version:i,url:a}}}]),e}()},function(e,t,n){"use strict";(function(e){var t=n(3),r=new(n(2))(document),i=function(){if(!(e.member_card_fire_date&&e.member_data&&e.member_data.CARD&&e.base_data))return e.alert("[三国志大戦 解任ブックマークレット]\nデータを読み込み中またはデータリストのページではありません。"),void r.hide();r.show();var n=new t(e.base_data,e.member_data.CARD),i=window.member_card_fire_date.map(function(e){return e.index});r.update(i,n)};e.VsD8NEfx=i,i()}).call(this,n(0))}]);