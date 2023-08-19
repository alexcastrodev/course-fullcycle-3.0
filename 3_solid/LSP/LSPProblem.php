<?php

$movie = new Movie();
// or
$movie2 = new TheLionKing();

class Movie {
    public function play() {
        // Play movie
    }

    public function pause() {
        // Pause movie
    }
}

class TheLionKing extends Movie {
    
}

// This cannot be extends from Movie because it doesn't have the same methods
class TheModernTimes extends Movie {
    public function increaseVolume() {
        // Puuuuts, puuuuts, not sound in this movie
    }
}