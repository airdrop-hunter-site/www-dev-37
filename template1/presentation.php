#!/usr/bin/php
<?php
$f = "presentation.html";
$a = file_get_contents($f);

$u = "https://fonts.googleapis.com/css2?family=Inter:wght@500;600;900&display=swap";
$f = __DIR__."/cache/googleapis.css";
if(!file_exists($f))
{
$c = file_get_contents($u);
file_put_contents($f,$c);
}
else
$c = file_get_contents($f);

$c = "<style>\n".$c."</style>\n";
$b = "<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@500;600;900&display=swap\" rel=\"stylesheet\">";
$a = str_replace($b,$c,$a);

//$preg = "/\"((https\:\/\/.*?)\/([.]{0,100}))\"/sim";
$preg = "/\"(https\:\/\/.*?)\"/sim";
//$preg = "/\"(https\:\/\/.*?)\/[^/\]{0,100}\"/sim";
preg_match_all($preg,$a,$reg);
//print_r($reg);
$preg = "/\/\/(.*?)\//si";
foreach($reg[1] as $l)
{
//    print $l."\n";
    preg_match($preg,$l,$reg2);
//    print_r($reg2);
    $k = $reg2[1];
    $v = "";
    switch($k)
    {
	case "dev3-www.airdrop-hunter.site":
	$t = str_replace("https://$k/","",$l);
	$t = __DIR__."/".$t;
//	print "cp $t ";
	print $t."\n";
	$f = $t;
	$b = file_get_contents($f);
	$c = base64_encode($b);
	$t = "data:image/png;base64,$c";
	$a = str_replace($l,$t,$a);
	
//	print $l."\n";
	break;
    }
}
$f = __FILE__.".parse.html";
file_put_contents($f,$a);