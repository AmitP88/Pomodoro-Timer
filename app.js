let trigger = document.getElementById("trigger");
let countdown = document.getElementById("countdown");
let minutes_div = document.getElementById("minutes");
let colon_div = document.getElementById("colon");
let seconds_div = document.getElementById("seconds");
let reset = document.getElementById("reset");
let add = document.getElementById("add");
let minus = document.getElementById("minus");
let audio = new Audio('analog-watch-alarm_daniel-simion.mp3');
let work_button = document.getElementById('choice1');
let break_button = document.getElementById('choice2');
let minute_stroke = document.querySelector('.minutes-radial-progress-cover');

let minutes = 60;
let seconds = 0;

let clicks = 0;
let interval;

let minutes_radius = 10.5
minutes_circumference = 2 * minutes_radius * Math.PI;

let seconds_radius = 10,
seconds_circumference = 2 * seconds_radius * Math.PI;

let minutes_circle_time = 60 - minutes;
let currentMinutesCount = minutes_circle_time;
maxMinutesCount = 60;

let currentSecondsCount = 1, 
maxSecondsCount = 60;

const displayTimer = () => {
  /* MINUTE CIRCLE DISPLAY SETUP */
  ChangeTimers();

  let minutes_els = document.querySelectorAll('.minutes');
  Array.prototype.forEach.call(minutes_els, (minutes_el) => {
    minutes_el.setAttribute('stroke-dasharray', minutes_circumference + 'em');
    minutes_el.setAttribute('r', minutes_radius + 'em');
  });
  document.querySelector('.minutes-radial-progress-center').setAttribute('r', (minutes_radius - 0.01 + 'em'));


  /* SECONDS CIRCLE DISPLAY SETUP */

  let seconds_els = document.querySelectorAll('.seconds');
  Array.prototype.forEach.call(seconds_els, (seconds_el) => {
    seconds_el.setAttribute('stroke-dasharray', seconds_circumference + 'em');
    seconds_el.setAttribute('r', seconds_radius + 'em');
  });
  document.querySelector('.seconds-radial-progress-center').setAttribute('r', (seconds_radius - 0.01 + 'em'));


  // For display purposes, adds leading zeros if either minutes or seconds are below 10
  minutes < 10 ? (minutes_div.innerHTML = '0' + minutes) : (minutes_div.innerHTML = minutes)
  seconds < 10 ? (seconds_div.innerHTML = '0' + seconds) : (seconds_div.innerHTML = seconds)  
}

