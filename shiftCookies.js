// shift.html - cookie functions
//
// Copyright (c) 2004-2010 Michael Sherman. All rights reserved.
//
// LICENSE: LGPL
// 
// see shift.js for revision history

var c_name = "Shift";
var exdays = 30;

function saveSet()
{
    buildCookie();
    writeCookie();
}

function swapSet()
{
    buildCookie();
    readSet();
    writeCookie();
}

function writeCookie()
{
    // save the cookie
    //document.cookie = escape(cookieString);
    var exdate=new Date();
    exdate.setDate (exdate.getDate() + exdays);

	var c_value = escape(cookieString);
	
	//	document.cookie = c_name + "=" + c_value  + ((exdays==null) ? "; " : "; expires=" + exdate.toUTCString()) + "; path=/;" + "users_resolution="+ screen.width +"x"+ screen.height +"; unique_id="+ uniqid();
	document.cookie = c_name + "=" + c_value  + "; path=/;" ;
	
	// debug
	if (document.cookie == "")
	{
		alert ("Mike's bicycle gear calculator was unable to save your configuration.\nPlease email mike.sherman@earthlink.net with information about the web browser you are using so I can fix the problem.\nThank You.");
	}
	//alert (document.cookie)
}

function uniqid()
 {
	var newDate = new Date;
	return newDate.getTime();
 }

// builds a cookie from the current screen into var cookiestring
function buildCookie()
{
    if ( pageTitle == ""){
        pageTitle = "None";
    }
    wheelOption = document.mainForm.wheel.options.selectedIndex;
    crankOption = document.mainForm.crank.options.selectedIndex;
    cassetteOption = document.mainForm.cassette.options.selectedIndex;

    // build the cookie
    cookieString = 
    cassetteSelection + "XxX" +
    cassetteOption + "XxX" +
    numCogs + "XxX" +
    crank + "XxX" +
    crankOption + "XxX" +
    wheelIndex + "XxX" +
    wheelOption + "XxX" +
    numRings + "XxX" +
    rings[0] + "XxX" +
    rings[1] + "XxX" +
    rings[2] + "XxX" +
    cogs[0] + "XxX" +
    cogs[1] + "XxX" +
    cogs[2] + "XxX" +
    cogs[3] + "XxX" +
    cogs[4] + "XxX" +
    cogs[5] + "XxX" +
    cogs[6] + "XxX" +
    cogs[7] + "XxX" +
    cogs[8] + "XxX" +
    cogs[9] + "XxX" +
    cogs[10] + "XxX" +
    pageTitle + "XxX" +
    RPM + "XxX" +
    speedRangeType + "XxX" +
    lRPM + "XxX" +
    hRPM + "XxX" +
    showgrid + "XxX" +
    sortgears + "XxX";
}

// reads the cookie into the programs vars
// if no cookie exists, uses the default cookie
function readSet()
{
    var cookieString1;
//    var cookieString1 = unescape(document.cookie);
//  if (cookieString1 == "" || cookieString1 == null){
//      cookieString1 = defaultCookie;  // loads coppi
//  }

    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++)
    {
        x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x = x.replace(/^\s+|\s+$/g,"");
        if (x == c_name)
        {
            cookieString1 = unescape(y);
			var crumbs = cookieString1.split("XxX");

			// restore the variables
			cassetteSelection = parseInt(crumbs[0]);
			cassetteOption = parseInt(crumbs[1]);
			numCogs = parseInt(crumbs[2]);
			crank = parseInt(crumbs[3]);
			crankOption = parseInt(crumbs[4]);
			wheelIndex = parseInt(crumbs[5]);
			wheelOption = parseInt(crumbs[6]);
			numRings = parseInt(crumbs[7]);
			rings[0] = parseInt(crumbs[8]);
			rings[1] = parseInt(crumbs[9]);
			rings[2] = parseInt(crumbs[10]);
			cogs[0] = parseInt(crumbs[11]);
			cogs[1] = parseInt(crumbs[12]);
			cogs[2] = parseInt(crumbs[13]);
			cogs[3] = parseInt(crumbs[14]);
			cogs[4] = parseInt(crumbs[15]);
			cogs[5] = parseInt(crumbs[16]);
			cogs[6] = parseInt(crumbs[17]);
			cogs[7] = parseInt(crumbs[18]);
			cogs[8] = parseInt(crumbs[19]);
			cogs[9] = parseInt(crumbs[20]);
			cogs[10] = parseInt(crumbs[21]);
			pageTitle = crumbs[22];
			RPM = parseInt(crumbs[23]);
			speedRangeType = parseInt(crumbs[24]);
			lRPM = parseInt(crumbs[25]);
			hRPM = parseInt(crumbs[26]);
			showgrid = (crumbs[27]);
			sortgears = (crumbs[28]);
  
			writeTitle();
			writeCassette();
			writeCrank();
			writeWheel();
			writeCheckboxes();
  
			updateOutput();
		}
    }

}

