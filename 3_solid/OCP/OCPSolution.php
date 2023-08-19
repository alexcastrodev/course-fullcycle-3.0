<?php

abstract class Video {
    abstract public function CalculateInteresting();
}

class Movie extends Video {
    public function CalculateInteresting() {
        // Calculate interesting for movie
    }
}

class Series extends Video {
    public function CalculateInteresting() {
        // Calculate interesting for series
    }
}