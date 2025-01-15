// 获取Photoshop应用程序的实例
var app = app;

// 获取当前活动文档
var doc = app.activeDocument;

// 获取文档的完整文件名
var fileName = doc.name;

// 使用正则表达式提取文件后缀名
var fileExtension = fileName.split('.').pop();

// 输出文件后缀名
// alert("当前文档的后缀名是: " + fileExtension);
// 使用三元运算符判断文件后缀名是否为 "psd"，如果是则执行main()函数，否则关闭文档
fileExtension === "psd" ? main() : doc.close(SaveOptions.DONOTSAVECHANGES);

/* 定义一个函数保存JPEG文件
    第一个参数 layerGroupName 是图层组的名字
    第二个参数 layerName 是图层的名字
    第三个参数 saveName 是存储图片的名字，如果传入的参数是布尔值false，则不保存文件，只隐藏图层
    第四个参数 isHide 是控制隐藏图层和图层组的变量
*/

function saveJPEG(layerGroupName, layerName, saveName, isHide) {
    // 如果saveName是 false，则不保存文件，只隐藏图层
    if (saveName !== false) {
        // 创建一个新的JPEG保存选项对象
        var options = new JPEGSaveOptions();
        // 设置JPEG的质量
        options.quality = 12;
        // options.quality = 8;
        // options.quality = 5;
        // options.quality = 3;
        // 定义保存文件的路径
        var savePath = decodeURI(doc.path) + "/" + saveName + ".jpg";
        var file = new File(savePath);
        doc.saveAs(file, options, true, Extension.LOWERCASE);
        // 根据isHide参数隐藏图层
        showLayer(layerGroupName, layerName, isHide);
    } else {
        showLayer(layerGroupName, layerName, isHide);
    }
}

/* 定义一个函数原来控制隐藏显示图层
    第一个参数 layerGroupName 是图层组的名字
    第二个参数 layerName 是图层的名字
    第三个参数 isHide 是控制隐藏图层和图层组的变量
 */
function showLayer(layerGroupName, layerName, isHide) {
    // 如果layerName是null，则隐藏整个图层组,否则隐藏图层组里面指定的图层
    if (layerName === null) {
        doc.layers.getByName(layerGroupName).visible = isHide;
    } else {
        doc.layers.getByName(layerGroupName).layers.getByName(layerName).visible = isHide;
    }
}

// 定义一个函数来移动图层,第一个参数是图层组的名字，第二个参数是图层的名字，第三个参数是x轴偏移量，第四个参数是y轴偏移量
function moveLayer(layerGroupName, layerName, deltaX, deltaY) {
    doc.layers.getByName(layerGroupName).layers.getByName(layerName).translate(deltaX, deltaY);
}

// 隐藏所有图层
function hideAllLayers(layers) {
    for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];
        if (layer.typename === "LayerSet") {
            hideAllLayers(layer.layers); // 递归处理图层组
        }
        layer.visible = false; // 隐藏图层
    }
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


// 主函数，用于执行保存和隐藏操作
function main() {

    showAllLayers(doc.layers); // 调用显示所有图层

    // 保存 1-4 组的图层
    saveJPEG("1-4", "1-1", "1-1", false);
    saveJPEG("1-4", "1-2", "1-2", false);
    // 移动img图层0像素,-70像素
    moveLayer("1-4", "img", 0, -70);
    saveJPEG("1-4", "1-3", "1-3", false);
    saveJPEG("1-4", "1-4", "1-4", false);
    // 恢复img图层0像素,70像素
    moveLayer("1-4", "img", 0, 70);
    saveJPEG("1-4", "img", false, false);
    // 保存 2-4 组的图层
    saveJPEG("2-4", "2-1", "2-1", false);
    saveJPEG("2-4", "2-3", "2-3", false);
    saveJPEG("2-4", "img2", false, false);
    saveJPEG("2-4", "2-2", "2-2", false);
    saveJPEG("2-4", "img3", false, false);
    saveJPEG("2-4", "2-4", "2-4", false);
    saveJPEG("2-4", "img4", false, false);
    // 保存其他组
    saveJPEG("CX", "CX-B", "CX-B", false);
    saveJPEG("CX", null, "CX-H", false);
    moveLayer("DILUN", "img6", 0, 28);
    saveJPEG("DILUN", null, "DILUN", false);
    // saveJPEG("QL-H",null, "QL-H", false);
    // saveJPEG("QL-B",null, "QL-B", false);

    showAllLayers(doc.layers); // 调用显示所有图层

    // 运行编辑好的ps动作
    app.doAction("裁剪1500", "action-g");

    // 移动img图层0像素,-70像素
    moveLayer("1-4", "img", 0, -70);
    moveLayer("1-4", "1-1", 0, -70);
    moveLayer("1-4", "1-2", 0, -70);
    // // 保存1500的图片
    saveJPEG("1-4", "1-1", "3-1", false);
    saveJPEG("1-4", "1-2", "3-2", false);
    saveJPEG("1-4", "1-3", "3-3", false);
    saveJPEG("1-4", "1-4", "3-4", false);

    // 在资源管理器中打开文件所在的文件夹
    // var psdFilePath = decodeURI(doc.path) + "/" + doc.name;
    // var psdFile = new File(psdFilePath);
    // psdFile.parent.execute();

    // 关闭当前文档不存储
    doc.close(SaveOptions.DONOTSAVECHANGES);
}

// 执行主函数
// main();