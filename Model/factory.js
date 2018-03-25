phina.globalize();

phina.define('ObjectFactory', {
    superClass: 'DisplayElement',
    init: function (option) {
        this.superInit(option);

        this.enemys = DisplayElement().addChildTo(this);
        this.shots = DisplayElement().addChildTo(this);
    },
    enemy: function (option) {
        return Enemy(option).addChildTo(this.enemys);
    },
    shot: function (option) {
        return Shot(option).addChildTo(this.shots);
    },
    lifedLabel: function (option) {
        return LifedLabel(option).addChildTo(this);
    },
    starEffect: function (option) {
        return StarEffect(option).addChildTo(this);
    },
    gc: function (type, func) {
        if (!this[type])    return;

        this[type].children.eraseIf(func);
    },
    update: function (app) {
        this.gc('shots', function (shot) {
            return  (shot.x < 0 || this.width  < shot.x) ||
                    (shot.y < 0 || this.height < shot.y);
        });
    }
});
