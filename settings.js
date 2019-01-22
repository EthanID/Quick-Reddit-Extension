var favSubs = [];
var shortcuts = [];
var userShortcuts = [];

function displaySettings() {
	chrome.storage.sync.get("keepSubs", function(localKeepSubs) {
		chrome.storage.sync.get("suggestNSFW", function(localSuggestNSFW) {
			chrome.storage.sync.get("showNSFW", function(localShowNSFW) {
				chrome.storage.sync.get("user", function(localUser) {
					var keepSubs = localKeepSubs.keepSubs;
					var suggestNSFW = localSuggestNSFW.suggestNSFW;
					var showNSFW = localShowNSFW.showNSFW;
					var user = localUser.user;
					
					$("#keephistory").prop("checked", keepSubs);
					$("#nsfwsuggest").prop("checked", suggestNSFW);
					$("#nsfwshow").prop("checked", showNSFW);
					$("#user").val(user);
					
					displayFavSubs();
				});
			});
		});
	});
}

function displayFavSubs() {
	$("#favsubslist").html("");
	
	for(var favSubNum in favSubs) {
		$("#favsubslist").append("<span>" + favSubs[favSubNum] + " <button class='favsubsdel' id='favsubsdel" + favSubNum + "'>-</button></span><br>");
	}
}


$("#favsubsadd").click(function() {
	var favSub = $("#favsub").val();
	
	favSubs.push(favSub);
	
	displayFavSubs();
});

$("#favsubslist").on("click", ".favsubdel", function() {
	// delete this element and remove from global array
})


function displayShortcuts() {
	$("#favsubslist").html("");
	
	for(var favSubNum in favSubs) {
		$("#favsubslist").append(favSubs[favSubNum] + " <button class='favsubsdel' id='favsubsdel" + favSubNum + "'>-</button><br>");
	}
}


$("#shortcutadd").click(function() {
	var favSub = $("#favsub").val();
	
	favSubs.push(favSub);
	
	displayFavSubs();
});

$(".shortcutdel").click(function() {
	// delete this element and remove from global array
	$(this).parent().remove();
})


$("#clearhistory").click(function() {
	chrome.storage.sync.set({"recentSubs": []}, function () {});
});

$("#save").click(function() {
	var keepSubs = $("#keephistory").prop("checked");
	var suggestNSFW = $("#nsfwsuggest").prop("checked");
	var showNSFW = $("#nsfwshow").prop("checked");
	var user = $("#user").val();
	
	chrome.storage.sync.set({"keepSubs": keepSubs}, function() {});
	chrome.storage.sync.set({"suggestNSFW": suggestNSFW}, function() {});
	chrome.storage.sync.set({"showNSFW": showNSFW}, function() {});
	chrome.storage.sync.set({"user": user}, function() {});

	chrome.storage.sync.set({"favSubs": favSubs}, function() {});
	chrome.storage.sync.set({"shortcuts": shortcuts}, function() {});
	chrome.storage.sync.set({"userShortcuts": userShortcuts}, function() {});
	
	displaySettings();
});

displaySettings();