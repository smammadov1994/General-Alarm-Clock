/** @format */

//Create lexical closure using an IIFE to not expose total JS module////////////////////////////////
(function () {
  const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

  function engine() {
    var date = new Date(),
      second = date.getSeconds(),
      minute = date.getMinutes(),
      hour = date.getHours(),
      time = date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
      day = date.getDay(),
      month = date.getMonth(),
      date = date.getDate() + " . " + months[month],
      degreesSeconds = second * -6, //rotation is just approximate to the next second number. All the rest are approximations too I did my best to get it on the money//
      degreesMinute = minute * -6,
      degreesHour = hour * -30;

    //Transform animation to animate clock spinning//
    $(".second").css("transform", "rotate(" + degreesSeconds + "deg)");
    $(".minute").css("transform", "rotate(" + degreesMinute + "deg)");
    $(".hour").css("transform", "rotate(" + degreesHour + "deg)");

    $(".time").text(time);
    $(".day").text(days[day]);
    $(".date").text(date);
  }

  function handleSeconds(position, size) {
    for (var second = 0; second < 60; second++) {
      $(position).append(
        '<span style="transform: rotate(' +
          6 * second +
          "deg) translateX(" +
          size +
          'px)">' +
          second +
          "</span>"
      );
    }
  }

  handleSeconds(".second", 195);
  handleSeconds(".minute", 145);
  handleSeconds(".dail", 230);

  function handleHours() {
    for (var hour = 1; hour < 13; hour++) {
      $(".hour").append(
        '<span style="transform: rotate(' +
          30 * hour +
          'deg) translateX(100px)">' +
          hour +
          "</span>"
      );
    }
  }
  handleHours();
  setInterval(engine, 1000); //Similar to a gameloop engine
  engine();
})();
