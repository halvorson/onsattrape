

// $("#dump-div").append("<h1>" + "Hello World" + "</h1>");

var config = {
	apiKey: "AIzaSyDp8OOm78pBLJEKkE6r4JKBg_MPzqhiCVQ",
	authDomain: "onsattrape.firebaseapp.com",
	databaseURL: "https://onsattrape.firebaseio.com",
	projectId: "onsattrape",
	storageBucket: "onsattrape.appspot.com",
	messagingSenderId: "1094671185695"
};
firebase.initializeApp(config);

var uid = "-KmUZTaohwghpuagw";



var database = firebase.database();

var contactsRef = database.ref('users/'+uid+'/contacts');

contactsRef.on("child_added", function(snapshot) {

	var selectionReason = selectionLogic(snapshot.val())
	if (selectionReason>0) {



		//console.log(snapshot.val().name);
		var mainDiv = $("<div>");
		mainDiv.addClass("col-md-4");
		mainDiv.addClass("mainDiv");

		var divPanel = $("<div>");
		divPanel.addClass("panel panel-info contact-panel");
		divPanel.data("key",snapshot.key);

		var panelHeading = $("<div>");
		panelHeading.addClass("panel-heading clearfix");

		if (selectionReason === 1) {
			var panelTitle = $("<div>").addClass('panelTitle pull-left').text(snapshot.val().name).append('&nbsp&nbsp<i class="fa fa-birthday-cake birthday" aria-hidden="true"></i>');
		} else {
			var panelTitle = $("<div>").addClass('panelTitle pull-left').text(snapshot.val().name);
		}

		var panelHeadingIcons = $("<div>").addClass('pull-right');		

		// var imageHolder = $("<img>");
		// imageHolder.attr("src", "#");
		// panelHeading.append(imageHolder);

		

		$("#dump-div").append(mainDiv);


		var panelBody = $("<div>");
		panelBody.addClass("panel-body hidden-sm hidden-xs");

		var notes = $("<p>");
		notes.attr("id", "notesParagraph");
		notes.append("<h4>" + " Last time talked about: " + snapshot.val().lastTalked + "</h4>");

		if (snapshot.val().birthday !== null && snapshot.val().birthday !== "") {
			notes.append("<h5>" + " Birthday is on: " + snapshot.val().birthday + "</h5>");
		}

		if (snapshot.val().city !== null && snapshot.val().city !== "") {
			notes.append("<h6>" + " Located currently in: " + snapshot.val().city + "</h6>");
		}

		panelBody.append(notes);

		var check = $("<a>");
		check.addClass("checkMark btn btn-primary panelButton");
		var icheck = $("<i>");
		icheck.addClass("fa fa-check");
		icheck.attr("aria-hidden", "true");
		check.append(icheck);

		if (snapshot.val().telephone !== null && snapshot.val().telephone !== "") {
			var phone = $("<a>");
			phone.attr("href", "tel:" + snapshot.val().telephone);
			phone.attr("id", "phoneLine");
			phone.addClass("btn btn-primary panelButton");
			var iphone = $("<i>");
			iphone.addClass("fa fa-phone");
			iphone.attr("aria-hidden", "true");
			phone.append(iphone);
			panelHeadingIcons.append(phone);
		} else {
			var phone = $("<a>");
			phone.attr("href", "tel:" + snapshot.val().telephone);
			phone.attr("id", "phoneLine");
			phone.attr('disabled',true);
			phone.addClass("btn btn-primary panelButton");
			var iphone = $("<i>");
			iphone.addClass("fa fa-phone");
			iphone.attr("aria-hidden", "true");
			phone.append(iphone);
			panelHeadingIcons.append(phone);
		}

		if (snapshot.val().email !== null && snapshot.val().email !== "") {

			var email = $("<a>");
			email.attr("href", "mailto:" + snapshot.val().email);
			email.addClass("btn btn-primary panelButton hidden-md hidden-lg");
			var iemail = $("<i>");
			iemail.addClass("fa fa-envelope-o");
			iemail.attr("aria-hidden", "true");
			email.append(iemail);

			var gmail = $("<a>");
			gmail.attr("href", "https://mail.google.com/mail/?view=cm&fs=1&to=" + snapshot.val().email);
			gmail.attr("target", "_blank");
			gmail.attr("id", "gmailID");
			gmail.addClass("btn btn-primary panelButton hidden-sm hidden-xs");
			var igemail = $("<i>");
			igemail.addClass("fa fa-envelope-o");
			igemail.attr("aria-hidden", "true");
			//igemail.text("g");
			gmail.append(igemail);

			panelHeadingIcons.append(email);
			panelHeadingIcons.append(gmail);

		} else {
			var email = $("<a>");
			email.attr("href", "mailto:" + snapshot.val().email);
			email.addClass("btn btn-primary panelButton hidden-md hidden-lg");
			var iemail = $("<i>");
			iemail.addClass("fa fa-envelope-o");
			iemail.attr("aria-hidden", "true");
			email.attr('disabled', true);
			email.append(iemail);

			var gmail = $("<a>");
			gmail.attr("href", "https://mail.google.com/mail/?view=cm&fs=1&to=" + snapshot.val().email);
			gmail.attr("target", "_blank");
			gmail.attr("id", "gmailID");
			gmail.addClass("btn btn-primary panelButton hidden-sm hidden-xs");
			var igemail = $("<i>");
			igemail.addClass("fa fa-envelope-o");
			igemail.attr("aria-hidden", "true");
			gmail.attr('disabled', true);
			//igemail.text("g");
			gmail.append(igemail);

			panelHeadingIcons.append(email);
			panelHeadingIcons.append(gmail);
		}


// trying to display add notes and view notes buttons when screen is iphone size
		var viewNotesPhone = $("<a>");
		//check.attr("href", "#");
		viewNotesPhone.addClass("checkMark btn btn-info");
		viewNotesPhone.addClass("btn btn-primary panelButton hidden-md hidden-lg viewNotesSmall");
		viewNotesPhone.append('<i class="fa fa-eye" aria-hidden="true"></i>');
		var iNotesPhone = $("<i>");
		iNotesPhone.addClass("fa");
		//iNotes.addClass("fa-check");
		iNotesPhone.attr("aria-hidden", "true");
		iNotesPhone.text("View Notes");
		viewNotesPhone.append(iNotes);

		panelHeadingIcons.append(viewNotesPhone);


		var addNotesPhone = $("<a>");
		//check.attr("href", "#");
		addNotesPhone.addClass("checkMark btn btn-info addNotesSmall");
		addNotesPhone.addClass("btn btn-primary panelButton hidden-md hidden-lg addNotesSmall");
		addNotesPhone.append('<i class="fa fa-pencil-square-o" aria-hidden="true"></i>');
		var iaddNotesPhone = $("<i>");
		iaddNotesPhone.addClass("fa");
		//iNotes.addClass("fa-check");
		iaddNotesPhone.attr("aria-hidden", "true");
		iaddNotesPhone.text("Add Notes");
		addNotesPhone.append(iaddNotes);

		panelHeadingIcons.append(addNotesPhone);
//-------------------------------------------------------- MIKE CHECK THIS IF OKEY -----------------




		panelHeadingIcons.append(check);


		var viewNotes = $("<a>");
		//check.attr("href", "#");
		viewNotes.addClass("checkMark btn btn-info viewNotes");
		var iNotes = $("<i>");
		iNotes.addClass("fa");
		//iNotes.addClass("fa-check");
		iNotes.attr("aria-hidden", "true");
		iNotes.text("View Notes");
		viewNotes.append(iNotes);

		panelBody.append(viewNotes);


		var addNotes = $("<a>");
		//check.attr("href", "#");
		addNotes.addClass("checkMark btn btn-primary addNotes");
		var iaddNotes = $("<i>");
		iaddNotes.addClass("fa");
		//iNotes.addClass("fa-check");
		iaddNotes.attr("aria-hidden", "true");
		iaddNotes.text("Add Notes");
		addNotes.append(iaddNotes);

		panelBody.append(addNotes);




		panelHeading.append(panelTitle);
		panelHeading.append(panelHeadingIcons);

		divPanel.append(panelHeading);

		divPanel.append(panelBody);

		mainDiv.append(divPanel);

		$("#dump-div").append(mainDiv);
	}


});

