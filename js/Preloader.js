Game.Preloader = function (game) {
    this.preloadBar = null;
}

Game.Preloader.prototype = {
    preload: function () {
        this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'loadingScreen');

        this.preloadBar.anchor.setTo(0.5, 0.5);
        this.time.advancdTiming = true;
        this.load.setPreloadSprite(this.preloadBar);
        
        this.load.tilemap('map', 'assets/level1.csv');
        //this.load.tilemap('map', 'assets/level3.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tileset', 'assets/tileset.png');
    },

    create: function () {
        this.state.start('Level1');
    }
};