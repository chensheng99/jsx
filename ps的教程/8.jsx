/* 
document方法-01 文件关闭+文件打开+创建文件副本

close //关闭
save //保存
duplicate //创建副本

*/

const app = app
// 获取文档对象的方式
const doc = app.activeDocument

// 不保存文件，直接关闭文档
// app.activeDocument.close(SaveOptions.DONOTSAVECHANGES)

// 保存文件
// app.activeDocument.save(SaveOptions.SAVECHANGES)

// 提示保存文件
// app.activeDocument.close(SaveOptions.PROMPTTOSAVECHANGES)

// 错误处理
// try {
//     app.activeDocument.close(SaveOptions.PROMPTTOSAVECHANGES)
// } catch (error) {

// }

// 保存文件
// app.activeDocument.save()

// 创建副本
// app.activeDocument.duplicate()

// app.activeDocument.duplicate(文档名称, 是否合并所有图层)
app.activeDocument.duplicate('新文件', false)