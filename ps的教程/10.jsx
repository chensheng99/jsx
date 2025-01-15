// document方法 03|快速保存图片案例
// 。脚本 1:按下快捷键，快速将当前文件另存为ipg格式，并且文件保存到当前文件所在目录，文件名以1开始的序号方式开始递增
// 。脚本 2:跟脚本1一样的需求，文件名保存以文档名字+当前时间

/* 
脚本 1
支持设置快捷键
jpg，文件的所在目录，A.psd
A_1.jpg A_2.jpg ，A_3.jpg
实现逻辑
1.获取文件名字
2.需要获取文件所在目录
3.找到当前递增的序号
4.保存图片
 */

// const app = app;

function main() {
    // 获取文件名字
    const fileName = app.activeDocument.name.replace(".psd", "")
    const index = findIndexByFileName(fileName)
    const saveName = fileName + "_" + index + ".jpg"
    saveJPEG(saveName)
}

function findIndexByFileName(fileName) {
    const folder = new Folder(app.activeDocument.path.fullName)
    const files = folder.getFiles()

    var file
    var name    
    var index
    var indexs = []
    for (var i = 0; i < files.length; i++) {
        flie = files[i]
        name = decodeURI(flie.name)
        if (name.indexOf(fileName) != -1 && name.indexOf(".jpg") != -1) {
            index = name.replace(fileName + "_", "").replace(".jpg", "")
            if (index != "" && isNaN(parseInt(index)) == false) {
                indexs.push(parseInt(index))

            }
        }
    }
    if (indexs.length == 0) {
        return 1
    }
    indexs = indexs.sort()
    return indexs[indexs.length - 1] + 1
}

function saveJPEG(saveName) {
    const options = new JPEGSaveOptions()
    options.quality = 12
    const file = new File(app.activeDocument.path.fullName + "/" + saveName)
    app.activeDocument.saveAs(file, options, true, Extension.LOWERCASE)
}
main()