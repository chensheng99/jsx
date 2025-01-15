/* 
文档对象模型 & Application对象
*/
// const app = app

// alert('1')
// 发出嘟嘟嘟声音
// app.beep()

// 查看当前的ps名称和版本号 
alert(app.name + "" + app.version)

// 查看当前打开了多少个文件
// alert("当前打开了：" + app.documents.length + "个文件");

// 打开指定文件
// var file = new File("D:/01-My/收集完成/01/黑白.png");
// app.open(file);

// 查看当前编辑中的文档名称和路径
// 获取中文路径的时候会出现乱码
alert(decodeURI(app.activeDocument.path) + "/" + app.activeDocument.name);



// 获取当前前景色
alert("当前前景色是：#" + app.foregroundColor.rgb.hexValue);