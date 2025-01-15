function openDocument(){
//   var fileRef = new File("~/Downloads/myFile.jpg");
  var fileRef = new File("D:/01-My/WXTS.jpg");
  var docRef = app.open(fileRef);
}
// 切换搭配指定黑白-cyc.ai文档
function qiehuan() {
    app.documents["黑白-cyc.ai"].activate();
}