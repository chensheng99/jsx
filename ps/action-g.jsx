// // 获取Photoshop应用程序的实例
// var app = app;

// // 获取当前活动文档
// var doc = app.activeDocument;

// // 定义要检查的文档名称
// var targetName_zheng = "双正-14710.psd";
// var targetName_bei = "双背-36912.psd";
// var targetName_xijie = "双细-28511.psd";

// alert(doc.name);
// 检查当前文档的名称是否与目标名称匹配
// if (doc.name != targetName_zheng) {
// 如果匹配，则执行指定的动作
// alert("当前文档不是双正-14710.psd");
// // 获取双正-28511.psd文档
// const doc = app.documents.getByName(targetName_zheng)
// // 切换到文件名为双正-14710.psd
// app.activeDocument = doc
// // 执行指定的动作
// app.doAction("双正-14710", "action-g")
// }

// // 获取双正-28511.psd文档
// const doc1 = app.documents.getByName(targetName_zheng)
// // 切换到文件名为双正-14710.psd
// app.activeDocument = doc1
// // 执行指定的动作
// app.doAction("双正-14710", "action-g")
// // 获取双背-36912.psd文档
// const doc2 = app.documents.getByName(targetName_bei)
// // 切换到文件名为双背-36912.psd
// app.activeDocument = doc2
// // 执行指定的动作
// app.doAction("双背-36912", "action-g")
// // 获取双细-28511.psd文档
// const doc3 = app.documents.getByName(targetName_xijie)
// // 切换到文件名为双细-28511.psd
// app.activeDocument = doc3
// // 执行指定的动作
// app.doAction("双细-28511", "action-g")

// 获取Photoshop应用程序的实例
var app = app;

// 定义一个数组，包含要检查的文档名称和对应的动作名称
var docsActions = [
    // { name: "双正-1-4.psd", actionName: "双正-1-4" },
    // { name: "双背-5-8.psd", actionName: "双背-5-8" },
    { name: "双正背-1-8.psd", actionName: "双正背-1-8" },
    { name: "双合-9-12.psd", actionName: "双合-9-12" },
    // { name: "双模-13-16.psd", actionName: "双模-13-16" }
];

// 遍历数组，对每个项执行操作
for (var i = 0; i < docsActions.length; i++) {
    var targetName = docsActions[i].name;
    var actionName = docsActions[i].actionName;
    
    // 获取目标文档
    var doc = app.documents.getByName(targetName);
    
    if (doc) {
        // 如果找到了文档，就切换到该文档并执行指定的动作
        app.activeDocument = doc;
        app.doAction(actionName, "action-g");
    } else {
        // 如果没有找到文档，可以在这里执行其他操作或者给出提示
        alert("未找到文档: " + targetName);
    }
}