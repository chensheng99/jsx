// 获取 Photoshop 应用实例
var app = app;

// 获取当前活动文档
var doc = app.activeDocument;

// 获取当前文档的名字
var docName = doc.name;
// 去掉扩展名
docName = docName.replace(/\.[^\.]+$/, "");
// alert("当前文档的名字是：" + docName);
// 定义一个函数，导出指定子图层组为JPEG图片
// customFileName: 自定义文件名（可选）
function exportJPEG(customFileName) {
    try {
        // 创建导出选项
        var options = new ExportOptionsSaveForWeb();
        options.format = SaveDocumentType.PNG; // 设置导出格式为PNG
        
        options.quality = 80; // 设置导出JPEG图片质量（范围：0-100）

        // 设置导出文件的路径
        var saveName = customFileName ? customFileName : subGroupName; // 如果提供了自定义文件名，使用该名称；否则使用子图层组名称
        // alert("图片的名称" + saveName);
        var savePath = decodeURI(doc.path) + "/" + saveName + ".png"; // 组合路径
        // alert("图片的路径" + savePath);
        var file = new File(savePath); // 创建文件对象

        // 执行导出操作
        doc.exportDocument(file, ExportType.SAVEFORWEB, options);

        // 成功导出提示
        // alert("导出完成: " + savePath);
    } catch (e) {
        // 异常处理，提示错误信息
        alert("导出失败: " + e.message);
    }
}

// 调用函数，导出指定子图层组为JPEG图片
exportJPEG(docName);