chrome.omnibox.onInputEntered.addListener(
	function(sub) {
		chrome.tabs.update({"url": "https://www.reddit.com/r/" + sub});
	});

chrome.omnibox.onInputChanged.addListener(
  function(text, suggestions) {
	  var subs = ["mechanicalkeyboards", "nsfw", "nsfw_gifs", "buildapcsales"];
	  var seuggestedSubs = [];

	  for(var sub of subs) {
		  var isMatch = true;
		  for(var letterNum in text) {
			  if(text[letterNum] !== sub[letterNum]) {
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
