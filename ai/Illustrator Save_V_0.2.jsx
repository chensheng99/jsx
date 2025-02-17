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
// runPathfinder("Live Pathfinder Trim");


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

/* 
// 调用封装的函数
var dimensions = getSelectionDimensions();

if (dimensions) {
    var widthCm = dimensions.widthCm;
    var heightCm = dimensions.heightCm;

    alert("选中对象的宽度: " + widthCm.toFixed(2) + " cm, 高度: " + heightCm.toFixed(2) + " cm");

    // 在这里继续执行其他操作
    if (widthCm > 27) {
        runAction("width-27", "Ai-action");
    }
    if (heightCm > 32) {
        runAction("height-32", "Ai-action");
    }
} else {
    alert("未检测到选中对象！");
}
 */

var doc = app.activeDocument;
// 获取素材文档的名字，去掉扩展名，保留文件名
var docName = doc.name.replace(/\.[^\.]+$/, "");

// 遍历所有图层
for (var i = 0; i < doc.layers.length; i++) {
    var layer = doc.layers[i];

    // 遍历图层中的所有对象
    for (var j = layer.pathItems.length - 1; j >= 0; j--) {
        var item = layer.pathItems[j];

        // 检查是否是参考线（guide）
        if (item.guides) {
            item.remove(); // 删除参考线
        }
    }
}


app.executeMenuCommand('unlockAll') // 解锁全部对象
app.activeDocument.selection = null; // 取消选中
app.executeMenuCommand("selectall"); // 全选

// 运行扩展动作
runAction("扩展", "Ai-action");
// runPathfinder("Live Pathfinder Trim"); // 执行路径查找器修边
app.executeMenuCommand("group"); // 编组
app.executeMenuCommand("copy"); // 复制

// 切换到指定的文档
// app.documents["黑白-cyc.ai"].activate();
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


// 运行垂直居中动作
runAction("垂直居中", "Ai-action");

var dimensions = getSelectionDimensions();

if (dimensions) {
    var widthCm = dimensions.widthCm;
    var heightCm = dimensions.heightCm;

    alert("选中对象的宽度: " + widthCm.toFixed(2) + " cm, 高度: " + heightCm.toFixed(2) + " cm");

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
    alert("未检测到选中对象！");
}

// 获取选中对象集合
// var selection = app.activeDocument.selection;

// 检查是否有选中对象
// if (selection.length > 0) {
//     // 初始化边界值
//     var minX = Infinity,
//         minY = Infinity,
//         maxX = -Infinity,
//         maxY = -Infinity;

//     // 遍历选中对象，获取它们的边界
//     for (var i = 0; i < selection.length; i++) {
//         var item = selection[i];
//         var bounds = item.visibleBounds; // [左, 上, 右, 下]
//         minX = Math.min(minX, bounds[0]);
//         minY = Math.min(minY, bounds[1]);
//         maxX = Math.max(maxX, bounds[2]);
//         maxY = Math.max(maxY, bounds[3]);
//     }

//     // 计算宽度和高度（单位：点），取绝对值
//     var width = Math.abs(maxX - minX);
//     var height = Math.abs(maxY - minY);

//     // 转换为厘米
//     var pointsToCm = 2.54 / 72;
//     var widthCm = width * pointsToCm;
//     var heightCm = height * pointsToCm;

//     // 判断调整宽高
//     if (widthCm > 27 || heightCm > 32 || widthCm < 27 || heightCm < 32) {
//         if (widthCm / heightCm > 27 / 32) {
//             if (widthCm !== 27) {
//                 // alert("宽度不符合要求，将调整宽度");
//                 app.doScript("width-27", "Ai-action");
//             }
//         } else {
//             if (heightCm !== 32) {
//                 // alert("高度不符合要求，将调整高度");
//                 app.doScript("height-32", "Ai-action");
//             }
//         }
//     }
// } else {
//     alert("没有对象可选！");
// }

// 获取当前文档的路径（文件所在的文件夹）
var docPath = doc.path.fsName; // fsName 获取完整路径（如 C:\Documents\Project）
var folderPath = new Folder(docPath + "/" + docName); // 在当前路径下创建一个以文档名命名的文件夹

/**
 * 如果文件夹不存在，则创建一个新文件夹
 */
if (!folderPath.exists) {
    if (!folderPath.create()) { // 如果创建失败
        alert("文件夹创建失败：" + folderPath.fsName);
        throw new Error("无法创建文件夹：" + folderPath.fsName); // 抛出异常，终止脚本
    }
}

/**
 * 通用的保存文件函数
 * @param {string} fileName - 文件名（带扩展名）
 * @param {string} fileType - 文件类型（PDF, AI, PNG）
 * @param {object} options - 文件保存的配置选项
 */
function saveFile(fileName, fileType, options) {
    // 创建完整的文件路径对象
    var file = new File(folderPath.fsName + "/" + fileName);
    try {
        if (fileType === "PDF") {
            // 保存为 PDF 文件
            app.activeDocument.saveAs(file, options);
        } else if (fileType === "AI") {
            // 保存为 AI 文件
            app.activeDocument.saveAs(file, options);
        } else if (fileType === "PNG") {
            // 导出为 PNG 文件
            app.activeDocument.exportFile(file, ExportType.PNG24, options);
        }
        // alert(fileType + " 文件保存成功：" + file.fsName); // 保存成功提示
    } catch (e) {
        alert(fileType + " 文件保存失败：" + e.message); // 保存失败提示
    }
}

/**
 * 保存 PDF 文件
 */
var pdfOptions = new PDFSaveOptions(); // 创建 PDF 保存选项对象
// 你可以在这里设置更多 PDF 保存参数（例如压缩质量等）
saveFile("黑白-cyc.pdf", "PDF", pdfOptions);

/**
 * 保存 AI 文件
 */
var aiOptions = new IllustratorSaveOptions(); // 创建 AI 保存选项对象
aiOptions.compatibility = Compatibility.ILLUSTRATOR17; // 设置 AI 文件兼容性
aiOptions.embedICCProfile = true; // 嵌入颜色配置文件
aiOptions.pdfCompatible = true; // 使文件兼容 PDF
saveFile("黑白-cyc.ai", "AI", aiOptions);

/**
 * 导出 PNG 文件
 */
var pngOptions = new ExportOptionsPNG24(); // 创建 PNG 导出选项对象
pngOptions.artBoardClipping = true; // 保证导出文件仅限于画板区域
saveFile("黑白-cyc.png", "PNG", pngOptions);

/**
 * 完成提示
 */
// alert("所有文件已成功保存到文件夹：" + folderPath.fsName);