// Clicked - to increment clicks variable
const clicked = () => {
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

// ChangeTimers - A function that changes between Work and Break timers
const ChangeTimers = () => {
  if (work_button.checked) {
    // Change minute circle color to green
    minute_stroke.style.stroke = "#00FF00"; // lime green

    // stops timer
    clicks = -1;
    clearInterval(interval);
    clicked();

  } else if (break_button.checked) {
    // Change minute circle color to blue
    minute_stroke.style.stroke = "#00CED1"; // blue
    
    // stops timer
    clicks = -1;
    clearInterval(interval);
    clicked();

  }
}

work_button.onclick = ChangeTimers;
break_button.onclick = ChangeTimers;

const stop_alarm = () => audio.pause();

const seconds_circle = () => {
    // decrements seconds circle for each second counted down
    let seconds_offset = -(seconds_circumference / maxSecondsCount) * currentSecondsCount + 'em';
    document.querySelector('.seconds-radial-progress-cover').setAttribute('stroke-dashoffset', seconds_offset);
    currentSecondsCount++;  
}

const minutes_circle = () => {
    // decrements minutes circle for each minute counted down
    let minutes_offset = -(minutes_circumference / maxMinutesCount) * currentMinutesCount + 'em';
    document.querySelector('.minutes-radial-progress-cover').setAttribute('stroke-dashoffset', minutes_offset);  
}

minutes_circle(); // sets minutes circle to default minutes

// runAfterWork - if work timer runs out, switches to break timer, resets timer, and countsdown
const runAfterWork = () => {
  stop_alarm();
  break_button.checked = true;
  minute_stroke.style.stroke = "#00CED1"; // blue
  reset_timer();
  clicks = 0;
  clicked();
  clearInterval(interval);

  interval = setInterval(() => {

    seconds_circle();
    minutes_circle();

    // if timer has only minutes and 0 seconds displayed (example: 20:00)
    if(minutes > 10 && seconds == 0){
      minutes_div.innerHTML = --minutes;
      currentMinutesCount++;      
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
      currentMinutesCount = currentMinutesCount + 1;
      seconds = 60;
      seconds_div.innerHTML = seconds;
    }

    // if timer is on final minute (01:00)
    if(minutes == 1 && seconds == 0){
      minutes = 0;
      minutes_div.innerHTML = '0' + minutes;
      currentMinutesCount++;
      seconds = 60;
      currentSecondsCount = 1;
      currentSecondsCount++;
      seconds_div.innerHTML = seconds;
    }
    // counts down seconds and adds a leading zero when seconds fall below 10
    seconds_div.innerHTML = ('0' + --seconds).slice(-2);
    // if timer runs out (reaches 00:00), displays "time's up" message on clock
    if(minutes === 0 && seconds < 0){
      currentMinutesCount = 0;
      clearInterval(interval);
      currentSecondsCount = 0;
      seconds_circle();
      audio.play();
      minutes_div.innerHTML = "Begin";
      colon_div.innerHTML = ' ';
      seconds_div.innerHTML = "Work";
      minus.disabled = true;
      trigger.innerHTML = '&#9658;';
      trigger.disabled = true;
    }
  }, 1000);
}

const runAfterBreak = () => {
  stop_alarm();
  work_button.checked = true;
  minute_stroke.style.stroke = "#00FF00"; // lime green
  reset_timer();
  clicks = 0;
  clicked();
  clearInterval(interval);

  interval = setInterval(() => {

    seconds_circle();
    minutes_circle();

    // if timer has only minutes and 0 seconds displayed (example: 20:00)
    if(minutes > 10 && seconds == 0){
      minutes_div.innerHTML = --minutes;
      currentMinutesCount++;      
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
      currentMinutesCount = currentMinutesCount + 1;
      seconds = 60;
      seconds_div.innerHTML = seconds;
    }

    // if timer is on final minute (01:00)
    if(minutes == 1 && seconds == 0){
      minutes = 0;
      minutes_div.innerHTML = '0' + minutes;
      currentMinutesCount++;
      seconds = 60;
      currentSecondsCount = 1;
      currentSecondsCount++;
      seconds_div.innerHTML = seconds;
    }
    // counts down seconds and adds a leading zero when seconds fall below 10
    seconds_div.innerHTML = ('0' + --seconds).slice(-2);
    // if timer runs out (reaches 00:00), displays "time's up" message on clock
    if(minutes === 0 && seconds < 0){
      currentMinutesCount = 0;
      clearInterval(interval);
      currentSecondsCount = 0;
      seconds_circle();
      audio.play();
      minutes_div.innerHTML = "Break";
      colon_div.innerHTML = ' ';
      seconds_div.innerHTML = "Time!";
      minus.disabled = true;
      trigger.innerHTML = '&#9658;';
      trigger.disabled = true;
    }
  }, 1000);
}

// Run - if # of clicks is odd
const run = () => {
  interval = setInterval(() => {

    seconds_circle();
    minutes_circle();
   
    // if timer has only minutes and 0 seconds displayed (example: 20:00)
    if(minutes > 10 && seconds == 0){
      minutes_div.innerHTML = --minutes;
      currentMinutesCount++;      
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
      currentMinutesCount = currentMinutesCount + 1;
      seconds = 60;
      seconds_div.innerHTML = seconds;
    }

    // if timer is on final minute (01:00)
    if(minutes == 1 && seconds == 0){
      minutes = 0;
      minutes_div.innerHTML = '0' + minutes;
      currentMinutesCount++;
      seconds = 60;
      currentSecondsCount = 1;
      currentSecondsCount++;
      seconds_div.innerHTML = seconds;
    }
    // counts down seconds and adds a leading zero when seconds fall below 10
    seconds_div.innerHTML = ('0' + --seconds).slice(-2);
    // if timer runs out (reaches 00:00), displays "time's up" message on clock
    if((minutes === 0 && seconds < 0)&&(work_button.checked)){
      currentMinutesCount = 0;
      clearInterval(interval);
      currentSecondsCount = 0;
      seconds_circle();
      audio.play();
      minutes_div.innerHTML = "Break";
      colon_div.innerHTML = ' ';
      seconds_div.innerHTML = "Time!";
      minus.disabled = true;
      trigger.innerHTML = '&#9658;';
      trigger.disabled = true;

      setTimeout("runAfterWork()", 3000);
    
    } else if ((minutes === 0 && seconds < 0)&&(break_button.checked)){
        currentMinutesCount = 0;
        clearInterval(interval);
        currentSecondsCount = 0;
        seconds_circle();
        audio.play();
        minutes_div.innerHTML = "Begin";
        colon_div.innerHTML = ' ';
        seconds_div.innerHTML = "Work";
        minus.disabled = true;
        trigger.innerHTML = '&#9658;';
        trigger.disabled = true;

        setTimeout("runAfterBreak()", 3000);
    }
  },1000);
}

// Increment - allows the user to increase the number of minutes on timer (up to 60 minutes max)
const increment = () =>{
  trigger.innerHTML = '&#9658;';
  // resets the number of clicks to zero (this prevents having to click the start button twice after incrementing the minutes)
  clicks = 0;
  stop_alarm();
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
    minutes_circle_time = 60 - minutes;
    currentMinutesCount = minutes_circle_time;
    minutes_circle();
    colon_div.innerHTML = ':';
    seconds = 0;
    currentSecondsCount = 0;
    seconds_circle();
    seconds_div.innerHTML = '0' + seconds;
    clearInterval(interval);
    add.disabled = false;
  }
  // disabled (+) if minutes is set to 60 (the max number of minutes the timer can be set)
  if(minutes === 60){
    toggleOff();
    add.disabled = true;
  }

  // adds a leading zero to minutes if there are less than 10 minutes left on timer (example 05:00)  
  if(minutes < 10){
    minutes_div.innerHTML = '0' + minutes;
  } else {
    minutes_div.innerHTML = minutes;
  }
}

