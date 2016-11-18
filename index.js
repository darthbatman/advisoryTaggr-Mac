var fs = require('fs');

fs.readFile('./song.m4a', function(err, data){
	if (err) console.log(err);
	var l = data.length; // in bytes
	var output = [];
	for(var i = 0; i < l; i++){
	  var char = data.toString('hex',i,i+1); // i is byte index of hex
	  output.push(char);
	};

	var originalOutput = output;

	var rating = ["72", "74", "6e", "67"];

	var temp = ["00", "00", "00", "00"];

	var foundAt = 0;

	for (var i = 0; i < output.length; i++){
		temp.splice(0, 1);
		temp.push(output[i]);
		//console.log(temp.toString());
		if (rating.toString() == temp.toString()){
			console.log("FOUND IT");
			foundAt = i - 3;
			break;
		}
	}

	console.log(output[foundAt] + output[foundAt + 1] + output[foundAt + 2] + output[foundAt + 3] + ": " + output[foundAt + 20]);

	output[foundAt + 20] = "01";

	var myBuffer= new Buffer(output.length);
	for (var q = 0; q < output.length; q++){
		myBuffer[q] = parseInt("0x" + output[q]);
	}
	fs.writeFile("taggedsong.m4a", myBuffer, function(err) {
	    if(err) {
	        console.log(err);
	    } else {
	        console.log("The file was saved!");
	    }
	});

});