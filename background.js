chrome.storage.sync.set({"recentSubs": []}, function() {}); // instantiate cloud-stored objects
chrome.storage.sync.set({"favSubs": ["mechanicalkeyboards", "mechmarket", "askreddit", "nsfw", "nsfw_gifs"]}, function() {});
chrome.storage.sync.set({"shortcuts": {"s": "/saved", "saved": "/saved", "c": "/comments", "comments": "/comments", "su": "/submitted", "g": "/gilded", "gilded": "/gilded", "u": "/upvoted", "d": "/downvoted"}}, function() {});
chrome.storage.sync.set({"user": "shittymorphbrother"}, function() {});
var showNSFW = false;

var subsNSFW = [];
if(!showNSFW) { // load nsfw subs file if needed
	fetch("nsfw_subs.json")
			.then(response => response.json())
			.then(jsonResponse => subsNSFW = jsonResponse)
}


chrome.omnibox.onInputEntered.addListener(
	(sub) => {
		
		chrome.storage.sync.get("recentSubs", function(localRecentSubs) {
			chrome.storage.sync.get("shortcuts", function(localShortcuts) {
				chrome.storage.sync.get("user", function(localUser) {
					var shortcuts = localShortcuts.shortcuts;
					var user = localUser.user;
					
					if(shortcuts[sub] !== undefined) {
						if(user !== "") {
							chrome.tabs.update({"url": "https://www.reddit.com/user/" + user + shortcuts[sub]});
						}
						else {
							// throw no-user error
						}
					}
					else {
						if(checkSFW(sub) || showNSFW) {
							chrome.tabs.update({"url": "https://www.reddit.com/r/" + sub});
							var arrayRecentSub = localRecentSubs.recentSubs
							arrayRecentSub.push(sub);
							chrome.storage.sync.set({"recentSubs": arrayRecentSub});
						}
						else {
							chrome.tabs.update({"url": "nsfw_page.html"});
						}
					}
				});
			});
		});
		
});

chrome.omnibox.onInputChanged.addListener(
  (userSearch, suggestions) => {

	  chrome.storage.sync.get("recentSubs", function(localRecentSubs) {
		  chrome.storage.sync.get("favSubs", function(localFavSubs) {
			  
			  var subs = localRecentSubs.recentSubs.concat(localFavSubs.favSubs);
			  var seuggestedSubs = [];

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
					  seuggestedSubs.push(subObject);
				  }
			  }

			  suggestions(seuggestedSubs);
		  });
	  });

	});

function checkSFW(sub) {
	return !subsNSFW.includes(sub);
}

