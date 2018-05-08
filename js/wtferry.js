var isFlipped = false;

// Get the route and output to HTML
function getRoute() {
  var route;
  
  if (isFlipped == true) {
    route = cityToBw;
  } else {
    route = bwToCity;
  }

  var fromTextContainer = document.querySelector('#routeFrom'),
    toTextContainer = document.querySelector('#routeTo');

  var fromText = route.from,
      toText = route.to;

  fromTextContainer.innerHTML = fromText;
  toTextContainer.innerHTML = toText;

  getTimetable(route);

}


// Get the correct timetable and output as HTML
function getTimetable(route) {
  // Get the current time and store as string for comparison
  var now = new Date();
  var day = now.getDay();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var times;
  
  
  if (minutes < 10) {
    minutes = "0" + minutes
  }
  if (hours < 10) {
    hours = "0" + hours
  }
  var currentTime = hours + ':' + minutes;

  // Access the correct day and return the timetable
  // First get the route
  var route = route;


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
  
  var nextTime = document.querySelector('#timetable').getElementsByTagName('li')[0];
  var nextTimeText = nextTime.innerHTML;
  
  
  var t1 = currentTime.split(':'), 
      t2 = nextTimeText.split(':');
  var d1 = new Date(0, 0, 0, t1[0], t1[1]),
      d2 = new Date(0, 0, 0, t2[0], t2[1]);
  var diff = new Date(d2 - d1);
  
  var timeRemaining = diff.getMinutes();
  
  var timeToDeparture = document.createElement('span');

  if (timeRemaining < 15) {
    timeToDeparture.classList.add('has-text-red')
  } else if (timeRemaining < 30) {
    timeToDeparture.classList.add('has-text-orange')
  } else {
    timeToDeparture.classList.add('has-text-green')
  }
  
  var minuteText;
  if (timeRemaining == 1) {
    minuteText = " minute"
  } else {
    minuteText = " minutes"
  }
  timeToDeparture.textContent = 'This ferry is leaving in ' + timeRemaining + minuteText;
  
  nextTime.append(timeToDeparture);
}

function updateTimetable() {
  getRoute();
}

// Check / output the timetable every minute
updateTimetable();
setInterval(function () {
  updateTimetable();
}, 60000);


// ------------------------------------------------
// Update the route if direction of travel is flipped

var flipButton = document.querySelector("#flipDirection"),
  routeContainer = document.querySelector("#routeContainer");

flipButton.addEventListener("click", function () {
  isFlipped = !isFlipped;
  updateTimetable();
  routeContainer.classList.toggle('is-flipped')
});
