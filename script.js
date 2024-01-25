$(function () {
  var today = dayjs();
  var currentHour = today.format('H');
  // convert string to number as it was occasionally not working this seemed to fix
  currentHour = +currentHour;
  var textFields = [$('#textarea1'),$('#textarea2'),$('#textarea3'),$('#textarea4'),$('#textarea5'),$('#textarea6'),$('#textarea7'),$('#textarea8'),$('#textarea9')]
  var colorBoxes = [$('#hour-9'),$('#hour-10'),$('#hour-11'),$('#hour-12'),$('#hour-13'),$('#hour-14'),$('#hour-15'),$('#hour-16'),$('#hour-17')]
 // saving the text fields to local storage
  $('.saveBtn').on('click', function(){
    var i = $('.saveBtn').index(this);
    localStorage.setItem("textFields" + i, textFields[i].val());
  })
    //get the saved text fields upon loading
    $(function () {
    for(i=0; i<textFields.length; i++){
      var savedText = localStorage.getItem("textFields"+i);
      textFields[i].text(savedText);}
    });
    //take the current hour and compare it to the hour represented by each item in colorBoxes array and adjust their classes accordingly
  function colorToHour(){
          today = dayjs();
          currentHour = today.format('H');
          currentHour = +currentHour;
    for(j=0;j<colorBoxes.length;j++){
      if (currentHour === j+9) {
        $(colorBoxes[j]).removeClass(["past", "future"]).addClass("present");
        console.log(colorBoxes[j]);
        console.log(currentHour);} 
      if(currentHour < j+9){
        $(colorBoxes[j]).removeClass(["past", "present"]).addClass("future");} 
      if(currentHour > j+9){
        $(colorBoxes[j]).removeClass(["future", "present"]).addClass("past");}
    }}
    //run each of these so that they load immidaitely upon openning window. updater function adds a sec or 2 delay to start
  $(function init(){
    colorToHour();
    $('#currentDay').text(today.format('MMMM D, YYYY hh:mm A'));
  });
 // run at timer to update our colors and time at the top checking every 2 seonds as to have less lag but keep it within close margin of proper time
  $(function updater() {
    var timer = 0;
      setInterval(function() {
        if(timer === 0 || timer%2 === 0){
          today = dayjs();
          colorToHour();
          $('#currentDay').text(today.format('MMMM D, YYYY hh:mm A'));
          }
        timer++
    }, 1000);
  });
//clear storage and current events in the day planner
  $('#purgeBtn').on('click', function(){
    for(k=0; k<textFields.length; k++){
      localStorage.clear("textFields" + k);
      $(textFields[k]).val("");}
  });
});
