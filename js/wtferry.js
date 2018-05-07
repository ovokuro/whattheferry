// Get the current time and display it in HTML
function getCurrentTime() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();

  // cannot compare time as string unless both display the same
  // add leading zeros
  if (minutes < 10) {
    minutes = "0" + minutes
  }
  if (hours < 10) {
    hours = "0" + hours
  }
  var currentTime = hours + ':' + minutes;

  return currentTime;
}

// get the correct timetable for today
function getTimetable(route) {
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

updateTimetable();


setInterval(function () {
  updateTimetable();
}, 60000);

// Update the timetable if direction of travel is flipped

var flipButton = document.querySelector("#flipDirection"),
  routeContainer;

function flipDirection() {
  //var route = bwToCity;

  var routeContainer = document.querySelector("#routeContainer");

  routeContainer.classList.toggle('from-city');


}

flipButton.addEventListener("click", function () {
  flipDirection();
  getTimetable();
});
