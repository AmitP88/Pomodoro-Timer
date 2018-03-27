var trigger = document.getElementById("trigger");
var countdown = document.getElementById("countdown");
var minutes_div = document.getElementById("minutes");
var colon_div = document.getElementById("colon");
var seconds_div = document.getElementById("seconds");
var reset = document.getElementById("reset");
var add = document.getElementById("add");
var minus = document.getElementById("minus");
var minutes = 25;
var seconds = 0;
var clicks = 0;
var interval;

// minutes countdown circle setup
var minutes_radius = 10.5
minutes_circumference = 2 * minutes_radius * Math.PI;

var minutes_els = document.querySelectorAll('.minutes');
Array.prototype.forEach.call(minutes_els, function (minutes_el)  {
  minutes_el.setAttribute('stroke-dasharray', minutes_circumference + 'em');
  minutes_el.setAttribute('r', minutes_radius + 'em');
});

document.querySelector('.minutes-radial-progress-center').setAttribute('r', (minutes_radius - 0.01 + 'em'));

var minutes_circle_time = 60 - minutes;

var currentMinutesCount = minutes_circle_time;
maxMinutesCount = 60;

// seconds countdown circle setup
var seconds_radius = 10,
seconds_circumference = 2 * seconds_radius * Math.PI;

var seconds_els = document.querySelectorAll('.seconds');
Array.prototype.forEach.call(seconds_els, function (seconds_el) {
  seconds_el.setAttribute('stroke-dasharray', seconds_circumference + 'em');
  seconds_el.setAttribute('r', seconds_radius + 'em');
});

document.querySelector('.seconds-radial-progress-center').setAttribute('r', (seconds_radius - 0.01 + 'em'));

var currentSecondsCount = 1, 
maxSecondsCount = 60;

// For display purposes, adds leading zeros if either minutes or seconds are below 10
if(minutes < 10){
  minutes_div.innerHTML = '0' + minutes;
} else {
  minutes_div.innerHTML = minutes;  
}

if(seconds < 10){
  seconds_div.innerHTML = '0' + seconds;
} else {
  seconds_div.innerHTML = seconds;  
}

// Clicked - to increment clicks variable
function clicked(){
  clicks++;
  // check to see if number of clicks are even or odd
  if(clicks % 2 == 0)/* number of clicks is even */{
    // pauses the timer if number of clicks is even
    clearInterval(interval);
    trigger.innerHTML = '&#9658;';
  } else if (Math.abs(clicks % 2) == 1)/* number of clicks is odd */{
    // calls the run function (which starts the timer) if number of clicks is odd
    run();
    trigger.innerHTML = '&#10074;&#10074;';
  } 
}

function seconds_circle(){
    // decrements seconds circle for each second counted down
    var seconds_offset = -(seconds_circumference / maxSecondsCount) * currentSecondsCount + 'em';
    console.log(currentSecondsCount, seconds_offset);
    document.querySelector('.seconds-radial-progress-cover').setAttribute('stroke-dashoffset', seconds_offset);
    currentSecondsCount++;  
}

function minutes_circle() {
    // decrements minutes circle for each minute counted down
    var minutes_offset = -(minutes_circumference / maxMinutesCount) * currentMinutesCount + 'em';
    console.log(currentMinutesCount, minutes_offset);
    document.querySelector('.minutes-radial-progress-cover').setAttribute('stroke-dashoffset', minutes_offset);  
}

minutes_circle(); // sets minutes circle to default minutes

// Run - if # of clicks is odd
function run(){
  interval = setInterval(function(){

    seconds_circle();
    minutes_circle();
    

    // if timer has only minutes and 0 seconds displayed (example: 20:00)
    if(minutes > 10 && seconds == 0){
      minutes_div.innerHTML = --minutes;
      currentMinutesCount++;      
      seconds = 60;
      seconds_div.innerHTML = seconds;
      // currentSecondsCount = 1;
      // currentSecondsCount++;
    }

    // if timer is below 60:00, enables (+) button
    if(minutes <= 60 && seconds <= 60){
      add.disabled = false;
    }    
    // if timer has minutes displayed that fall between 1 and 10, adds a leading zero to minutes (example: 05:00) 
    if(minutes > 1 && minutes <= 10 && seconds == 0){
      minutes_div.innerHTML = '0' + --minutes;
      currentSecondsCount = 1;
      currentSecondsCount++;
      currentMinutesCount = currentMinutesCount + 1;
      seconds = 60;
      seconds_div.innerHTML = seconds;
    }

    // if timer is on final minute (01:00)
    if( minutes == 1 && seconds == 0 ){
      minutes = 0;
      minutes_div.innerHTML = '0' + minutes;
      currentMinutesCount++;
      seconds = 60;
      currentSecondsCount++;
      seconds_div.innerHTML = seconds;
    }
    // counts down seconds and adds a leading zero when seconds fall below 10
    seconds_div.innerHTML = ('0' + --seconds).slice(-2);
    // if timer runs out (reaches 00:00), displays "time's up" message on clock
    if(minutes === 0 && seconds < 0){
      currentMinutesCount = 0;
      clearInterval(interval);
      minutes_div.innerHTML = "Time's";
      colon_div.innerHTML = ' ';
      seconds_div.innerHTML = "Up!";
      minus.disabled = true;
      trigger.innerHTML = '&#9658;';
      trigger.disabled = true;    
    }
  },1000);
}

