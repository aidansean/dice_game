<?php

include_once('mysql.php') ;
// Connect to database
$mySQL_connection = mysql_connect('localhost', $mysql_username, $mysql_password) or die('Could not connect: ' . mysql_error()) ;
mysql_select_db($mysql_database) or die('Could not select database') ;

$string = array() ;
if(isset($_GET['task'])){
  switch($_GET['task']){
    case 'get_highscore_threshold':
      $query = 'SELECT * FROM ' . $mysql_prefix . 'dicescores ORDER BY SCORE DESC LIMIT 20' ;
			$result = mysql_query($query) ;
			while($row=mysql_fetch_assoc($result)){
			  $threshold = $row['score'] ;
			}
			$string[] = $threshold ;
      break ;
    
    case 'save_score':
      $query = 'INSERT INTO ' . $mysql_prefix . 'dicescores (name, score) VALUES ("' . mysql_real_escape_string($_GET['name']) . '", "' . mysql_real_escape_string($_GET['score']) . '")' ;
      $result = mysql_query($query) ;
      if(mysql_error()) $string[] = mysql_error() . ' - ' . $query ;
      break ;
    
    case 'get_scores':
      $string[] = '<table id="table_scoreboard">' . PHP_EOL ;
      $string[] = '  <thead>' . PHP_EOL ;
      $string[] = '    <tr>' . PHP_EOL ;
			$string[] = '      <th class="scores"></th>' . PHP_EOL ;
			$string[] = '      <th class="scores">Name</th>' . PHP_EOL ;
			$string[] = '      <th class="scores">Score</th>' . PHP_EOL ;
			$string[] = '    </tr>' . PHP_EOL ;
			$string[] = '  </thead>' . PHP_EOL ;
			$string[] = '  <tbody>' . PHP_EOL ;
			$query = 'SELECT * FROM ' . $mysql_prefix . 'dicescores ORDER BY SCORE DESC LIMIT 20' ;
			$result = mysql_query($query) ;
			$i = 1 ;
			while($row=mysql_fetch_assoc($result)){
				$string[] = '    <tr>' . PHP_EOL ;
				$string[] = '      <td>' . $i . '</td>' . PHP_EOL ;
				$string[] = '      <td>' . $row['name'] . '</td>' . PHP_EOL ;
				$string[] = '      <td>' . $row['score'] . '</td>' . PHP_EOL ;
				$string[] = '    </tr>' . PHP_EOL ;
				$i++ ;
			}
			$string[] = '  </tbody>' . PHP_EOL ;
			$string[] = '</table>' . PHP_EOL ;
      break ;
  }
  echo implode($string) ;
}

?>