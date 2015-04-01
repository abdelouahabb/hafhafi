// i dont want to use external libraries like momentjs, because i will only use less than 5% of their option, so why not make the function ;)
function Dessiner(){
	var loops = [0,1,2,3,4];
	var days = ["الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"]
	jour = parseInt($("#day").val());
	$.each(loops, function(index, val) {  
		$('#dessin').append('<div class="column"><div class="ui center aligned inverted segment"><div class="ui animated fade blue button" onclick="Dailer.call(this)" id='+index+'><div class="visible content d'+index+'">'+days[(jour+index)%7]+'</div><div class="hidden content ">طقس السمانة</div></div></div></div>');
		  });
	$(".d0").prepend(" اليوم ");
	$(".d1").prepend(" غدوة ");
	$(".d2").prepend(" غير غدوة ");	
}
// this is the client side weather icon rendering, since you only use css, no overhead, welcome to the web of 2015 !
function climat(code, isday, h){
	weather = {
			'122':'<i class="cloud"></i>',
			
			'113': (isday == "yes" && h < 3) ? '<i class="sunn"></i>' : '<i class="moonn"></i>',
			
			'299':'<i class="cloudd"></i><i class="rainn"></i>' + (isday == "yes" && h < 3 ? '<i class="sun"></i>':'<i class="moon"></i>'),
			'305':'<i class="cloudd"></i><i class="rainn"></i>' + (isday == "yes" && h < 3 ? '<i class="sun"></i>':'<i class="moon"></i>'),
			
			'386':'<i class="cloudd"></i><i class="rainn"></i><i class="tunder"></i>' + (isday == 'yes' ? '<i class="sun"></i>':'<i class="moon"></i>'),
			
			'182':'<i class="cloudd"></i><i class="rainsnow"></i>' + (isday == "yes" && h < 3 ? '<i class="sun"></i>':'<i class="moon"></i>'),
			'185':'<i class="cloudd"></i><i class="rainsnow"></i>' + (isday == "yes" && h < 3 ? '<i class="sun"></i>':'<i class="moon"></i>'),
			'362':'<i class="cloudd"></i><i class="rainsnow"></i>' + (isday == "yes" && h < 3 ? '<i class="sun"></i>':'<i class="moon"></i>'),
			
			'392':'<i class="cloudd"></i><i class="rainsnow"></i><i class="tunder"></i>' + (isday == 'yes' ? '<i class="sun"></i>':'<i class="moon"></i>'),
			
			'179':'<i class="cloudd"></i><i class="snow"></i>' + (isday == "yes" && h < 3 ? '<i class="sun"></i>':'<i class="moon"></i>'),
			'323':'<i class="cloudd"></i><i class="snow"></i>' + (isday == "yes" && h < 3 ? '<i class="sun"></i>':'<i class="moon"></i>'),
			'368':'<i class="cloudd"></i><i class="snow"></i>' + (isday == "yes" && h < 3 ? '<i class="sun"></i>':'<i class="moon"></i>'),
			
			'176':'<i class="cloudd"></i><i class="rainn"></i>' + (isday == "yes" && h < 3 ? '<i class="sun"></i>':'<i class="moon"></i>'),
			'263':'<i class="cloudd"></i><i class="rainn"></i>' + (isday == "yes" && h < 3 ? '<i class="sun"></i>':'<i class="moon"></i>'),
			
			'116':'<i class="cloud"></i>' + (isday == "yes" && h < 3 ? '<i class="sun"></i>':'<i class="moon"></i>'),
			'119':'<i class="cloud"></i>' + (isday == "yes" && h < 3 ? '<i class="sun"></i>':'<i class="moon"></i>'),
			
			'389':'<i class="cloudd"></i><i class="rainn"></i><i class="thunder"></i>',
			
			'395':'<i class="cloudd"></i><i class="snow"></i><i class="thunder">',
			
			'311':'<i class="cloudd"></i><i class="rainsnow"></i>',
			'317':'<i class="cloudd"></i><i class="rainsnow"></i>',
			
			'314':'<i class="cloudd"></i><i class="rainsnow"></i>',
			'320':'<i class="cloudd"></i><i class="rainsnow"></i>',
			'356':'<i class="cloudd"></i><i class="rainsnow"></i>',
			'365':'<i class="cloudd"></i><i class="rainsnow"></i>',
			
			'200':'<i class="cloudd"></i><i class="thunder"></i>',
			
			'359':'<i class="cloudd"></i><i class="rainnn"></i>',
			'284':'<i class="cloudd"></i><i class="rainn"></i>',
			'302':'<i class="cloudd"></i><i class="rainn"></i>',
			'308':'<i class="cloudd"></i><i class="rainn"></i>',
			
			'332':'<i class="cloudd"></i><i class="snoww"></i>',
			'335':'<i class="cloudd"></i><i class="snoww"></i>',
			'338':'<i class="cloudd"></i><i class="snoww"></i>',
			'371':'<i class="cloudd"></i><i class="snoww"></i>',
			
			'350':'<i class="cloudd"></i><i class="vrour"></i>',
			'374':'<i class="cloudd"></i><i class="vrour"></i>',
			'377':'<i class="cloudd"></i><i class="vrour"></i>',
			
			'227':'<i class="cloudd"></i><i class="snow"></i>',
			'326':'<i class="cloudd"></i><i class="snow"></i>',
			'329':'<i class="cloudd"></i><i class="snow"></i>',
			
			
			'266':'<i class="cloudd"></i><i class="rainn"></i>',
			'281':'<i class="cloudd"></i><i class="rainn"></i>',
			'293':'<i class="cloudd"></i><i class="rainn"></i>',
			'296':'<i class="cloudd"></i><i class="rainn"></i>',
			'353':'<i class="cloudd"></i><i class="rainn"></i>',
			
			'230':'<i class="wind"></i><i class="dust"></i>',
			
			'143':'<i class="fog"></i>',
			'248':'<i class="fog"></i>',
			'260':'<i class="fog"></i>',				
	}
	
	return weather[code]
}


