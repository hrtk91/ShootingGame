phina.globalize();

phina.define('MyPauseScene', {
    superClass: 'DisplayScene',
    init: function (option) {
        this.superInit(option);

        this.backgroundColor = 'rgba(0, 0, 0, 0.7)';

        let self = this;
        Button({
            text: 'ポーズ解除',
        }).addChildTo(this)
        .setPosition(this.gridX.center(), this.gridY.center(-3))
        .on('push', function (e) {
            self.exit();
        });
    },
});
