/*
function displayFavSubs() {
	$("#favsubslist").html("");
	for(sub of favsubs) {
		sub = sub.toLowerCase();
		if(!sub.startsWith("r/")) {
			sub = "r/" + sub;
		}
		sub += "<br>"

		$("#favsubslist").append(sub);
	}
}
*/

$("#favsubsadd").click(function() {
	$("#favsub").val()
//	displayFavSubs();
});

$(".favsubsdel").click(function() {

});

$("clearhistory").click(function() {
	chrome.storage.sync.set({"recentSubs": []}, function () {});
})

$("#save").click(function() {
	var keepSubs = $("#keephistory").prop("checked");
	
	chrome.storage.sync.set({"keepSubs": keepSubs}, function() {});
});

//displayFavSubs();