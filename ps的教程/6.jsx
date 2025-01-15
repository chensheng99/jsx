/* 
document属性_02 | 文件相关功能模块的属性

        document  属性   文件相关功能模块的属性
        artLayers 属性   图层相关功能模块的属性
        layerSets 属性   图层组相关功能模块的属性
*/

// const app = app

// 获取文档对象的方式
// const doc = app.activeDocument

// 图层组不算里面，只算第一层的图层 
// alert("图层数量：" + doc.artLayers.length)
// 添加一个图层
// doc.artLayers.add()
// 获取图层对象
// const layer = doc.artLayers.getByName("图层 1")
// alert("图层名称：" + layer.name + "  图层类型：" + layer.kind)
// 删除一个图层
// doc.artLayers[0].remove()

// 获取图层组的数量
// alert("图层组数量：" + doc.layerSets.length)
// 添加一个图层组
// doc.layerSets.add()
// 获取图层组对象
// const layerSet = doc.layerSets.getByName("图层组 1")
// alert("图层组名称：" + layerSet.name + "  图层组类型：" + layerSet.kind)
// 删除一个图层组
// doc.layerSets.removeAll()