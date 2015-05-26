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
		    
		    $(id).html('حسب الساعة تاعك :<br/>'+
		    		'مازال ' +
		    		days + ' يوم ' +
		    		hours + ' ساعة ' +
		    		minutes + ' دقيقة ' +
		    		seconds + ' ثانية ' +
		    		' <br/> يعني ' +
		    		day[destination.getDay()] + " " +
		    		destination.getDate() + " " +
		    		month[destination.getMonth()] +
		    		" على " +
		    		destination.toLocaleString("us").split(" ")[1]
		    		);
		    setTimeout(function (){countdown(destination, id);}, 1000);
		    
	};
}


function Horloge(id){
	hours = parseInt(a / 3600);
	minutes = parseInt((a - hours*3600)/60);
	seconds = parseInt(a - hours*3600 - minutes*60);
	a++;
	hours = hours > 9 ? hours : "0"+hours;
	hours = hours < 24 ? hours : "00";
	minutes = minutes > 9 ? minutes : "0"+minutes;
	seconds = seconds > 9 ? seconds : "0"+seconds;
	$("#time").html(hours + ":" + minutes + ":" + seconds);
	setTimeout(function (){Horloge(id);}, 1000);
}


function intPart(floatNum){
    if (floatNum < -0.0000001){return Math.ceil(floatNum - 0.0000001)}
    return Math.floor(floatNum + 0.0000001)
	}

function G2H(id)
{
	youm = new Date($(id).val());
	yr = youm.getFullYear();
	mth = youm.getMonth();
	day = youm.getDate();
	d = youm.getDay();
	delta = 1;
	
	moonMonths = ["محرم", "صفر", "ربيع الأول", "ربيع الثاني", "جمادي الأول", "جمادي الثاني", "رجب", 'شعبان', "رمضان", "شوال", "ذو القعدة", "ذو الحجة"];

        jd1 = intPart((1461 * (yr + 4800 + intPart((mth - 14) / 12.0))) / 4);
        jd2 = intPart((367 * (mth - 2 - 12 * (intPart((mth - 14) / 12.0)))) / 12);
        jd3 = intPart((3 * (self.intPart((yr + 4900 + intPart((mth - 14) / 12.0)) / 100))) / 4);
        jd = jd1 + jd2 - jd3 + day - 32075 + delta;
   
    l = jd - 1948440 + 10632;
    n = intPart((l - 1) /10631.0);
    l = l - 10631 * n + 354;
    j1 = (intPart((10985 - l) / 5316.0)) * (intPart((50 * l) / 17719.0));
    j2 = (intPart(l / 5670.0)) * (intPart((43 * l) / 15238.0));
    j = j1 + j2;
    l1 = (intPart((30 - j) / 15.0)) * (intPart((17719 * j) / 50.0));
    l2 = (intPart(j / 16.0)) * (intPart((15238 * j) / 43.0));
    l = l - l1 - l2 + 29;
    m = intPart((24 * l) / 709.0);
    d = l - intPart((709 * m) / 24.0);
    y = 30 * n + j - 30;
    
    return mont = [y, moonMonths[parseInt(m)], d];
}


$(function() {
	idays = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
	bdays = ["arim", "aram", "ahad", "amhad", "sem", "sed", "ačer"];
	options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
	a = parseInt($("#dhork").val().split(":"))*3600 + parseInt($("#dhork").val().split(":")[1]) * 60 + parseInt($("#dhork").val().split(":")[2]);
	Horloge("#time");
	G2H("#youm");
	$("#isl").html(idays[youm.getDay()%7] + " " + mont[2] + " " + mont[1] + " " + mont[0]);
	$("#fr").html(youm.toLocaleString("fr-FR", options));
	$("#en").html(youm.toLocaleString("en-US", options));
	$("#ber").html(bdays[youm.getDay()%7] + " " + mont[2] + " " + berDay("#youm") + " " + mont[0]);
})

// i know, this is a loooooong function... but bear in mind that switch is to avoid in javascript (google it), use objects instead!
function berDay(id)
	{
	var assa = new Date($(id).val());
	var jr = assa.getDate();
	var mnth = assa.getMonth();
	var month = ""
		if (((mnth == 11) && (jr >= 14))  || ((mnth == 0) && (jr <= 13)))
		{
			month = "Jember" 
		}
		else if (((mnth == 0) && (jr >= 14))  || ((mnth == 1) && (jr <= 13)))
		{
			month = "Yennayer" 
		}
		else if (((mnth == 1) && (jr >= 14))  || ((mnth == 2) && (jr <= 13)))
		{
			month = "Furar" 
		}
		else if (((mnth == 2) && (jr >= 14))  || ((mnth == 3) && (jr <= 13)))
		{
			month = "Meɣres" 
		}
		else if (((mnth == 3) && (jr >= 14))  || ((mnth == 4) && (jr <= 13)))
		{
			month = "Yebrir" 
		}
		else if (((mnth == 4) && (jr >= 14))  || ((mnth == 5) && (jr <= 13)))
		{
			month = "Maggu" 
		}
		else if (((mnth == 5) && (jr >= 14))  || ((mnth == 6) && (jr <= 13)))
		{
			month = "Yunyu" 
		}
		else if (((mnth == 6) && (jr >= 14))  || ((mnth == 7) && (jr <= 13)))
		{
			month = "Yulyu" 
		}
		else if (((mnth == 7) && (jr >= 14))  || ((mnth == 8) && (jr <= 13)))
		{
			month = "ɣust" 
		}
		else if (((mnth == 8) && (jr >= 14))  || ((mnth == 9) && (jr <= 13)))
		{
			month = "Ctember" 
		}
		else if (((mnth == 9) && (jr >= 14))  || ((mnth == 10) && (jr <= 13)))
		{
			month = "Tuber" 
		}
		else if (((mnth == 10) && (jr >= 14))  || ((mnth == 11) && (jr <= 13)))
		{
			month = "Wamber" 
		}

		return month;
	}
