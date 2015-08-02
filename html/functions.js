var tbody ;
var dice = new Array() ;
var nDice = 5 ;
var nRolls = 0 ;
var rows = new Array() ;
for(var i=0 ; i<nDice ; i++){ dice[i] = 0 ; }
dice[0] = 0 ;
dice[1] = 0 ;
dice[2] = 0 ;
dice[3] = 0 ;
dice[4] = 0 ;
var xmlhttp_save_score = GetXmlHttpObject() ;
var xmlhttp_get_scores = GetXmlHttpObject() ;
var xmlhttp_score_threshold = GetXmlHttpObject() ;

function start(){
  tbody = document.getElementById('tbody_scores') ;
  rows[0]  = new ones() ;
  rows[1]  = new twos() ;
  rows[2]  = new threes() ;
  rows[3]  = new fours() ;
  rows[4]  = new fives() ;
  rows[5]  = new sixes() ;
  rows[6]  = new bonus() ;
  rows[7]  = new upper() ;
  
  rows[8]  = new three_of_a_kind() ;
  rows[9]  = new four_of_a_kind() ;
  rows[10] = new full_house() ;
  rows[11] = new small_straight() ;
  rows[12] = new large_straight() ;
  rows[13] = new five_of_a_kind() ;
  rows[14] = new chance() ;
  rows[15] = new lower() ;
  
  rows[16] = new yahtzee_bonus() ;
  rows[17] = new total() ;
  make_double_row( 0, 8) ; // Ones   / Three of a kind
  make_double_row( 1, 9) ; // Twos   / Four of a kind
  make_double_row( 2,10) ; // Thress / Full House
  make_double_row( 3,11) ; // Fours  / Low Straight
  make_double_row( 4,12) ; // Fives  / High Straight
  make_double_row( 5,13) ; // Sixes  / Yahtzee
  make_double_row( 6,14) ; // Bonus  / Chance
  make_double_row( 7,15) ; // Total  / Total
  make_double_row(16,17) ; // YBonus / Grand total
  //for(var i=0 ; i<rows.length ; i++){ make_row(i) ; }
  
  xmlhttp_get_scores.onreadystatechange = update_high_scores_board ;
  xmlhttp_get_scores.open('GET', 'http://www.aidansean.com/dice_game/scores.php?task=get_scores&sid=' + Math.random(),true) ;
  xmlhttp_get_scores.send(null) ;
  
  nRolls = 0 ;
  roll() ;
}

function new_game(){
  var id
  for(var i=0 ; i<rows.length ; i++){
    rows[i].score = 0 ;
    rows[i].complete = 0 ;
    id = 'td_'+rows[i].id ;
    document.getElementById(id).innerHTML = '0' ;
  }
  nRolls = -1 ;
  roll() ;
}

function make_row(i){
  var category = rows[i] ;
	var tr ;
	var td ;
	var input ;
	
	tr = document.createElement('tr') ;
	td = document.createElement('td') ;
	td.innerHTML = category.name ;
	td.className = 'name' ;
	tr.appendChild(td) ;
	td = document.createElement('td') ;
	td.innerHTML = category.score ;
	td.id = 'td_' + category.id ;
	td.className = 'score' ;
	tr.appendChild(td) ;
	td = document.createElement('td') ;
	td.className = 'this_roll' ;
	td.id = 'td_thisRoll_' + category.id ;
	if(i!=6 && i!=7 && i!=15 && i!=16){
  	input = document.createElement('input') ;
	  input.type = 'submit' ;
	  input.className = 'button' ;
	  td.appendChild(input) ;
	}
	tr.appendChild(td) ;
	tbody.appendChild(tr) ;
	
	if(i==7 || i==15){
	  tr = document.createElement('tr') ;
	  td = document.createElement('td') ;
	  td.className = 'spacer' ;
	  tr.appendChild(td) ;
	  td = document.createElement('td') ;
	  td.className = 'spacer' ;
	  tr.appendChild(td) ;
	  td = document.createElement('td') ;
	  td.className = 'spacer' ;
	  tr.appendChild(td) ;
	  tbody.appendChild(tr) ;
	}
}

function make_double_row(i, j){
  var category ;
	var tr ;
	var td ;
	var input ;
	var indices = [ i , j ] ;
	
	tr = document.createElement('tr') ;
	for(var k=0 ; k<2 ; k++){
	  category = rows[indices[k]] ;
		td = document.createElement('td') ;
		td.innerHTML = category.name ;
		td.className = 'name' ;
		tr.appendChild(td) ;
		td = document.createElement('td') ;
		td.innerHTML = category.score ;
		td.id = 'td_' + category.id ;
		td.className = 'score' ;
		tr.appendChild(td) ;
		td = document.createElement('td') ;
		td.className = 'this_roll' ;
		td.id = 'td_thisRoll_' + category.id ;
		if(i!=6 && i!=7 && i!=15 && i!=16){
			input = document.createElement('input') ;
			input.type = 'submit' ;
			input.className = 'button' ;
			td.appendChild(input) ;
		}
		tr.appendChild(td) ;
	}
	tbody.appendChild(tr) ;
	
	if(i==6 || i==7){
	  tr = document.createElement('tr') ;
	  for(var k=0 ; k<6 ; k++){
	    td = document.createElement('td') ;
	    td.className = 'spacer' ;
	    tr.appendChild(td) ;
	  }
	  tr.appendChild(td) ;
	  tbody.appendChild(tr) ;
	}
}

function sum_dice(){
  var score = 0 ;
  for(var i=0 ; i<dice.length ; i++){ score += dice[i] ; }
  return score ;
}

