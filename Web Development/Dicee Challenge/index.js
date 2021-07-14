var randomNumber1;
randomNumber1 = Math.floor(Math.random()*6)+1;
randomNumber2 = Math.floor(Math.random()*6)+1;
if(randomNumber1 > randomNumber2)
{
  document.querySelector(".container h1").innerHTML = "Player 1 wins";
}
if(randomNumber1 < randomNumber2)
{
  document.querySelector(".container h1").innerHTML = "Player 2 wins";
}
if(randomNumber1 === randomNumber2)
{
  document.querySelector(".container h1").innerHTML = "Draw";
}
document.querySelectorAll("img")[0].setAttribute("src", "images/dice"+randomNumber1+".png");
document.querySelectorAll("img")[1].src = "images/dice"+randomNumber2+".png";
