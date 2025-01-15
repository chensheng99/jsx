/* 
1. hello world - Photoshop jsx 脚本教程 | cep教程
*/
function main() {
    //新建文档
    var docRef = app.documents.add(new UnitValue(600, "px"), new UnitValue(300, "px"))
    //新建文本图层，并设置相关属性
    // 添加一个新的图层到文档中
    var artLayerRef = docRef.artLayers.add()

    // 设置新图层的类型为文本图层
    artLayerRef.kind = LayerKind.TEXT

    // 获取文本图层的引用
    var textItemRef = artLayerRef.textItem

    // 设置文本内容为 "Hello,World!"
    textItemRef.contents = "Hello,World!"

    // 设置文本大小为 80 像素
    textItemRef.size = new UnitValue(80, 'px')

}
main()