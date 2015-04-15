// delete the button after the user got his json file, so the server is freed
function enableButton(){$('#meteor').removeAttr('disabled')}; 
// this is where the magic of geolocalisation happens!
$(window).ready(function(){
	 $("#dar").on("click", function(){
            initiate_geolocation();
	 })   
	 });
 
        function initiate_geolocation() {
            navigator.geolocation.getCurrentPosition(latlon, errors);
        }

        function errors(error)
        {
            switch(error.code)
            {
            case error.PERMISSION_DENIED: $(".ui.modal.geo").modal('show');    
            break;
 
                case error.POSITION_UNAVAILABLE: $("#latlon").html('<div class="ui red icon message"><i class="close icon"></i><i class="meh icon"></i><div class="content"><div class="header">يـــاو مقدرناش نلڤاوك </div><p>زيد عاود نشوفو !!!</p></div></div>');
                break;
 
                case error.TIMEOUT: $("#latlon").html('<div class="ui red icon message"><i class="close icon"></i><i class="meh icon"></i><div class="content"><div class="header">العملية دامت كثر من واش لازم </div><p>زيد عاود نشوفو !!!</p></div></div>');
                break;
 
                default: $("#latlon").html('<div class="ui red icon message"><i class="close icon"></i><i class="meh icon"></i><div class="content"><div class="header">حاجة راهي ماشي نورمال </div><p>زيد عاود نشوفو !!!</p></div></div>');
                break;
            }
        }
                 // store the lat-lon value in a hidden input to send them to the server
        function latlon(position){
        	xsrf = $("#srf").children().val()
            $("#laat").html('<input id="lat" type="hidden" name="lat"></input><input type="hidden" name="_xsrf" value='+xsrf+'><input id="lon" type="hidden" name="lon"></input><input class="ui fluid massive yellow button" value="جيبلي الأحوال الجوية ضرك" type="submit"/>');
        	$("#lat").val(position.coords.latitude);
            $("#lon").val(position.coords.longitude);
        	$("#lguit").html('<div id="map" style="height:200px; width:600px"></div>'+
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
        	
            // the sidebar
        	$("#btn").on("click", function(){
        	$("#menu").sidebar("toggle")});

        	// message red
        	$('.message .close').on('click', function() {
            	  $(this).closest('.message').fadeOut();
            	});
        
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
        	$("#wait").html('<div class="ui active dimmer"><h1 class="ui large text loader">اصبر راني نحوسلك</h1></div>');
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
            		$("#back")
            		  .modal('show');
            		$("#alrdy").empty();	
            	}
                $("#efem").remove();
                $("#warn").remove();
                $(".ui.active.dimmer").remove();
                Meteo();
                Dessiner();
                $("#jeun").show();
                
            },
            error: function(jqXHR, textStatus, errorThrown) {
            	$(".ui.active.dimmer").remove();
            	$('#noncon')
            	  .modal({
            	    closable  : false,
            	    onApprove : function() {
            	    	location.reload(true);
            	    	window.stop();
            	    }
            	  })
            	  .modal('show')
            	;
            }
        	})
        })
        })

$( document ).ready(function() {
       $("#me").on("click", function(){
    	   $('.coupled.modal')
    		  .modal({
    		    allowMultiple: false,
    		    
    		  })
    		;
    		// attach events to buttons
    		$('.second.modal')
    		  .modal('attach events',  '.first.modal #fdbk')
    		;
    		// show first now
    		$('.first.modal')
    		  .modal('show')
    			; 	 
	});
});
        
$( document ).ready(function() {
    $("#fdbk").on("click", function(e){
    	// you can use $("#feedb").on("submit", function... but only if the button is a <input> and not <div>.
    	// $(form).submit or $(button).click ... this is the same way you will find on bootstrap.
    	e.preventDefault();
    	$.ajax({
        type: "post",
        url: "/msg",
        data: $("#feedb").serialize(),
        contentType: "application/x-www-form-urlencoded",
        success: function(responseData) {
        	$(".small.second.coupled.modal").html(responseData);
            
        },
        error: function(jqXHR, textStatus, errorThrown) {
        	console.log(errorThrown);
        }
    	})
    })
    });



$(document).ready(function(){
	$('#feedb')
	  .form({
	    msg: {
	      identifier  : 'msg',
	      rules: [
	        {
	          type   : 'length[4]',
	          prompt : 'هاي ڤول لي حاجة'
	        }
	      ]
	    },
	      
	  },
	  {
		  inline : true,
		  on     : 'blur'
		  }
	  )});

$(function() {
	$('#jeun').click(function() {
		window.noww = new Date(JSON.parse(localStorage.getItem('meteo')).now);
		var ramdhan = new Date(JSON.parse(localStorage.getItem('meteo')).ramd);
		var nisf = new Date(JSON.parse(localStorage.getItem('meteo')).nesf);
		var aid = new Date(JSON.parse(localStorage.getItem('meteo')).aid);
		window.month = ["جانفي", "فيفري", "مارس", "أفريل", "ماي", "جوان", "جويلية", "أوت", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"]

		countdown(ramdhan, "#ram");
		countdown(nisf, "#nisf");
		countdown(aid, "#aid");
		$("#ramdhan").show();
		$("#jeun").hide();
	})
});
