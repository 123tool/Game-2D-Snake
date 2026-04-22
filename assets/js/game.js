var snake, apple, squareSize, score, speed,
    updateDelay, direction, new_direction,
    addNew, cursors, scoreTextValue, speedTextValue, 
    highScoreTextValue, snakeGraphics, appleGraphics;

var highScore = 0;

var Game = {
    preload : function() {}, // Tanpa gambar snake/apple, murni coding

    create : function() {
        snake = []; 
        apple = {}; 
        squareSize = 15; 
        score = 0; 
        speed = 0; 
        updateDelay = 0; 
        direction = 'right'; 
        new_direction = null; 
        addNew = false; 

        highScore = localStorage.getItem('snake_highScore') || 0;
        cursors = game.input.keyboard.createCursorKeys();
        game.stage.backgroundColor = '#020617'; 

        snakeGraphics = game.add.graphics(0, 0);
        appleGraphics = game.add.graphics(0, 0);

        // Snake awal (10 block)
        for(var i = 0; i < 10; i++){
            snake[i] = { x: 150 + i * squareSize, y: 150 };
        }

        this.generateApple();

        // UI Styling
        var style_Key = { font: "bold 12px sans-serif", fill: "#64748b" };
        var style_Val = { font: "bold 22px sans-serif", fill: "#fff" };
        
        game.add.text(30, 15, "SCORE", style_Key);
        scoreTextValue = game.add.text(30, 32, "0", style_Val);
        
        game.add.text(250, 15, "HIGH SCORE", style_Key);
        highScoreTextValue = game.add.text(250, 32, highScore, { font: "bold 22px sans-serif", fill: "#38bdf8" });

        game.add.text(500, 15, "SPEED", style_Key);
        speedTextValue = game.add.text(500, 32, "0", style_Val);
    },

    update: function() {
        if (cursors.right.isDown && direction!='left') new_direction = 'right';
        else if (cursors.left.isDown && direction!='right') new_direction = 'left';
        else if (cursors.up.isDown && direction!='down') new_direction = 'up';
        else if (cursors.down.isDown && direction!='up') new_direction = 'down';

        speed = Math.min(10, Math.floor(score/5));
        speedTextValue.text = '' + speed;

        updateDelay++;

        if (updateDelay % (10 - speed) == 0) {
            var firstCell = snake[snake.length - 1],
                lastCell = snake.shift(),
                oldX = lastCell.x,
                oldY = lastCell.y;

            if(new_direction){
                direction = new_direction;
                new_direction = null;
            }

            if(direction == 'right') { lastCell.x = firstCell.x + squareSize; lastCell.y = firstCell.y; }
            else if(direction == 'left') { lastCell.x = firstCell.x - squareSize; lastCell.y = firstCell.y; }
            else if(direction == 'up') { lastCell.x = firstCell.x; lastCell.y = firstCell.y - squareSize; }
            else if(direction == 'down') { lastCell.x = firstCell.x; lastCell.y = firstCell.y + squareSize; }

            snake.push(lastCell);
            firstCell = lastCell;

            if(addNew){
                snake.unshift({x: oldX, y: oldY});
                addNew = false;
            }

            this.appleCollision();
            this.selfCollision(firstCell);
            this.wallCollision(firstCell);
            this.drawNeon();
        }
    },

    generateApple: function(){
        var randomX = Math.floor(Math.random() * (game.width / squareSize)) * squareSize,
            randomY = Math.floor(Math.random() * (game.height / squareSize)) * squareSize;
        apple = { x: randomX, y: randomY };
    },

    appleCollision: function() {
        var head = snake[snake.length - 1];
        if(head.x === apple.x && head.y === apple.y){
            addNew = true;
            this.generateApple();
            score++;
            scoreTextValue.text = score;

            if (score > highScore) {
                highScore = score;
                highScoreTextValue.text = highScore;
                localStorage.setItem('snake_highScore', highScore);
            }
        }
    },

    selfCollision: function(head) {
        for(var i = 0; i < snake.length - 1; i++){
            if(head.x == snake[i].x && head.y == snake[i].y) game.state.start('Game_Over');
        }
    },

    wallCollision: function(head) {
        if(head.x >= game.width || head.x < 0 || head.y >= game.height || head.y < 0) game.state.start('Game_Over');
    },

    drawNeon: function() {
        snakeGraphics.clear();
        appleGraphics.clear();

        // Ular Neon Hijau
        snakeGraphics.beginFill(0x4ade80, 0.9);
        for (var i = 0; i < snake.length; i++) {
            snakeGraphics.drawRoundedRect(snake[i].x, snake[i].y, squareSize-1, squareSize-1, 3);
        }
        snakeGraphics.endFill();

        // Apel Neon Merah Glow
        appleGraphics.beginFill(0xf87171, 1);
        appleGraphics.drawEllipse(apple.x + 7, apple.y + 7, 7, 7);
        appleGraphics.endFill();
    }
};
