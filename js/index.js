/* 
    WonderBarKids - Javascript file
    Version: 1.0
    Author: Anurag Mishra
    Dated: Sat, 21st may 8:05 AM
*/

/**
     * Registers event for  Farenheit slider movement and initializes it
*/
var slider1changed = false;
var slider2changed = false;
$(function() {
	$( "#slider1" ).slider({
		min:-148,
		max:212,
		change: function( event, ui ) {

			var txtCelcius = document.getElementById('txtCelcius');
			var txtFarenheit = document.getElementById('txtFarenheit');
			txtFarenheit.value = ui.value;
			var celcius = FarenheitToCelcius(ui.value);
			txtCelcius.value = celcius;
			//below logic is to avoid unnecessary recursive call between sliders change event
			slider1changed = true;
			if(slider2changed == false){
				$( "#slider2" ).slider( "value", celcius );
			}
			slider1changed = false;
		}
	});
});

/**
     * Registers event for Celcius slider movement and initializes it
*/
$(function() {
	$( "#slider2" ).slider({
		min:-100,
		max:100,
		change: function( event, ui ) {
			var txtCelcius = document.getElementById('txtCelcius');
			var txtFarenheit = document.getElementById('txtFarenheit');
			txtCelcius.value = ui.value;
			var farenheit = celciusToFarenheit(ui.value);
			txtFarenheit.value = farenheit;
			//below logic is to avoid unnecessary recursive call between sliders change event
			slider2changed = true;
			if(slider1changed == false){
				$( "#slider1" ).slider( "value", farenheit );
			}
			slider2changed = false;
		}
	});
});

/**
     * Converts celcius input to farenheit and returns its value
     * @param {number} celcius - Celcius input to be converted
*/
function celciusToFarenheit(celcius){
	return celcius*1.8 + 32 ;
};

/**
     * Converts farenheit input to celcius and returns its value
     * @param {number} farenheit - Farenheit input to be converted
*/
function FarenheitToCelcius(farenheit){
	return (farenheit - 32)/1.8 ; 
};

/**
     * Initializes the page, hides contant div and shows login div
*/
function init(){
	document.getElementById('dvLogin').style.display = "block";
	document.getElementById('dvForm').style.display = "none";
}

//calls the init function
init();

/**
     * Function to be triggered while login
*/
function onSubmitButtonClick(){
	document.getElementById('dvLogin').style.display = "none";
	document.getElementById('dvForm').style.display = "block";
}

/**
     * Form Submit evetn for Contact information
*/
function formSubmit(){
	var email = document.getElementById('txtEmail').value();
	if(!validateEmail(email)){
		alert("Please provide correct email address");
		return false;
	}	
}

/**
     * Validates email and return true or false accordingly
     * @param {string} email - Email string as input
*/
function validateEmail(email) 
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

/**
     * Form submission event for login Form
*/
function loginFormSubmit(){
	var userName = document.getElementById('txtUserName').value;
	var password = document.getElementById('txtPassword').value;
	if(userName != "" && password != "")
	{	
		//Dummy ajax call to be made as of now, its written, will be working once API in place
		// $.ajax({
  //           url: '/validateLogin' + "?user="+userName + "&password=" password  ,
  //           type: 'GET',
  //           async: true,
  //           dataType: 'json',
  //           success: function(result){
  //               if(result.statusCode ==1){
  //                   alert(result.statusMessage);
  //               }else{
  //                  onSubmitButtonClick();
  //               }
  //           },
  //           error: function (result){
  //               alert('Errro while validating login data');
  //           }
  //       });
		onSubmitButtonClick();
	}
	return false;
}
