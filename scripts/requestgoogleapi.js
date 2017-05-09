		// calculator two location2
	    function calTwoLocation2(indexA, indexB, len){
	    	console.log("request", indexA, indexB);
	    	var request = {
			    origin: new google.maps.LatLng(markers[indexA].getPosition().lat(), markers[indexA].getPosition().lng()),
			    destination: new google.maps.LatLng(markers[indexB].getPosition().lat(), markers[indexB].getPosition().lng()),
			    travelMode: 'DRIVING'
		  	};
		  	
		  	window.setTimeout(function(){
		  		directionsService.route(request, function(result, status) {
					numberRespone++;
					if (status == 'OK') {
					    console.log("respone" ,result.routes[0].legs[0].distance.value, result.routes[0].legs[0].distance.text, indexA, indexB);

					    matrix[indexA][indexB] = result.routes[0].legs[0].distance.value;
					    // if(indexA != indexB){
					    // 	directionsDisplay.setDirections(result);
					    // }
					} else {
						console.log("Route not found");
						verDoNotFound.push('{"indexA":' + indexA + ',"indexB":' + indexB + '}');
					}
					if(numberRespone == len){
						if(verDoNotFound.length == 0){
							mergerMatrixAndMatrixAdjacent(matrix, matrixAdjacent);
							alert("Requested all vertex");
						}else{
							console.log(verDoNotFound.length, "not found");
							calVerDoNotFound();
						}
					}
				});
		  	}, (++delay)*500);
	    }

	    function calVerDoNotFound(){
	    	var obj = JSON.parse('[' + verDoNotFound + ']');
	    	// restore
	    	verDoNotFound = [];
	    	delay = 1;
	    	numberRespone = 0;

	    	for(var i = 0; i < obj.length; i++){
	    		calTwoLocation2(obj[i].indexA, obj[i].indexB, obj.length);
	    	}
	    }



	    // caculator all two
	    function calAllTwo(){
	  		if(numEdgeOfAdjacent != 0){
	  			var len = markers.length;
		    	console.log("length of markers: ", len);
		    	matrix = new Array(len);
				delay = 0;
				numberRespone = 0;

		    	for(var i = 0; i < len; i++){
		    		matrix[i] = new Array(len);
		    		for(var j = 0; j < len; j++){
		    			if(matrixAdjacent[i][j] == 1){ // request những đỉnh quan tâm
		    				calTwoLocation2(i, j, numEdgeOfAdjacent*2);
		    			}
		    		}
		    	}
	  		}
	    }


	    // calculator two location for test on map (call whatever)
	    function calTwoLocation(locationA, locationB){
	    	var request = {
			    origin: locationA,
			    destination: locationB,
			    travelMode: 'DRIVING',
			    provideRouteAlternatives: true
		  	};
			directionsService.route(request, function(result, status) {
			    if (status == 'OK') {
			    	console.log(result.routes[0].legs[0].distance.value, result.routes[0].legs[0].distance.text);
			    	directionsDisplay.setDirections(result);
			    }
			});
	    }


	    //////////////////////////////////////////////////////////////////////
        // not use
        // caculator distance all location in markers, by user click on map
      	function calculatorAllLocation(){
      		var origin = [];
      		for(var i = 0; i < markers.length; i++){
      			origin.push(new google.maps.LatLng(markers[i].getPosition().lat(), markers[i].getPosition().lng()));
      		}

		  	service.getDistanceMatrix({
		  		origins: origin,
			    destinations: origin,
			    travelMode: 'DRIVING',
			    unitSystem: google.maps.UnitSystem.METRIC
		  	}, callback);
      	}

      	// call back for function calculartorAllLocation() (google api distance matrix)
      	function callback(response, status) {
      		if (status == 'OK') {
      			console.log("Details response distance matrix");
			    var origins = response.originAddresses;
			    var destinations = response.destinationAddresses;
			    matrix = new Array(origins.length);

			    for (var i = 0; i < origins.length; i++) {
			    	matrix[i] = new Array(origins.length);
			      	var results = response.rows[i].elements;

			      	for (var j = 0; j < results.length; j++) {
				        var element = results[j];
				        var distance = element.distance.text;
				        var duration = element.duration.text;
				        var from = origins[i];
				        var to = destinations[j];

				        console.log(distance, duration);
				        if(element.status == 'OK'){
				        	matrix[i][j] = parseInt(element.distance.value);
				        }
			      	}
			    }
			    writeLogMaTrix(matrix);
			}
		}