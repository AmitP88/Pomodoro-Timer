// DOM elements that make up timer
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

// Work Timer minutes
let work_minutes = 60;
let work_minutes_circle_time = 60 - work_minutes;
let currentWorkMinutesCount = work_minutes_circle_time;
maxWorkMinutesCount = 60;

// Work Timer seconds
let work_seconds = 0;
let currentWorkSecondsCount = 1;
maxWorkSecondsCount = 60;

// Break Timer minutes
let break_minutes = 60;
let break_minutes_circle_time = 60 - break_minutes;
let currentBreakMinutesCount = break_minutes_circle_time;
maxBreakMinutesCount = 60;

// Break Timer seconds
let break_seconds = 0;
let currentBreakSecondsCount = 1;
maxBreakSecondsCount = 60;

// SVG minutes circle dimensions
let minutes_radius = 10.5
minutes_circumference = 2 * minutes_radius * Math.PI;

// SVG seconds circle dimensions
let seconds_radius = 10,
seconds_circumference = 2 * seconds_radius * Math.PI;

// click and interval flags
let clicks = 0;
let interval;

const displayTimer = () => {
  ChangeTimers();

  /* MINUTE CIRCLE DISPLAY SETUP */
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
  if(work_button.checked) {
    work_minutes < 10 ? (minutes_div.innerHTML = '0' + work_minutes) : (minutes_div.innerHTML = work_minutes)
    work_seconds < 10 ? (seconds_div.innerHTML = '0' + work_seconds) : (seconds_div.innerHTML = work_seconds)
  } else if(break_button.checked) {
    break_minutes < 10 ? (minutes_div.innerHTML = '0' + break_minutes) : (minutes_div.innerHTML = break_minutes)
    break_seconds < 10 ? (seconds_div.innerHTML = '0' + break_seconds) : (seconds_div.innerHTML = break_seconds)
  }
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
    if(work_button.checked){
      runWorkTimer();
    } else if(break_button.checked){
      runBreakTimer();
    }

    trigger.innerHTML = '&#10074;&#10074;';
  } 
}

