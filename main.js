// calls the first ajax call using local storage
$(document).ready(function(event) {

	let stored_val = localStorage.getItem("value");

	$("#dropdown").val(stored_val).change();

	ajax(stored_val);

});


// checks to see if city has been changed and calls weather api
$("#weather").on("input", function(event) {

	let city_code = $("#dropdown").val();
	localStorage.setItem("value", city_code);

	ajax(city_code);
});

// when to do item is added it submits appends a new html element
$("#form-input").on("submit", function(event) {
	event.preventDefault();

	let input = $("#item-add").val();

	if(input.length == 0) {
		return
	}

	$("#list").append('<li class="wholeItem"><span class="removeButton"> <i class="far fa-square"></i> </span><span class="item">' + input + '</span></li>');

});

// handles all of the delegation
$("#list").on("click", ".removeButton" , function() {	
	$(this).parent().fadeOut(); 
});

$("#list").on("mouseenter", ".wholeItem" , function() {	
	$(this).css("background-color", "#FCB0B3");
});

$("#list").on("mouseleave", ".wholeItem" , function() {	
	$(this).css("background-color", "white");
});

$("#list").on("click", ".item", function() 
{	
	if($(this).hasClass("strike")) {
		$(this).removeClass("strike");
	} else {
		$(this).addClass("strike");
	}
});

$(".fas").on("click", function() 
{	
	$("#form-input").slideToggle(500)
});

//ajax call to weather api, takes in a city code
function ajax(cityCode) {

	$.ajax({

		method: "GET",
		url: "https://api.weatherbit.io/v2.0/current",
		data: {
			city_id: cityCode,
			key: "b7b1fb8b3e3e4a0e8469855b191d1f43",
			lang: "en",
			units: "I"
		}
	})

	.done(function(results) {
		displayData(results);
	})
	.fail(function() {
		//when an error is received, this function runs
		console.log("ERROR");

	});
}

//displays results from API call
function displayData(results) {

	// JSON.parse(data);
	let temp = results.data[0].temp;
	let app_temp = results.data[0].app_temp;
	let description = results.data[0].weather.description;

	$("#player-image").html(" "+ temp + "&#176 " + description + ". Feels like " + app_temp + ".");

}