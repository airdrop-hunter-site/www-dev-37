<?php

$d = __DIR__;
$d = dirname($d);
$d = dirname($d);
$f = $d."/index_ru.html";

//print $f;
$a = file_get_contents($f);
print $a;
?>