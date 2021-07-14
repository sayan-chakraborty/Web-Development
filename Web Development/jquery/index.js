$("button").click(function () {
  $("h1").css("color", "purple");
  console.log($("h1").text());
  $("h1").animate({margin: 20});
});
$("input").keypress(function (event) {
  $("h1").text(event.key);
});
