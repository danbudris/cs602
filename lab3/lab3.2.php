<?php
$myfile = file_get_contents($argv[1]);
$searchword = $argv[2];
echo("Occurences of the word ".$searchword.": ".substr_count($myfile, $searchword)."\n");
?>