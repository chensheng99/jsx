/* 1) 创建 CSInterface 实例 */
var csInterface = new CSInterface();

/* 2) 获取按钮元素并添加点击事件 */
var openButton = document.querySelector("#open-button");
openButton.addEventListener("click", openDoc);

// 点击按钮时，调用 openDoc 函数
function openDoc() {
  // 通过 CSInterface 调用 ExtendScript 中的 openDocument 函数
  csInterface.evalScript("openDocument()");
}

// 切换到 "黑白-cyc.ai" 文档的按钮点击事件
var switchButton = document.querySelector("#switch-button");
switchButton.addEventListener("click", switchToDocument);

function switchToDocument() {
  // 调用 ExtendScript 中的 qiehuan 函数
  csInterface.evalScript("qiehuan()");
}
