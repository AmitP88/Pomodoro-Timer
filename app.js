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
//   console.log("clicks:" + clicks);
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

// Run - if # of clicks is odd
function run(){
  interval = setInterval(function(){   
    // if timer has only minutes and 0 seconds displayed (example: 20:00)
    if(minutes > 10 && seconds == 0){
      minutes_div.innerHTML = --minutes;
      seconds = 60;
      seconds_div.innerHTML = seconds;
    }
    // if timer is below 60:00, enables (+) button
    if(minutes <= 60 && seconds <= 60){
      add.disabled = false;
    }    
    // if timer has minutes displayed that fall between 1 and 10, adds a leading zero to minutes (example: 05:00) 
    if(minutes > 1 && minutes <= 10 && seconds == 0){
      minutes_div.innerHTML = '0' + --minutes;
      seconds = 60;
      seconds_div.innerHTML = seconds;
    }
    // if timer is on final minute (01:00)
    if( minutes == 1 && seconds == 0 ){
      minutes = 0;
      minutes_div.innerHTML = '0' + minutes;
      seconds = 60;
      seconds_div.innerHTML = seconds;
    }
    // counts down seconds and adds a leading zero when seconds fall below 10
    seconds_div.innerHTML = ('0' + --seconds).slice(-2);
    // if timer runs out (reaches 00:00), displays "time's up" message on clock
    if(minutes === 0 && seconds < 0){
      clearInterval(interval);
      minutes_div.innerHTML = "time's";
      colon_div.innerHTML = ' ';
      seconds_div.innerHTML = "up!";
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
  // if the timer runs out (reaches below 00:00) and the (-) button is disabled, allows the user to decrement minutes again only after incrementing minutes
  if(minutes === 0 && minus.disabled === true && trigger.disabled === true) {
    minus.disabled = false;
    trigger.disabled = false;
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
  
}

// Reset - resets timer back to default state; seconds go back to default value
function reset_timer(){
  clearInterval(interval);
  minutes = 25;
  seconds = 0;
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