// change the value of the town, and the day, and get the localStorage file into a variable.
var d = 0;
function Meteo(d) {
	var d = (typeof d != 'undefined' ? d : 0 );
	
	var days = [ '<i class="blue travel icon"></i> نهار اليوم عندكم',
			'<i class="blue travel icon"></i> غدوة عندكم',
			'<i class="blue travel icon"></i> بعد غدوة عندكم',
			'<i class="blue travel icon"></i> 3 أيام عندكم',
			'<i class="blue travel icon"></i> 4 أيام عندكم' ]
	var meteo = JSON.parse(localStorage.getItem('meteo')).data;
	
	$("#bled").html(days[d])
	
	// from AM PM to normal time, note that you can use momentjs library, but since we know that sunset is always pm,
	// that means that we just add 12, to use momentjs: var sunset = moment("07:02 PM", ["h:mm A"]); alert(sunset.format("HH:mm"));
	for (i = 0; i < 5; i++) {
		var sunrise = meteo.weather[i].astronomy[0].sunrise.substr(0, 5)
		var time = meteo.weather[i].astronomy[0].sunset.substr(0, 5)
		var sunset = parseInt(time.substr(0, 2)) + 12 + ":" + time.substr(3,5)
		$("#riz"+i).html(sunrise);
		$("#set"+i).html(sunset);
	}
	// this is where values are taken from localStorage, and write them on the page, so, no need to contact the server again!
	for (h = 1; h < 4; h++) {
		$("#e" + h).find(".nua").html(meteo.weather[d].hourly[h].cloudcover);
		$("#e" + h).find(".rai").html(meteo.weather[d].hourly[h].precipMM);
		$("#e" + h).find(".medit").html(meteo.weather[d].hourly[h].humidity);
		$("#e" + h).find(".viz").html(meteo.weather[d].hourly[h].visibility);
		$("#e" + h).find(".pes").html(meteo.weather[d].hourly[h].pressure);
		$("#e" + h).find(".rih").html(meteo.weather[d].hourly[h].windspeedKmph);
		// sadly, switchClass doesent work! i dont know why, so the way to do it, is to remove, then add !
		$("#e" + h).find("#w" + h).removeClass().addClass(meteo.weather[d].hourly[h].winddir16Point)
		$("#e" + h).find(".temp").html(meteo.weather[d].hourly[h].tempC);
		$("#e" + h).find(".hess").html(meteo.weather[d].hourly[h].FeelsLikeC);
		// this is where i call that looooong object of values, so you dont have to contact the server anymore!
		$("#meteo"+h).html(climat(meteo.weather[d].hourly[h].weatherCode, meteo.weather[d].hourly[h].isdaytime, h))
	}
};

// this is where you get the value of the id, so you can change the days values.
function Dailer() {
	Meteo($(this).attr("id"));
}