let tid = 0;
let speed = 220;

add.addEventListener("mousedown", () => {
  toggleOnIncrement();
})

add.addEventListener("mouseup", () => {
  toggleOff();
})

minus.addEventListener("mousedown", () => {
  toggleOnDecrement();
})

minus.addEventListener("mouseup", () => {
  toggleOff();
})

const toggleOnDecrement = () => {
  if(tid==0){
    tid=setInterval('decrement()',speed);
  }
}
  
const toggleOnIncrement = () => {
  if(tid==0){
    tid=setInterval('increment()',speed);
  }
}

const toggleOff = () => {
  if(tid!=0){
    clearInterval(tid);
    tid=0;
  }
}

// Decrement - allows the user to decrease the number of minutes (down to a minimum of 0)
const decrement = () => {
  trigger.innerHTML = '&#9658;';
  // resets the number of clicks to zero (this prevents having to click the start button twice after incrementing the minutes)
  clicks = 0;

  minutes_circle_time = 61 - minutes;
  currentMinutesCount = minutes_circle_time;    
  minutes_circle();
  currentSecondsCount = 0;
  seconds_circle();

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
  
  if(minutes === 0){
    toggleOff();
    minus.disabled = true;
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
const reset_timer = () => {
  tid = 0;
  if(minutes === 60){
    add.disabled = false;
    minus.disabled = true;
  }
  stop_alarm();
  clearInterval(interval);
  minutes = 60;
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