phina.globalize();

phina.define('Shot', {
    superClass: 'RectangleShape',
  
    init: function (option) {
        this.superInit(option);
        option = option || {};

        this.attack = option.attack || 20;
        this.width = option.width || 10;
        this.height = option.height || 50;
    },
    setDirection: function (dst) {
        let p = Vector2(
            this.x - dst.x,
            this.y - dst.y
        );
    
        this.vx = 10 * -Math.cos(p.toAngle());
        this.vy = 10 * -Math.sin(p.toAngle());
        this.rotation = Math.atan2(p.x, p.y) * -180 / Math.PI;
    },
    collideEffect: function (collider) {
        let num = Math.randint(3, 6);
        (num).times(function () {
            Factory.starEffect({
                x: collider.x + Math.randint(-20, 20),
                y: collider.y + Math.randint(-20, 20),
            });
        }, this);

        let label = Factory.lifedLabel({
            text: this.attack,
            x: collider.x + Math.randint(-20, 20),
            y: collider.y + Math.randint(-20, 0),
            fontSize: 24,
            fill: 'orange',
        });
        let time = 0.0167 * label.lifetime * 1000;
        label.alpha = 0;
        label.tweener
        .by({y: -10, alpha: 1}, time * 0.5)
        .set({fill: 'gold'}).wait(time * 0.1)
        .set({fill: 'orange'}).wait(time * 0.1)
        .set({fill: 'gold'}).wait(time * 0.1)
        .set({fill: 'orange'}).wait(time * 0.1)
        .set({fill: 'gold'}).wait(time * 0.1)
        .play();

    },
    collide: function (collider) {
        this.collideEffect(collider);
        this.remove();
    },
    update: function (app) {
        this.x += this.vx;
        this.y += this.vy;
    },
});

