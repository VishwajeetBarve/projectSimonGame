var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userClickedColour = $(this).attr("id");
  userClickedPattern.push(userClickedColour);

  playsound(userClickedColour);

  animatePress(userClickedColour);

  // checkAnswer(userClickedPattern);
checkAnswer(userClickedPattern.length-1);
});





function playsound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}


function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  // .delay(100).removeClass("pressed")
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");

  }, 100);

}



// function checkAnswer(currentlevel) {
//   if ((userClickedPattern[(userClickedPattern.length) - 1]) == (gamePattern[(gamePattern.length) - 1])) {
//     if (userClickedPattern.length === gamePattern.length) {
//
//       setTimeout(function() {
//         nextSequence();
//       }, 1000);
//     }
//   } else {
//     wrongAnswer();
//     startOver();
//
//   }
//
//
// }


function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      wrongAnswer();
      startOver();

    }

}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(randomChosenColour);


}

function wrongAnswer(){
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");

  }, 200);
  $("#level-title").text("Game Over, Press any key to restart");

}

function startOver(){
 level = 0;
 gamePattern = [];
 started = false;
}
