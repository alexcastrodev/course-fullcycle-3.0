<?php

interface Movie {
    public function play();

    public function increaseVolume();
}

class TheLionKing implements Movie {
    public function play() {
        // ok
    }

    public function increaseVolume() {
        // ok
    }
}

class ModernTimes implements Movie {
    public function play() {
    }

    public function increaseVolume() {
        // This method is not necessary
    }
}