// Increment - allows the user to increase the number of minutes on timer (up to 60 minutes max)
function increment(){
  trigger.innerHTML = '&#9658;';
  // resets the number of clicks to zero (this prevents having to click the start button twice after incrementing the minutes)
  clicks = 0;

  minutes_circle_time = 59 - minutes;
  currentMinutesCount = minutes_circle_time;

  currentSecondsCount = 1;

  // if the timer runs out (reaches below 00:00) and the (-) button is disabled, allows the user to decrement minutes again only after incrementing minutes
  if(minutes === 0 && minus.disabled === true && trigger.disabled === true) {
    minus.disabled = false;
    trigger.disabled = false;
  }

  if(minutes === 0 && minus.disabled === true && trigger.disabled === false){
    minus.disabled = false;
  }

  // sets the max number of minutes available to increment up to 60 (so that the timer can only have a max number of 60 minutes - 1 hour)
  if(minutes >= 0 && minutes <= 59){
    minutes_div.innerHTML = ++minutes;
    colon_div.innerHTML = ':';
    seconds = 0;
    seconds_div.innerHTML = '0' + seconds;
    clearInterval(interval);

  }
  // disabled (+) if minutes is set to 60 (the max number of minutes the timer can be set)
  if(minutes === 60){
    add.disabled = true;
  }
  // adds a leading zero to minutes if there are less than 10 minutes left on timer (example 05:00)  
  if(minutes < 10){
    minutes_div.innerHTML = '0' + minutes;
  } else {
    minutes_div.innerHTML = minutes;
  }
  // if timer runs out (reaches 00:00) and time's up is displayed, disables (+) button
  if(minutes === 0 && seconds < 0){
    add.disabled = true;
  }
}

// Decrement - allows the user to decrease the number of minutes (down to a minimum of 0)
function decrement(){
  trigger.innerHTML = '&#9658;';
  // resets the number of clicks to zero (this prevents having to click the start button twice after incrementing the minutes)
  clicks = 0;

  minutes_circle_time = 61 - minutes;
  currentMinutesCount = minutes_circle_time;    

  currentSecondsCount = 0;

  // re-enables the (-) button if the timer is set at 60 minutes (max time) and the (+) button is disabled
  if(minutes === 60 && add.disabled === true) {
    minus.disabled = false;
  }
  // re-enables the (+) button if the timer is below 60 minutes and the (+) button is disabled
  if(minutes <= 60 && add.disabled === true){
    add.disabled = false;
  }
  // as long as there's minutes left on the timer, counts down minutes and sets seconds to zero
  if(minutes > 0){
    minutes_div.innerHTML = --minutes;
    seconds = 0;
    seconds_div.innerHTML = '0' + seconds;
    clearInterval(interval);
  }
  // adds a leading zero if minutes are less than 10 (example: 05:00) 
  if(minutes < 10){
    minutes_div.innerHTML = '0' + minutes;
  } else {
    minutes_div.innerHTML = minutes;
  }
  // if timer is 00:00, disables (-) button
  if(minutes === 0 && seconds === 0){
    minus.disabled = true;
  }
  // if timer is 00 : (some seconds left), set seconds to zero and stop countdown
  if(minutes === 0 && seconds < 60 && seconds > 0){
    seconds = 0;
    seconds_div.innerHTML = '0' + seconds;
    clearInterval(interval);
  }
  
}

// Reset - resets timer back to default state; seconds go back to default value
function reset_timer(){
  clearInterval(interval);
  minutes = 25;
  seconds = 0;
  currentSecondsCount = 0;
  minutes_circle_time = 60 - minutes;
  currentMinutesCount = minutes_circle_time;  
  minutes_circle();
  seconds_circle();
  minutes_div.innerHTML = minutes;
  colon_div.innerHTML = ':';
  seconds_div.innerHTML = seconds;
  minus.disabled = false;
  trigger.innerHTML = '&#9658;';
  trigger.disabled = false;
  // For display purposes, adds leading zeros if either minutes or seconds are below 10
  if(minutes < 10){
    minutes_div.innerHTML = '0' + minutes;
  } else {
    minutes_div.innerHTML = minutes;  
  }

  if(seconds < 10){
    seconds_div.innerHTML = '0' + seconds;
  } else {
    seconds_div.innerHTML = seconds;  
  }  
  // resets number of clicks back to zero (default state)
  clicks = 0;
}