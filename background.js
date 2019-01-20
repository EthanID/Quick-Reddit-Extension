chrome.storage.sync.set({"recentSubs": []}, function() {}); // instantiate cloud-stored objects
chrome.storage.sync.set({"favSubs": ["mechanicalkeyboards", "mechmarket", "askreddit", "nsfw", "nsfw_gifs"]}, function() {});
chrome.storage.sync.set({"shortcuts": {"s": "/saved", "saved": "/saved", "c": "/comments", "comments": "/comments", "su": "/submitted", "g": "/gilded", "gilded": "/gilded", "u": "/upvoted", "d": "/downvoted"}}, function() {});
chrome.storage.sync.set({"userShortcuts": {"s": "/saved", "saved": "/saved", "c": "/comments", "comments": "/comments", "su": "/submitted", "g": "/gilded", "gilded": "/gilded", "u": "/upvoted", "d": "/downvoted"}}, function() {});
chrome.storage.sync.set({"user": "shittymorphbrother"}, function() {});
var showNSFW = false;

var subsNSFW = [];
if(!showNSFW) { // load nsfw subs file if needed
	fetch("nsfw_subs.json")
			.then(response => response.json())
			.then(jsonResponse => subsNSFW = jsonResponse)
}

function checkSFW(sub) {
	return !subsNSFW.includes(sub);
}

chrome.omnibox.onInputEntered.addListener( // go to sub when entered
	(sub) => {
		
		chrome.storage.sync.get("recentSubs", function(localRecentSubs) {
			chrome.storage.sync.get("shortcuts", function(localShortcuts) {
				chrome.storage.sync.get("user", function(localUser) {
					chrome.storage.sync.get("keepSubs", function(localKeepSubs) {
						
						var shortcuts = localShortcuts.shortcuts;
						var user = localUser.user;
						var keepSubs = localKeepSubs.keepSubs// || true;
						
						if(shortcuts[sub] !== undefined) { // "sub" is a shortcut
							if(user !== "" || user !== undefined) {
								chrome.tabs.update({"url": "https://www.reddit.com/user/" + user + shortcuts[sub]});
							}
							else {
								// throw no-user error
							}
						}
						else {
							if(checkSFW(sub) || showNSFW) {
								chrome.tabs.update({"url": "https://www.reddit.com/r/" + sub});
								if(keepSubs) {
									var arrayRecentSub = localRecentSubs.recentSubs
									arrayRecentSub.push(sub);
									chrome.storage.sync.set({"recentSubs": arrayRecentSub});
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

chrome.omnibox.onInputChanged.addListener( // generate and display suggestions
  (userSearch, suggestions) => {

	  chrome.storage.sync.get("recentSubs", function(localRecentSubs) {
		  chrome.storage.sync.get("favSubs", function(localFavSubs) {
			  
			  var subs = localRecentSubs.recentSubs.concat(localFavSubs.favSubs);
			  var suggestedSubs = [];

			  for(var sub of subs) {
				  var isMatch = true;
				  
				  for(var letterNum in userSearch) {
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

			  suggestions(suggestedSubs);
		  });
	  });

	});