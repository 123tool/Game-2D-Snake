var Menu = {

    preload : function() {
        // Load gambar background menu
        // Pastikan file menu.png ada di folder assets/images/
        game.load.image('menu', './assets/images/menu.png');
    },

    create: function () {
        // Menampilkan background menu sebagai tombol
        // Jika diklik, akan menjalankan fungsi startGame
        var menuButton = this.add.button(0, 0, 'menu', this.startGame, this);
        menuButton.alpha = 0.8; // Efek sedikit transparan biar gahar

        // Tambahkan teks instruksi di atas menu
        var style = { font: "bold 16px Arial", fill: "#38bdf8", align: "center" };
        var text = game.add.text(game.width/2, game.height - 50, "CLICK TO START NEON SNAKE", style);
        text.anchor.set(0.5);
        
        // Efek kedap-kedip (Blink) pada teks biar lebih hidup
        game.add.tween(text).to({ alpha: 0 }, 500, "Linear", true, 0, -1, true);
    },

    startGame: function () {
        // Pindah state ke 'Game' (Logic di game.js)
        this.state.start('Game');
    }

};
