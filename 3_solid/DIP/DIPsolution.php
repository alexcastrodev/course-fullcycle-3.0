<?php

class Category {}

class DramaCategory extends Category {}

class Movie {
 
    private $name;
    private $category;

    public function __construct($name, Category $category) {
        $this->name = $name;
        $this->category = $category;
    }

    public function getName() {
        return $this->name;
    }

   public function setName($name) {
        $this->name= $name;
    }

    public function getCategory() {
        return new DramaCategory();
    }

    public function setCategory(DramaCategory $category) {
        $this->category = $category;
    }
}