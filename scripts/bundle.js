!function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=5)}([function(e,t){e.exports="<style>body{position:relative}.header{position:fixed;width:100%;top:5px;left:0;right:0;padding:0 4px;background-color:#fff}.close-button-wapper{width:100%;text-align:center}.close-button{width:90%;height:30px}.title{height:28px;margin:8px 3px}.copy-area{height:32px}#copy{height:30px}#message{height:30px}.filter-area{margin-top:142px}.large-checkbox{-ms-transform:scale(1.5,1.5);-webkit-transform:scale(1.5,1.5);transform:scale(1.5,1.5)}.list-checkbox{width:24px;height:24px;margin:10px}.filters{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}#default-filter{padding-left:40px}#filter-versions{margin-top:10px;margin-bottom:10px}#filter-rarities{margin-bottom:10px}#main{user-select:none}#main .list-row-item{user-select:auto}</style> "},function(e,t){e.exports="<div class=filter-area> (ぽ)・・・ぽけっと武将 <div id=default-filter class=filters> <button id=select_all>すべて選択</button> <button id=clear_all>すべて解除</button> <input id=select_sr type=checkbox checked=checked class=large-checkbox><label for=select_sr>SR</label> <input id=select_r type=checkbox checked=checked class=large-checkbox><label for=select_r>R</label> <input id=select_other type=checkbox checked=checked class=large-checkbox><label for=select_other>その他</label> <button id=show_filter style=display:none>更に絞込</button> </div> <div id=filter style=display:none class=filters> <div id=filter-versions> </div> <div id=filter-rarities> <input id=select_normal type=checkbox checked=checked class=large-checkbox><label for=select_normal>アーケード</label> <input id=select_pocket type=checkbox checked=checked class=large-checkbox><label for=select_pocket>ぽけっと</label> </div> </div> </div> <div id=main> </div> <div class=header> <div class=close-button-wapper> <button id=close class=close-button>Close</button> </div> <h3 class=title>三国志大戦 解任ブックマークレット</h3> <div class=copy-area> <button id=copy>選択した武将をコピー</button> <a href=https://3594t-touen.jp/recruitments/new target=_blank>解任新規作成へ</a><small>(三国志大戦 桃園 に遷移します)</small> </div> <div id=message></div> </div> "},function(e,t){e.exports="<span class=list-row-item>${CARD_NUMBER} ${POCKET} ${STATE} <a href=${LINK} target=_blank>${VERSION} ${RARITY}${NAME}</a></span> ${GEN_MAIN} ${GEN_SUBS} | 期限:${HIRE_LIMIT} "},function(e,t){e.exports="武将名のリンクから登用ページへ行けます <br/> <br/> <table border=1 cellspacing=0> <tbody>${COPY_AREA_ROWS}</tbody> </table> <br/> <br/> この投稿は 三国志大戦 解任ブックマークレット(<a href=https://boushi-bird.github.io/3594t-discard-bookmarklet/ >https://boushi-bird.github.io/3594t-discard-bookmarklet/</a>) により作成しています。 "},function(e,t){e.exports="<tr> <td rowspan=4> <span style=font-size:8px>${CARD_TYPE}</span><br> ${CARD_IMAGE} </td> <td> <span style=font-size:18px> ${STATE} <a href=${LINK} target=_blank>${VERSION} ${RARITY}${NAME}</a> ${GEN_MAIN} ${GEN_SUBS} </span> </td> </tr> <tr> <td> <span style=font-size:10px>No.</span> <span style=font-size:18px>${CARD_NUMBER}</span> </td> </tr> <tr> <td> <span style=font-size:12px>登用期限: ${HIRE_LIMIT}</span> </td> </tr> <tr> <td colspan=2><span style=font-size:4px>検索用: ${SEARCH_TEXTS}</span></td> </tr> "},function(e,t,n){"use strict";function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}n.r(t);var i=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.baseData=t,this.cardData=n}var t,n,i;return t=e,(n=[{key:"searchByCardIndex",value:function(e){var t,n;return n=(t=null!=e?this.cardData[parseInt(e)]:null)?this.baseData.GENERAL[parseInt(t.idx)]:null,{card:this.createLabeledCard(t),general:this.createLabeledGeneral(n)}}},{key:"createLabeledCard",value:function(e){var t=this;if(!e)return null;var n=this.baseData.GEN_MAIN.filter((function(t){return t.key===e.gen_main})).map((function(e){return e}))[0],r=[e.gen_sub0,e.gen_sub1,e.gen_sub2].filter((function(e){return""!==e})).map((function(e){return parseInt(e)})).map((function(e){return t.baseData.GEN_SUB[e]})),i=e.hire_limit_date,a=e.fire_date,o="1"===e.pocket;return{number:e.number,genMain:n,genSubs:r,fireDate:a,hireLimitDate:i,pocket:o}}},{key:"createLabeledGeneral",value:function(e){if(!e)return null;var t=this.baseData.PERSONAL[parseInt(e.personal)],n=this.baseData.STATE[parseInt(e.state)],r=e.major_version,i="Ex"===this.baseData.VER_TYPE[parseInt(e.ver_type)].name?"EX":e.add_version,a="0"===i?"第".concat(r,"弾"):"第".concat(r,"弾-").concat(i),o="https://3594t.net/datalist/?v=GENERAL&amp;s=POPUP_GENERAL&amp;c=".concat(e.code),s=e.avatar?"https://3594t.net/img/avatar/".concat(e.avatar,".png"):void 0,c=e.pocket_avatar?"https://3594t.net/img/avatar/".concat(e.pocket_avatar,".png"):void 0;return{name:t.name,rarity:e.rarity,state:n,version:a,url:o,major:r,minor:i,thumbArcadeUrl:s,thumbPocketUrl:c}}}])&&r(t.prototype,n),i&&r(t,i),e}(),a=n(0),o=n.n(a),s=n(1),c=n.n(s),l=n(2),u=n.n(l);var d=function(e){var t={p:function(n,r){return e=e.replace(function(e){return new RegExp("\\$\\{".concat(e,"\\}"),"g")}(n),r),t},b:function(){return e}};return t};function p(e,t){return e&&14===e.length?t({yyyy:e.substr(0,4),MM:e.substr(4,2),dd:e.substr(6,2),hh:e.substr(8,2),mm:e.substr(10,2),ss:e.substr(12,2)}):""}function h(e){return("00"+(parseInt(e)||0).toString(16)).substr(-2)}function f(e){var t=e.red,n=e.green,r=e.blue,i="#"+h(t)+h(n)+h(r);return'<font color="'.concat(i,'">').concat(e.name_short,"</font>")}function m(e){var t=e.name_short;return"復活"===t?"活":t[0]}function b(e){var t=m(e),n="black";switch(t){case"兵":n="green";break;case"速":n="blue";break;case"攻":n="red";break;case"活":n="#ffd12a"}return'<font color="'.concat(n,'">').concat(t,"</font>")}var v=function(e){var t=e.MM,n=e.dd,r=e.hh,i=e.mm;return"".concat(t,"/").concat(n," ").concat(r,":").concat(i)},y=n(3),_=n.n(y),g=n(4),k=n.n(g),E=function(e){var t=e.yyyy,n=e.MM,r=e.dd,i=e.hh,a=e.mm;return"".concat(t,"/").concat(n,"/").concat(r," ").concat(i,":").concat(a)};function x(e){switch(e){case"兵":return 1;case"速":return 2;case"攻":return 3;case"活":return 4;default:return 99}}function I(e){var t=e.card,n=e.general,r="".concat(n.version).concat(n.state.name_short).concat(n.rarity).concat(n.name),i=function(e){var t=e.map(m);return t.sort((function(e,n){return(t.filter((function(t){return t===e})).length<=1?x(e):0)-(t.filter((function(e){return e===n})).length<=1?x(n):0)})),t}(t.genSubs),a="".concat(t.genMain.name_short).concat(i.join(""));return[t.fireDate,t.hireLimitDate].map((function(e){return p(e,(function(e){var t=e.yyyy,n=e.MM;return"".concat(t).concat(n)}))})).map((function(e){return"".concat(e).concat(r,"_").concat(a)}))}var w=function(e){var t=e.cards.map((function(e){var t=e.card,n=e.general;return function(e){var t=e.thumbUrl?'<img src="'.concat(e.thumbUrl,'" width="48" height="48" />'):"",n=e.pocket?"ぽけっと":"アーケード";return d(k.a).p("CARD_IMAGE",t).p("CARD_NUMBER",e.num).p("CARD_TYPE",n).p("STATE",e.state).p("LINK",e.link).p("VERSION",e.version).p("RARITY",e.rarity).p("NAME",e.name).p("GEN_MAIN",e.genMain).p("GEN_SUBS",e.genSubs.join("")).p("HIRE_LIMIT",p(e.hireLimit,E)).p("SEARCH_TEXTS",e.searchTexts.join(" ")).b()}({thumbUrl:t.pocket?n.thumbPocketUrl:n.thumbArcadeUrl,num:t.number,pocket:t.pocket,state:f(n.state),link:n.url,version:n.version,rarity:n.rarity,name:n.name,genMain:t.genMain.name_short,genSubs:t.genSubs.map(b),hireLimit:t.hireLimitDate,searchTexts:I({card:t,general:n})})}));return d(_.a).p("COPY_AREA_ROWS",t.join("")).b()};function A(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var C=function(e){for(;e.firstChild;)e.removeChild(e.firstChild)},R=new(function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e);var n=t.createElement("iframe");n.style.position="fixed",n.style.top="5px",n.style.left="5px",n.style.width="90%",n.style.minWidth="480px",n.style.maxWidth="720px",n.style.minHeight="".concat(90,"%"),n.style.height="".concat(.9*window.innerHeight,"px"),n.style.backgroundColor="white",n.style.zIndex="1000",t.body.appendChild(n),this.iframe=n,this.results=[],this.versionFilters={},this.filterCondition={verTypes:{normal:!0,pocket:!0},rarities:{sr:!0,r:!0,other:!0},versions:[]};var r=this.iframe.contentWindow;if(r){this._document=r.document,this._document.body.innerHTML=c.a;var i=(new DOMParser).parseFromString(o.a,"text/html");i.firstChild&&this._document.head.appendChild(i.firstChild),this.setupEvents()}}var t,n,r;return t=e,(n=[{key:"setupEvents",value:function(){var e=this,t=this._document.getElementById("close");t&&t.addEventListener("click",(function(){e.hide()}));var n=this._document.getElementById("copy");n&&n.addEventListener("click",(function(){e.copy()}));var r=this._document.getElementById("select_all");r&&r.addEventListener("click",(function(){e.selectionChangeAll(!0)}));var i=this._document.getElementById("clear_all");i&&i.addEventListener("click",(function(){e.selectionChangeAll(!1)}));var a=this._document.getElementById("select_normal"),o=this._document.getElementById("select_pocket");[a,o].forEach((function(t){t&&t.addEventListener("click",(function(){e.filterCondition.verTypes={normal:!!a&&a.checked,pocket:!!o&&o.checked},e.updateSelectList()}))}));var s=this._document.getElementById("select_sr"),c=this._document.getElementById("select_r"),l=this._document.getElementById("select_other");[s,c,l].forEach((function(t){t&&t.addEventListener("click",(function(){e.filterCondition.rarities={sr:!!s&&s.checked,r:!!c&&c.checked,other:!!l&&l.checked},e.updateSelectList()}))}));var u=this._document.getElementById("filter"),d=this._document.getElementById("show_filter");d&&d.addEventListener("click",(function(){u&&(u.style.display="inline"),d.style.display="none"}))}},{key:"show",value:function(){this.iframe.style.display="block"}},{key:"hide",value:function(){this.iframe.style.display="none"}},{key:"selectionChangeAll",value:function(e){this.results.forEach((function(t){t.selected=e})),this.updateSelectList()}},{key:"copy",value:function(){var e=this.getVisibleResults().filter((function(e){return e.selected}));if(0!==e.length){var t=this._document.createElement("div");this._document.body.appendChild(t),t.innerHTML=w({cards:e});var n=this._document.getSelection();n&&n.selectAllChildren(t);var r=this._document.execCommand("copy");if(this._document.body.removeChild(t),r){var i=this._document.getElementById("message");i&&(i.innerHTML="<small>コピーしました!</small>"),setTimeout((function(){i&&(i.innerHTML="")}),2e3)}}else window.alert("1つ以上選択する必要があります")}},{key:"update",value:function(e,t){var n=this;this.results=[],this.versionFilters={},this.filterCondition.versions=[],e.forEach((function(e){var r=t.searchByCardIndex(e),i=r.card,a=r.general;if(i&&a){n.results.push({selected:!0,card:i,general:a});var o="第".concat(a.major,"段");if(!n.versionFilters[o]){var s=a.major;n.versionFilters[o]=s,n.filterCondition.versions.push(o)}}})),this.updateFilters(),this.updateSelectList()}},{key:"getVisibleResults",value:function(){var e=this;return this.results.filter((function(t){var n=t.card.pocket,r=e.filterCondition.verTypes,i=r.normal,a=r.pocket;return n?a:i})).filter((function(t){var n=t.general.rarity,r=e.filterCondition.rarities,i=r.sr,a=r.r,o=r.other;return"SR"===n?i:"R"===n?a:o})).filter((function(t){var n=t.general.major;return e.filterCondition.versions.some((function(t){var r=e.versionFilters[t];return n===r}))}))}},{key:"updateFilters",value:function(){var e=this,t=this._document.getElementById("filter-versions");if(t){C(t);var n=Object.keys(this.versionFilters);n.sort((function(t,n){return parseInt(e.versionFilters[t])-parseInt(e.versionFilters[n])})),n.forEach((function(n,r){var i="filter_v".concat(r),a=e._document.createElement("input");a.setAttribute("id",i),a.setAttribute("type","checkbox"),a.setAttribute("class","large-checkbox"),a.checked=e.filterCondition.versions.indexOf(n)>=0,a.addEventListener("click",(function(){var t=e.filterCondition.versions.filter((function(e){return e!==n}));a.checked&&t.push(n),e.filterCondition.versions=t,e.updateSelectList()}));var o=e._document.createElement("label");o.setAttribute("for",i),o.setAttribute("style","margin-right:10px;"),o.innerHTML=n,t.appendChild(a),t.appendChild(o)}));var r=this._document.getElementById("filter"),i=this._document.getElementById("show_filter");i&&(n.length>0?i.style.display="inline":i.style.display="none"),r&&(r.style.display="none")}}},{key:"updateSelectList",value:function(){var e=this,t=this._document.getElementById("main");t&&(C(t),this.getVisibleResults().forEach((function(n){var r=e._document.createElement("div"),i=e._document.createElement("input");i.setAttribute("type","checkbox"),i.setAttribute("class","list-checkbox large-checkbox"),i.checked=n.selected,i.addEventListener("click",(function(){n.selected=i.checked}));var a=e._document.createElement("span");a.style.verticalAlign="super",a.innerHTML=e.createListRow(n),r.appendChild(i),r.appendChild(a),t.appendChild(r)})))}},{key:"createListRow",value:function(e){var t,n=e.card,r=e.general;return t={num:n.number,pocket:n.pocket,state:f(r.state),link:r.url,version:r.version,rarity:r.rarity,name:r.name,genMain:n.genMain.name_short,genSubs:n.genSubs.map(b),hireLimit:n.hireLimitDate},d(u.a).p("CARD_NUMBER",t.num).p("POCKET",t.pocket?"(ぽ)":"").p("STATE",t.state).p("LINK",t.link).p("VERSION",t.version).p("RARITY",t.rarity).p("NAME",t.name).p("GEN_MAIN",t.genMain).p("GEN_SUBS",t.genSubs.join("")).p("HIRE_LIMIT",p(t.hireLimit,v)).b()}}])&&A(t.prototype,n),r&&A(t,r),e}())(document),S=function(){if(!(window.member_card_fire_date&&window.member_data&&window.member_data.CARD&&window.base_data))return window.alert("[三国志大戦 解任ブックマークレット]\nデータを読み込み中またはデータリストのページではありません。"),void R.hide();R.show();var e=new i(window.base_data,window.member_data.CARD),t=window.member_card_fire_date.map((function(e){return e.index}));R.update(t,e)};window.VsD8NEfx=S,S()}]);