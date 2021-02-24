$(document).ready(function() {

    function buildTimeRange(start, end) {
        var times = [];
        for (var i = start; i <= end; i++) {
            var hour;
            if (i % 12 == 0) {
                if (i == 0) {
                    hour = "12 AM"
                } else {
                    hour = "12 PM"
                }
            } else if (i <= 11) {
                hour = `${i} AM`
            } else {
                hour = `${i - 12} PM`
            }
            times.push(hour);
        }
        return times;
    }

    // function getStoredSchedule(){
    //     return []
    // }

    function buildHourlyRows() {
        var rows = [];
        var startTime = 6;
        var endTime = 18;
        var hours = buildTimeRange(startTime, endTime);
        for (var i = 0; i < hours.length; i++) {
            rows.push({
                time: hours[i],
                timeNumber: i + startTime,
                text: ""
            });
        }
        return rows;
    }

    function displayTimer() {
        var currentDayElement = $("#currentDay");
        currentDayElement.text(moment().format("MMM Do, YYYY, hh:mm:ss "));
        setInterval(function() {
            currentDayElement.text(moment().format("MMM Do, YYYY, hh:mm:ss "));
        }, 1000)
    }

    function displayRows(rows) {
        var myHTML = "";
        var now = moment();
        var hour = now.hour();
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var timeClass;
            if (hour > row.timeNumber) {
                timeClass = "past"
            } else if (hour == row.timeNumber) {
                timeClass = "present";
            } else {
                timeClass = "future";
            }
            myHTML += `<tr><td>${row.time}</td><td><input value="${row.text}" id="${i}" class='hourInput ${timeClass}'></td></tr>`
        }
        $("#timeBlock").html(myHTML);
    }


    $(function() {
        displayTimer();
        var hourRows = JSON.parse(localStorage.getItem("timeBlock"));
        if (hourRows === null) {
            hourRows = buildHourlyRows();
        }
        displayRows(hourRows);


        $(".hourInput").focusout(function(event) {
            // .focusout allows save by clicking out of element

            var value = event.target.value;
            var index = parseInt(event.target.id);
            hourRows[index].text = value;
            console.log(hourRows);
            // make sure you update the item's text that you are typing in
            // get that by looking at the id of the input and that is the corresponding index because we did that when genereating the html

            // CAN ONLY STORE TEXT, MUST STRINGIFY
            localStorage.setItem("timeBlock", JSON.stringify(hourRows));

        });
    });
});