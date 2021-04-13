var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
                { "type": "enemy", "x": 400, "y": groundY-20},
                { "type": "enemy", "x": 1200, "y": groundY-60},
                { "type": "enemy", "x": 800, "y": groundY-50},
                { "type": "water", "x": 1300, "y": groundY},
                { "type": "reward", "x": 600, "y": groundY - 100}
           
            ] 
        };

        for (var i = 0; i < levelData.gameItems.length; i++){
            obj = levelData.gameItems[i];
            objX = obj.x;
            objY = obj.y;
            objType = obj.type;
            if (objType === "sawblade"){
                createSawBlade(objX, objY);
            } else if (objType === "enemy"){
                createEnemy(objX, objY);
            } else if (objType === "water"){
                createWater(objX, objY);
            } else if (objType === "reward"){
                createReward(objX, objY);
            }

        }

        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        function createSawBlade(x, y){      
            var hitZoneSize = 25;
            var damageFromObstacle = 10;  
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;
            game.addGameItem(sawBladeHitZone);    
            var obstacleImage = draw.bitmap('img/sawblade.png');
            sawBladeHitZone.addChild(obstacleImage);
            obstacleImage.x = -25
            obstacleImage.y = -25
    }
      
        function createWater(x,y) {
            var hitZoneSize = 35;
           
                var damageFromObstacle = 20;
                var waterHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
                waterHitZone.x = x;
                waterHitZone.y = y;
                game.addGameItem(waterHitZone);    
                var obstacleImage = draw.bitmap('img/water.jpg');
                waterHitZone.addChild(obstacleImage);
                obstacleImage.x = -35
                obstacleImage.y = -35
                obstacleImage.scaleX = .25;
                obstacleImage.scaleY = .45;
        };
 


        function createEnemy(x, y) {
            var enemy = game.createGameItem('enemy',25);
                var creeper = draw.bitmap('img/creeper.jpg');
                creeper.x = -25;
                creeper.y = -25;
                creeper.scaleX = .2;
                creeper.scaleY = .2;
                enemy.addChild(creeper);
                enemy.x = x;
                enemy.y = y;
                game.addGameItem(enemy);
                enemy.velocityX = -1;
                enemy.rotationalVelocity = 10
                enemy.onPlayerCollision = function() {
                    console.log('The enemy has hit Halle');
                    game.changeIntegrity(-10);
                    enemy.fadeOut();
                }
                enemy.onProjectileCollision = function(){
                    console.log('Halle has hit the enemy');
                    game.increaseScore(100);
                    enemy.shrink();
                }
        };






        function createReward(x, y){
            var reward = game.createGameItem('reward', 25); 
            var wrench = draw.bitmap('img/wrench.jpg');
            var hitZoneSize = 35;   
                wrench.x = -25;
                wrench.y = -25;
                wrench.scaleX = .2;
                wrench.scaleY = .2;
                reward.addChild(wrench);
                reward.x = x;
                reward.y = y;
                game.addGameItem(reward);
                reward.velocityX = -1;
                reward.onPlayerCollision = function(){
                    console.log('Halle has gained a reward');
                    game.changeIntegrity(20);
                    reward.fadeOut();

                }
                reward.onProjectileCollision = function(){
                    
                }
        }



// DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
