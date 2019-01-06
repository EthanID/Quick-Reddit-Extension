chrome.storage.sync.set({"recentSubs": ["animalz"]}, function() {}); // instantiate cloud-stored objects
chrome.storage.sync.set({"favSubs": []}, function() {});

chrome.omnibox.onInputEntered.addListener(
	(sub) => {

		chrome.storage.sync.get("recentSubs", function(localRecentSubs) {
			if(sub !== "") {
				chrome.tabs.update({"url": "https://www.reddit.com/r/" + sub});
				console.log(localRecentSubs.recentSubs.push(sub));
				chrome.storage.sync.set({"recentSubs": localRecentSubs.recentSubs.push(sub)});
			}
			else {
				chrome.tabs.update({"url": "https://www.reddit.com"});
			}
		});

});

chrome.omnibox.onInputChanged.addListener(
  (userSearch, suggestions) => {

	  chrome.storage.sync.get("recentSubs", function(localRecentSubs) {
		  var subs = localRecentSubs.recentSubs;
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
