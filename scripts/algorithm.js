	// tìm khoảng cách ngắn nhất của các cặp đỉnh lẻ
	    function floydForMatrixOdd(matrix){
	    	var len = matrix.length;

	    	matrixPathPairShort = new Array(len);
	    	for(var i = 0; i < len; i++){
	    		matrixPathPairShort[i] = new Array(len);
	    		for(var j = 0; j < len; j++){
	    			if(matrix[i][j] != 0){
	    				matrixPathPairShort[i][j] = i;
	    			} else {
	    				matrixPathPairShort[i][j] = -1;
	    			}
	    		}
	    	}

	    	for(var i = 0; i < len; i++){
	    		for(var j = 0; j < len; j++){
	    			for(var k = 0; k < len; k++){
	    				// ij > ik + kj
	    				if(j != k){
	    					if((matrix[j][i] != Number.MAX_SAFE_INTEGER && matrix[i][k] != Number.MAX_SAFE_INTEGER) && matrix[j][k] > matrix[j][i] + matrix[i][k]){
		    					matrix[j][k] = matrix[j][i] + matrix[i][k];
		    					matrixPathPairShort[j][k] = i;
		    				}
	    				}
	    			}
	    		}
	    	}
	    }

	    // tìm bộ cặp có trọng số nhỏ nhất
	    function thamLamForMatrixOdd(matrixOdd){
	    	var len = matrixOdd.length;
	    	var nhan = new Array(len);
	    	var i, j;
	    	var numPair = 0;

	    	for(i = 0; i < len; i++){
	    		nhan[i] = new Array(len);
	    		for(j = 0; j < len; j++){
	    			nhan[i][j] = 0;
	    		}
	    	}

	    	while(numPair < len/2){
	    		var minI = -1;
		    	var minJ = -1;

		    	for(i = 0; i < len; i++){
		    		for(j = 0; j < len; j++){
		    			if(i != j && nhan[i][j] == 0){ // chưa xét
		    				if(minI == -1 || (matrixOdd[minI][minJ] > matrixOdd[i][j])){
			    				minI = i;
			    				minJ = j;
			    			}
		    			}
		    		}
		    	}

		    	if(minI != -1){
			    	numPair++;
			    	// delete column
			    	for(var k = 0; k < len; k++){
			    		nhan[k][minJ] = 1;
			    		nhan[k][minI] = 1;
			    		if(k != minI){
			    			matrixOdd[k][minJ] = 0;
			    		}
			    		if(k != minJ){
			    			matrixOdd[k][minI] = 0;
			    		}
			    	}
			    	for(var k = 0; k < len; k++){
			    		nhan[minI][k] = 1;
			    		nhan[minJ][k] = 1;
			    		if(k != minJ){
			    			matrixOdd[minI][k] = 0;
			    		}
			    		if(k != minI){
			    			matrixOdd[minJ][k] = 0;
			    		}
			    	}
		    	}
	    	}
	    }

	    // thuật toán Hierholzer (tìm chu trình euler)
	    function findCircuitHierholzer(matrixAdjacent, start){
	    	var matrix = new Array(matrixAdjacent.length);
	    	
	    	for(var i = 0; i < matrixAdjacent.length; i++){
	    		matrix[i] = new Array(matrixAdjacent.length);
	    		for(var j = 0; j < matrixAdjacent.length; j++){
	    			matrix[i][j] = matrixAdjacent[i][j];
	    		}
	    	}

	    	var stack = [];
	    	stack.push(start);
	    	circuit = new Array;

	    	while(stack.length > 0){ // stack không rỗng
	    		var v = stack[stack.length-1];

	    		if(isStillEdgeAdjacent(v, matrix) == false){ // không còn
	    			stack.pop();
	    			circuit.push(v);
	    		} else {
	    			var len = matrix.length;
	    			for(var i = 0; i < len; i++){
	    				if(matrix[v][i] > 0){ // cạnh kề đầu tiên
	    					matrix[v][i]--;
	    					matrix[i][v]--;
	    					stack.push(i);
	    					break;
	    				}
	    			}
	    		}
	    	}

	    	/// sau khi chạy xong có dc chu trình, hiển thị lên area
	    	var len = circuit.length;
	    	if(len > 0){
	    		var str = "";
		    	for(var i = 0; i < len-1; i++){
		    		str = str + circuit[i] + " -> ";
		    	}
		    	str = str + circuit[len-1];
		    	var area = document.getElementById('comment');
		    	area.innerHTML = str;
		    	console.log("length of circuit", len);
		    	var n = 0;
	    	}
	    }


	    function isStillEdgeAdjacent(v, matrixAdjacent){
	    	var len = matrixAdjacent.length;
	    	for(var i = 0; i < len; i++){
	    		if(matrixAdjacent[v][i] > 0){ // vẫn còn cạnh kề
	    			return true;
	    		}
	    	}
	    	return false;
	    }


	    // write down log to watch matrix after reques from google api distance
      	function writeLogMaTrix(matrix){
      		console.log("Detail matrix");
      		var verNum = matrix.length;
			for(var i = 0; i < verNum; i++){
				var str="";
      			for(var j = 0; j < verNum; j++){
      				str = str + matrix[i][j] + " ";
      			}
      			console.log(str);
      		}
      	}