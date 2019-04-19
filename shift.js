//
// javascript bicycle gear calculator by Mike Sherman 
//  <mike.sherman@earthlink.net>
//  <wheelwrightmike@gmail.com>
//
// Copyright (c) 2004-2010 Michael Sherman. All rights reserved.
//
// LICENSE: LGPL
// 
// This library is free software; you can redistribute it and/or
// modify it under the terms of the GNU Lesser General Public
// License (LGPL) as published by the Free Software Foundation; either
// version 2.1 of the License, or (at your option) any later version.
//
// ------------------------------------------------------------------
// revision history ---------------------------------------------
// 08/04/2004    created
// 08/11/2004    only one form
//               		cookies with save/recall/swap
//               		fixed direct data entry bug with < max # cogs or rings
// ----------shift2.0---------------------------------------------
// 07/13/2005	 derailer capacity added by Jim G <jimg@yojimg.net>
// 03/03/2007	 added 650B wheel sizes - m.e.sherman
// 03/05/2007	 change some input areas to text areas (looks nicer)
//			gearTableLabel (rearcap, frontcap)
//			Added speed table
// 03/07/2007	 rear capacity broken on swap - cats string rather than
// 			adding numbers. try seperate function.
// 03/08/2007	 better fix from JimG for broken capacity/swap display
// ----------shift3.0---------------------------------------------
// 04/15/2009	 graphical log plot with Walter Zorn's DHTML JavaScript 
//			VectorGraphics Library
//			 11 speed support, Campy 11 speed cassettes 
//			DuraAce 10 speed cassettes
//		 	center the ascii tables when not 11 speed
// 04/18/2009 	 bug in new centering - with 1 or 2 rings, centering is wrong.
//			Version 3.0 was never released to my web page.
// ----------shift3.1----------------------------------------------
// 04/19/2009	 split the original file up into 3 pieces
//			 continue replacing ascii tables with vector graphics
// 04/21/2009	 put text areas inside div's so one html file can support
//			both ASCII and vector graphic displays.
//			 Change graph fonts to blue.
//			29er wheels 1.95, 2.1, 2.2, more tubular widths
// 04/23/2009	 Gear table with VectorGraphics Library
// 04/28/2009	 all tables with vector graphics library
//			some code cleanup, output functions last
// 			added logic when incrementing/decrementing cog values
//			- i.e. not allow two cogs the same
// 05/05/2009	selectCassette.js - correct cogs - sachs 13-28, 6 sp and 13-32, 7 sp
// ----------shift3.2---------------------------------------------- 
// 07/21/2009	check the RolloutType and SpeedType each time you draw the tables
//			fixes a bug where display and radio buttons don't agree after a reload
// ----------shift3.3---------------------------------------------- 
// 10/24/2009 	added zinn crank lengths request from Greg M <gmackler@gmail.com>
//			130, 135, 140, 145, 150, 155, 160 and 190, 195, 200, 205, 210, 215, 220
//			released 1/2/2010 with incorrect (old) shift.html file so the crank sizes are
//			not available.
// 01/07/2010	add 700x23 wheel size per user request (here and shift.html
// ----------shift4.0---------------------------------------------- 
// 02/01/2010	Start work on rpm/speed range display
// 02/02/2010	fixed ghosted gear number labels on the top gear table
//			auto scale the rpm/speed range table
// 02/03/2010	crude error handling on rpm range values - doesn't update correctly
//			switchable horizontal lines in rpm/speed range table
// 02/04/2010	fix errors in cassette numbering in shift.html and selectCassette.js
//			range display (mostly) working with sorting
//			add labels to sorted and unsorted speed range displays
// 02/06/2010	debug sorted rpm/speed range display
// 02/06/2010	released
// ----------shift4.1---------------------------------------------- 
// 02/08/2010	change reference email address to my gmail
//			resize canvas for rpm/speed
// 			add rpm range to cookie/save/load 
// 02/23/2010	shift.html (4.1) add spacing between label and rpm range chart
// 03/09/2010	make all color selections in the graphics functions variables.
//   --------- there was a private release of the code up to this point -----------------
// 03/24/2010	add zero checking to readRings() and readCogs() for when users enter
//			a zero cog or ring size - it still drives the graphics crazy.
//			change email address back to earthlink
//			released
// ----------shift4.2---------------------------------------------- 
//11/17/2010	fix display 3.00 value on gain ratio tables
//			fix bug displaying rollout > 10 meters 
//			- positioned wrong, not rounded properly - graphical only
//			read parameters from URL
//			add credits page
//			setCrank() seems to be fixed
// 11/22/2010	bookmark buttons - w & w/o the data
//			add bookmark/url info to credits page
// 12/29/2010	add IRD freewheels to selectCassette.js
// 12/31/2010	fix bug when typing in cogs or rings in cogPlus() and ringPlus() - add parseInt()
//		add same to a few other inputs, and remove from readCogs() and readRings()
// ----------shift4.3---------------------------------------------- 
// 02/23/2011	add 20x1.5 wheel size to javascript (36)
//			40-406 tire (20") - Ken Benson <ken@bkenbenson.com>
// 03/04/2011	change bookmark to go to shift.html directly, doesn't work properly with my frames
// 			selectCassette.js  & shift.html - SRAM X5 cassette - it's an 11-34, 
//			9-speed cassette having 11,13,15,17,20,23,26,30,34 as the cog sizes. - Ken Benson <ken@bkenbenson.com>
// 03/30/2011	Clean up my internal documentation a bit.
// 04/11/2011	load with recall and swap - always comes back sorted
//			sortgears is not and int - not read properly from cookie ( as was showgrid)
//			sortgears = "yes" | "no"  some places it was "on" | "off"
// 04/12/2011	split shift.js (this file) into a bunch of smaller files for easier management
//			selectCassette.js renamed to shiftCassettes.js
//			recall fixed.  was reading 'sort' and 'grid' from cookie w parse()= WRONG! 
//			tighten up the display a bit (shift.html)
// 04/16/2011	tighten up the display a bit more (shift.html)
// 04/17/2011	release
//			fix problem with testing if there is a cookie - swap/recall problems
//			fix a bunch of html issues (thanks to chrome)
//			update the links to the sources, moved to credits page
// ----------shift4.3.1 ---------------------------------------------- 
// 04/09/2011	move some functions around again.
//			bug fix - add update to setRPM - now display will update
//			bookmark set now reopens link with the arguments and posts an alert to save w Ctrl-D
//			sped up bookmark load - was updating screen too often
// 05/17/2011	remove bookmark button (not the bookmarkSet button)
//			work on bookmarkSet, can't decide what to do...
//			change default upper rpm to 100 (speed/rpm graph)
//			fixed problems with setting rpms on speed/rpm graph fixed parseInt problem
//			same problem fixed in other areas of the code - fixed
//			add 700x30 wheel size
// 05/18/2010	work on bookmarks
//			add selectedCassette to the URL save
//			add code to select the correct items in the pull down menus
//			working for cassette, not yet for crank and wheel
// 05/19/2011	add call to updateDisplay to update the Crank and Wheel picklists
//			also changed the names of the functions from 'write' to 'update'
//			add a small help section to the credits page
//			move the speed table to the bottom
//			add writeCheckboxes() to updateOutput()
//			Released.
// ----------shift4.4 ---------------------------------------------- 
// 05/20/2011	update revision history here and in credits.
//			help button on shift.html
// 05/23/2011	move bookmark button above the chart type selection
//			highlight gear on hover over cog +/- button
// 05/24/2011	move highlight code to gearChartG and call from shiftUpdateDisplay.
//			add highlight to log and speed graphs
// 05/25/2011	some tweaks to the highlighting
//			add checkbox to enable/disable highlighting
//			clean up info page (no ugly table borders)
//			decide changes merit a bump to rev 4.4
//			add highlighting to cog text boxes
//			editing a cog text box removes selected cassette
//			fixed bug in readCogs function
// 05/26/2011	gearHighlight() - don't highlight where there isn't a sprocket
//			more cleanup work on the credits page
//			released.
// 05/27/2011	small changes to credits page
// ----------shift4.4.1 ---------------------------------------------- 
// 06/06/2011	both derailleur capacity displays - remove border and link to Sheldon
//			all href's open on new page/tab
//			some formatting cleanup
// 06/07/2011	release
// ----------shift4.4.2 ---------------------------------------------- 
// 06/13/2011	standardize display I/O function names
//				write/update -> write
//				read/set/get/-nothing- -> read
//				move some more functions around
//			add url to main page
// 06/14/2011	additional help.
//			work on cookies on chrome - not working.
// 06/20/2011	remove the title and add it to the Cassette table - screen space
//			fixed cookies on chrome - see shiftCookies.js for debug info: 
//				added cookie name
//				added expire date (30 days)
//				added path
//				added screen resolution
//				added unique ID
//			fixed reading crank from html, probably brokein on 6/13
// 06/21/2011	cookie work on chrome with only name and path, remove rest
//			checked with FF4, Chrome, and IE7 - OK
// 06/23/2011	test cookies on FF5 - OK
// 07/01/2011	released
//
// ------------------------------------------------------------------
// ------------------------------------------------------------------
// bugs:
// - clean up updateOutput() vs in cookies
// - bug? - lines in all tables is reverse order between graphical and ascii versions -all tables
// - auto fit rpm/speed range table - graph over runs table a bit before it re-scales
//   	OR looks like the graph is not scaled correctly
// - provide warning about really large or small values entered by user
//
// todo:
// - what is wheel # 24?
// - some tooltips would be good
// - sliders for sprocket values
//   http://sixrevisions.com/tutorials/javascript_tutorial/create_lightweight_javascript_tooltip/
// - add all SRAM X5 cassettes - can't find the data
// - change cookie to match format of the url data? - use same parser
// - auto fit rpm/speed range table moving starting point also < lowest speed
// - scaling error if leftedge is not 0 on rpm/speed range table - speed and grid don't match
// - 3 or more saved configurations
// - allow save/load to disk 
// - a help screen
//
// RFC:
// - add option to sort all 3 chainrings - Charles Bouldin <charlesbouldin@verizon.net>
// - add 4 chain ring support - 24-26-48-60 chain rings (actually, 12-18-24-30 with a 1:2 drive
//   train ration) - Rick Tompkins <rick@tigglesworth.com> 
//   This requires rewrite of ALL table drawing functions, the rest is easy.
//   This may also require larger space allotment on the screen for each table.  May be a problem.
//   Perhaps I could find a better way to allocate screen space.
//
// todo later:
// - generic function for drawing the graphical tables
// - protection against swap without a saved cookie - 3/2011 - what did I mean?  Looks like I did this.
// - hta version - will cookies work? - only works on microsoft OS's
// - cleanup the code - messy, unused vars
// - shift pattern chart - sort of covered by the speed chart w sort
// - variable width on the log graph - wider & narrower (or all tables?)
// - version for portable devices (same as var width?)
//   could read window width from browser and scale from that.
//


