var kuaishouAppName = "快手极速版";
var kuaishouVideoNum = 50 // 快手极速版短视频个数
kuaishouVideoNum = Math.floor(Math.random() * 10) + kuaishouVideoNum

mainEntrence();

// 进入快手极速版App 
function enterApp(appName) {
    launchApp(appName);
    tLog("等待" + appName + "启动 10s");
    sleep(10000);
}

// 进入app后，开始刷视频，刷够视频个数时，返回
function viewVideo() {
    slideScreen(kuaishouVideoNum, 8);
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
        tLog("1点赞 2关注：：" + doubleClickNum);
        if (doubleClickNum == 1) {
            tLog("点赞");
            click(790, 1849);
            sleep(1000);
        }
        if (doubleClickNum == 2) {
            tLog("关注");
            click(512, 1515);
            sleep(1000);
        }
        swipe(520, 1600, 520, 0, 500);
        tLog("刷了：" + i + " 个视频，共：" + kuaishouVideoNum + "个视频");
        sleep(1000);
    }
}

/**
 * 结束后返回主页面
 */
function whenComplete() {
    click(52, 167); // 左上角
    sleep(1000);
    click(355, 1050); // 看金币页面
    sleep(5000);
    tLog("结束");
    back(); // 这个back先返回到视频页面
    sleep(2000);
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
    // 进入快手极速版APP
    enterApp(kuaishouAppName);
    // 开始刷视频
    viewVideo();
    //结束后返回主页面
    whenComplete();
}