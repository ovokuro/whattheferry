// Get the current time and display it in HTML
function getCurrentTime() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();

  if (minutes < 10) {
    minutes = "0" + minutes
  }
  var currentTime = hours + ':' + minutes;
  
  return currentTime;
}

// get the correct timetable for today
function getTimetable() {
  var today = new Date().getDay();
  var times;
  var route = bwToCity;
  
  if (today == 4) {
    times = route.friday;
  } else if (today == 5) {
    times = route.saturday;
  } else if (today == 6) {
    times = route.sunday
  } else {
    times = route.weekday;
  }
  
  return times;
}


// update index.html with the correct timetable
function updateTimetable() {
  var currentTime = getCurrentTime();
  var times = getTimetable();
 
  var ul = document.querySelector('#timetable');
  
  for (i = 0; i < times.length; i++) {
    var li = document.createElement('li');
    li.textContent = times[i];
    ul.append(li);
  }
  console.log(times.length);
  
}

updateTimetable();


setInterval(function () {
  updateTimetable();
}, 60000);