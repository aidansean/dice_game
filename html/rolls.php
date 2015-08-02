<?php

$nFullHouse    = 0 ;
$nThreeOfAKind = 0 ;
$nFourOfAKind  = 0 ;
$nFiveOfAKind  = 0 ;
$nLowStraight  = 0 ;
$nHighStraight = 0 ;

$i = array() ;
for($i[0]=1 ; $i[0]<7 ; $i[0]++){
  for($i[1]=1 ; $i[1]<7 ; $i[1]++){
    for($i[2]=1 ; $i[2]<7 ; $i[2]++){
      for($i[3]=1 ; $i[3]<7 ; $i[3]++){
        for($i[4]=1 ; $i[4]<7 ; $i[4]++){
          $n = array() ;
          $n[0] = 0 ;
          $n[1] = 0 ;
          $n[2] = 0 ;
          $n[3] = 0 ;
          $n[4] = 0 ;
          $n[5] = 0 ;
          for($j=0 ; $j<5 ; $j++)
          {
            $n[0] += ($i[$j]==1) ;
            $n[1] += ($i[$j]==2) ;
            $n[2] += ($i[$j]==3) ;
            $n[3] += ($i[$j]==4) ;
            $n[4] += ($i[$j]==5) ;
            $n[5] += ($i[$j]==6) ;
          }
          $n2 = 0 ;
          $n3 = 0 ;
          $n4 = 0 ;
          $n5 = 0 ;
          for($j=0 ; $j<6 ; $j++)
          {
            if($n[$j]==2) $n2 = 1 ;
            if($n[$j]==3) $n3 = 1 ;
            if($n[$j]==4) $n4 = 1 ;
            if($n[$j]==5) $n5 = 1 ;
          }
          if($n2==1 AND $n3==1) $nFullHouse++ ;
          if($n3==1) $nThreeOfAKind++ ;
          if($n4==1) $nFourOfAKind++ ;
          if($n5==1) $nFiveOfAKind++ ;
          if($n[0]>0 AND $n[1]>0 AND $n[2]>0 AND $n[3]>0) $nLowStraight++ ;
          if($n[4]>0 AND $n[1]>0 AND $n[2]>0 AND $n[3]>0) $nLowStraight++ ;
          if($n[4]>0 AND $n[5]>0 AND $n[2]>0 AND $n[3]>0) $nLowStraight++ ;
          if($n[0]>0 AND $n[1]>0 AND $n[2]>0 AND $n[3]>0 AND $n[4]>0) $nHighStraight++ ;
          if($n[5]>0 AND $n[1]>0 AND $n[2]>0 AND $n[3]>0 AND $n[4]>0) $nHighStraight++ ;
        }
      }
    }
  }
}
echo pow(6,5)       , ' total'           , PHP_EOL ;
echo $nFullHouse    , ' full house'      , PHP_EOL ;
echo $nThreeOfAKind , ' three of a kind' , PHP_EOL ;
echo $nFourOfAKind  , ' four of a kind'  , PHP_EOL ;
echo $nFiveOfAKind  , ' five of a kind'  , PHP_EOL ;
echo $nLowStraight  , ' low straight'    , PHP_EOL ;
echo $nHighStraight , ' high straight'   , PHP_EOL ;

?>