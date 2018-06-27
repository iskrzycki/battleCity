Game.Level1 = function (game) { };

var map;
var layer;
var bullet;

var player;
var controls = {};

Game.Level1.prototype = {

    create: function () {
        this.stage.backgroundColor = '#3A5963';
        this.physics.startSystem(Phaser.Physics.ARCADE);

        map = this.add.tilemap('map', 32, 32);
        map.addTilesetImage('tileset');
        map.setCollisionBetween(1, 3);

        layer = map.createLayer(0);
        layer.resizeWorld();

        //layer.debug = true; // collision lines

        player = this.add.sprite(300, 420, 'tank');
        player.anchor.setTo(0.5, 0.5);


        bullet = this.add.weapon(10, 'bullet');
        //bullet.setBulletFrames(0, 80, true);
        bullet.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        bullet.bulletSpeed = 200;
        bullet.fireRate = 500;
        bullet.trackSprite(player, 0, 0, false);


        this.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;
        // player.body.setSize(20,20);w
        player.body.gravity.y = 1;

        controls = {
            right: this.input.keyboard.addKey(Phaser.Keyboard.D),
            left: this.input.keyboard.addKey(Phaser.Keyboard.A),
            up: this.input.keyboard.addKey(Phaser.Keyboard.W),
            down: this.input.keyboard.addKey(Phaser.Keyboard.S),
            fire: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        }
    },

    update: function () {

        var stopPlayer = function () {
            player.body.velocity.y = 0;
            player.body.velocity.x = 0;
        }

        this.physics.arcade.collide(player, layer, function () {
            console.log('collision');
        });

        this.physics.arcade.collide(bullet.bullets, layer, function (obj1, obj2) {
            obj1.kill();
            map.removeTile(obj2.x, obj2.y);
            map.putTile(0, obj2.x, obj2.y);
        });

        stopPlayer();
        if (controls.up.isDown) {
            //player.y -= 5;
            player.body.velocity.y = -100;
            player.angle = 0;
            bullet.fireAngle = Phaser.ANGLE_UP;
        } else if (controls.down.isDown) {
            //player.y += 5;
            player.body.velocity.y = 100;
            player.angle = 180;
            bullet.fireAngle = Phaser.ANGLE_DOWN;
        } else if (controls.left.isDown) {
            //player.x -= 5;
            player.body.velocity.x = -100;
            player.angle = -90;
            bullet.fireAngle = Phaser.ANGLE_LEFT;
        } else if (controls.right.isDown) {
            //player.x += 5;
            player.body.velocity.x = 100;
            player.angle = 90;
            bullet.fireAngle = Phaser.ANGLE_RIGHT;
        }
        if (controls.fire.isDown) {
            bullet.fire();
        }
    },
    render: function () {
        //bullet.debug();
    }
};