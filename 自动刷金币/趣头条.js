app.launchApp("趣头条");
auto();
a = device.width;
b = device.height;
var i = "";
var y = 470;
sleep("2500");
while (true) {
    click(322, 1828);
    for (var r = 1; r <= 8; r++) {
        sleep("3300");
        if (y == 470)
            click(535, y = y + 800);
        else
            click(535, y = y - 800);
        i = Math.random() * 40000 + 60000;
        sleep(i);
        click(50, 128);
    }
    r = 0;
    for (var n = 1; n <= 10; n++) {
        click(100, 1830);
        sleep("4000");
        click(800, 450);
        sleep(5000);
        for (var h = 1; h <= 5; h++) {
            swipe(i = Math.random() * 200 + 400, r = Math.random() + 1300, i, r = r - 200, Math.random() * 100 + 500);
            sleep(6000);
        }
        sleep(2000);
        click(50, 128);
        sleep(1000);
    }
}