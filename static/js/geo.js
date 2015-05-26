// delete the button after the user got his json file, so the server is freed
function enableButton(){$('#meteor').removeAttr('disabled')}; 
// this is where the magic of geolocalisation happens!
$(window).ready(function(){
	 $("#dar").on("click", function(){
            initiate_geolocation();
	 })   
	 });
 
        function initiate_geolocation() {
            navigator.geolocation.getCurrentPosition(latlon, errors,{timeout:10000});
        }

        function errors(error)
        {
            switch(error.code)
            {
            case error.PERMISSION_DENIED: $("#lguit").html('<i class="spy"></i><h1>كيفاش نلـڤـاوك ضرك ؟&lrm;</h1><h1>شوف  <a href="https://support.google.com/chrome/answer/142065?hl=fr" target="_blank">هنا</a> ولا <a href="https://www.mozilla.org/fr/firefox/geolocation/" target="_blank">هنا</a>  ولا <a href="http://help.opera.com/Windows/12.10/fr/geolocation.html" target="_blank">هنا</a> باش تتعرف على هاذي التكنولوجيا</h1>');    
            break;
            
                case error.POSITION_UNAVAILABLE: $("#lguit").html('<i class="spy"></i><h1>يـــاو مقدرناش نلڤاوك , زيد عاود نشوفو</h1><h1>شوف  <a href="https://support.google.com/chrome/answer/142065?hl=fr" target="_blank">هنا</a> ولا <a href="https://www.mozilla.org/fr/firefox/geolocation/" target="_blank">هنا</a>  ولا <a href="http://help.opera.com/Windows/12.10/fr/geolocation.html" target="_blank">هنا</a> باش تتعرف على هاذي التكنولوجيا</h1>');
                break;
                
                case error.TIMEOUT: $("#lguit").html('<i class="spy"></i><h1>العملية دامت كثر من واش لازم  زيد عاود نشوفو</h1><h1>شوف  <a href="https://support.google.com/chrome/answer/142065?hl=fr" target="_blank">هنا</a> ولا <a href="https://www.mozilla.org/fr/firefox/geolocation/" target="_blank">هنا</a>  ولا <a href="http://help.opera.com/Windows/12.10/fr/geolocation.html" target="_blank">هنا</a> باش تتعرف على هاذي التكنولوجيا</h1>');
                break;
                
                default: $("#lguit").html('<i class="spy"></i><h1>حاجة راهي ماشي نورمال زيد عاود نشوفو</h1><h1>شوف  <a href="https://support.google.com/chrome/answer/142065?hl=fr" target="_blank">هنا</a> ولا <a href="https://www.mozilla.org/fr/firefox/geolocation/" target="_blank">هنا</a>  ولا <a href="http://help.opera.com/Windows/12.10/fr/geolocation.html" target="_blank">هنا</a> باش تتعرف على هاذي التكنولوجيا</h1>');
                break;
            }
        }
                 // store the lat-lon value in a hidden input to send them to the server
        function latlon(position){
            $("#laat").html('<input id="lat" type="hidden" name="lat"></input><input id="lon" type="hidden" name="lon"></input><input class="submit" value="جيبلي الأحوال الجوية ضرك" type="submit"/>');
        	$("#lat").val(position.coords.latitude);
            $("#lon").val(position.coords.longitude);
        	$("#lguit").html('<div id="map" style="height: 200px; width: 600px; position: relative;margin: auto"></div>'+
        			'<script>'+
        			'var map = L.map( "map", {center:['+
        			position.coords.latitude+
        			','+
        			position.coords.longitude+
        			'],minZoom: 5,zoom: 10});L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {attribution:"OpenStreetMap"}).addTo(map);'+
        			'var marker = L.marker(['+
        			position.coords.latitude+
        			','+
        			position.coords.longitude+
        			']).addTo(map).bindPopup("راك هنا ?").openPopup();'+
        			'marker.dragging.enable();marker.on("dragend", function(e) {'+
        			'var coords = e.target.getLatLng();var lat = coords.lat;var lng = coords.lng;map.panTo(new L.LatLng(coords.lat, coords.lng));'+
        			'$("#lat").val(coords.lat);$("#lon").val(coords.lng);console.log(coords.lat)});'+
        			'</script>');
        	
            
        };
        

        $( document ).ready(function() {        
          // the days translator
        	$(".c0").prepend(" اليوم ");
        	$(".c1").prepend(" غدوة ");
        	$(".c2").prepend(" غير غدوة ");
        	
        	//meteo class renamer
        	for (h = 0; h < 4; h++) {
        		$('.meteo').eq(h).attr('id', 'meteo'+(h+1));
        	}
        	
        });
        
        // here is the ajax call to the server, to bring to json file.
        $( document ).ready(function() {
        $("#latlon").on("submit", function(e){
        	blury();
        	$("#wait").css({"display":"block"});
        	e.preventDefault();
        	$.ajax({
            type: "post",
            url: "/latlon",
            data: $("#latlon").serialize(),
            contentType: "application/x-www-form-urlencoded",
            success: function(responseData) {
            	if (responseData.slice(0,5) ==  '{"ram'){
                localStorage.setItem('meteo', responseData);
            	}
            	else {
            		$("#alrdy").html(responseData);
            		$("#alrdy").css({"display":"initial"});
            		window.location.href = "#alrdy";
            	}
            	unblury();
            	$("#wait").remove();
                $("#efem").remove();
                $("#warn").remove();
                Meteo();
                Dessiner();
                $("#jeun").show();

                
            },
            error: function(jqXHR, textStatus, errorThrown) 
            {
            	$(".ui.active.dimmer").remove();
            	$('#noncon').html("<h1>walouuuuuuuuuu</h1>")
            }
        	})
        })
        })

