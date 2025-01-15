/* 
    6.新建文件 & 切换文件 & documents对象使用
    学习目标
        创建文件
        获取文件对象
        激活文件
        注意事项
            单位
*/

const app = app

//1.创建800x800文件
// app.documents.add(800, 800)

//2.创建1080x1080文件，名字:萧炎
// app.documents.add(1080, 1080, undefined, '萧炎')

//3.创建1600x800,分辨率300，名字:荒天帝,颜色模式:CMYK
// app.documents.add(1600, 800, 300, '荒天帝', NewDocumentMode.CMYK)

//4.创建1600x800,分辨率300，名字:荒天帝2，背景透明
// app.documents.add(1600, 800, 300, '荒天帝2', NewDocumentMode.RGB, DocumentFill.TRANSPARENT)

//5.切换到文件名为萧炎文件的文件
const doc = app.documents.getByName('萧炎')
app.activeDocument = doc

//6.切换到文件名为荒天帝文件的文件
// const doc = app.documents.getByName('荒天帝')
// app.activeDocument = doc