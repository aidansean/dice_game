<?php
include_once($_SERVER['FILE_PREFIX']."/project_list/project_object.php") ;
$github_uri   = "https://github.com/aidansean/dice_game" ;
$blogpost_uri = "http://aidansean.com/projects/?tag=dice_game" ;
$project = new project_object("dice_game", "Generic dice game", "https://github.com/aidansean/dice_game", "http://aidansean.com/projects/?tag=dice_game", "dice_game/images/project.jpg", "dice_game/images/project_bw.jpg", "This project is a rewrite of a previous project.  It emulates the popular dice game, Yahtzee.  This game previusly used PHP, but was converted to Javascript once I became sufficiently skilled to rewrite it.", "Games", "CSS,HTML,JavaScript,Unicode") ;
?>