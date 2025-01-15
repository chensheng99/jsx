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
// 调整宽度函数
function adjustWidth() {
    runAction("width-27", "Ai-action");
}

// 调整高度函数
function adjustHeight() {
    runAction("height-32", "Ai-action");
}

/**
 * 执行路径查找器操作
 * @param {string} commandName - 路径查找器命令名称
 */
function runPathfinder(commandName) {
    try {
        // 执行指定的路径查找器命令
        app.executeMenuCommand(commandName);

        // 扩展操作结果
        app.executeMenuCommand("expandStyle");

        // 取消编组（如果需要）
        app.executeMenuCommand("ungroup");
    } catch (error) {
        alert("执行路径查找器操作失败:\n错误信息: " + error.message);
    }
}

// 示例调用：执行修边操作
runPathfinder("Live Pathfinder Trim");


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



var doc = app.activeDocument;
// 获取素材文档的名字，去掉扩展名，保留文件名
var docName = doc.name.replace(/\.[^\.]+$/, "");

// 执行全选并复制
app.activeDocument.selection = null; // 取消选中
app.executeMenuCommand("selectall"); // 全选

// 运行扩展动作
runAction("扩展", "Ai-action");
// runPathfinder("Live Pathfinder Trim"); // 执行路径查找器修边
app.executeMenuCommand("group"); // 编组
app.executeMenuCommand("copy"); // 复制

// 切换到指定的文档
app.documents["黑白-cyc.ai"].activate();

// 运行垂直居中动作
runAction("垂直居中", "Ai-action");

// 获取选中对象集合
var selection = app.activeDocument.selection;

// 检查是否有选中对象
if (selection.length > 0) {
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

    // 计算宽度和高度（单位：点），取绝对值
    var width = Math.abs(maxX - minX);
    var height = Math.abs(maxY - minY);

    // 转换为厘米
    var pointsToCm = 2.54 / 72;
    var widthCm = width * pointsToCm;
    var heightCm = height * pointsToCm;

    // 判断调整宽高
    if (widthCm > 27 || heightCm > 32 || widthCm < 27 || heightCm < 32) {
        if (widthCm / heightCm > 27 / 32) {
            if (widthCm !== 27) {
                // alert("宽度不符合要求，将调整宽度");
                app.doScript("width-27", "Ai-action");
            }
        } else {
            if (heightCm !== 32) {
                // alert("高度不符合要求，将调整高度");
                app.doScript("height-32", "Ai-action");
            }
        }
    }
} else {
    alert("没有对象可选！");
}

// 获取黑白文档的路径
var docPath = doc.path.fsName; // 使用 fsName 获取路径
var folderPath = new Folder(docPath + "/" + docName);

// 检查文件夹是否已存在，如果不存在则创建
// if (!folderPath.exists) {
//     var success = folderPath.create();
//     if (success) {
//         // 保存 .pdf 文件
//         var pdfFile = new File(folderPath.fsName + "/" + "黑白-cyc" + ".pdf");
//         var pdfOptions = new PDFSaveOptions();
//         app.activeDocument.saveAs(pdfFile, pdfOptions); // 使用 saveAs 方法保存 .pdf
//         // alert("保存 .pdf 文件成功：" + pdfFile.fsName);

//         // 保存 .ai 文件
//         var aiFile = new File(folderPath.fsName + "/" + "黑白-cyc" + ".ai");
//         var aiOptions = new IllustratorSaveOptions();
//         aiOptions.compatibility = Compatibility.ILLUSTRATOR17; // 设置兼容性
//         aiOptions.embedICCProfile = true;
//         aiOptions.pdfCompatible = true;
//         app.activeDocument.saveAs(aiFile, aiOptions); // 使用 saveAs 方法保存 .ai
//         // alert("保存 .ai 文件成功：" + aiFile.fsName);

//         // 保存 .png 文件
//         var pngFile = new File(folderPath.fsName + "/" + "黑白-cyc" + ".png");
//         var pngOptions = new ExportOptionsPNG24();
//         pngOptions.artBoardClipping = true;
//         app.activeDocument.exportFile(pngFile, ExportType.PNG24, pngOptions);
//         // alert("保存 .png 文件成功：" + pngFile.fsName);
//     } else {
//         alert("文件夹创建失败：" + folderPath.fsName);
//     }
// } else {
//     alert("文件夹已存在：" + folderPath.fsName);
// }