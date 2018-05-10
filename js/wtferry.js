document.addEventListener("DOMContentLoaded", function () {
  var select = document.querySelector('#select');
  // CRUCIAL
  // Select option appears to be cached in Firefox
  // Need to detect the value on page load
  var selectOption = select.value;
  var isFlipped = false;

  // Get the route and output to HTML
  function getRoute() {
    var route = bwToCity;

    if (selectOption == 'Bayswater') {
      route = bwToCity;
    } else {
      route = dpToCity;
    }

    if (isFlipped == true) {
      if (route == bwToCity) {
        route = cityToBw;
      } else {
        route = cityToDp;
      }
    }

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

    // check if date is public holiday
    // if match use sunday timetable
    // index months from 1
    var month = now.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    var date = now.getDate() + '-' + month;
    

    for (i = 0; i < publicHolidays.length; i++) {
      if (date === publicHolidays[i]) {
        times = route.sunday;
        console.log('today is a public holiday');
        publicHolidayMessage()
      } else {
        console.log('today is not a public holiday')
      }
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
    if (nextTime) {
      var nextTimeText = nextTime.innerHTML;

      // Get the remaining minutes
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
      timeToDeparture.textContent = 'Next ferry departing in ' + timeRemaining + minuteText;

      if (timeRemaining < 60) {
        nextTime.append(timeToDeparture);
      }


    } else {
      //var messageContainer = document.querySelector('#section');
      //var message = document.createElement('p');
      //message.textContent = "Sorry, no more ferries today!";

      //messageContainer.append(message)
    }
  }

  function updateTimetable() {

    getValue();
    getRoute();

  }

  // Check / output the timetable every minute
  updateTimetable();
  setInterval(function () {
    updateTimetable();
  }, 60000);


  // ----------------------------------------------------
  // Create function to flip locations in HTML of To and From

  function swapElements(obj1, obj2) {
    var parent2 = obj2.parentNode;
    var next2 = obj2.nextSibling;
    if (next2 === obj1) {
      parent2.insertBefore(obj1, obj2);
    } else {
      obj1.parentNode.insertBefore(obj2, obj1);
      if (next2) {
        parent2.insertBefore(obj1, next2);
      } else {
        parent2.appendChild(obj1);
      }
    }
  }

  // ------------------------------------------------
  // Update the route if direction of travel is flipped

  var flipButton = document.querySelector("#flipDirection"),
    routeContainer = document.querySelector("#routeContainer"),
    routeTo = document.querySelector("#routeTo"),
    routeFrom = document.querySelector("#routeFrom");

  flipButton.addEventListener("click", function () {
    isFlipped = !isFlipped;
    updateTimetable();
    routeContainer.classList.toggle('is-flipped');
    swapElements(routeTo, routeFrom);
  });



  // -------------------------------------------------
  // Update the route if user chooses from select

  function getValue() {
    switch (this.value) {
      case 'Bayswater':
        selectOption = 'Bayswater';
        updateTimetable();
        break;
      case 'Devonport':
        selectOption = 'Devonport';
        updateTimetable();
        break;
    }
  }

  select.addEventListener('change', getValue, false);

function publicHolidayMessage() {
  var message = document.querySelector("#public-holiday");
  message.classList.add('is-block');
}

var disclaimerInfo = document.querySelector("#disclaimerInfo"),
    disclaimerLink = document.querySelector('#disclaimerLink'),
    disclaimerClose = document.querySelectorAll('.disclaimer__close');
  
disclaimerLink.addEventListener("click", function() {
  disclaimerInfo.classList.add('is-block')
})
  
for(i=0; i < disclaimerClose.length; i++) {
  disclaimerClose[i].addEventListener("click", function() {
  disclaimerInfo.classList.remove('is-block');
  })
}
  
var headerHeight = document.querySelector('header').offsetHeight,
    main         = document.querySelector('main');
  
  main.style.minHeight = 'calc(100vh - ' + headerHeight + 'px)';
  
});
