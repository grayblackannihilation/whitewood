//==============================================================================
/*:
 * 
 * @plugindesc 文件路径读取 Ver 1.0
 * @author 上官春运ElaoNesside  QQ:53899358
 *
 * @param src
 * @desc 写入要导出数据的文件夹
 * @default d:/我的游戏
 * 
 * 
 * @help
 * =================================帮助说明=====================================
 * 将ENS_Loading.js插件放在此插件之后
 * 在插件界面输入游戏的文件夹地址[注:有index.html那个文件夹]
 * 打开游戏自动生成加载目录
 * 之后关闭此插件,不然每次打开游戏都会写入一遍
 ==============================================================================*/
 
var parameters = PluginManager.parameters('ENS_fileload');
var src = parameters['src'];
require('nw.gui').Window.get().showDevTools();
var fs = require("fs");
var database = [];
function filesach(path) {
    var files = fs.readdirSync(path);
    for (var i = 0; i < files.length; i++) {
        var stats = fs.statSync(path + "/" + files[i]);
        if (stats.isDirectory()) {
            filesach(path + '/' + files[i])
        } else {
            var file = path + '/' + files[i];
            file = file.split(src + "/").join("");
            database.push(file)
            console.log("-------------------------------------------");
            console.log("NO.：" + database.length);
            console.log("文件：" + file);
            console.log("容量：" + parseInt(stats.size / 1024) + "kb");
        }
    }


}

filesach(src);

fs.writeFileSync(src + "/data/" + "filelist.json", JSON.stringify(database));
console.log("-------------------------------------------");
console.log("生成文件成功");
console.log("文件地址：" + src + "/" + "filelist.json");
