var shuabaoAppName = "刷宝短视频";
var shuabaoVideoNum = 50 // 刷宝短视频个数
shuabaoVideoNum = Math.floor(Math.random() * 10) + shuabaoVideoNum

mainEntrence();

// 进入刷宝App 
function enterApp(appName) {
    launchApp(appName);
    tLog("等待" + appName + "启动 10s");
    sleep(10000);
}

// 进入app后，开始刷视频，刷够视频个数时，返回
function viewVideo() {
    slideScreen(shuabaoVideoNum, 10);
}

/**
 * @description 自动滑视频
 * @param movieNum 观看的视频数量
 * @param num 随机数后面增加的秒数 
 */
function slideScreen(movieNum, ranNum) {
    for (var i = 1; i <= movieNum; i++) {
        // 获取随机数 x，看视频 x 秒后，刷下一个
        var randomNum = Math.floor(Math.random() * 4) + ranNum;
        tLog("视频播放时间：" + randomNum + " s")
        var sleepTime = randomNum * 1000;
        sleep(sleepTime);
        // 获取随机数1-5，获取到1的时候，双击屏幕
        var doubleClickNum = Math.floor(Math.random() * 5)
        var contationNum = Math.floor(Math.random() * 6)
        tLog("1点赞：" + doubleClickNum + "           2关注：" + contationNum);
        // 点赞
        if (doubleClickNum == 1) {
            click(981, 900);
            sleep(1000);
        }
        // 关注
        if (contationNum == 2) {
            text("关注").findOne().click();
            sleep(1000);
        }
        swipe(520, 1600, 520, 0, 500);
        tLog("刷了：" + i + " 个视频，共：" + shuabaoVideoNum + "个视频");
        sleep(1000);
    }
}

/**
 * 结束后返回主页面
 */
function whenComplete() {
    click(980, 1868); // 我的
    sleep(2000);
    click(111, 1868); // 首页
    sleep(2000);
    tLog("结束");
    back();
    back();
}

/**
 * 获取权限和设置参数
 */
function prepareThings() {
    setScreenMetrics(1080, 1920);
    auto.waitFor()
    sleep(3000)
    //请求截图
    if (!requestScreenCapture()) {
        tLog("请求截图失败");
        exit();
    }
}

// 日志输出
function tLog(msg) {
    toast(msg);
    console.log(msg)
}

//程序主入口
function mainEntrence() {
    //前置操作
    prepareThings();
    // 进入刷宝APP
    enterApp(shuabaoAppName);
    // 开始刷视频
    viewVideo();
    //结束后返回主页面
    whenComplete();
}