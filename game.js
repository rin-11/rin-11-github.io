
// TO DO
//     *create instructions box on startgame.html
//     *setInterval for length of game to win
//     * add timer to canvas
//     change health score to health progress bar
//     *create hitpoints for each character and set min/max for health score
//     *create gameOver() for when health hits 0 & setInterval for length of game to win
//     bonus: 
            // add collision sound effects/graphics
            // make instruction page images move

// ------------------------------------------------------------------------------------

import { Player } from './player.js';
import { Cat, Poison, Trap } from './characters.js';
import { UserInput } from './input.js';
import { Background } from './backgrounds.js';
import { HealthMetric } from './metric.js';

// ------------------------------------------------------------------------------------

// put all JS inside callback function LOAD event 
// so JS waits for all images to be fully loaded before running
window.addEventListener('load', function(){
    const canvas = document.getElementById('gamecanvas');
    const canvasgame = canvas.getContext('2d');
    canvas.width = 1200;
    canvas.height = 500;

// ------------------------------------------------------------------------------------

// ALL LOGIC MUST BE PASSED THROUGH THIS CLASS
    class Game {
        constructor(width, height){
            // convert to class properties
            this.width = width;
            this.height = height;

            // background speed and class
            this.speed = 3;
            this.background = new Background(this);
            
            // import player class 
            this.player = new Player(this);
            
            // keys pressed log in console
            this.input = new UserInput(this);
            
            // health metric instantiate
            this.healthmetric = new HealthMetric(this);

            // characters array
            this.characters = [];


            // timer for adding characters
            this.characterTimer = 0; // time starts at 0
            this.characterInterval = 500; // time to add new character
           
            

            // rectangles around characters/player for collision detection
            this.debug = false;

            // score property
            // this.collision = 0;
            this.score = 0;
            this.scoremax = 500;


            // health bar design
            this.fontColor = 'gold';

            // timer for win game
            this.time = 0;
            this.timemax = 1200000; // two minutes
            this.endGame = false;
           

        };

// ------------------------------------------------------------------------------------

        // method for calculations and updating animations
        update(){ 
            this.time += 300;
            if(this.time > this.maxTime) this.endGame = true;
            this.background.update();
            // this.player.update(this.input.keys);
            this.player.update(this.input.keys); // add key input as argument
            //enemies timer 
            if(this.characterTimer > this.characterInterval){
                this.addCharacter();
                // reset timer back to 0 once character is added
                this.characterTimer = 0;
            } else {
                this.characterTimer += 1;
            }
            this.characters.forEach(character => {
                character.update();
            });

            // change alerts into pop up windows with play again button
            
            if (this.score > this.scoremax){
                alert('GAME OVER! Want to try that again?')
                reload();
            }
                if (this.time > this.timemax) {
                alert('You did it! Want to try that again?')
                reload();
            }
            // reload();
        }
    

// ------------------------------------------------------------------------------------

    // method for drawing all of the images 
        draw(context){
            this.background.draw(context);
            this.player.draw(context);
            this.healthmetric.draw(context);
            this.characters.forEach(character => {
                character.draw(context)
            });
        }

// ------------------------------------------------------------------------------------
        // method for character movements
        addCharacter(){
             // only add posion when the player is moving
             if (this.speed > 0) this.characters.push(new Poison(this));


            // make character dissapear once collision occurs

            // push method from enemies array
            this.characters.push(new Cat(this));
            this.characters.push(new Trap(this));


            console.log(this.characters);
        }
    }

// ------------------------------------------------------------------------------------
// method for ending the game or winning the game
        // gameOver(){
        //     if (this.health <= 0){
        //         // end game
        // }


// ------------------------------------------------------------------------------------
    //create an instance of game class -- trigger class constructor game which triggers new player
        // triggers class constructor (pull in canvas elements outside game class)
    const game = new Game(canvas.width, canvas.height); 
    console.log(game);


// ------------------------------------------------------------------------------------
    //animation loop so game updates/draws 60 times per second
    function animate(){

        // clear canvas after each new draw 
        canvasgame.clearRect(0, 0, canvas.width, canvas.height); 
                // keeps the player/charcter images from dragging

        game.update();
        game.draw(canvasgame);

        // animation loop
        requestAnimationFrame(animate);
                // used in place of setTimeout/ setInterval for animations
    }
    animate();
});



















