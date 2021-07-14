var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userChosenColour;
var level;
var randomChosenColour;
var started = false;

function playSound(colour) {
  var audio = new Audio('sounds/' + colour + '.mp3');
  audio.play();
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  randomNumber = Math.floor(Math.random()*4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
  {
    console.log("success");
    if(userClickedPattern.length === gamePattern.length)
    {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else
  {
    console.log("wrong");
    $("body").addClass("game-over");
    $("h1").text("Failure");
    playSound("wrong");
    startOver();
  }
}

function startOver() {
  gamePattern = [];
  level = 0;
  started = true;
}

$(".btn").click((event) => {
  userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function () {
  $("body").remove Class("game-over");
  level = 0;
  $("h1").text("Level " + level);
  nextSequence();
  started = true;
});
