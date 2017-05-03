// Built on http://codepen.io/alejandroperezmartin/pen/GhAJy

if (window.localStorage) {

    // Initialize the pomodoro time or get previous value
    var defaultPomodoroTime = 10;
    localStorage.pomodoroTime = (localStorage.pomodoroTime || defaultPomodoroTime);

    var defaultTomatoes = 0;
    localStorage.tomatoes = (localStorage.tomatoes || defaultTomatoes);

    localStorage.timer = (localStorage.timer || localStorage.pomodoroTime);

    // Variable declaration
    var pomodoroTimeDiv = document.getElementById("pomodoro-time");
    var tomatoesDiv = document.getElementById("tomato-number");
    var chronoDiv = document.getElementById("chrono");
    var playStopButton = document.getElementById("button-stop");
    var i = undefined;

    // Display pomodoro time
    function displayPomodoroTime() {
        var minutes = Math.floor(localStorage.pomodoroTime/60);
        console.log(minutes);
        var seconds = localStorage.pomodoroTime - minutes*60;
        var display = (minutes >= 10 ? minutes : '0' + minutes) + ':' + (seconds >= 10 ? seconds : '0' + seconds);
        pomodoroTimeDiv.innerHTML = display;
    }

    // Display number of tomatoes
    function displayNumberTomatoes() {
        tomatoesDiv.innerHTML = localStorage.tomatoes;
    }

    // Display time
    function displayTime() {
        var minutes = Math.floor(localStorage.timer/60);
        var seconds = localStorage.timer - minutes*60;
        var display = (minutes >= 10 ? minutes : '0' + minutes) + ':' + (seconds >= 10 ? seconds : '0' + seconds);
        chronoDiv.innerHTML = display;
    }

    // Show current values
    displayPomodoroTime();
    displayTime();

    // Start chrono and update each second
    function start() {
        i = setInterval(function() {
            localStorage.timer -= 1;
            displayTime();

            if (localStorage.timer <= 0) {
                localStorage.tomatoes = parseInt(localStorage.tomatoes) + 1;
                displayNumberTomatoes();
                reset()
            }
        }, 1000);
    }

    function changeToStart() {
        playStopButton.className = "main-button green";
        playStopButton.innerHTML = "Start";
    }

    function changeToStop() {
        playStopButton.className = "main-button red";
        playStopButton.innerHTML = "Stop";
    }

    // Reset event
    function reset() {
        window.clearInterval(i);
        i = undefined;
        localStorage.timer = localStorage.pomodoroTime;
        displayTime();
        changeToStart();
    }

    // Button behaviours
    document.getElementById("button-reset").addEventListener("click", function() {
        reset();
    });

    // Start/stop event
    document.getElementById("button-stop").addEventListener("click", function() {
        // Stop chrono
        if (i) {
            window.clearInterval(i);
            changeToStart();
            i = undefined;
        }
        // Start chrono
        else {
            changeToStop();
            start();
        }
    });

    // Make pomodoro longer or shorter
    document.getElementById("button-plus").addEventListener("click", function() {
        localStorage.pomodoroTime = parseInt(localStorage.pomodoroTime) + 30; // localStorage gives data as Strings
        displayPomodoroTime();

        // If the pomodoro is off, directly change update the timer and the display
        if (!i){
            reset();
        }

    });

    document.getElementById("button-minus").addEventListener("click", function() {
        if (localStorage.pomodoroTime >= 30) {
            localStorage.pomodoroTime -= 30;
            displayPomodoroTime();
        }

        if (!i){
            reset();
        }
    });

} else {
    // Error message
    document.getElementsByTagName("header")[0].innerHTML += "<h3 style=\"color:red\">Sorry, your browser doesn't support LocalStorage</h3>";
}