// ChangeTimers - A function that changes between Work and Break timers
const ChangeTimers = () => {
  if (work_button.checked) {
    // Change minute circle color to green
    minute_stroke.style.stroke = "#00FF00"; // lime green
    // display current work time setting
    if(work_minutes < 60 && work_seconds < 60 && work_seconds > 0){
      minutes_div.innerHTML = work_minutes++;
      work_minutes_circle_time = 60 - work_minutes;
      currentWorkMinutesCount = work_minutes_circle_time;
    } else {
      minutes_div.innerHTML = work_minutes;
    }

    minutes_circle();

    work_seconds = 0;
    currentWorkSecondsCount = 0;
      // For display purposes, adds leading zeros if either minutes or seconds are below 10  
    work_minutes < 10 ? (minutes_div.innerHTML = '0' + work_minutes) : (minutes_div.innerHTML = work_minutes)
    work_seconds < 10 ? (seconds_div.innerHTML = '0' + work_seconds) : (seconds_div.innerHTML = work_seconds)
    seconds_circle();
    
    // stops timer
    clicks = -1;
    clearInterval(interval);
    clicked();

  } else if (break_button.checked) {
    // Change minute circle color to blue
    minute_stroke.style.stroke = "#00CED1"; // blue
    // display current break time setting
    if(break_minutes < 60 && break_seconds < 60 && break_seconds > 0){
      minutes_div.innerHTML = break_minutes++;
      break_minutes_circle_time = 60 - break_minutes;
      currentBreakMinutesCount = break_minutes_circle_time;
    } else {
      minutes_div.innerHTML = break_minutes;      
    }

    minutes_circle();

    break_seconds = 0;
    currentBreakSecondsCount = 0;
    break_minutes < 10 ? (minutes_div.innerHTML = '0' + break_minutes) : (minutes_div.innerHTML = break_minutes)
    break_seconds < 10 ? (seconds_div.innerHTML = '0' + break_seconds) : (seconds_div.innerHTML = break_seconds)
    seconds_circle();
    
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
  if(work_button.checked){
    let seconds_offset = -(seconds_circumference / maxWorkSecondsCount) * currentWorkSecondsCount + 'em';
    document.querySelector('.seconds-radial-progress-cover').setAttribute('stroke-dashoffset', seconds_offset);
    currentWorkSecondsCount++;  
  } else if(break_button.checked){
    let seconds_offset = -(seconds_circumference / maxBreakSecondsCount) * currentBreakSecondsCount + 'em';
    document.querySelector('.seconds-radial-progress-cover').setAttribute('stroke-dashoffset', seconds_offset);
    currentBreakSecondsCount++;  
  }
}

const minutes_circle = () => {
  // decrements minutes circle for each minute counted down
  if(work_button.checked){
    let minutes_offset = -(minutes_circumference / maxWorkMinutesCount) * currentWorkMinutesCount + 'em';
    document.querySelector('.minutes-radial-progress-cover').setAttribute('stroke-dashoffset', minutes_offset); 
  } else if(break_button.checked){
    let minutes_offset = -(minutes_circumference / maxBreakMinutesCount) * currentBreakMinutesCount + 'em';
    document.querySelector('.minutes-radial-progress-cover').setAttribute('stroke-dashoffset', minutes_offset); 
  }
}

minutes_circle(); // sets minutes circle to default minutes


// runWorkTimer - if # of clicks is odd && work button is checked (see "clicked" function) 
const runWorkTimer = () => {
  interval = setInterval(() => {
    stop_alarm();
    work_button.checked = true;
    minute_stroke.style.stroke = "#00FF00"; // lime green
    colon_div.innerHTML = ':';
    trigger.disabled = false;
    minus.disabled = false;
    trigger.innerHTML = '&#10074;&#10074;';

    seconds_circle();
    minutes_circle();
   
    // if Work timer has only minutes and 0 seconds displayed (example: 20:00)
    if(work_minutes > 10 && work_seconds == 0){
      minutes_div.innerHTML = --work_minutes;
      currentWorkMinutesCount++;
      work_seconds = 60;
      seconds_div.innerHTML = work_seconds;
    }

    // if Work timer is below 60:00, enables (+) button
    if(work_minutes <= 60 && work_seconds <= 60){
      add.disabled = false;
    }    
    // if Work timer has minutes displayed that fall between 1 and 10, adds a leading zero to minutes (example: 05:00) 
    if(work_minutes > 1 && work_minutes <= 10 && work_seconds == 0){
      minutes_div.innerHTML = '0' + --work_minutes;
      currentWorkMinutesCount = currentWorkMinutesCount + 1;
      work_seconds = 60;
      seconds_div.innerHTML = work_seconds;
    }

    // if Work timer is on final minute (01:00)
    if(work_minutes == 1 && work_seconds == 0){
      work_minutes = 0;
      minutes_div.innerHTML = '0' + work_minutes;
      currentWorkMinutesCount++;
      work_seconds = 60;
      currentWorkSecondsCount = 1;
      currentWorkSecondsCount++;
      seconds_div.innerHTML = work_seconds;
    }
    // counts down seconds and adds a leading zero when seconds fall below 10
    seconds_div.innerHTML = ('0' + --work_seconds).slice(-2);
    // if timer runs out (reaches 00:00), displays "time's up" message on clock
    if(work_minutes === 0 && work_seconds < 0){
      currentWorkMinutesCount = 0;
      clearInterval(interval);
      currentWorkSecondsCount = 0;
      seconds_circle();
      audio.play();
      minutes_div.innerHTML = "Break";
      colon_div.innerHTML = ' ';
      seconds_div.innerHTML = "Time!";
      minus.disabled = true;
      trigger.innerHTML = '&#9658;';
      trigger.disabled = true;

      setTimeout("runBreakTimer()", 3000);
    }
  },1000);
}

// runBreakTimer - if # of clicks is odd && break button is checked (see "clicked" function) 
const runBreakTimer = () => {

  interval = setInterval(() => {
    stop_alarm();
    break_button.checked = true;
    minute_stroke.style.stroke = "#00CED1"; // blue
    colon_div.innerHTML = ':';
    trigger.disabled = false;
    minus.disabled = false;
    trigger.innerHTML = '&#10074;&#10074;';

    seconds_circle();
    minutes_circle();
   
    // if Break timer has only minutes and 0 seconds displayed (example: 20:00)
    if(break_minutes > 10 && break_seconds == 0){
      minutes_div.innerHTML = --break_minutes;
      currentBreakMinutesCount++;
      break_seconds = 60;
      seconds_div.innerHTML = break_seconds;
    }

    // if Break timer is below 60:00, enables (+) button
    if(break_minutes <= 60 && break_seconds <= 60){
      add.disabled = false;
    }    
    // if Break timer has minutes displayed that fall between 1 and 10, adds a leading zero to minutes (example: 05:00) 
    if(break_minutes > 1 && break_minutes <= 10 && break_seconds == 0){
      minutes_div.innerHTML = '0' + --break_minutes;
      currentBreakMinutesCount = currentBreakMinutesCount + 1;
      break_seconds = 60;
      seconds_div.innerHTML = break_seconds;
    }

    // if Break timer is on final minute (01:00)
    if(break_minutes == 1 && break_seconds == 0){
      break_minutes = 0;
      minutes_div.innerHTML = '0' + break_minutes;
      currentBreakMinutesCount++;
      break_seconds = 60;
      currentBreakSecondsCount = 1;
      currentBreakSecondsCount++;
      seconds_div.innerHTML = break_seconds;
    }
    // counts down seconds and adds a leading zero when seconds fall below 10
    seconds_div.innerHTML = ('0' + --break_seconds).slice(-2);
    // if Break timer runs out (reaches 00:00), displays "time's up" message on clock
    if((break_minutes === 0 && break_seconds < 0)&&(break_button.checked)){
      currentBreakMinutesCount = 0;
      clearInterval(interval);
      currentBreakSecondsCount = 0;
      seconds_circle();
      audio.play();
      minutes_div.innerHTML = "Begin";
      colon_div.innerHTML = ' ';
      seconds_div.innerHTML = "Work";
      minus.disabled = true;
      trigger.innerHTML = '&#9658;';
      trigger.disabled = true;

      setTimeout("runWorkTimer()", 3000);
    
    }
  },1000);
}





// Increment - allows the user to increase the number of minutes on timer (up to 60 minutes max)
const increment = () => {
  trigger.innerHTML = '&#9658;';
  // resets the number of clicks to zero (this prevents having to click the start button twice after incrementing the minutes)
  clicks = 0;
  stop_alarm();

  if(work_button.checked){
    currentWorkSecondsCount = 1;

    // if the Work timer runs out (reaches below 00:00) and the (-) button is disabled, allows the user to decrement minutes again only after incrementing minutes
    if(work_minutes === 0 && minus.disabled === true && trigger.disabled === true) {
      minus.disabled = false;
      trigger.disabled = false;
    }
  
    if(work_minutes === 0 && minus.disabled === true && trigger.disabled === false){
      minus.disabled = false;
    }
  
    // sets the max number of minutes available to increment up to 60 (so that the timer can only have a max number of 60 minutes - 1 hour)
    if(work_minutes >= 0 && work_minutes <= 59){
      minutes_div.innerHTML = ++work_minutes;
      work_minutes_circle_time = 60 - work_minutes;
      currentWorkMinutesCount = work_minutes_circle_time;
      minutes_circle();
      colon_div.innerHTML = ':';
      work_seconds = 0;
      currentWorkSecondsCount = 0;
      seconds_circle();
      seconds_div.innerHTML = '0' + work_seconds;
      clearInterval(interval);
      add.disabled = false;
    }
    // disabled (+) if minutes is set to 60 (the max number of minutes the timer can be set)
    if(work_minutes === 60){
      toggleOff();
      add.disabled = true;
    }
  
    // adds a leading zero to minutes if there are less than 10 minutes left on timer (example 05:00)  
    if(work_minutes < 10){
      minutes_div.innerHTML = '0' + work_minutes;
    } else {
      minutes_div.innerHTML = work_minutes;
    }
  } else if(break_button.checked){
    currentBreakSecondsCount = 1;

    // if the Break timer runs out (reaches below 00:00) and the (-) button is disabled, allows the user to decrement minutes again only after incrementing minutes
    if(break_minutes === 0 && minus.disabled === true && trigger.disabled === true) {
      minus.disabled = false;
      trigger.disabled = false;
    }
  
    if(break_minutes === 0 && minus.disabled === true && trigger.disabled === false){
      minus.disabled = false;
    }
  
    // sets the max number of minutes available to increment up to 60 (so that the timer can only have a max number of 60 minutes - 1 hour)
    if(break_minutes >= 0 && break_minutes <= 59){
      minutes_div.innerHTML = ++break_minutes;
      break_minutes_circle_time = 60 - break_minutes;
      currentBreakMinutesCount = break_minutes_circle_time;
      minutes_circle();
      colon_div.innerHTML = ':';
      break_seconds = 0;
      currentBreakSecondsCount = 0;
      seconds_circle();
      seconds_div.innerHTML = '0' + break_seconds;
      clearInterval(interval);
      add.disabled = false;
    }
    // disabled (+) if minutes is set to 60 (the max number of minutes the timer can be set)
    if(break_minutes === 60){
      toggleOff();
      add.disabled = true;
    }
  
    // adds a leading zero to minutes if there are less than 10 minutes left on timer (example 05:00)  
    if(break_minutes < 10){
      minutes_div.innerHTML = '0' + break_minutes;
    } else {
      minutes_div.innerHTML = break_minutes;
    }
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

  if(work_button.checked){
    work_minutes_circle_time = 61 - work_minutes;
    currentWorkMinutesCount = work_minutes_circle_time;    
    minutes_circle();
    currentWorkSecondsCount = 0;
    seconds_circle();

    // re-enables the (-) button if the Work timer is set at 60 minutes (max time) and the (+) button is disabled
    if(work_minutes === 60 && add.disabled === true) {
      minus.disabled = false;
    }
    // re-enables the (+) button if the Work timer is below 60 minutes and the (+) button is disabled
    if(work_minutes <= 60 && add.disabled === true){
      add.disabled = false;
    }
    // as long as there's minutes left on the Work timer, counts down minutes and sets seconds to zero
    if(work_minutes > 0){
      minutes_div.innerHTML = --work_minutes;
      work_seconds = 0;
      seconds_div.innerHTML = '0' + work_seconds;
      clearInterval(interval);
    }
    // adds a leading zero if minutes are less than 10 (example: 05:00) 
    if(work_minutes < 10){
      minutes_div.innerHTML = '0' + work_minutes;
    } else {
      minutes_div.innerHTML = work_minutes;
    }
    
    if(work_minutes === 0){
      toggleOff();
      minus.disabled = true;
    }
    
    // if Work timer is 00:00, disables (-) button
    if(work_minutes === 0 && work_seconds === 0){
      minus.disabled = true;
    }
    // if Work timer is 00 : (some seconds left), set seconds to zero and stop countdown
    if(work_minutes === 0 && work_seconds < 60 && work_seconds > 0){
      work_seconds = 0;
      seconds_div.innerHTML = '0' + work_seconds;
      clearInterval(interval);
    }
  } else if(break_button.checked){
    break_minutes_circle_time = 61 - break_minutes;
    currentBreakMinutesCount = break_minutes_circle_time;    
    minutes_circle();
    currentBreakSecondsCount = 0;
    seconds_circle();

    // re-enables the (-) button if the Break timer is set at 60 minutes (max time) and the (+) button is disabled
    if(break_minutes === 60 && add.disabled === true) {
      minus.disabled = false;
    }
    // re-enables the (+) button if the Break timer is below 60 minutes and the (+) button is disabled
    if(break_minutes <= 60 && add.disabled === true){
      add.disabled = false;
    }
    // as long as there's minutes left on the Break timer, counts down minutes and sets seconds to zero
    if(break_minutes > 0){
      minutes_div.innerHTML = --break_minutes;
      break_seconds = 0;
      seconds_div.innerHTML = '0' + break_seconds;
      clearInterval(interval);
    }
    // adds a leading zero if minutes are less than 10 (example: 05:00) 
    if(break_minutes < 10){
      minutes_div.innerHTML = '0' + break_minutes;
    } else {
      minutes_div.innerHTML = break_minutes;
    }
    
    if(break_minutes === 0){
      toggleOff();
      minus.disabled = true;
    }
    
    // if Break timer is 00:00, disables (-) button
    if(break_minutes === 0 && break_seconds === 0){
      minus.disabled = true;
    }
    // if Break timer is 00 : (some seconds left), set seconds to zero and stop countdown
    if(break_minutes === 0 && break_seconds < 60 && break_seconds > 0){
      break_seconds = 0;
      seconds_div.innerHTML = '0' + break_seconds;
      clearInterval(interval);
    }
  }
}

// Reset - resets timer back to default state; seconds go back to default value
const reset_timer = () => {
  tid = 0;

  if(work_button.checked){
    if(work_minutes === 60){
      add.disabled = false;
      minus.disabled = true;
    }
    stop_alarm();
    clearInterval(interval);
    work_minutes = 60;
    work_seconds = 0;
    currentWorkSecondsCount = 0;
    work_minutes_circle_time = 60 - work_minutes;
    currentWorkMinutesCount = work_minutes_circle_time;  
    minutes_circle();
    seconds_circle();
    minutes_div.innerHTML = work_minutes;
    colon_div.innerHTML = ':';
    seconds_div.innerHTML = work_seconds;
    minus.disabled = false;
    trigger.innerHTML = '&#9658;';
    trigger.disabled = false;
    // For display purposes, adds leading zeros if either minutes or seconds are below 10
    if(work_minutes < 10){
      minutes_div.innerHTML = '0' + work_minutes;
    } else {
      minutes_div.innerHTML = work_minutes;
    }

    if(work_seconds < 10){
      seconds_div.innerHTML = '0' + work_seconds;
    } else {
      seconds_div.innerHTML = work_seconds;
    }  
    // resets number of clicks back to zero (default state)
    clicks = 0;
  } else if(break_button.checked){
    if(break_minutes === 60){
      add.disabled = false;
      minus.disabled = true;
    }
    stop_alarm();
    clearInterval(interval);
    break_minutes = 60;
    break_seconds = 0;
    currentBreakSecondsCount = 0;
    break_minutes_circle_time = 60 - break_minutes;
    currentBreakMinutesCount = break_minutes_circle_time;  
    minutes_circle();
    seconds_circle();
    minutes_div.innerHTML = break_minutes;
    colon_div.innerHTML = ':';
    seconds_div.innerHTML = break_seconds;
    minus.disabled = false;
    trigger.innerHTML = '&#9658;';
    trigger.disabled = false;
    // For display purposes, adds leading zeros if either minutes or seconds are below 10
    if(break_minutes < 10){
      minutes_div.innerHTML = '0' + break_minutes;
    } else {
      minutes_div.innerHTML = break_minutes;
    }
  
    if(break_seconds < 10){
      seconds_div.innerHTML = '0' + break_seconds;
    } else {
      seconds_div.innerHTML = break_seconds;
    }  
    // resets number of clicks back to zero (default state)
    clicks = 0;
  }
}