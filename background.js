chrome.storage.sync.set({"recentSubs": []}, function() {}); // instantiate cloud-stored objects
chrome.storage.sync.set({"favSubs": ["mechanicalkeyboards", "mechmarket", "askreddit", "nsfw", "nsfw_gifs"]}, function() {});

chrome.omnibox.onInputEntered.addListener(
	(sub) => {

		chrome.storage.sync.get("recentSubs", function(localRecentSubs) {
			var dummyUser = "shittymorph";

			if(sub === "s" || sub === "saved") {
				if(dummyUser !== "") {
					chrome.tabs.update({"url": "https://www.reddit.com/user/" + dummyUser + "/saved")});
				}
				else {
					// throw no-user error
				}
			}
			else if(sub === "c" || sub === "comments") {
				if(dummyUser !== "") {
					chrome.tabs.update({"url": "https://www.reddit.com/user/" + dummyUser + "/comments"});
				}
				else {
					// throw no-user error
				}
			}
			else if(sub === "su" || sub === "submitted") {
				if(dummyUser !== "") {
					chrome.tabs.update({"url": "https://www.reddit.com/user/" + dummyUser + "/submitted"});
				}
				else {
					// throw no-user error
				}
			}
			else if(sub === "g" || sub === "gilded") {
				if(dummyUser !== "") {
					chrome.tabs.update({"url": "https://www.reddit.com/user/" + dummyUser + "/comments"});
				}
				else {
					// throw no-user error
				}
			}
			else if(sub === "u" || sub === "upvoted") {
				if(dummyUser !== "") {
					chrome.tabs.update({"url": "https://www.reddit.com/user/" + dummyUser + "/upvoted"});
				}
				else {
					// throw no-user error
				}
			}
			else if(sub === "d" || sub === "downvoted") {
				if(dummyUser !== "") {
					chrome.tabs.update({"url": "https://www.reddit.com/user/" + dummyUser + "/downvoted"});
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
