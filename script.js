// グローバルに展開
phina.globalize();

let ASSETS = {
    image: {
        'bg': 'https://cdn.rawgit.com/phinajs/phina.js/develop/assets/images/shooting/bg.png',
    },
    sound: {
        'bgm': 'https://rawgit.com/alkn203/phina_js_tips/master/assets/sounds/bgm_maoudamashii_8bit25.mp3',
        'shot': 'https://cdn.rawgit.com/phinajs/phina.js/develop/assets/sounds/correct.mp3',
    },
};

phina.define('LifedLabel', {
    superClass: 'Label',
    init: function (option) {
        this.superInit(option);
        this._lifetime = this.lifetime = 60;
    },
    setLife: function (lifetime) {
        this._lifetime = this.lifetime = lifetime;
    },
    update: function (app) {
        if (this._lifetime-- < 0) this.remove();
    }
});

phina.define('StarEffect', {
    superClass: 'StarShape',
    init: function (option) {
        this.superInit(option);
        this.radius = option.radius || 5;
        this.blendMode = option.blendMode || 'lighter';
        this.lifetime = option.lifetime || Math.randint(30, 60);
        this.vx = option.vx || Math.randint(-2, 2);
        this.vy = option.vy || Math.randint(-2, 2);
    },
    update: function (app) {
        this.rotation += 10;
        this.x += this.vx;
        this.y += this.vy;
        this.scaleX = this.scaleY *= 0.98;
    
        if (this.lifetime-- <= 0) {
            this.remove();
        }
    }
});

phina.define('CollideDetector', {
    superClass: 'DisplayElement',
    init: function (option) {
        this.superInit(option);
    },
    exam: function (src, dst) {
        src.each(function (e_src) {
            dst.each(function (e_dst) {
                if (e_src.hitTestElement(e_dst)) {
                    e_src.collide(e_dst);
                    e_dst.collide(e_src);
                }
            }, this);
        }, this);
    },
});

let Factory = ObjectFactory();

/*
 * メインシーン
 */
phina.define('MainScene', {
    // 継承
    superClass: 'DisplayScene',

    // 初期化
    init: function() {
    // super init
        this.superInit();

        // 背景色
        this.backgroundColor = '#444';

        // ラベルを生成
        var label = this.label = Label('Hello, phina.js!').addChildTo(this);
        label.x = this.gridX.center(); // x 軸
        label.y = this.gridY.center(); // y 軸
        label.fill = '#eee';  // 塗りつぶし色
    
        var tri = this.tri = Player().addChildTo(this);
        tri.x = this.gridX.center();
        tri.y = this.gridY.span(15);
        tri.stroke = null;
        tri.fill = 'white';
    
        Button({
            x: this.gridX.span(15),
            y: this.gridY.span(2),
            width: 64, height: 64,
            text: '1',
        })
        .addChildTo(this)
        .on('push', function (e) {
            let weapon = Weapon({
                attack: 50,
                cooltime: 30,
                width: 5, height: 30,
                stroke: null,
                fill: 'hsla(40, 90%, 75%, 1)',
            });
            tri.setWeapon(weapon);
        }).flare('push');

        Button({
            x: this.gridX.span(15),
            y: this.gridY.span(4),
            width: 64, height: 64,
            text: '2',
        })
        .on('push', function (e) {
            let weapon = Weapon({
                attack: 20,
                cooltime: 10,
                width: 5, height: 30,
                stroke: null,
                fill: 'hsla(40, 90%, 75%, 1)',
            });
            tri.setWeapon(weapon);
        })
        .addChildTo(this);

        Factory.addChildTo(this);
        this.collider = CollideDetector().addChildTo(this);
    },
    update: function (app) {
        if (app.frame % 10) {
            if (Math.randint(0, 10000) < 200) {
                let enemy = Factory.enemy();
                enemy.x = Math.randint(-this.width, this.width * 2);
                enemy.y = -20;
                enemy.setTarget(this.tri);
            }
        }
    
        this.collider.exam(Factory.shots.children, Factory.enemys.children);

        if (app.keyboard.getKey('escape')) {
            app.pushScene(MyPauseScene());
        }
    }
});

/*
 * メイン処理
 */
phina.main(function() {
    // アプリケーションを生成
    var app = GameApp({
        startLabel: 'main', // MainScene から開始
        assets: ASSETS,
    });

    app.enableStats();
    app.fps = 60;

    // 実行
    app.run();
});