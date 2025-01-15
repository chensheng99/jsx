/* 
document方法-02 文件另存为
*/

// new JPEGSaveOptions()
// new BMPSaveOptions()
// new DCS1_SaveOptions()
// new DCS2_SaveOptions()
// new EPSSaveOptions()
// new GIFSaveOptions()
// new PDFSaveOptions()
// new PhotoshopSaveOptions()
// new PICTFileSaveOptions()
// new PICTResourceSaveOptions()
// new PixarSaveOptions()
// new PNGSaveOptions()
// new RawSaveOptions()
// new SGIRGBSaveOptions()
// new TargetSaveOptions()
// new TiffSaveOptions()

// 获取Photoshop应用程序的实例
const app = app;

// 获取当前活动文档
const doc = app.activeDocument;

// 定义保存文件的路径
const savePath = new File("/D/01-My/导出/1.jpg");

// 创建一个新的JPEG保存选项对象
// const options = new JPEGSaveOptions();
// 创建一个新的PNG保存选项对象
// const options = new PNGSaveOptions();
// 创建一个新的PSD保存选项对象
const options = new PhotoshopSaveOptions();
// 是否合并图层
options.layers = true;
// 设置PNG的压缩质量
// options.compression = 0;
// true直接保存，false是有弹窗的另存为
const copyAs = true;
// 使用定义的路径和选项保存当前活动文档
app.activeDocument.saveAs(savePath, options, copyAs, Extension.LOWERCASE);

// 定义一个函数，用于配置JPEG保存选项
function saveJPEG() {
    // 创建一个新的JPEG保存选项对象
    const options = new JPEGSaveOptions();
    // 设置JPEG的质量
    options.quality = 10;
    // 设置JPEG的格式选项，使用标准基线格式
    options.formatOptions = FormatOptions.STANDARDBASELINE;
    // 返回配置好的JPEG保存选项对象
    return options;
}

// 定义一个函数，用于配置PNG保存选项
function savePNG() {
    // 创建一个新的PNG保存选项对象
    const options = new PNGSaveOptions();
    // 返回配置好的PNG保存选项对象
    return options;
}


// 定义一个函数，用于配置PSD保存选项
function savePSD() {
    // 创建一个新的PSD保存选项对象
    const options = new PhotoshopSaveOptions();
    // 返回配置好的PSD保存选项对象
    return options;
}


/* // 获取名字是黑白的图层
const layer = doc.layers.getByName("黑白")
// 隐藏该图层
layer.visible = false
// 获取名字是21的图层
const layer21 = doc.layers.getByName("21")
// 隐藏该图层
layer21.visible = false */




/* 
// 获取Photoshop应用程序的实例
var app = app;

// 获取当前活动文档
var doc = app.activeDocument;

// 定义一个函数，用于配置JPEG保存选项
function saveJPEGOptions(){
    var options = new JPEGSaveOptions();
    options.quality = 10;
    options.formatOptions = FormatOptions.STANDARDBASELINE;
    return options;
}

// 定义一个函数，用于保存JPEG文件
function saveAsJPEG(savePath, layersToHide){
    // 创建JPEG保存选项对象
    var options = saveJPEGOptions();
    // 设置是否作为副本保存
    var copyAs = true;
    // 隐藏指定的图层
    for(var i = 0; i < layersToHide.length; i++){
        var layerName = layersToHide[i];
        var layer = doc.layers.getByName(layerName);
        if(layer){
            layer.visible = false;
        }
    }
    // 保存文档
    doc.saveAs(savePath, options, copyAs, Extension.LOWERCASE);
}

// 定义保存操作的数组
var saveOperations = [
    {
        path: "/D/01-My/导出/1.jpg",
        layers: ["黑白", "21"]
    },
    {
        path: "/D/01-My/导出/2.jpg",
        layers: ["黑白 拷贝", "24"]
    }
];

// 执行保存操作
for(var i = 0; i < saveOperations.length; i++){
    var operation = saveOperations[i];
    var savePath = new File(operation.path);
    saveAsJPEG(savePath, operation.layers);
} */