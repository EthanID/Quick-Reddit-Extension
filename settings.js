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

$("#favsubsadd").click(function() {
	$("#favsub").val()
	
	displayFavSubs();
});

$(".favsubsdel").click(function() {

});

$("#save").click(function() {
	// Save function
});

displayFavSubs();