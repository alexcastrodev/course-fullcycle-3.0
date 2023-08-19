<?php

interface Movie {
    public function play();
}

interface AudioControl {
    public function increaseVolume();
}

class TheLionKing implements Movie, AudioControl {
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
}