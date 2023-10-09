<?php

$d = __DIR__;
$exec = "ls | grep html";
exec($exec,$reg);

foreach($reg as $l)
{
    print "<a href=\"/$l\">$l</a><br>\n";
}