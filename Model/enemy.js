phina.globalize();

phina.define('Enemy', {
    superClass: 'PolygonShape',
    init: function (option) {
        this.superInit(option);
        this.maxhp = 100;
        this.hp = this.maxhp;
    
        this.gauge = Gauge({
            x: 0,
            y: -this.height * 0.75,
            width: 50,
            height: 10,
            maxValue: 100,
            value: 100,
            fill: 'gray',
            gaugeColor: 'red',
            stroke: 'green',
            strokeWidth: 1
        }).addChildTo(this);

    },
    setTarget: function (target) {
        this.target = target;
    },
    collide: function (collider) {
        this.hp -= collider.attack || 0;
        this.gauge.value = this.hp;
        if (this.hp <= 0) {
            this.remove();
        }
    },
    update: function (app) {
        let p = Vector2(
            this.x - this.target.position.x,
            this.y - this.target.position.y
        );
        this.x += -Math.cos(p.toAngle());
        this.y += -Math.sin(p.toAngle());
        if (this.hitTestElement(this.target)) {
            this.fill = 'red';
        }
    },
});

