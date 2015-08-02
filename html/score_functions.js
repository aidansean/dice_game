function ones(){
  this.score = 0 ;
  this.complete = 0 ;
  this.name = 'Ones' ;
  this.description = '' ;
  this.id = 'score_ones' ;
  this.get_score = function(){
    if(this.complete==1) return this.score ;
    var the_score = 0 ;
    for(var i=0 ; i<nDice ; i++){ if(dice[i]==1) the_score += 1 ; }
    return the_score ;
  }
  this.set_score = function(){
    this.score = this.get_score() ;
    this.complete = 1 ;
  }
}

function twos(){
  this.score = 0 ;
  this.complete = 0 ;
  this.name = 'Twos' ;
  this.description = '' ;
  this.id = 'score_twos' ;
  this.get_score = function(){
    if(this.complete==1) return this.score ;
    var the_score = 0 ;
    for(var i=0 ; i<nDice ; i++){ if(dice[i]==2) the_score += 2 ; }
    return the_score ;
  }
  this.set_score = function(){
    this.score = this.get_score() ;
    this.complete = 1 ;
  }
}

function threes(){
  this.score = 0 ;
  this.complete = 0 ;
  this.name = 'Threes' ;
  this.description = '' ;
  this.id = 'score_threes' ;
  this.get_score = function(){
    if(this.complete==1) return this.score ;
    var the_score = 0 ;
    for(var i=0 ; i<nDice ; i++){ if(dice[i]==3) the_score += 3 ; }
    return the_score ;
  }
  this.set_score = function(){
    this.score = this.get_score() ;
    this.complete = 1 ;
  }
}

function fours(){
  this.score = 0 ;
  this.complete = 0 ;
  this.name = 'Fours' ;
  this.description = '' ;
  this.id = 'score_fours' ;
  this.get_score = function(){
    if(this.complete==1) return this.score ;
    var the_score = 0 ;
    for(var i=0 ; i<nDice ; i++){ if(dice[i]==4) the_score += 4 ; }
    return the_score ;
  }
  this.set_score = function(){
    this.score = this.get_score() ;
    this.complete = 1 ;
  }
}

function fives(){
  this.score = 0 ;
  this.complete = 0 ;
  this.name = 'Fives' ;
  this.description = '' ;
  this.id = 'score_fives' ;
  this.get_score = function(){
    if(this.complete==1) return this.score ;
    var the_score = 0 ;
    for(var i=0 ; i<nDice ; i++){ if(dice[i]==5) the_score += 5 ; }
    return the_score ;
  }
  this.set_score = function(){
    this.score = this.get_score() ;
    this.complete = 1 ;
  }
}

function sixes(){
  this.score = 0 ;
  this.complete = 0 ;
  this.name = 'Sixes' ;
  this.description = '' ;
  this.id = 'score_sixes' ;
  this.get_score = function(){
    if(this.complete==1) return this.score ;
    var the_score = 0 ;
    for(var i=0 ; i<nDice ; i++){ if(dice[i]==6) the_score += 6 ; }
    return the_score ;
  }
  this.set_score = function(){
    this.score = this.get_score() ;
    this.complete = 1 ;
  }
}

function bonus(){
  this.score = 0 ;
  this.complete = 0 ;
  this.name = 'Bonus' ;
  this.description = '' ;
  this.id = 'score_bonus' ;
  this.get_score = function(){
    if(this.complete==1) return this.score ;
    var the_score = 0 ;
    for(var i=0 ; i<6 ; i++){ the_score += rows[i].score ; }
    if(the_score>=63){
      this.score = 35 ;
      return 35 ;
    }
    return 0 ;
  }
  this.set_score = function(){
    this.score = this.get_score() ;
  }
}

function chance(){
  this.score = 0 ;
  this.complete = 0 ;
  this.name = 'Chance' ;
  this.description = '' ;
  this.id = 'score_chance' ;
  this.get_score = function(){
    if(this.complete==1) return this.score ;
    return sum_dice() ;
  }
  this.set_score = function(){
    this.score = this.get_score() ;
    this.complete = 1 ;
  }
}

function three_of_a_kind(){
  this.score = 0 ;
  this.complete = 0 ;
  this.name = 'Three of a kind' ;
  this.description = '' ;
  this.id = 'score_threeOfAKind' ;
  this.get_score = function(){
    if(this.complete==1) return this.score ;
    var the_score = 0 ;
    var n = new Array() ;
    for(var i=0 ; i<6 ; i++) n[i] = 0 ;
    for(var i=0 ; i<nDice ; i++){ n[dice[i]-1]++ ; }
    for(var i=0 ; i<6 ; i++){
      if(n[i]>2) return sum_dice() ;
    }
    return 0 ;
  }
  this.set_score = function(){
    this.score = this.get_score() ;
    this.complete = 1 ;
  }
}

function four_of_a_kind(){
  this.score = 0 ;
  this.complete = 0 ;
  this.name = 'Four of a kind' ;
  this.description = '' ;
  this.id = 'score_fourOfAKind' ;
  this.get_score = function(){
    if(this.complete==1) return this.score ;
    var the_score = 0 ;
    var n = new Array() ;
    for(var i=0 ; i<6 ; i++) n[i] = 0 ;
    for(var i=0 ; i<nDice ; i++){ n[dice[i]-1]++ ; }
    for(var i=0 ; i<6 ; i++){
      if(n[i]>3) return  sum_dice() ;
    }
    return 0 ;
  }
  this.set_score = function(){
    this.score = this.get_score() ;
    this.complete = 1 ;
  }
}

