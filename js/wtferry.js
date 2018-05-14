document.addEventListener("DOMContentLoaded", function () {


  // Get the route
  function getRoute(option) {
    
    var route = bwToCity;
    
    var url = window.location.href
    var routeParameter = url.substring(url.indexOf('=')+1);
  
    
    if (routeParameter == 1) {
      route = bwToCity;
    } else if (routeParameter == 2) {
      route = dpToCity;
    } else if (routeParameter == 3) {
      route = cityToBw;
    } else if (routeParameter == 4) {
      route = cityToDp;
    } else {
      window.location.href = "index.html"
    }
    
    getTimetable(route);

  }


  // Get the correct timetable and output as HTML
  function getTimetable(route) {
    
    var routeFrom = document.querySelector("#routeFrom"),
        routeTo   = document.querySelector("#routeTo");
    
    var textFrom = route.from,
        textTo   = route.to;
    
    routeFrom.textContent = textFrom;
    routeTo.textContent = textTo;
    
    
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

    if (day == 5) {
      times = route.friday;
    } else if (day == 6) {
      times = route.saturday;
    } else if (day == 0) {
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
        publicHolidayMessage()
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
      
      var h = times[i].split(':')[0];
      if (h < 3) {
        var li2 = document.createElement('li');
        li2.textContent = times[i];
        ul.append(li2)
      }
    }

    // append times after midnight
    

    var nextTime = document.querySelector('#timetable').getElementsByTagName('li')[0];
    if (nextTime) {
      var nextTimeText = nextTime.innerHTML;
      
      var nextFerryText = document.createElement('h1');
      nextFerryText.textContent = "Next Ferry";
      nextTime.append(nextFerryText);
    
      // Compare current time with next departure
      // Get remaining time in minutes
      
      var currentHour,
          currentMin,
          depHour,
          depMin,
          hourDifference,
          minDifference,
          totalDifferenceInMins;
      
      currentHour = currentTime.split(':')[0];
      currentMin = currentTime.split(':')[1];
      depHour = nextTimeText.split(':')[0];
      depMin = nextTimeText.split(':')[1];
      hourDifference = depHour - currentHour;
      hourDifference = hourDifference * 60
      minDifference = depMin - currentMin;
      totalDifferenceInMins = hourDifference + minDifference;
      timeRemaining = totalDifferenceInMins;


      //console.log(timeRemaining)
      var timeToDeparture = document.createElement('span');

      if (timeRemaining < 10) {
        nextTime.classList.add('time--red')
      } else if (timeRemaining < 30) {
        nextTime.classList.add('time--orange')
      } else {
        nextTime.classList.add('time--green')
      }

      var minuteText;
      if (timeRemaining == 1) {
        minuteText = " Minute"
      } else {
        minuteText = " Minutes"
      }
      
      timeToDeparture.innerHTML = '<span>Departs in</span><span>' +  timeRemaining + minuteText + '</span>';

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

 



  // -------------------------------------------------
  // Update the route if user chooses from select



  function publicHolidayMessage() {
    var message = document.querySelector("#public-holiday");
    message.classList.add('is-block');
  }

  var disclaimerInfo = document.querySelector("#disclaimerInfo"),
    disclaimerLink = document.querySelector('#disclaimerLink'),
    disclaimerClose = document.querySelectorAll('.disclaimer__close');

  disclaimerLink.addEventListener("click", function () {
    disclaimerInfo.classList.add('is-block')
  })

  for (i = 0; i < disclaimerClose.length; i++) {
    disclaimerClose[i].addEventListener("click", function () {
      disclaimerInfo.classList.remove('is-block');
    })
  }

  //var headerHeight = document.querySelector('header').offsetHeight,
    //main = document.querySelector('main');

//  main.style.minHeight = 'calc(100vh - ' + headerHeight + 'px)';

});
