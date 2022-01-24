// alert("hello");
var buttonColours = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var gameProgress = true;
var level = 0;

//detect keyboard pressed
$(document).on("keypress", function (key) {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})
//detect mouse click
$(".btn").click(function () {
    // while(gameProgress){

    var userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);

    makeSound(userChosenColor);
    // nextSequence();
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1)
});

function checkAnswer(currentLevel) {
    // console.log(cu)
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else {
        //play this sound if the user got one of the answers wrong.
        makeSound("wrong");
        // add game-over class that set background-color to red
        $("body").addClass("game-over");
        // change text to gameover
        $("#level-title").text("Game Over, Press Any Key to Restart")

        setTimeout(() => {
            $("body").removeClass("game-over");

        }, 100);
        startOver();
    }
}

function nextSequence() {
    level++;
    //reset the userClickedPattern to an empty array  ready for the next level.
    userClickedPattern = [];
    //change h1 text
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    makeSound(randomChosenColour);

}
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);


}
function makeSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}
function startOver() {
    // reset all   to restart the game.
    started = false;
    level = 0;
    gamePattern = [];
}