var now;
var myrng;
var myrngInt;
var todayStr;
var minThreshold;
var maxThreshold;
var todayStrNoYear;

function setUpLogic() {
	//Gets today's date
	now = moment();
	todayStr = now.format('YYYY-MM-DD');
	todayStrNoYear = now.format('MM/DD');
	//Sets random number based on date
	myrng = new Math.seedrandom(todayStr);
	myrngInt = Math.floor(myrng()*1000000+1);
	//Grabs constants/user settings for minThreshold and maxThreshold
	var infoRef = database.ref('users/'+uid+'/info');
	minThreshold = 0.25;
	maxThreshold = 2;
	infoRef.on("value", function(snap) {
		if (snap.val() !== null && (snap.val().minThreshold < 0.5 && snap.val().minThreshold >= 0)) {
			minThreshold = snap.val().minThreshold;
		}
		if (snap.val() !== null && snap.val().maxThreshold >= 1.5) {
			maxThreshold = snap.val().maxThreshold;
		}
	});
}

setUpLogic();

function selectionLogic(snapValues) {
	var convertedBday = moment(snapValues.birthday).format("MM/DD");


    // console.log(convertedBday);
    // console.log(todayStrNoYear);
    if (convertedBday === todayStrNoYear) {
    	console.log('BIRTHDAY!!');
    	return 1;
    }

    var lastTalkedNumberDays; 

    lastTalkedNumberDays = moment(todayStr, "YYYY-MM-DD").diff(moment(snapValues.lastTalked, "YYYY-MM-DD"), 'days');
    // console.log(lastTalkedNumberDays);

    var queryURL = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + snapValues.city + 
    "&destinations=" + 'San+Francisco' + "&key=AIzaSyBa98pCggkp_lKy9w2FkWXJTWoDIJNoI9c";

	// $.ajax({
	// 	url: queryURL, 
	// 	method: "GET",
	// 	dataType: 'JSON',
	// 	crossOrigin: true,
	// }).done(function(response) {
	// 	console.log(response); 
	// 	//return 1;
	// 	//use Google Maps Distance Matrix API above to figure out distance in km between Contact and User City
	// 	// if (snapValues.city.milesFromContactCity <= 42) {
	// 	// 	return 2;
	// 	// }
	// });

	// console.log("my rand int " + myrngInt);
	// console.log("snap days " + snapValues.days);
	// console.log("snap plus int " + (snapValues.offset + myrngInt));
	// console.log(lastTalkedNumberDays > minThreshold * snapValues.days);
	// console.log(lastTalkedNumberDays);
	// console.log(Number(minThreshold * snapValues.days));
	// console.log(minThreshold);
	if ((myrngInt + snapValues.offset) % snapValues.days === 0 && (isNaN(lastTalkedNumberDays) || lastTalkedNumberDays > minThreshold * snapValues.days)) {
		console.log("random Function working");
		return 3;
	}

	if (lastTalkedNumberDays > maxThreshold * snapValues.days) {
		return 2; 
	}

	//return 1;

	// for(var item in birthdayContactsGroup1) {
	// 			var contactsByBirthday = $("<div>" + birthdayContactsGroup1[item] + "</div>");
	// 			$("#dump-div").append(contactsByBirthday);
	// 		};
	// This is where the magic happens; this function should return why someone was selected (birthday = 1, location = 2, random = 3)
}