function toggle_dice(n){
  if(nRolls==3) return ;
  var td = document.getElementById('td_dice_'+n) ;
  if(td.className=='dice dice_full'){
    td.className = 'dice dice_fade' ;
  }
  else{
    td.className = 'dice dice_full' ;
  }
  dice[n-1] = -dice[n-1] ;
}

function dice_HTML(n){
  var entity = 9855 + parseInt(n) ;
  return '&#' + entity + ';' ;
}

function try_score(i){
  if(rows[i].complete==1) return ;
  check_yahtzee_bonus() ;
  rows[i].set_score() ;
  var id = 'td_'+rows[i].id ;
  document.getElementById(id).innerHTML = rows[i].get_score() ;
  document.getElementById('td_score_bonus').innerHTML = rows[6].get_score() ;
  document.getElementById('td_score_upper').innerHTML = rows[7].get_score() ;
  document.getElementById('td_score_lower').innerHTML = rows[15].get_score() ;
  document.getElementById('td_score_total').innerHTML = rows[17].get_score() ;
  
  var id = 'td_thisRoll_'+rows[i].id ;
  document.getElementById(id).innerHTML = '' ;
  
  for(var i=0 ; i<nDice ; i++) dice[i] = 0 ;
  document.getElementById('button_roll').className = 'button button_full' ;
  
  var end_of_game = true ;
  for(var i=0 ; i<rows.length ; i++){
    if(i==6)  continue ;
    if(i==7)  continue ;
    if(i==15) continue ;
    if(i==16) continue ;
    if(i==17) continue ;
    if(rows[i].complete==0){
      end_of_game = false ;
      break ;
    }
  }
  if(end_of_game==true){
    nRolls = 3 ;
    document.getElementById('nRolls').innerHTML = 'Number of rolls left: ' + (3-nRolls) ;
    document.getElementById('button_roll').className = 'button button_fade' ;
    end_game() ;
  }
  nRolls = 0 ;
  roll() ;
}

function roll(){
  if(nRolls==3) return ;
  for(var i=0 ; i<nDice ; i++){
    if(dice[i]<=0) dice[i] = random() ;
    var td = document.getElementById('td_dice_'+(i+1)) ;
    td.innerHTML = dice_HTML(dice[i]) ;
    td.className = 'dice dice_full' ;
  }
  
  for(var i=0 ; i<rows.length ; i++){
    if(rows[i].complete==1) continue ;    
    if(i==6)  continue ;
    if(i==7)  continue ;
    if(i==15) continue ;
    if(i==16) continue ;
    if(i==17) continue ;
    var the_score = rows[i].get_score() ;
    document.getElementById('td_thisRoll_' + rows[i].id ).innerHTML = '<input type="submit" class="button score" value="' + the_score + '" onclick="try_score('+i+')"/>'
  }
  
  nRolls++ ;
  document.getElementById('nRolls').innerHTML = 'Number of rolls left: ' + (3-nRolls) ;
  if(nRolls==3){ document.getElementById('button_roll').className = 'button button_fade' ; }
}

function random(){ return 1+Math.round(Math.random()*6-0.5) ; }

function add_new_game_link(){
  //alert('To do...') ;
}

function end_game(){
  xmlhttp_score_threshold.onreadystatechange = get_score_from_sql ;
  xmlhttp_score_threshold.open('GET', 'http://www.aidansean.com/dice_game/scores.php?task=get_highscore_threshold&sid=' + Math.random(),true) ;
  xmlhttp_score_threshold.send(null) ;
}

function GetXmlHttpObject(){
  if(window.XMLHttpRequest){
    // code for IE7+, Firefox, Chrome, Opera, Safari
    return new XMLHttpRequest() ;
  }
  if(window.ActiveXObject){
    // code for IE6, IE5
    return new ActiveXObject("Microsoft.XMLHTTP") ;
  }
  return null ;
}
function get_score_from_sql(){
  if(xmlhttp_score_threshold.readyState==4){
    var score = rows[17].get_score() ;
    highScore = xmlhttp_score_threshold.responseText ;
    var congratulations = "That's not bad!" ;
    if(score>200) congratulations = "That's awesome!" ;
    if(score>400) congratulations = "Erm, you might want to get out more!" ;
    if(score<100) congratulations = "That's pathetic!" ;
    if(score>highScore){
      var name = prompt("Game over!  You scored " + score + " points.  " + congratulations + "  Thanks for playing.\n\nYou've earned a place on the High Scores Board!  If you want to appear on the High Scores Boards then enter your name below:") ;
      if(name!=='' && name!=null && name!='null'){
        var url = 'http://www.aidansean.com/dice_game/scores.php?task=save_score' + '&name=' + name + '&score=' + score + '&sid=' + Math.random() ;
        xmlhttp_save_score.open('GET', url, true) ;
        xmlhttp_save_score.send(null) ;
      }
    }
    else{
      alert("Game over!  You scored " + score + " points.  " + congratulations + "  Thanks for playing.") ;
    }
    xmlhttp_get_scores.onreadystatechange = update_high_scores_board ;
    xmlhttp_get_scores.open('GET', 'http://www.aidansean.com/dice_game/scores.php?task=get_scores&sid=' + Math.random(),true) ;
    xmlhttp_get_scores.send(null) ;
    
    add_new_game_link() ;
  }
}
function update_high_scores_board(){
  if(xmlhttp_get_scores.readyState==4){
    document.getElementById('highScoresBoard').innerHTML = '<h2 id="highScoresBoardH2">High Scores Board</h2>' + xmlhttp_get_scores.responseText ;
  }
}