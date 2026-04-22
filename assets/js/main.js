var game;

// Inisialisasi Phaser: 600x450 pixel, AUTO rendering
game = new Phaser.Game(600, 450, Phaser.AUTO, '');

// Daftarkan semua State yang sudah kita buat
game.state.add('Menu', Menu);
game.state.add('Game', Game);
game.state.add('Game_Over', Game_Over);

// Jalankan Menu pertama kali
game.state.start('Menu');