// array of cogs we are using
cogs = new Array();

// array for our chainrings
rings = new Array();

// log graph width limits
var p1 = 81;
var p2 = 80;
var w2 = 800;

var pageTitle = "";

var cookieString;
var defaultCookie="106XxX4XxX5XxX170XxX10XxX8XxX8XxX2XxX46XxX50XxX999XxX14XxX16XxX18XxX20XxX22XxX999XxX999XxX999XxX999XxX999XxX999XxXCoppiXxX90XxX0XxX80XxX90XxXshowXxXnoXxX"

// default values
var cassetteSelection = 101;   // campy 12-25 10 speed
var cassetteOption;			 // index of selected cassette
var numCogs = 10;              // 10 speed
var crank = 170;               // default crank length
var crankOption;			 // index of selected crank
var wheelIndex = 8;            // defalut wheel size 
var wheelOption;               // which wheel option
var rolloutType = 1;           // 0=english, 1=metric
var speedType = 0;             // 0=mph, 1=kph
var RPM = 90;                  // crank speed
var speedRangeType = 0;        // 0=mph, 1=kph - for rpm/speed range display
var lRPM = 80;                 // crank speed - for rpm/speed range display
var hRPM = 100;                 // crank speed - for rpm/speed range display
var showgrid = "show";
var sortgears = "no";
var numRings = 3;
rings[0]=24;
rings[1]=36;
rings[2]=46;
cogs[0] = 12;                  // the default cogs - my Mariposa camp 10sp
cogs[1] = 13;
cogs[2] = 14;
cogs[3] = 15;
cogs[4] = 16;
cogs[5] = 17;
cogs[6] = 19;
cogs[7] = 21;
cogs[8] = 23;
cogs[9] = 25;
cogs[10] = 999;
var highlightON = 1;
highlightGear = 99;

