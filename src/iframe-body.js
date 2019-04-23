module.exports = `
<button id="close" style="width:100%;max-width:380px;height:30px;">Close</button>
<h3>三国志大戦 解任ブックマークレット</h3>
<button id="copy">選択した武将をコピー</button>
<a href="https://3594t-touen.jp/recruitments/new" target="_blank">解任新規作成へ</a><small>(三国志大戦 桃園 に遷移します)</small>
<div id="message" style="height: 30px;"></div>
(ぽ)・・・ぽけっと武将
<div style="padding-left:40px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;">
<button id="select_all">すべて選択</button>
<button id="clear_all">すべて解除</button>
<input id="select_normal" type="checkbox" checked="checked" style="-ms-transform:scale(1.5,1.5);-webkit-transform:scale(1.5,1.5);transform:scale(1.5,1.5);"><label for="select_normal">アーケード</label>
<input id="select_pocket" type="checkbox" checked="checked" style="-ms-transform:scale(1.5,1.5);-webkit-transform:scale(1.5,1.5);transform:scale(1.5,1.5);"><label for="select_pocket">ぽけっと</label>
<button id="show_filter" style="display:none;">更に絞込</button>
</div>
<div id="filter" style="display:none;">
<div style="margin-top: 10px;margin-bottom: 10px;">
<input id="select_sr" type="checkbox" checked="checked" style="-ms-transform:scale(1.5,1.5);-webkit-transform:scale(1.5,1.5);transform:scale(1.5,1.5);"><label for="select_sr">SR</label>
<input id="select_r" type="checkbox" checked="checked" style="-ms-transform:scale(1.5,1.5);-webkit-transform:scale(1.5,1.5);transform:scale(1.5,1.5);"><label for="select_r">R</label>
<input id="select_other" type="checkbox" checked="checked" style="-ms-transform:scale(1.5,1.5);-webkit-transform:scale(1.5,1.5);transform:scale(1.5,1.5);"><label for="select_other">その他</label>
</div>
<div id="filter-versions" style="margin-bottom: 10px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;">
</div>
</div>
<div id="main">
</div>
`
