var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var j = 0;

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("h1").text("Level " + level);
}

$(".btn").click(handler);
function handler(event) {
    var userChosenColour = event.currentTarget.id;
    userClickedPattern.push(userChosenColour);
    playSound(userClickedPattern[userClickedPattern.length - 1]);
    animatePress(userClickedPattern[userClickedPattern.length - 1]);
    checkAnswer(userClickedPattern[userClickedPattern.length - 1]);
}

function playSound(name) {
    var audio = new Audio('./sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


$(document).on("keydown", function () {
    if (level === 0) {
        j=0;
        nextSequence();
    }
});

function checkAnswer(currentLevel) {
    if (gamePattern[j] !== currentLevel) {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        j = -1;
        gamePattern = [];
        userClickedPattern = [];
        level = 0;
        $("h1").text("Game Over, Press Any Key to Restart");
    } else {
        j++;
    }
    if (j === gamePattern.length) {
        setTimeout(function () {
            nextSequence();
            j = 0;
        }, 1000);
        userClickedPattern = [];
    }

}