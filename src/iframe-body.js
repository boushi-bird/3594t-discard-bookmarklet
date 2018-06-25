module.exports = `
<button id="close">Close</button>
<h3>三国志大戦 解任ブックマークレット</h3>
<button id="copy">選択した武将をコピー</button>
<a href="https://3594t-touen.jp/recruitments/new" target="_blank">解任新規作成へ</a><small>(三国志大戦 桃園 に遷移します)</small>
<div id="message" style="height: 30px;"></div>
<div style="padding-left: 40px;">
<button id="select_all">すべて選択</button>
<button id="clear_all">すべて解除</button>
<input id="select_sr" type="checkbox" checked="checked"><label for="select_sr">SR</label>
<input id="select_r" type="checkbox" checked="checked"><label for="select_r">R</label>
<input id="select_other" type="checkbox" checked="checked"><label for="select_other">その他</label>
</div>
<div id="main">
</div>
`
