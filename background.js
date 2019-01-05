chrome.storage.sync.set({"recentSubs": ["animalz"]}, function() {}); // instantiate cloud-stored objects
chrome.storage.sync.set({"favSubs": []}, function() {});

chrome.omnibox.onInputEntered.addListener(
	function(sub) {
		chrome.tabs.update({"url": "https://www.reddit.com/r/" + sub});

		chrome.storage.sync.get("recentSubs", function test(localRecentSubs) {
	    chrome.storage.sync.set({"recentSubs": localRecentSubs + sub}, function() {});
	});
});

chrome.omnibox.onInputChanged.addListener(
  function(userSearch, suggestions) {
	  var subs = ["mechanicalkeyboards", "nsfw", "nsfw_gifs", "buildapcsales"];
	  var seuggestedSubs = [];

//	  chrome.storage.sync.get("recentSubs", function test(localRecentSubs) {
//		  subs = localRecentSubs.recentSubs;
//	  });

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

