// https://mindgrader.com/tutorials/1-how-to-create-a-simple-javascript-countdown-timer
if (window.localStorage.length > 0){
	
	
	function countdown(destination, id){
		var now = new Date();
		
		var target_date = new Date(destination).getTime();
	
		var days, hours, minutes, seconds;
		    
		    var current_date = new Date(now).getTime();
		    var seconds_left = (target_date - current_date) / 1000;    
		    
		    days = parseInt( seconds_left / 86400 );
		    seconds_left = seconds_left % 86400;
		    
		    hours = parseInt( seconds_left / 3600 );
		    seconds_left = seconds_left % 3600;
		    
		    minutes = parseInt( seconds_left / 60 );
		    seconds = parseInt( seconds_left % 60 );
		    
		    $(id).html( "راك طلبت المعلومة هاذي على  " + 
		    		noww.toLocaleString("us").split(" ")[1] + "<br/>" +
		    		'مازال ' +
		    		days + ' يوم ' +
		    		hours + ' ساعة ' +
		    		minutes + ' دقيقة ' +
		    		seconds + ' ثانية ' +
		    		' <br/> يعني ' +
		    		Intl.DateTimeFormat("ar", {weekday: "long", year: "numeric", month: "long", day: "numeric"}).format(destination).split(" ")[0].split("،")[0] + " " +
		    		destination.toLocaleString("us").split(" ")[0].split("/")[0] + " " +
		    		month[parseInt(destination.toLocaleString("us").split(" ")[0].split("/")[1])-1] +
		    		" على " +
		    		destination.toLocaleString("us").split(" ")[1]
		    		);
		    setTimeout(function (){countdown(destination, id);}, 1000);
		    
	};
}
