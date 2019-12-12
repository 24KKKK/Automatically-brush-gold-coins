var kuaikandianAppName = "快看点";
var kuaikandianVideoNum = 20 // 快看点短视频个数
var kuaikandianNewsNum = 30 // 快看点新闻个数
kuaikandianVideoNum = Math.floor(Math.random() * 10) + kuaikandianVideoNum
kuaikandianNewsNum = Math.floor(Math.random() * 10) + kuaikandianNewsNum

mainEntrence();

// 进入快看点App 
function enterApp(appName) {
    launchApp(appName);
    tLog("等待" + appName + "启动 6s");
    sleep(6000);
    // 启动之后，多点几次 首页 ，消掉页面上的广告
    for (var i = 1; i < 6; i++) {
        click(108, 1824);
        sleep(800);
    }
    // 点击页面上方的娱乐
    click(633, 138);
    sleep(3000);
    click(108, 1824);
    sleep(3000);
}

// 进入app后，开始刷新闻，刷够个数时，返回
function viewNews() {
    slideScreenNews(kuaikandianNewsNum);
}

/**
 * @description 自动滑新闻，直到出现 阅读全文时，看下一条
 * @param kuaikandianNewsNum 刷新闻的条数
 */
function slideScreenNews(kuaikandianNewsNum) {
    for (var i = 1; i <= kuaikandianNewsNum; i++) {
        tLog("共：" + kuaikandianNewsNum + "条，此第：" + i + "条");
        // 获取到一条新闻，并点击新闻标题的中心，跳转新闻页
        var titleLocaltion = id("title").findOne().bounds();
        tLog("获取的新闻：" + id("title").findOne().text());
        // sleep(2000);
        if (titleLocaltion.centerY() < 206) {
            click(titleLocaltion.centerX(), 207);
        } else {
            click(titleLocaltion.centerX(), titleLocaltion.centerY());
        }

        sleep(6000);
        // 开始滑动 随机次
        var swipeNum = random(6, 8);
        for (var j = 0; j <= swipeNum; j++) {
            swipe(520, 1500, 520, 200, 2000);
            sleep(5000);
        }
        // 看视频过程中，出现金蛋时，根据金蛋颜色，砸金蛋 
        // 在 x 875 y 775 查看170*200大小的区域。如果有金蛋，砸 960 890，等5s，点击继续阅读 580 1400
        var img = captureScreen();
        var point = findColorInRegion(img, "#A55200", 875, 775, 170, 1000);
        if (point) { // 现在有金蛋的颜色
            tLog("有金蛋，位置：" + point.x + " " + point.y);
            click(960, 1700);
            sleep(6000);
            click(580, 1400);
            sleep(1000);
        } else {
            tLog("没有金蛋");
        }
        // 返回主页，开始刷下一条
        back();
        sleep(2000);
        swipe(520, 1500, 700, 300, 1000);
        sleep(1000);
    }
}

// 进入app后，开始刷视频，刷够视频个数时，返回
function viewVideo() {
    slideScreenVideo(kuaikandianVideoNum, 7);
}

/**
 * @description 自动滑视频
 * @param movieNum 观看的视频数量
 * @param num 随机数后面增加的秒数 
 */
function slideScreenVideo(movieNum, ranNum) {
    for (var i = 1; i <= movieNum; i++) {
        // 获取随机数 x，看视频 x 秒后，刷下一个
        var randomNum = Math.floor(Math.random() * 4) + ranNum;
        // tLog("视频播放时间：" + randomNum + " s")
        var sleepTime = randomNum * 1000;
        sleep(sleepTime);
        // 获取随机数1-5，获取到1的时候，点赞
        var doubleClickNum = Math.floor(Math.random() * 5)
        // tLog("等于1的时候双击：" + doubleClickNum);
        if (doubleClickNum == 1) {
            // tLog("点赞");
            click(970, 1526);
            sleep(1000);
        }
        // 看视频过程中，出现金蛋时，根据金蛋颜色，砸金蛋 
        // 在 x 875 y 775 查看50*60大小的区域。如果有金蛋，砸 960 890，等4s，点击继续阅读 580 1400
        var img = captureScreen();
        // tLog("开始找色");
        var point = findColorInRegion(img, "#A55200", 875, 775, 170, 200);
        if (point) { // 现在有金蛋的颜色
            tLog("有金蛋，位置：" + point.x + " " + point.y);
            click(960, 890);
            sleep(5000);
            click(580, 1400);
            sleep(1000);
        } else {
            tLog("没有金蛋");
        }
        swipe(520, 1600, 520, 0, 500);
        tLog("刷了：" + i + " 个视频，共：" + kuaikandianVideoNum + "个视频");
        sleep(1000);
    }
}

/**
 * 结束后返回主页面
 */
function whenComplete() {
    sleep(2000);
    tLog("结束");
    back();
    back();
    sleep(1000);
    shell("am kill-all");
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
    console.log(msg);
}

//程序主入口
function mainEntrence() {
    //前置操作
    prepareThings();
    // 进入快看点APP
    enterApp(kuaikandianAppName);
    // 开始刷新闻
    viewNews();
    // 开始刷视频
    // viewVideo();
    //结束后返回主页面
    whenComplete();
}