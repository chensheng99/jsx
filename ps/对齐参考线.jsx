#target photoshop

if (app.documents.length > 0) {
    var doc = app.activeDocument;

    try {
        var layer = doc.activeLayer;

        if (!layer.isBackgroundLayer) {
            // 手动指定参考线的Y坐标
            var guidePositionY = 200; // 将此值设置为参考线的Y坐标

            // 获取图层的边界信息
            var bounds = layer.bounds;
            var layerTop = bounds[1].value; // 图层的顶部Y坐标

            // 计算垂直方向的偏移量
            var deltaY = guidePositionY - layerTop;

            // 移动图层到指定Y坐标
            layer.translate(0, deltaY);

            alert("图层顶部已对齐到参考线位置 (Y=" + guidePositionY + ")");
        } else {
            alert("无法对背景图层进行对齐操作。");
        }
    } catch (e) {
        alert("对齐失败: " + e.message);
    }
} else {
    alert("没有打开的文档！");
}
