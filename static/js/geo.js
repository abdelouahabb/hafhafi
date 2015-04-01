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
        	xsrf = $("iframe").contents().find("input").val()
            $("#laat").html('<input id="lat" type="hidden" name="lat"></input><input type="hidden" name="_xsrf" value='+xsrf+'><input id="lon" type="hidden" name="lon"></input><input class="ui fluid massive yellow button" value="جيبلي الأحوال الجوية ضرك" type="submit"/>');
            $("#lat").val(position.coords.latitude);
            $("#lon").val(position.coords.longitude);
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
            	if (responseData.slice(0,5) ==  '{"dat'){
                localStorage.setItem('meteo', responseData);
            	}
            	else {
            		$("#alrdy").html(responseData);
            		$("#back")
            		  .modal('show');
            		$("#alrdy").empty();	
            	}
                $("#efem").remove();
                $(".ui.active.dimmer").remove()
                Meteo();
                Dessiner();
                
                
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