function full_house(){
  this.score = 0 ;
  this.complete = 0 ;
  this.name = 'Full house' ;
  this.description = '' ;
  this.id = 'score_fullHouse' ;
  this.get_score = function(){
    if(this.complete==1) return this.score ;
    var the_score = 0 ;
    var n = new Array() ;
    for(var i=0 ; i<6 ; i++) n[i] = 0 ;
    for(var i=0 ; i<nDice ; i++){ n[dice[i]-1]++ ; }
    var n1 = 0 ;
    var n2 = 0 ;
    for(var i=0 ; i<6 ; i++){
      if(n[i]==2) n1 = 1 ;
      if(n[i]==3) n2 = 1 ;
    }
    if(n1==1 && n2==1) return 25 ;
    return 0 ;
  }
  this.set_score = function(){
    this.score = this.get_score() ;
    this.complete = 1 ;
  }
}

function small_straight(){
  this.score = 0 ;
  this.complete = 0 ;
  this.name = 'Small straight' ;
  this.description = '' ;
  this.id = 'score_smallStraight' ;
  this.get_score = function(){
    if(this.complete==1) return this.score ;
    var n = new Array() ;
    for(var i=0 ; i<6 ; i++) n[i] = 0 ;
    for(var i=0 ; i<nDice ; i++){ n[dice[i]-1]++ ; }
    for(var i=0 ; i<3 ; i++){ if(n[i+0]>0 && n[i+1]>0 && n[i+2]>0 && n[i+3]>0) return 30 ; }
    return 0 ;
  }
  this.set_score = function(){
    this.score = this.get_score() ;
    this.complete = 1 ;
  }
}

function large_straight(){
  this.score = 0 ;
  this.complete = 0 ;
  this.name = 'Large straight' ;
  this.description = '' ;
  this.id = 'score_largeStraight' ;
  this.get_score = function(){
    if(this.complete==1) return this.score ;
    var the_score = 0 ;
    var n = new Array() ;
    for(var i=0 ; i<6 ; i++) n[i] = 0 ;
    for(var i=0 ; i<nDice ; i++){ n[dice[i]-1]++ ; }
    for(var i=0 ; i<2 ; i++){ if(n[i+0]>0 && n[i+1]>0 && n[i+2]>0 && n[i+3]>0 && n[i+4]>0) return 40 ; }
    return 0 ;
  }
  this.set_score = function(){
    this.score = this.get_score() ;
    this.complete = 1 ;
  }
}

function five_of_a_kind(){
  this.score = 0 ;
  this.complete = 0 ;
  this.name = 'Yahtzee' ;
  this.description = '' ;
  this.id = 'score_fiveOfAKind' ;
  this.get_score = function(){
    if(this.complete==1) return this.score ;
    var the_score = 0 ;
    var n = new Array() ;
    for(var i=0 ; i<6 ; i++) n[i] = 0 ;
    for(var i=0 ; i<nDice ; i++){ n[dice[i]-1]++ ; }
    for(var i=0 ; i<7 ; i++) if(n[i]>4) return 50 ;
    return 0
  }
  this.set_score = function(){
    this.score = this.get_score() ;
    this.complete = 1 ;
  }
}

function yahtzee_bonus(){
  this.score = 0 ;
  this.complete = 0 ;
  this.name = 'Yahtzee bonus' ;
  this.description = '' ;
  this.id = 'score_yahtzee_bonus' ;
  this.get_score = function(){
    if(this.complete==1) return this.score ;
    var the_score = 0 ;
    var n = new Array() ;
    for(var i=0 ; i<6 ; i++) n[i] = 0 ;
    for(var i=0 ; i<nDice ; i++){ n[dice[i]-1]++ ; }
    for(var i=0 ; i<7 ; i++) if(n[i]>4) return 100 ;
    return 0
  }
  this.set_score = function(){
    this.score = this.get_score() ;
    this.complete = 1 ;
  }
}

function check_yahtzee_bonus(){
  if(rows[13].complete==0) return ;
  if(rows[16].get_score()==100){
    rows[16].set_score() ;
    document.getElementById('td_score_yahtzee_bonus').innerHTML = rows[16].get_score() ;
  }
}

function upper(){
  this.score = 0 ;
  this.complete = 0 ;
  this.name = 'Upper total' ;
  this.description = '' ;
  this.id = 'score_upper' ;
  this.get_score = function(){
    var the_score = 0 ;
    for(var i=0 ; i<7 ; i++){ the_score += rows[i].score ; }
    return the_score ;
  }
  this.set_score = function(){
    this.score = this.get_score() ;
  }
}

function lower(){
  this.score = 0 ;
  this.complete = 0 ;
  this.name = 'Lower total' ;
  this.description = '' ;
  this.id = 'score_lower' ;
  this.get_score = function(){
    var the_score = 0 ;
    for(var i=8 ; i<15 ; i++){ the_score += rows[i].score ; }
    return the_score ;
  }
  this.set_score = function(){
    this.score = this.get_score() ;
  }
}

function total(){
  this.score = 0 ;
  this.complete = 0 ;
  this.name = 'Grand total' ;
  this.description = '' ;
  this.id = 'score_total' ;
  this.get_score = function(){
    var the_score = 0 ;
    the_score += rows[7].get_score() ;
    the_score += rows[15].get_score() ;
    the_score += rows[16].get_score() ;
    return the_score ;
  }
  this.set_score = function(){
    this.score = this.get_score() ;
  }
}