// var randNum = random number from date
// //This should be the same every time it's run on a specific date, in case we need to recreate it. It should be the same across all our users as well

// //loop (in Bob's code): 
// for each contact {
// 	if (checkEligibility(contact) {
// 		populate page
// 	}
// }

// $(document).ready(function() {


// function checkEligibility (contact) {

// 	   var birthday = 0;
//        var location = 0;
//        var offset = 0;
//        var frequency = $("#frequency");
//        var randNum = Math.floor(Math.random() * 1000000);
//        var contacts_to_daily = [];
//        for (var i=0; i<4; i++) {
//         contacts_to_daily.push();
//        }
// 	//Bday check
// 	if (contact.bday === today) {
// 		return 1;
// 	}

//        } 
// 	return false;
// }

// $(document).on("click", ".viewNotes", createNewModal);

$(document).on("click",".checkMark", removeDiv);

function removeDiv() {

	var key = $(this).parent().parent().parent().data('key');

	//console.log("something");
	$(this).parent().parent().parent().parent().remove();
	// 	$("#dump-div").empty();
	addNote(key);
	mostRecentContact(key);
	//createNewModal();
	
}

function addNote(key) {
	console.log(key.notes);
	contactsRef.child(key).child('notes').push({
		date: '2017-06-14'
	})
}

function mostRecentContact(key) {
	contactsRef.child(key).update({
		lastTalked: todayStr
	})
}



function createNewModal() {
}





// // Get the modal
// var modal = document.getElementById('#myModal');

// // Get the button that opens the modal
// var btn = $(".viewNotes");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// //modal.addNotesCSS.display = "block";

// // When the user clicks on the button, open the modal 
// $(document).on("click", ".viewNotes", function() {
//     modal.addNotesCSS.display = "block";
// });

// //When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//     modal.addNotesCSS.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.addNotesCSS.display = "none";
//     }
// }