// colors
var red ="#FF0000";
var black ="#000000";
var orange ="#FF7700";
var blue = "#0055ff";
var textcolor = "#000099";
var greytext = "#888888";	// number the cogs on the gear inch table.
var highlight = "#FF00FF";
var highlight2 = "#FFFF4D";	//"#FFCC00";

var gFrontCapacity = 0;
var gRearCapacity = 0;

var displayType = 1;		// 1=graphical, 0=ASCII display

var readBookmark = 0;
var url;

function initGears()
{
	// add cookie check here
	processArgs();
	updateOutput();
	if (readBookmark == 1) //if there are any arguments - a SLOPPY to decide if we should pop up the message
	{
		if ((window.sidebar) || (window.chrome)) // Firefox || chrome
		{
			alert('The current gear set has been added to the URL.\nPress ctrl+D to bookmark (Command+D for macs) after you click Ok');
		} 
	}
}

// program defaults - all displays on - not used yet
var displayGear = 1;
var displayLogs = 0;
var displayLogsG = 1;
var displaySheldon = 1;
var displayPat = 1;

// calculated values
gear = new Array();
value = new Array();
ring = new Array();
ratio = new Array();
rollout = new Array();
speed = new Array();
lspeed = new Array();
hspeed = new Array();
// printable values
Pvalue = new Array();
Pratio = new Array();
Prollout = new Array();
Pspeed = new Array();
Plspeed = new Array();
Phspeed = new Array();

