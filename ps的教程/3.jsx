/* 
application常用方法 | 打开文件 | 指定动作 | 执行菜单
*/

const app = app
var file = new File("D:/01-My/收集完成/01/黑白.png");
// 打开指定文件，第二个参数为文件名，第三个参数为把图层设置成智能对象
// app.open(file,undefined,true)
app.open(file)

// 执行动作
// 第一个是你录制的动作名称，第二个是动作组
// app.doAction("换背景色", "我的")

// 选择文件，弹出弹窗
// const flies = app.openDialog()
// 会返回一个数组
// alert(flies[0])

// 刷新字体列表
// app.refreshFonts()

// 执行菜单,并激活图层变化的功能
// app.runMenuItem(charIDToTypeID('Skew'))

// 显示颜色选择器，你选择了确认就返回true，取消就返回false
const color = app.showColorPicker()
alert(color)