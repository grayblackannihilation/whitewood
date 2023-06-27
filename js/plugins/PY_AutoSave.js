//===============================================================
//PY_AutoSave.js
//===============================================================
/*:
 * @plugindesc (v1.0)这是一款可以自动存档的插件
 * @author 破夜沙狼
 * @help 
 使用说明：
本插件可以利用插件指令进行自动存档，可以设置存档的位置（1-20号）。
也可以设置存档的音效，当自动存档后会播放提示音效。

插件指令：自动存档










使用条款：本插件可免费用于非商业及商业用途。
请在游戏结尾名单中署名：破夜沙狼
 
 *   
 * @param 存档位置
 * @desc 可以自定义自动存档的位置，默认1号位置（可最多设置1-20号）
 * @type number
 * @min 1
 * @max 20
 * @default 1
 * 
 * @param 存档音效
 * @desc 自动存档指令触发后自动播放该音效
 * @type file
 * @dir audio/se/
 * @default Save
*/
(function() {
//自动存档及存档位置	
	var parameters = PluginManager.parameters('PY_AutoSave');
	
	var PY_Save = Number(parameters['存档位置']);
	var PY_Se = String(parameters['存档音效']);
	
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
		var args = PY_Save;
        if (command === '自动存档') {
            $gameSystem.onBeforeSave();
            $gameSystem._saveCount--;//存储次数减1
            DataManager.saveGame(args);//自动存档在参数传入的值
                //播放音效
				   var sound = {
                       name:PY_Se,
                       volume: 100,
                       pitch:  100,
                       pan:    100
                    };
            AudioManager.playSe(sound);
        }
    }; 
    
	
})();