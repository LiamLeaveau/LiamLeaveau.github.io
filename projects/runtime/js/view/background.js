var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        var steve
        var building;
        var buildings = [];

        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,groundY,'purple');
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield
            var moon = draw.bitmap('img/moon.png');
            moon.x = canvasWidth - 500;
            moon.y = groundY - 300;
            moon.scaleX = .4;
            moon.scaleY = .4;
            background.addChild(moon);
            
            var circle 
            for (var i = 0; i < 100; i++){
                 circle = draw.circle(10,'white','LightGray',2);
                circle.x = canvasWidth*Math.random();
                circle.y = groundY*Math.random();
                background.addChild(circle);
            };

               
            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            
            var buildingColors = ["Red" , "Blue" , "Green" , "Purple" , "Yellow"];
            var buildingHeight = [100, 120, 140, 160, 180];

            for (var i = 0; i < 5; ++i){
                building = draw.rect(75,buildingHeight[i], buildingColors[i],'Black',1)
                building.x = 150 * i;
                building.y = groundY - buildingHeight[i];
                background.addChild(building);
                buildings.push(building);
            }    

            
            // TODO 4: Part 1 - Add a tree
            steve = draw.bitmap('img/SteveMinecraft.png');
            steve.x = 2000;
            steve.y = groundY - 250;
            background.addChild(steve);
            steve.scaleX = 0.25;
            steve.scaleY = 0.25;

            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            steve.x = steve.x - 3;


             for (var i = 0; i < buildings.length; i++) {
               building = buildings[i];
               building.x = building.x - 1;
               if (building.x < -200){
                  building.x = canvasWidth;     
               }
            }

            // TODO 5: Part 2 - Parallax
            

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
