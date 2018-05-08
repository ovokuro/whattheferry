// Get the route
function getRoute(route) {

  var route = bwToCity;

  return route;
}


// Get the correct timetable and output as HTML
function getTimetable() {
  // Get the current time and store as string for comparison
  var now = new Date();
  var day = now.getDay();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes
  }
  if (hours < 10) {
    hours = "0" + hours
  }
  var currentTime = hours + ':' + minutes;
  
  // Access the correct day and return the timetable
  // First get the correct route
    route = getRoute();
    var times;

  if (day == 4) {
    times = route.friday;
  } else if (day == 5) {
    times = route.saturday;
  } else if (day == 6) {
    times = route.sunday
  } else {
    times = route.weekday;
  }
  
  // Output the timetable to index.html
  var ul = document.querySelector('#timetable');
  
  // remove any pre-existing timetable
  while (ul.firstChild) {
    ul.firstChild.remove();
  }

  // create new timetable
  for (i = 0; i < times.length; i++) {

    if (times[i] > currentTime) {
      var li = document.createElement('li');
      li.textContent = times[i];
      ul.append(li);
    }
  }

}

// Check / output the timetable every minute
getTimetable();
setInterval(function () {
  getTimetable();
}, 60000);

/*
// ------------------------------------------------
// Get the current time and display it in HTML
function getCurrentTime() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes
  }
  if (hours < 10) {
    hours = "0" + hours
  }
  var currentTime = hours + ':' + minutes;

  return currentTime;
}

// ------------------------------------------------
// Get the timetable for correct day of the week
function getTimetable(route) {
  var today = new Date().getDay();
  var times;
  var route = route;

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

// ------------------------------------------------
// Update index.html with the correct timetable
function updateTimetable() {
  var route = getDirection();
  var currentTime = getCurrentTime();
  var times = getTimetable(route);

  var ul = document.querySelector('#timetable');
  // remove any existing timetable
  while (ul.firstChild) {
    ul.firstChild.remove();
  }

  // create new timetable
  for (i = 0; i < times.length; i++) {

    if (times[i] > currentTime) {
      var li = document.createElement('li');
      li.textContent = times[i];
      ul.append(li);
    }
  }
}

// call the function every minute
updateTimetable();

setInterval(function () {
  updateTimetable();
}, 60000);


// ------------------------------------------------
// Update the route if direction of travel is flipped

var flipButton = document.querySelector("#flipDirection"),
  routeContainer,
  isFlipped = false;

function getDirection() {
  var route = cityToBW
  isFlipped = !isFlipped;
  var routeContainer = document.querySelector("#routeContainer");

  routeContainer.classList.toggle('from-city');
  return isFlipped;

}

flipButton.addEventListener("click", function () {
  flipDirection();
  getTimetable();
});
*/
