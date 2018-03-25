phina.globalize();

phina.define('Player', {
    superClass: 'TriangleShape',
    init: function (option) {
        this.superInit(option);
        
        option = option || {};
        option.attack = 40;
        option.cooltime = 10;
        this.weapon = Weapon(option).addChildTo(this);

        RectangleShape({
            width: this.width,
            height: this.height,
            fill: 'rgba(0, 0, 0, 0)',
            stroke: 'rgb(0, 0, 0)',
            strokeWidth: 2,
        }).addChildTo(this).visible = false;
    },
    setWeapon: function (weapon) {
        let self = this;
        this.weapon.remove();
        this.weapon = weapon.addChildTo(this);
        this.weapon.on('shot', function (e) {
            let time = 0.0167 * e.cooltime * 100;
            let vx = -Math.sin(self.rotation * (Math.PI / 180)) * 20;
            let vy = +Math.cos(self.rotation * (Math.PI / 180)) * 20;
            self.tweener
            .by({
                x: vx,
                y: vy,
            }, time)
            .by({
                x: -vx,
                y: -vy,
            }, 120, 'swing')
            .play();
        });
    },
    update: function (app) {
        let p = app.pointer;
        let x = p.x - this.x;
        let y = this.y - p.y;
        
        this.rotation = (Math.atan2(x, y) * (180 / Math.PI));
        
        if (p.getPointing()) {
            this.weapon.shot(p);
        }
    },
});

