var doc = app.activeDocument; // 获取当前打开的文档

// 获取文档的完整文件名
var fileName = doc.name;

// 使用正则表达式提取文件后缀名
var fileExtension = fileName.split('.').pop();

// 输出文件后缀名
// alert("当前文档的后缀名是: " + fileExtension);
// 使用三元运算符判断文件后缀名是否为 "psd"，如果是则执行main()函数，否则关闭文档
fileExtension === "psd" ? main() : doc.close(SaveOptions.DONOTSAVECHANGES);



function exportLayerGroupAsJPG(layerGroupName, isHide) {
    var outputFolder = doc.path; // 使用当前PSD文件路径作为输出路径

    // 找到图层组
    var layerGroup = null;
    try {
        layerGroup = doc.layerSets.getByName(layerGroupName);
    } catch (e) {
        alert("未找到名为 \"" + layerGroupName + "\" 的图层组。");
        return;
    }

    // 设置导出的文件路径
    var outputFile = new File(outputFolder + "/" + layerGroupName + ".jpg");

    // 导出为JPG
    var exportOptions = new ExportOptionsSaveForWeb();
    exportOptions.format = SaveDocumentType.JPEG;
    exportOptions.quality = 80; // 设置质量

    doc.exportDocument(outputFile, ExportType.SAVEFORWEB, exportOptions);

    // alert("导出完成！文件保存至：" + outputFile.fsName);
    showLayer(layerGroupName, isHide);
}

/* 
定义一个函数原来控制隐藏显示图层
    第一个参数 layerGroupName 是图层组的名字
    第二个参数 isHide 是控制隐藏图层和图层组的变量
 */
function showLayer(layerGroupName, isHide) {
    doc.layers.getByName(layerGroupName).visible = isHide;
}

// 定义一个函数来移动图层,第一个参数是图层组的名字，第二个参数是图层的名字，第三个参数是x轴偏移量，第四个参数是y轴偏移量
function moveLayer(layerGroupName, layerName, deltaX, deltaY) {
    doc.layers.getByName(layerGroupName).layers.getByName(layerName).translate(deltaX, deltaY);
}

// 显示所有图层
function showAllLayers(layers) {
    for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];
        if (layer.typename === "LayerSet") {
            showAllLayers(layer.layers); // 递归处理图层组
        }
        layer.visible = true; // 显示图层
    }
}

function main() {
    // 调用函数并传入图层组名称
    exportLayerGroupAsJPG("1-1", false);
    exportLayerGroupAsJPG("1-2", false);
    // 移动img图层0像素,-30像素
    moveLayer("黑白", "img", 0, -40);
    exportLayerGroupAsJPG("1-3", false);
    exportLayerGroupAsJPG("1-4", false);
    // moveLayer("黑白", "img", 0, 40);
    // showAllLayers(doc.layers); // 调用显示所有图层
    doc.close(SaveOptions.DONOTSAVECHANGES);
}
// main();
