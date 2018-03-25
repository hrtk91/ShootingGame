phina.globalize();

phina.define('Weapon', {
    superClass: 'DisplayElement',
    init: function (option) {
        this.superInit(option);
        this.option = option = option || {};
        this.attack = option.attack || 20;
        this.cooltime = option.cooltime || 30;
        this._cooltime = this.cooltime;
    },
    canShoot: function () {
        return (this._cooltime <= 0);
    },
    shot: function (dst) {
        if (!this.canShoot()) return;
        
        this._cooltime = this.cooltime;

        let option = this.option;
        let shot = Factory.shot(option);
        shot.position.set(this.parent.x, this.parent.y);
        shot.setDirection(Vector2(dst.x, dst.y));
        this.flare('shot', {
            dst: dst,
            cooltime: this.cooltime
        });
    },
    update: function (app) {
        if (this._cooltime > 0) this._cooltime--;
    }
});

