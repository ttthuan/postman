var data = new Array;

// read file points (các location của bản đồ, các ngã ba, ngã tư)
function fcReadFile(){
        var files = document.getElementById("file").files;
        if(!files.length){
        	alert("please chose a file before click on button read file!!");
        	return;
        }
        	
        var j = 0;
        var k = files.length;
        	
        for(var i = 0; i < k; i++){
                var reader = new FileReader();

        	reader.onloadend = function(evt){
        	//console.log(evt.target.result+"", 'stop: ' + stop);
        	if(evt.target.readyState  == FileReader.DONE){
                        data.push(evt.target.result);
        	        j++;
        	        if(j == k){
        	        	alert("All file loaded");
                                btnCalculator.classList.remove("hide");
        	        }
        	}
        };

	reader.readAsBinaryString(files[i]);
        }
}



        // write points from list markers to file
        function createdlFile(){
                var ls = [];

                for(var i = 0; i < markers.length; i++){
                        ls.push('{"lat":' + markers[i].getPosition().lat() + ',"lng":' + markers[i].getPosition().lng() + '}');
                }

                var textToSaveBlob = new Blob([ls], {type:"text/plain"});
                var textToSaveAsURL = window.URL.createObjectURL(textToSaveBlob);
                var fileNameToSaveAs = "points";

                var downloadlink = document.createElement("a");
                downloadlink.download = fileNameToSaveAs;
                downloadlink.innerHTML = "Download File";
                downloadlink.href = textToSaveAsURL;
                downloadlink.onclick = destroyClickElement;
                downloadlink.style.display = "none";
                document.body.appendChild(downloadlink);

                downloadlink.click();
        }



        function createdlFile2(){
                var ls = markers.length + "\n";
                for(var i = 0; i < markers.length; i++){
                        for(var j = 0; j < markers.length; j++){
                                if(j <= markers.length-2){
                                        ls = ls + matrixWeight[i][j] + " ";
                                }else{
                                        ls = ls + matrixWeight[i][j]; 
                                }
                        }
                        if(i <= markers.length-2){
                                ls = ls + "\n";
                        }
                }
                        
                var textToSaveBlob = new Blob([ls], {type:"text/plain"});
                var textToSaveAsURL = window.URL.createObjectURL(textToSaveBlob);
                var fileNameToSaveAs = "matrixweight";

                var downloadlink = document.createElement("a");
                downloadlink.download = fileNameToSaveAs;
                downloadlink.innerHTML = "Download File";
                downloadlink.href = textToSaveAsURL;
                downloadlink.onclick = destroyClickElement;
                downloadlink.style.display = "none";
                document.body.appendChild(downloadlink);

                downloadlink.click();
        }