//==============================================================================
/*:
 * 
 * @plugindesc 游戏加载 Ver 1.0
 * @author 上官春运ElaoNesside  QQ:53899358
 *
 * @help
 * =================================帮助说明=====================================
 * 全自动运行
 * 使用前先观看ENS_fileload插件使用说明
 ==============================================================================*/
//游戏加载
var GameLoad = GameLoad || {};

GameLoad.LoadData = function () {
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "data/filelist.json", false);
    xhr.overrideMimeType('application/json');
    xhr.onload = function () {
        if (xhr.status < 400) {
            data = JSON.parse(xhr.responseText);
        }
    };
    xhr.onerror = function () {
        console.log('error')
    };
    xhr.send();
    return data;
}

GameLoad.LoadAdd = function (data) {
    var loadingcanvas = new PIXI.Container();
    SceneManager._scene.addChild(loadingcanvas);
    var loadbarcanvas = new PIXI.Container();
    loadbarcanvas.position.set(Graphics.width / 2 - 250, Graphics.height / 2)
    loadingcanvas.addChild(loadbarcanvas);
    var loadbara = new PIXI.Graphics();
    loadbara.beginFill(0xdedede);
    loadbara.drawRect(0, 0, 500, 10);
    loadbarcanvas.addChild(loadbara);
    var loadbarb = new PIXI.Graphics();
    loadbarb.beginFill(0x1C86EE);
    loadbarb.drawRect(0, 0, 1, 10);
    loadbarcanvas.addChild(loadbarb);
    var loadtext = new PIXI.Text();
    loadtext.style.fill = "#FFFFFF";
    loadtext.style.fontSize = "4em";
    loadtext.position.set(Graphics.width / 2 + 30, Graphics.height / 2 + 20)
    loadingcanvas.addChild(loadtext)
    PIXI.loader
        .add(data)
        .on("progress", loadProgressHandler)
        .load(GameLoad.Start);
    function loadProgressHandler(loader, resource) {
        loadbarb.width = parseInt(`${loader.progress}` * 5) + 5;
        loadtext.text = "加載中..." ;
    }

}

GameLoad.Start = function () {
    SoundManager.preloadImportantSounds();
    if (DataManager.isBattleTest()) {
        DataManager.setupBattleTest();
        SceneManager.goto(Scene_Battle);
    } else if (DataManager.isEventTest()) {
        DataManager.setupEventTest();
        SceneManager.goto(Scene_Map);
    } else {
        Scene_Boot.prototype.checkPlayerLocation();
        DataManager.setupNewGame();
        SceneManager.goto(Scene_Title);
        Window_TitleCommand.initCommandPosition();
    }
    Scene_Boot.prototype.updateDocumentTitle();
}

Scene_Boot.prototype.start = function () {
    Scene_Base.prototype.start.call(this);
    GameLoad.LoadAdd(GameLoad.LoadData());
};

Scene_Boot.prototype.isGameFontLoaded = function () {
    return true;
};