function updateOutput()
{
   writeRings();
   writeCogs();
   writeCrank();
   writeWheel();
   calcGears();
   updateCapacity();
   writeCheckboxes();
   clearTables();
   if (displayType == 1)	// Graphical tables
   {
		gearChartG();
		semiLogG();
		speedRangeTableG();
		speedTableG();
		sheldonRatiosG();
		rolloutTableG();
   }
   else
   {					// ASCII tables
		gearChart(); 
		semiLog();
		speedRangeTableG();		// New output, not doing ASCII version
		speedTable();
		sheldonRatios();
		rolloutTable();
   }
	writeTitle();	// added 11/23/2010
	writeURL();		// added 6/13/2011
   
//debug
//document.mainForm.debugarea.value=cogs[0]+" "+cogs[1]+" "+cogs[2]+" "+cogs[3]+" "+cogs[4]+" "+cogs[5]+" "+cogs[6]+" "+cogs[7]+" "+cogs[8]+" "+cogs[9]+"\n"+rings[0]+" "+rings[1]+" "+rings[2]+"\ncassette = "+ cassetteSelection +"\nwheel = "+ wheelIndex +"\ncrank = "+crank+ "\nrollout 0 = "+ rollout[0] +"  "+rolloutType;
//document.mainForm.debugarea.value=wheelOption;
}


