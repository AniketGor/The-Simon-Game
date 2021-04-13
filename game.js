
var buttonColors = ["red","blue","green","yellow"];

var userClickedPattern = [];
var gamePattern = [];

var started = false;
var level = 0;

$(document).keydown(function () {
  if (!started) {
      $("#level-title").text("Level "+level);
      nextSequence();
      started = true;
  }
});

$(".btn").click(function () {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  console.log("user "+userClickedPattern);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  console.log("checking answer for " + userClickedPattern[userClickedPattern.length -1]);
  checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");

      if (userClickedPattern.length === gamePattern.length) {

        setTimeout(function () {
          nextSequence();
        },1000);
      }
  } else {
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game over, Press any key to Restart");

    startOver();
  }
}

function nextSequence() {

  userClickedPattern = [];

  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber]
  gamePattern.push(randomChosenColor);
  console.log("game " + gamePattern);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
