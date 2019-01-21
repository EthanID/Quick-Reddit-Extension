function displaySettings() {
	chrome.storage.sync.get("keepSubs", function(localKeepSubs) {
		chrome.storage.sync.get("suggestNSFW", function(localSuggestNSFW) {
			chrome.storage.sync.get("showNSFW", function(localShowNSFW) {
				chrome.storage.sync.get("user", function(localUser) {
					var keepSubs = localKeepSubs.keepSubs;
					var suggestNSFW = localSuggestNSFW.suggestNSFW;
					var showNSFW = localShowNSFW.showNSFW;
					var user = localUser.user;

					$("#keepHistory").prop("checked", keepSubs);
					$("#nsfwsuggest").prop("checked", suggestNSFW);
					$("#nsfwshow").prop("checked", showNSFW);
					$("#user").val(user);
					// call display subs and display shortcuts
				});
			});
		});
	});
}

$("#clearhistory").click(function() {
	chrome.storage.sync.set({"recentSubs": []}, function () {});
})

$("#save").click(function() {
	var keepSubs = $("#keephistory").prop("checked");
	var suggestNSFW = $("#nsfwsuggest").prop("checked");
	var showNSFW = $("#nsfwshow").prop("checked");
	var user = $("#user").val();
	
	chrome.storage.sync.set({"keepSubs": keepSubs}, function() {});
	chrome.storage.sync.set({"suggestNSFW": suggestNSFW}, function() {});
	chrome.storage.sync.set({"showNSFW": showNSFW}, function() {});
	chrome.storage.sync.set({"user": user}, function() {});
});

displaySettings();