var Game = {};

Game.Boot = function(game) {

}

Game.Boot.prototype = {
    init: function() {
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;
    },

    preload: function() {
        this.load.image('tank', 'assets/tankBase.png');
        this.load.image('bullet', 'assets/bullet.png');
        this.load.image('loadingScreen', 'assets/loading_screen.jpg');
    },

    create: function() {
        this.state.start('Preloader');
    }
};