function compareNum(a,b)
{
   return a-b
}

function calcGears()
{
	with(Math)
	wheelName = wheel[wheelIndex];
	wheelSize = diameter[wheelIndex];
	radiusRatio = radius[wheelIndex] / crank;
	for (j=0; j<numRings; j++){
		for( i=0; i<numCogs; i++){
			gear[(j*numCogs)+i] = (rings[j]/cogs[i]) * numCogs -i;
			// inchgears
			value[(j*numCogs)+i] = (rings[j] / cogs[i]) * wheelSize;
			ring[(j*numCogs)+i] = rings[j];
			// Sheldon's ratios
			ratio[(j*numCogs)+i] = radiusRatio * rings[j] / cogs[i];
			// rollout
			rollout[(j*numCogs)+i] = value[(j*numCogs)+i] * Math.PI;
			// speed
			speed[(j*numCogs)+i] = (((rollout[(j*numCogs)+i] * RPM) * 60)/12)/5280;
			lspeed[(j*numCogs)+i] = (((rollout[(j*numCogs)+i] * lRPM) * 60)/12)/5280;
			hspeed[(j*numCogs)+i] = (((rollout[(j*numCogs)+i] * hRPM) * 60)/12)/5280;
		}
    }
	// printable values
	for (i=0; i<numRings * numCogs; i++) {
		Pvalue[i] = Math.round(value[i] * 10) / 10;
		Pratio[i] = Math.round(ratio[i] * 100) / 100;
		// no values over 10, trailing zeros added in print functions
		//if (Math.round(Pratio[i] * 10) == Pratio[i] * 10){  
		//	Pratio[i] = Pratio[i] + "0";
		//}
		Prollout[i] = Math.round(rollout[i] * 10) / 10;
		//if (Math.round(Prollout[i] * 10) == Prollout[i] * 10){
		//  Prollout[i] = Prollout[i] + "0";
		//}
		Pspeed[i] = Math.round(speed[i] * 10) / 10;
		Plspeed[i] = Math.round(lspeed[i] * 10) / 10;
		Phspeed[i] = Math.round(hspeed[i] * 10) / 10;
	}
}

function RPMrangeCheck()
{
	if (hRPM <= lRPM)
	{
		hRPM = lRPM + 5;
	}
	updateOutput();
}


// read arguments attched to our URL

// ----===== test URLs =====----
// --------------------- normal
// file:///C:/mine/My Dropbox/www/shift4.2.html?R0=30&R1=40&R2=50&C0=13&C1=15&C2=18&C3=21&C4=25&C5=30&C6=999&C7=999&C8=999&C9=999&C10=999&WI=8&CR=180&RT=0&ST=1&RPM=90&lRPM=80&hRMP=100&G=0&S=1&TITLE=Loaded%20from%20URL
// --------------------- subset
// file:///C:/mine/My Dropbox/www/shift4.2.html?R0=30&R1=40&R2=50&C0=13&C1=15&C2=18&C3=21&C4=25&C5=30&C6=999&C7=999&C8=999&C9=999&C10=999&CR=180&TITLE=Loaded%20from%20URL%20-%20subset
// --------------------- subset & missing cogs
// file:///C:/mine/My Dropbox/www/shift4.2.html?R1=40&R2=50&C0=13&C1=15&C2=18&C3=21&C4=25&C6=30&CR=180&TITLE=Loaded%20from%20URL%20-%20subset%20&%20missing%20cogs
// --------------------- subset & bad order values
// file:///C:/mine/My Dropbox/www/shift4.2.html?R1=50&R2=40&C0=30&C1=15&C2=18&C3=21&C4=25&C6=13&CR=180&TITLE=Loaded%20from%20URL%20-%20subset%20&%20bad%20order%20values
// --------------------- cogs is wrong order
// file:///C:/mine/My Dropbox/www/shift4.2.html?R0=30&R1=40&R2=50&C0=13&C1=15&C3=21&C4=25&C5=30&C6=999&C7=999&C8=999&C2=18&C9=999&C10=999&WI=8&CR=180&RT=0&ST=1&RPM=90&lRPM=80&hRMP=100&G=0&S=1&TITLE=Loaded%20from%20URL%20-%20out%20of%20order
// --------------------- lots of errors
// file:///C:/mine/My Dropbox/www/shift4.2.html?R1=40&R2=50&C=-32&C1=15&C2=18&C3=21&C4=25&C5=30&C8=30&WI=8&CR=250&RT=2&ST=1&RPM=900&lRPM=80&hRMP=200&G=0&S=1&TITLE=Loaded%20from%20URL%20with%20errors

