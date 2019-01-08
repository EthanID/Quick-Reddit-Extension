var favsubs = [];

function displayFavSubs() {
	$("#favsubslist").html("");
	for(sub of favsubs) {
		if(/^[a-zA-Z]+$/.test(sub)) {
			sub = sub.toLowerCase();
			if(!sub.startsWith("r/")) {
				sub = "r/" + sub;
			}
			$("#favsubslist").append(sub);
		}
		else {
			alert(sub + " is not a valid sub");
		}
	}
}

$("#favsubsadd").click(function() {
	favsubs.push($("#favsub").val());
	displayFavSubs();
});

$(".favsubsdel").click(function() {

});

$("#save").click(function() {
	// Save function
});

displayFavSubs();
