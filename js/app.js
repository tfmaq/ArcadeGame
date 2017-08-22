// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.width = 75;
    this.height = 67;
    // this.speed = 200;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x >= 500){
        this.x = 0;
    }
    this.x += dt + Math.floor(Math.random() * 10);

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y /*change enemy size, this.width, this.height*/);
        //drawing box for fine tuning collision
        //drawBox(this.x, this.y + 77, 100, 67, "yellow");
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//started editing here
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 60;
    this.score = 0;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var self = this;
    if(this.y < 0){
        setTimeout(function(){self.x = 202; self.y = 405}, dt);
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y /*change player size, this.width, this.height*/);
        //drawing box for fine tuning collision
        //drawBox(this.x + 18, this.y + 65, 65, 75, "blue");
    if(this.y < 0){
        clearScore();
        this.score++;
        this.keepScore();
    }
};



Player.prototype.handleInput = function(key){
    var tileWidth = 101;
    var tileHeight = 83;
    if(key == "left" && this.x > 0){
        this.x -= tileWidth;
    }
    if(key == "right" && this.x < 404){
        this.x += tileWidth;
    }
    if(key == "down" && this.y < 390){
        this.y += tileHeight;
    }
    if(key == "up" && this.y > 0){
        this.y -= tileHeight;
    }
};

Player.prototype.checkCollisions = function(){
    for(var i = 0; i < allEnemies.length; i++){
        if((this.x < allEnemies[i].x + allEnemies[i].width) &&
            (this.x + this.width > allEnemies[i].x) &&
            (this.y < allEnemies[i].y + allEnemies[i].height) &&
            (this.height + this.y > allEnemies[i].y)){
            alert("There been a crash!");
            this.x = 202;
            this.y = 405;
            clearScore();
            this.score--;
            this.keepScore();
        }
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(0, 58);
var enemy2 = new Enemy(0, 140);
var enemy3 = new Enemy(0, 228);
var allEnemies = [enemy1, enemy2, enemy3];

var player = new Player(202, 405);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});



//to keep score of player
Player.prototype.keepScore = function (){
    ctx.fillStyle = "black";
    ctx.font = "bold 16px Arial";
    ctx.fillText("Score: " + player.score, 30, 30);
};

//to clear the score
function clearScore(){
    ctx.clearRect(0, 0, 120, 50);
    ctx.restore();
};

/*NOTES
-initially was going to the route of adding html content and removing it for the score
    var scores = document.getElementById("score").innerHTML = '<p>Score: ' + this.score + '</p>';
-tried using this method for dt but didn't work well
    this.x = this.x + this.speed * dt;
-draws box around characters for precise collision
function drawBox(x, y, width, height, color){
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
};
*/