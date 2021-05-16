/** @format */

var ac = {
  // (A) INITIALIZE ALARM CLOCK
  init: function () {
    // (A1) CREATE TIME PICKER - HR, MIN, SEC
    ac.thr = ac.createSel(23);
    document.getElementById("tpick-h").appendChild(ac.thr);
    ac.thm = ac.createSel(59);
    document.getElementById("tpick-m").appendChild(ac.thm);
    ac.ths = ac.createSel(59);
    document.getElementById("tpick-s").appendChild(ac.ths);

    // (A2) CREATE TIME PICKER - SET, RESET
    ac.tset = document.getElementById("tset");
    ac.tset.addEventListener("click", ac.set);
    ac.treset = document.getElementById("treset");
    ac.treset.addEventListener("click", ac.reset);

    // (A3) GET ALARM SOUND
    ac.sound = document.getElementById("alarm-sound");

    // (A4) START THE CLOCK
    ac.alarm = null;
    setInterval(() => {
      function tick() {
        // (D1) CURRENT TIME
        var now = new Date();
        var hr = ac.padzero(now.getHours());
        var min = ac.padzero(now.getMinutes());
        var sec = ac.padzero(now.getSeconds());
        console.log(hr + min + sec);
        console.log(ac.alarm);
        // (D3) CHECK AND SOUND ALARM
        if (ac.alarm != null) {
          now = hr + min + sec;
          if (now == ac.alarm) {
            if (ac.sound.paused) {
              ac.sound.play();
            }
          }
        }
      }
      tick();
    }, 1000);
  },

  // (B) SUPPORT FUNCTION - CREATE SELECTOR FOR HR, MIN, SEC
  createSel: function (max) {
    var selector = document.createElement("select");
    for (var i = 0; i <= max; i++) {
      var opt = document.createElement("option");
      i = ac.padzero(i);
      opt.value = i;
      opt.innerHTML = i;
      selector.appendChild(opt);
    }
    return selector;
  },

  // (C) SUPPORT FUNCTION - PREPEND HR, MIN, SEC WITH 0 (IF < 10)
  padzero: function (num) {
    if (num < 10) {
      num = "0" + num;
    } else {
      num = num.toString();
    }
    return num;
  },

  // (D) UPDATE CURRENT TIME
  //   tick: function () {

  //   },

  // (E) SET ALARM
  set: function () {
    ac.alarm = ac.thr.value + ac.thm.value + ac.ths.value;
    ac.displayAlarm = `${ac.thr.value}/${ac.thm.value}/${ac.ths.value}`;
    ac.thr.disabled = true;
    ac.thm.disabled = true;
    ac.ths.disabled = true;
    ac.tset.disabled = true;
    ac.treset.disabled = false;

    //(E1) Create Current Alarm
    let timeContainer = document.getElementById("timers");
    let divContainer = document.createElement("DIV");
    divContainer.textContent = ac.displayAlarm;
    divContainer.style.background = "#fff";
    divContainer.style.width = "100%";
    divContainer.style.padding = "10px";
    divContainer.style.textAlign = "center";

    timeContainer.appendChild(divContainer);
  },

  // (F) RESET ALARM
  reset: function () {
    if (!ac.sound.paused) {
      ac.sound.pause();
    }
    ac.alarm = null;
    ac.thr.disabled = false;
    ac.thm.disabled = false;
    ac.ths.disabled = false;
    ac.tset.disabled = false;
    ac.treset.disabled = true;

    // (F1) Remove current Alarm
    let timeContainer = document.getElementById("timers");
    ac.removeChildren(timeContainer);
  },
  removeChildren: function (parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  },
};

// (G) START CLOCK ON PAGE LOAD
window.addEventListener("load", ac.init);
