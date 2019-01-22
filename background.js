chrome.runtime.onInstalled.addListener(function() {
	chrome.storage.sync.set({"recentSubs": []}, function() {}); // instantiate cloud-stored objects at defaults
	chrome.storage.sync.set({"favSubs": []}, function() {});
	chrome.storage.sync.set({"shortcuts": {}}, function() {});
	chrome.storage.sync.set({"userShortcuts": {"s": "/saved", "saved": "/saved", "c": "/comments", "comments": "/comments", "su": "/submitted", "g": "/gilded", "gilded": "/gilded", "u": "/upvoted", "d": "/downvoted"}}, function() {});
	chrome.storage.sync.set({"keepSubs": true}, function() {});
	chrome.storage.sync.set({"suggestNSFW": true}, function() {});
	chrome.storage.sync.set({"showNSFW": true}, function() {});
	chrome.storage.sync.set({"user": "bigman"}, function() {});
});

var subsNSFW = [];
chrome.storage.sync.get("showNSFW", function(localShowNSFW) { // load nsfw file
	fetch("nsfw_subs.json")
			.then(response => response.json())
			.then(jsonResponse => subsNSFW = jsonResponse)
});

function checkSFW(sub) {
	return !subsNSFW.includes(sub);
}

chrome.omnibox.onInputEntered.addListener( // go to sub when entered
	(sub) => {
		
		chrome.storage.sync.get("recentSubs", function(localRecentSubs) {
			chrome.storage.sync.get("userShortcuts", function(localUserShortcuts) {
				chrome.storage.sync.get("shortcuts", function(localShortcuts) {
					chrome.storage.sync.get("user", function(localUser) {
						chrome.storage.sync.get("keepSubs", function(localKeepSubs) {
							chrome.storage.sync.get("showNSFW", function(localShowNSFW) {

								var userShortcuts = localUserShortcuts.userShortcuts;
								var shortcuts = localShortcuts.shortcuts;
								var user = localUser.user;
								var keepSubs = localKeepSubs.keepSubs;
								var showNSFW = localShowNSFW.showNSFW;
								var search = ""

								if(sub.split(" ").length > 1) {
									search = sub.split(" ").slice(1).toString().replace(",", " ");
									console.log(search);
									sub = sub.split(" ")[0];
								}


								if(shortcuts[sub] !== undefined) { // "sub" is shortcut
									chrome.tabs.update({"url": "https://www.reddit.com/user/" + shortcuts[sub]});
								}
								else if(userShortcuts[sub] !== undefined) { // "sub" is user shortcut
									if(user !== "" && user !== undefined) {
										chrome.tabs.update({"url": "https://www.reddit.com/user/" + user + userShortcuts[sub]});
									}
									else {
										alert("No username found in your options. Please add a username in your options to use user shortcuts.");
									}
								}
								else { // "sub" is a sub
									if(checkSFW(sub) || showNSFW || showNSFW === undefined) {
										if(sub !== "") {
											if(search === "") {
												chrome.tabs.update({"url": "https://www.reddit.com/r/" + sub});
											}
											else {
												chrome.tabs.update({"url": "https://www.reddit.com/r/" + sub + "/search?q=" + search.replace(" ", "+") + "&restrict_sr=on&include_over_18=on&sort=relevance&t=all"});
											}
											if(keepSubs) {
												var arrayRecentSub = localRecentSubs.recentSubs
												arrayRecentSub.push(sub);
												chrome.storage.sync.set({"recentSubs": arrayRecentSub});
											}
										}
										else {
											chrome.tabs.update({"url": "https://www.reddit.com"});
										}
									}
									else {
										chrome.tabs.update({"url": "nsfw_page.html"});
									}
								}
							});
						});
					});
				});
			});
		});
		
});

chrome.omnibox.onInputChanged.addListener( // generate and display suggestions
  (userSearch, suggestions) => {

	  chrome.storage.sync.get("recentSubs", function(localRecentSubs) {
		  chrome.storage.sync.get("favSubs", function(localFavSubs) {
			  chrome.storage.sync.get("suggestNSFW", function(localSuggestNSFW) {

				  var subs = localRecentSubs.recentSubs.concat(localFavSubs.favSubs);
				  var suggestedSubs = [];
				  var suggestNSFW = localSuggestNSFW.suggestNSFW;

				  for(var sub of subs) {
					  if(suggestNSFW || suggestNSFW === undefined || checkSFW(sub)) {
						  var isMatch = true;

						  for(var letterNum in userSearch) { // runs to end of userSearch to check for matches with sub
							  if(userSearch[letterNum] !== sub[letterNum]) {
								  isMatch = false;
							  }
						  }

						  if(isMatch) {
							  var subObject = new Object();
							  subObject.content = sub;
							  subObject.description = sub;
							  suggestedSubs.push(subObject);
						  }
					  }
				  }

				  suggestions(suggestedSubs);
			  });
		  });
	  });

	});