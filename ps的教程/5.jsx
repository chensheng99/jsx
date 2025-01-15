/* 
document属性_01 | 获取 PS 文件的基本信息 

*/
const app = app

const doc = app.activeDocument
// 获取文档对象的信息
// 中文路径会出现乱码，需要转码
// alert("完整路径：" + doc.fullName)
// alert("文档名称：" + doc.name)
// alert("文件目录：" + doc.path)

// 转码后的
// alert("完整路径：" + decodeURI(doc.fullName))
// alert("文档名称：" + decodeURI(doc.name))
// alert("文件目录：" + decodeURI(doc.path))

// 获取文档的高度、宽度、颜色模式、分辨率
// alert("文档高度：" + doc.height)
// alert("文档宽度：" + doc.width)
// alert("文档颜色模式：" + doc.mode)
// alert("文档分辨率：" + doc.resolution)

// 获取文件简介作者名字
// alert("文档作者：" + doc.info.author)

// 使用if判断有没有背景图层
// if (doc.backgroundLayer) {
//     alert("有背景图层" + doc.backgroundLayer.name)
// } else {
//     alert("没有背景图层")
// }

// 当前文档是否处于保存状态
// alert("当前文档是否处于保存状态：" + doc.saved)

// 判断文档有没有进入快速蒙版状态
// alert("当前文档是否处于快速蒙版状态：" + doc.quickMaskMode)