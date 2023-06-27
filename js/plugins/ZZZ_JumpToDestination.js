//=============================================================================
// JumpToDestination.js
//=============================================================================

/*:
 * 
 * @plugindesc (v1.1)瞬移至目的地
 * @author Salyzzz
 *
 * @param 瞬移模式的绑定的开关id
 * @type switch
 * @desc 开关id的设置，使用对应开关控制瞬移模式的开启与关闭
 * @default 1
 * 
 *
 * @help 使用这个插件，可以在鼠标点击移动时直接瞬移到鼠标点击处
 * 可以触发“[在玩家下方]的[确定键触发]”的事件
 * 因此，你可以使用该插件快速Debug，或是创建一些依附于事件的点击系统
 */

var Salyzzz = Salyzzz || {};
Salyzzz.parameters = PluginManager.parameters('ZZZ_JumpToDestination');

//==============================
// * setDestination
//==============================

Game_Temp.prototype.setDestination = function(x, y) {
    this._destinationX = x;
    this._destinationY = y;
    if($gameSwitches.value(Salyzzz.parameters['瞬移模式的绑定的开关id']) == true){
        $gamePlayer.locate(x, y);
    }
};