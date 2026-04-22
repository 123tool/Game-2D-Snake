var Game_Over = {

    preload : function() {
        // Tetap load gambar gameover.png (pastikan asetnya ada)
        game.load.image('gameover', './assets/images/gameover.png');
    },

    create : function() {
        // Background Dark
        game.stage.backgroundColor = '#020617';

        // Tampilkan tombol Game Over
        var btn = this.add.button(0, 0, 'gameover', this.startGame, this);
        btn.alpha = 0.5; // Bikin agak transparan biar menyatu

        // Setup Style Text
        var style_Key = { font: "bold 16px 'Plus Jakarta Sans', sans-serif", fill: "#94a3b8", align: "center"};
        var style_Score = { font: "800 48px 'Plus Jakarta Sans', sans-serif", fill: "#fff", align: "center" };
        var style_HighScore = { font: "800 20px 'Plus Jakarta Sans', sans-serif", fill: "#38bdf8", align: "center" };

        // Last Score Info
        game.add.text(game.width/2, 280, "YOUR SCORE", style_Key).anchor.set(0.5);
        game.add.text(game.width/2, 320, score.toString(), style_Score).anchor.set(0.5);

        // High Score Info (Fitur Sadis: Tampilkan High Score terbaru)
        var currentHighScore = localStorage.getItem('snake_highScore') || 0;
        game.add.text(game.width/2, 370, "BEST: " + currentHighScore, style_HighScore).anchor.set(0.5);

        // Instruksi
        game.add.text(game.width/2, 420, "TAP ANYWHERE TO TRY AGAIN", {font: "12px sans-serif", fill: "#475569"}).anchor.set(0.5);

    },

    startGame: function () {
        // Balik ke game
        game.state.start('Game');
    }

};
