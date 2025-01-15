if (app.documents.length > 1) {
    var currentDoc = app.activeDocument; // 获取当前活动文档
    var docs = app.documents; // 获取所有打开的文档
    
    // 遍历所有文档
    for (var i = docs.length - 1; i >= 0; i--) {
        var doc = docs[i];
        
        // 如果文档不是当前活动文档并且名字不是"黑白-cyc.ai"，则关闭
        if (doc !== currentDoc && doc.name !== "黑白-cyc.ai") {
            doc.close(SaveOptions.DONOTSAVECHANGES); // 不保存直接关闭
        }
    }
    
    // alert("其他文档已关闭，仅保留当前文档和黑白-cyc.ai");
} else {
    alert("当前只有一个文档，无需关闭其他文档。");
}