function processArgs()		// read arguments attched to our URL
{
	var query = window.location.search.substring(1);
	var parms = query.split('&');
	if (parms.length > 1) //if there are any arguments
	{
		// clear all sprockets
		rings[0] = 999;
		rings[1] = 999;
		rings[2] = 999;
		cogs[0] = 999;
		cogs[1] = 999;
		cogs[2] = 999;
		cogs[3] = 999;
		cogs[4] = 999;
		cogs[5] = 999;
		cogs[6] = 999;
		cogs[7] = 999;
		cogs[8] = 999;
		cogs[9] = 999;
		cogs[10] = 999;
		// then go through the list of arguments and load them
		for (var i=0; i<parms.length; i++) 
		{
			var pos = parms[i].indexOf('=');
			if (pos > 0) // if there are arguments
			{
				var key = parms[i].substring(0,pos);
				var val = parms[i].substring(pos+1);
				cassetteSelection = 0; // by default, make the cassette blank
				switch (key)
				{
					case "R0":		// chain rings
						rings[0] = parseInt(val);
						break;
					case "R1":
						rings[1] = parseInt(val);
						break;
					case "R2":
						rings[2] = parseInt(val);
						break;
					case "C0":		// cogs
						cogs[0] = parseInt(val);
						break;
					case "C1":
						cogs[1] = parseInt(val);
						break;
					case "C2":
						cogs[2] = parseInt(val);
						break;
					case "C3":
						cogs[3] = parseInt(val);
						break;
					case "C4":
						cogs[4] = parseInt(val);
						break;
					case "C5":
						cogs[5] = parseInt(val);
						break;
					case "C6":
						cogs[6] = parseInt(val);
						break;
					case "C7":
						cogs[7] = parseInt(val);
						break;
					case "C8":
						cogs[8] = parseInt(val);
						break;
					case "C9":
						cogs[9] = parseInt(val);
						break;
					case "C10":
						cogs[10] = parseInt(val);
						break;
					case "CAS":		// index of the selected cassette
						cassetteSelection = parseInt(val);
						break;
					case "WI":		// index into wheel size table
						wheelIndex = parseInt(val);
						break;
					case "CR":		// crank length
						crank = parseInt(val);
						break;
					case "RT":		// type of rollout table
						rolloutType = parseInt(val);
						break;
					case "ST":		// speed table speed type
						speedType = parseInt(val);
						break;
					case "RPM":		// speed table RPM
						RPM = parseInt(val);
						break;
					case "SRT":		// speed type on speed graph
						speedRangeType = parseInt(val);
						break;
					case "lRPM":	// speed graph, lower speed
						lRPM = parseInt(val);
						break;
					case "hRMP":	// speed graph, upper speed
						hRPM = parseInt(val);
						break;
					case "G":		// grid lines on speed graph
						showgrid = val;
						break;
					case "S":		// sort the speed graph
						sortgears = val;
						break;
					case "TITLE":	// set title
						while (val.indexOf("%20", 0) > 0)
						{
							val = val.replace("%20", " ");
						}
						document.title = "Mike Sherman's Gear Calculator - " + val;
						pageTitle = val;
						break;
				}
			}
		}
		readBookmark = 1; //if there are any arguments - a SLOPPY to decide if we should pop up the message
	}
}
