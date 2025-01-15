// 这个是根据30-34厘米画布的脚本，根据素材的名字生成文件夹并保存,图片,pdf,ai(左胸的)
// 先获取素材文档的名字
var doc = app.activeDocument;
// 然后去掉扩展名
var docName = doc.name.replace(/\.[^\.]+$/, "");
alert("素材文档名：" + docName);

// 执行全选并复制
app.activeDocument.selection = null; // 取消选中
app.executeMenuCommand("selectall"); // 全选
// 运行扩展动作
runAction("扩展", "Ai-action");
// runPathfinder("Live Pathfinder Trim"); // 执行路径查找器修边
app.executeMenuCommand("group"); // 编组
app.executeMenuCommand("copy"); // 复制

// 切换到30-34厘米的ai文档(切换到黑白-cyc.ai)
// var targetDoc = app.documents["黑白正-cyc.ai"];
// targetDoc.activate();  // 激活目标文档，会得到 "黑白-cyc.ai" 文档的路径，而不是切换前文档的路径
// 解决了不能切换文档的问题
var targetDoc;
for (var i = 0; i < app.documents.length; i++) {
    if (/^黑白/.test(app.documents[i].name)) {
        targetDoc = app.documents[i];
        break; // 找到符合条件的文档后就停止遍历
    }
}

if (targetDoc) {
    targetDoc.activate(); // 激活文档
}


// // 获取黑白-cyc.ai的路径
// var targetDocPath = targetDoc.path.fsName; // 获取目标文档路径
// alert("黑白-cyc.ai路径是:" + decodeURI(targetDocPath)); // 显示目标文档路径

// // 根据黑白-cyc.ai创建文件夹
// var folderPath = new Folder(targetDocPath + "/" + docName);
// alert("文件夹路径是:" + decodeURI(folderPath.fsName));



/**
 * 调用指定动作
 * @param {string} actionName - 动作的名称
 * @param {string} actionSet - 动作组的名称
 */
function runAction(actionName, actionSet) {
    try {
        app.doScript(actionName, actionSet);
    } catch (error) {
        alert("运行动作失败:" + actionName + "\n错误信息:" + error.message);
    }
}
runAction("左胸", "Ai-action");



/**
 * 获取选中对象的宽度和高度（厘米）
 * @returns {Object|null} 包含宽度和高度的对象 {widthCm, heightCm}，或 null 如果没有选中对象
 */
function getSelectionDimensions() {
    var selection = app.activeDocument.selection;

    if (selection.length === 0) {
        alert("没有对象可选！");
        return null;
    }

    // 初始化边界值
    var minX = Infinity,
        minY = Infinity,
        maxX = -Infinity,
        maxY = -Infinity;

    // 遍历选中对象，获取它们的边界
    for (var i = 0; i < selection.length; i++) {
        var item = selection[i];
        var bounds = item.visibleBounds; // [左, 上, 右, 下]
        minX = Math.min(minX, bounds[0]);
        minY = Math.min(minY, bounds[1]);
        maxX = Math.max(maxX, bounds[2]);
        maxY = Math.max(maxY, bounds[3]);
    }

    // 计算宽度和高度（单位：点）
    var width = Math.abs(maxX - minX);
    var height = Math.abs(maxY - minY);

    // 转换为厘米
    var pointsToCm = 2.54 / 72;
    var widthCm = width * pointsToCm;
    var heightCm = height * pointsToCm;

    return { widthCm: widthCm, heightCm: heightCm };
}

var dimensions = getSelectionDimensions();

if (dimensions) {
    var widthCm = dimensions.widthCm;
    var heightCm = dimensions.heightCm;

    // alert("选中对象的宽度: " + widthCm.toFixed(2) + " cm, 高度: " + heightCm.toFixed(2) + " cm");

    // 在这里继续执行其他操作
    if (widthCm > 10) {
        runAction("width-10", "Ai-action");
    }
    if (heightCm > 10) {
        runAction("height-10", "Ai-action");
    }
} else {
    alert("未检测到选中对象！");
}
var dimensions2 = getSelectionDimensions();
// alert("调整后的选中对象的宽度: " + dimensions2.widthCm.toFixed(2) + " cm, 高度: " + dimensions2.heightCm.toFixed(2) + " cm");

var docPath = doc.path.fsName; // 使用 fsName 获取路径
var folderPath = new Folder(docPath + "/" + docName);

// 检查文件夹是否已存在，如果不存在则创建
if (!folderPath.exists) {
    var success = folderPath.create();
    if (success) {
        // 保存 .pdf 文件
        var pdfFile = new File(folderPath.fsName + "/" + "黑白正-cyc" + ".pdf");
        var pdfOptions = new PDFSaveOptions();
        app.activeDocument.saveAs(pdfFile, pdfOptions); // 使用 saveAs 方法保存 .pdf
        // alert("保存 .pdf 文件成功：" + pdfFile.fsName);

        // 保存 .ai 文件
        var aiFile = new File(folderPath.fsName + "/" + "黑白正-cyc" + ".ai");
        var aiOptions = new IllustratorSaveOptions();
        aiOptions.compatibility = Compatibility.ILLUSTRATOR17; // 设置兼容性
        aiOptions.embedICCProfile = true;
        aiOptions.pdfCompatible = true;
        app.activeDocument.saveAs(aiFile, aiOptions); // 使用 saveAs 方法保存 .ai
        // alert("保存 .ai 文件成功：" + aiFile.fsName);

        // 保存 .png 文件
        var pngFile = new File(folderPath.fsName + "/" + "黑白正-cyc" + ".png");
        var pngOptions = new ExportOptionsPNG24();
        pngOptions.artBoardClipping = true;
        app.activeDocument.exportFile(pngFile, ExportType.PNG24, pngOptions);
        // alert("保存 .png 文件成功：" + pngFile.fsName);
    } else {
        alert("文件夹创建失败：" + folderPath.fsName);
    }
} else {
    alert("文件夹已存在：" + folderPath.fsName);
}