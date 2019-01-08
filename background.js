chrome.storage.sync.set({"recentSubs": []}, function() {}); // instantiate cloud-stored objects
chrome.storage.sync.set({"favSubs": ["mechanicalkeyboards", "mechmarket", "askreddit", "nsfw", "nsfw_gifs"]}, function() {});

chrome.omnibox.onInputEntered.addListener(
	(sub) => {

		chrome.storage.sync.get("recentSubs", function(localRecentSubs) {
			var dummyUser = "shittymorph";
			var shortcuts = {"s": "/saved", "saved": "/saved", "c": "/comments", "comments": "/comments", "su": "/submitted", "g": "/gilded", "gilded": "/gilded", "u": "/upvoted", "d": "/downvoted"};

			if(shortcuts[sub] !== undefined) {
				if(dummyUser !== "") {
					chrome.tabs.update({"url": "https://www.reddit.com/user/" + dummyUser + shortcuts[sub]});
				}
				else {
					// throw no-user error
				}
			}
			else {
				chrome.tabs.update({"url": "https://www.reddit.com/r/" + sub});
				var arrayRecentSub = localRecentSubs.recentSubs
				arrayRecentSub.push(sub);
				console.log(arrayRecentSub);
				chrome.storage.sync.set({"recentSubs": arrayRecentSub});
			}
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