$( document ).ready(function() {
	$("#feedb").on("submit", function(e){
    	// you can use $("#feedb").on("submit", function... but only if the button is a <input> and not <div>.
    	// $(form).submit or $(button).click ... this is the same way you will find on bootstrap.
    	e.preventDefault();
    	$.ajax({
        type: "post",
        url: "/msg",
        data: $("#feedb").serialize(),
        contentType: "application/x-www-form-urlencoded",
        success: function(responseData) {
        	document.getElementsByName("msg")[0].value = "";
        	$(".liker").html(responseData);
        	window.location.href = "#succes";
            
        },
        error: function(jqXHR, textStatus, errorThrown) {
        	console.log(errorThrown);
        }
    	})
    })
    });

$(function() {
	$('#jeun').click(function() {
		var ramdhan = new Date(JSON.parse(localStorage.getItem('meteo')).ramd);
		var nisf = new Date(JSON.parse(localStorage.getItem('meteo')).nesf);
		var aid = new Date(JSON.parse(localStorage.getItem('meteo')).aid);
		window.day = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
		window.month = ["جانفي", "فيفري", "مارس", "أفريل", "ماي", "جوان", "جويلية", "أوت", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
		
		countdown(ramdhan, "#ram");
		countdown(nisf, "#nisf");
		countdown(aid, "#aid");
		$("#ramdhan").show();
		$("#jeun").hide();
	})
});

// this is the function that will convert pm to 24h system used in Algeria ...
function timer(c){
	for (i = 0; i < $(c).length; i++){
		if ($(c)[i].innerHTML.split(" ")[1]=="PM") {
			$(c)[i].innerHTML = parseInt($(c)[i].innerHTML.split(" ")[0].split(":")[0])+12 + ":" + $(c)[i].innerHTML.split(" ")[0].split(":")[1];
		}
		else {
			$(c)[i].innerHTML = $(c)[i].innerHTML.split(" ")[0]
		}
		};
}

$(function() {
		timer(".riz");
})

// you can use :target but sadly the you have to reorganize your html structure!
function blury(){
$("#content").css({"-webkit-filter": "blur(5px) sepia(1)","transition": "all .5s linear", "opacity":"0.7"});
$("body").css({"overflow": "hidden"});
}

function cloz(){
	$("#alrdy").css({"display": "none"});
	}

function unblury(){
	$("#content").css({"-webkit-filter": "blur(0px) sepia(0)","transition": "all .4s", "opacity":"1"});
	$("body").css({"overflow": "visible"});
	}