var bookAuthorId = $("bookAuthor");
var bookNameId = $("bookName");



function submitClick() {

	var bookAuthor = $("#bookAuthor").val();
	var bookName = $("#bookName").val();
	var reference = firebase.database().ref().child("Books");	
	//reference.on('value',snap => $("bookAuthor").val(snap.val()));
	var newBookId = reference.push().key;
	// reference.child(newBookId).child("bookName").set(bookName+"");
	// reference.child(newBookId).child("bookAuthor").set(bookAuthor+"");
	reference.child(newBookId).set({
		bookName: bookName,
		bookAuthor: bookAuthor
	},function (error) {
		if (error) {
			console.log(error);
		} else {
			//window.alert("Data added successfully");
			console.log("Data added successfully");
			$("#bookName").val("");
			$("#bookAuthor").val("");
		}

	});
}

$(document).ready(function() {

	var reference = firebase.database().ref().child("Books").orderByKey();
	reference.on('value',snap => {
		//console.log(snap.val());
		$("#bookNameList").empty();
		$("#bookAuthorList").empty();
		snap.forEach(function (childSnap) {

			var bookName = childSnap.child("bookName").val();
			var bookAuthor = childSnap.child("bookAuthor").val();
			var $newBook = $("<li class='list-group-item list-group-item-success'>" 
											+ bookName + "</li>");
			var $newAuthor = $("<li class='list-group-item list-group-item-success'>"
											 + bookAuthor + "</li>");
			$("#bookNameList").append($newBook);
			$("#bookAuthorList").append($newAuthor);
		});
	});
});