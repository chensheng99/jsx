/* 
document属性_03 | 当前图层/当前通道/当前记录状态

activeLayer //当前选中的图层/图层组
activeChannels//当前选中的通道（少用）
activeHistoryState //当前选中的历史状态（少用）
*/

const app = app

// 获取文档对象的方式
const doc = app.activeDocument

// 只能获取到当前选中的图层，不能获取多个图层
alert(app.activeDocument.activeLayer.name)

// 跳转到Hello文本图层--指定图层
// 需要先获取到图层对象，再跳转
// doc.artLayers.getByName("图层 1")
doc.activeLayer = doc.artLayers.getByName("Hello")
