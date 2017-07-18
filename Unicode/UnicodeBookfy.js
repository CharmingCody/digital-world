var currnet_hour=0; var current_minute=0; 
var theCharmingOffset=0;
var theHighlightedI=0, theHighlightedJ=0;
var theRows=10, theCols=30;
var theQueryLength=0;
var arrQueryHistory=new Array(0);
var maxRandomChar=65535;
//var maxRandomChar=9015;
var randomChar=Math.floor(Math.random()*maxRandomChar);
var epsilon=0.00001;


function ij(i, j){
		return j*theCols+i;

}

function addToQueryHistory(chrChar, varComment){
	//JavaScript specific - writing after table end, extend table - often change unevitable here while inserting into other languages {timesaveing comment}+-1
	arrQueryHistory[arrQueryHistory.length]=chrChar;
	arrQueryHistory[arrQueryHistory.length]=varComment;

}

function writeQueryHistory(){
	var txtText="";
	var theCharCode=0;
	for (theCounter=0; theCounter<arrQueryHistory.length;theCounter+=2){
		theCharCode=arrQueryHistory[theCounter].charCodeAt(0);
		txtText+= arrQueryHistory[theCounter]+" &#9 "+parseInt(theCharCode)+" &#9 0x"+ finalizeDec2Hex(theCharCode)+"h &#9 "+arrQueryHistory[theCounter+1]+"&#10";
	}
	document.getElementById("queryHistory").innerHTML="<textarea style='font-size: 23pt' cols='50' rows='15' >"+txtText+"</textarea>";

}

function btnEncodePressed(){
	var ii;
	var blnFlushChecked = document.getElementById("chkFlush").checked;
	var varArray=document.getElementById("txtImpresionismArts").value.split('');
	randomChar=Math.floor(Math.random()*maxRandomChar);
	if (true==blnFlushChecked)
		var varComment=document.getElementById("txtComment").value;
	var txtText="";
	for (ii=0; ii<varArray.length; ii++){
		txtText+=(varArray[ii].charCodeAt(0));
		if (true==blnFlushChecked)
			addToQueryHistory(varArray[ii], varComment);
		if (ii<(varArray.length-1))
			txtText+=',';
		}
	document.getElementById("responseData").innerHTML="<textarea cols='100' rows='20' >"+txtText+"</textarea>";
	if (true==blnFlushChecked){
		document.getElementById("txtImpresionismArts").value="";
		writeQueryHistory();
	}
	

}

function decodeCharCode(varNumber){
	if (varNumber.length<10)
		return String.fromCharCode(varNumber);
	else
		return String.fromCharCode(encode_dB_number(varNumber)[0]);
	
}

function btnDecodePressed(){
	var ii;
	var blnFlushChecked = document.getElementById("chkFlush").checked;
	var varArray=document.getElementById("txtImpresionismArts").value.split(',');
	randomChar=Math.floor(Math.random()*maxRandomChar);
	if (true==blnFlushChecked)
		var varComment=document.getElementById("txtComment").value;
	var txtText="";
	for (ii=0; ii<varArray.length; ii++){
		txtText+=decodeCharCode(varArray[ii]);
		if (true==blnFlushChecked)
			addToQueryHistory(String.fromCharCode(varArray[ii]), varComment);
	}
	
	document.getElementById("responseData").innerHTML="<textarea id='txtResponse' style='font-size: 45pt'  cols='30' rows='5' >"+txtText+"</textarea>";
	
	if (true==blnFlushChecked){
		document.getElementById("txtImpresionismArts").value="";
		writeQueryHistory();
	} 

}

function encodeData(varString){
	var ii;
	var varArray=varString.split('');
	var txtText="";
	for (ii=0; ii<varArray.length; ii++){
		txtText+=(varArray[ii].charCodeAt(0));
		if (ii<(varArray.length-1))
			txtText+='';
		}
	return txtText;

}

function decodeString(varNumber){
	var varInput=encodeData(varNumber);
	if (varNumber.length<10)
		return String.fromCharCode(varInput);
	else
		return String.fromCharCode(encode_dB_number(varInput)[0]);
	
}

function btnDeencodeStringPressed(){
	var ii;
	var blnFlushChecked = document.getElementById("chkFlush").checked;
	var varArray=document.getElementById("txtImpresionismArts").value.split(',');
	var varDeencodedInput;
	randomChar=Math.floor(Math.random()*maxRandomChar);
	if (true==blnFlushChecked)
		var varComment=document.getElementById("txtComment").value;
	var txtText="";
	for (ii=0; ii<varArray.length; ii++){
		varDeencodedInput=decodeString(varArray[ii]);
		txtText+=varDeencodedInput;
		if (true==blnFlushChecked)
			addToQueryHistory(varDeencodedInput, varComment);
	}
	
	document.getElementById("responseData").innerHTML="<textarea id='txtResponse' style='font-size: 45pt'  cols='30' rows='5' >"+txtText+"</textarea>";
	
	if (true==blnFlushChecked){
		document.getElementById("txtImpresionismArts").value="";
		writeQueryHistory();
	} 

}

function initCharsTable(){
	writeCharsTable(theCharmingOffset, theHighlightedI, theHighlightedJ);
}

function calculateOffset(theCharmingOffset, theHighlightedI,theHighlightedJ, theRows, theCols){
	return theCharmingOffset+theHighlightedJ+theHighlightedI*(theRows);
}

function flush (input, max) {
  return (input.length < max) ? flush("0" + input, max) : input;
}

function writeCharsTable(theCharmingOffset, theHighlightedI, theHighlightedJ){

	var thePrevCharmingOffset=theCharmingOffset;
	var txtInnerHTML="<table border='1' style='border-collapse: collapse'>";
	var charsTable = document.getElementById("charsTable");
	var theCharsCharmingOffset=0;
	var blnHighlightedChecked = document.getElementById("chkHighlighted").checked;
	for (j=-1;j<theRows;j++){
		if (-1==j)
			txtInnerHTML+="<th>"+"&#32"+"</th>";
		else
			txtInnerHTML+="<th>"+flush(""+j,1)+"</th>";
	}
	for (i=0;i<theCols;i++){
		txtInnerHTML+="<tr><th>"+(thePrevCharmingOffset+i*theRows)+"</th>";
		for (j=0;j<theRows;j++){
			if ((i==theHighlightedI)&&(j==theHighlightedJ))
				if (true==blnHighlightedChecked)
					txtInnerHTML+="<td bgcolor='ff6400'>"+String.fromCharCode(theCharmingOffset)+"</td>";
				else
					txtInnerHTML+="<td>"+String.fromCharCode(theCharmingOffset)+"</td>";
			else
				txtInnerHTML+="<td>"+String.fromCharCode(theCharmingOffset)+"</td>";
			theCharmingOffset++;
			
		}
		txtInnerHTML+="<th>"+(thePrevCharmingOffset+i*theRows+j-1)+"</th>";
		txtInnerHTML+="</tr>";
	}
	for (j=-1;j<theRows;j++){
		if (-1==j)
			txtInnerHTML+="<th>"+"&#32"+"</th>";
		else
			txtInnerHTML+="<th>"+flush(""+j,1)+"</th>";
	}
	txtInnerHTML+="</table>";
	theCharsCharmingOffset=calculateOffset(thePrevCharmingOffset, theHighlightedI, theHighlightedJ, theRows, theCols);	
	txtInnerHTML+="&#13 &#13 &#13 Offset= "+theCharsCharmingOffset+" = 0x"+finalizeDec2Hex(theCharsCharmingOffset)+"h"+ " &nbsp "+String.fromCharCode(theCharsCharmingOffset);
	var d = new Date();
	current_hour = d.getHours();
	current_minute = d.getMinutes();
	document.title=String.fromCharCode(100*current_hour+current_minute);
	txtInnerHTML+=" &nbsp &nbsp &nbsp Watch: "+flush(""+current_hour,2)+" : "+flush(""+current_minute,2)+" &nbsp &nbsp &nbsp "+String.fromCharCode(100*current_hour+current_minute)+ " Random char: "+ randomChar+String.fromCharCode(randomChar);
	charsTable.innerHTML=txtInnerHTML;
}

function finalizeDec2Hex(number){

	if (number < 0)
	{
		number = 0xFFFFFFFF + number + 1;
	}
	return number.toString(16).toUpperCase();
}

function btnPrevCharsSidePressed(){
	theCharmingOffset-=(theRows*theCols);
	if (theCharmingOffset<0) theCharmingOffset=0;
	writeCharsTable(theCharmingOffset, theHighlightedI, theHighlightedJ);
}

function btnNextCharsSidePressed(){
	theCharmingOffset+=(theRows*theCols);
	writeCharsTable(theCharmingOffset, theHighlightedI, theHighlightedJ);

}

function keyLeftPressed(){
	if (theHighlightedJ>0)
		theHighlightedJ--;
	writeCharsTable(theCharmingOffset, theHighlightedI, theHighlightedJ);
	

}

function keyUpPressed(){
	if (theHighlightedI>0)
		theHighlightedI--;
	writeCharsTable(theCharmingOffset, theHighlightedI, theHighlightedJ);

}

function keyRightPressed(){
	if (theHighlightedJ<theRows-1)
		theHighlightedJ++;
	writeCharsTable(theCharmingOffset, theHighlightedI, theHighlightedJ);

}

function keyDownPressed(){
	if (theHighlightedI<theCols-1)
		theHighlightedI++;
	writeCharsTable(theCharmingOffset, theHighlightedI, theHighlightedJ);

}

function keyCallback(ev){
       
	        var theKeyCode=ev.which; 
		if (37==theKeyCode)
			keyLeftPressed();
		if (38==theKeyCode)
			keyUpPressed();
		if (39==theKeyCode)
			keyRightPressed();
		if (40==theKeyCode)
			keyDownPressed();

}

function searchChar(charSearch){
	var ii;
	for (ii=0;ii<65535+1;ii++){
		if (charSearch==String.fromCharCode(ii)){
			theCharmingOffset=ii;
			theHighlightedI=0;
			theHighlightedJ=0;	
			writeCharsTable(theCharmingOffset, theHighlightedI, theHighlightedJ);
			return charSearch;
		}
	}
	alert("Char not found");

}

function btnSearchDecPressed(){
	var theUnicodeCode=parseInt(prompt("Unicode decimal code to serach:"));
	if (theUnicodeCode>0){
		searchChar(String.fromCharCode(theUnicodeCode));
	}
}	

function btnSearchHexPressed(){
	var theUnicodeCode=parseInt(prompt("Unicode hexadecimal code to serach:"),16);
	if (theUnicodeCode>0){
		searchChar(String.fromCharCode(theUnicodeCode));
	}

}	

function btnSearchCharPressed(){
	var chrSearch=prompt("Char to serach:");
	if ((chrSearch!="")&&(chrSearch!=null)){
		searchChar(chrSearch);
	}

}	

function btnResetPressed(){
	theCharmingOffset=0;
	theHighlightedI=0;
	theHighlightedJ=0;	
	writeCharsTable(theCharmingOffset, theHighlightedI, theHighlightedJ);

}


function extractStrings(varNumber){
	var discreetBreacket=new Array(Math.ceil((varNumber.length-1)/2));
	var theCounter=(varNumber.length)-2;
	for (theInternalCounter=Math.floor((varNumber.length-1)/2); theInternalCounter>=0; theInternalCounter--){
		discreetBreacket[theInternalCounter]=parseInt(varNumber.substring(theCounter,theCounter+2));
		theCounter-=2;
	}
	return discreetBreacket;
	

}


function finalizeBin2Dec(bvar){
	return parseInt((bvar+'').replace(/[^01]/gi, ''),2);

}

function maxValue(dB){
	var theMaxValue=0;
	for (theCounter=0;theCounter<dB.length; theCounter++)
	{
		if (dB[theCounter]>theMaxValue){
			theMaxValue=dB[theCounter];
		}
	}
	return theMaxValue;
	


}

function flushBraecket(dB, dBrests){

	var fltRest=0.;
	for (theCounter=0;theCounter<dB.length; theCounter++){
		fltRest=dB[theCounter]-Math.floor(dB[theCounter]);
		if (fltRest>epsilon)
		{
			if (theCounter<dB.length-1){
				dB[theCounter+1]=dB[theCounter+1]+10*Math.pow(10,2-1)*(fltRest);
				dB[theCounter]=Math.floor(dB[theCounter]);

			}else{
				dBrests[dBrests.length]=(10*fltRest)%2; //JavaScript specific - writing after table end, extend table - often change unevitable here while inserting into other languages {timesaveing comment}+-1
				dB[theCounter]=Math.floor(dB[theCounter]);

			}
		}
		if(fltRest<=epsilon){
			if (theCounter>=dB.length-1){
				dBrests[dBrests.length]=0; //JavaScript specific - writing after table end, extend table - often change unevitable here while inserting into other languages {timesaveing comment}+-1
			}
		}
	}

}

function secondStage(dB){
	var shiftsBreacket=new Array(0);	
	var varResult="";
	var pow1, pow2;
	var theCounter;
	pow1=1;
	pow2=Math.pow(10,2-1);
	var dBrests=new Array(0);
	while (maxValue(dB)>epsilon){
		for (theCounter=0;theCounter<dB.length; theCounter++)
			dB[theCounter]=dB[theCounter]/2.;
		flushBraecket(dB, dBrests);
		for (theCounter=0;theCounter<dB.length; theCounter++){
			if (theCounter>=dB.length-1){
				varResult=dBrests[dBrests.length-1]+varResult;
				dB[theCounter]=(Math.floor(pow1*dB[theCounter]))/pow1;
			}
			dB[theCounter]=(Math.floor(pow2*dB[theCounter]))/pow2;
			
		}

	}	
	return varResult;

}

function watch(){
	writeCharsTable(theCharmingOffset, theHighlightedI, theHighlightedJ);
}

function chkFlushChanged(){
	var blnChecked = document.getElementById("chkFlush").checked;
	if (true==blnChecked)
		document.getElementById("divFlush").innerHTML="<input type='text' id='txtComment'></input>";
	else
		document.getElementById("divFlush").innerHTML="";
	
}

function encode_dB_number(varNumber){
	varResult=secondStage(extractStrings(varNumber));
	var varInput=varResult.substring((varResult.length<16) ? 0 : varResult.length-16,varResult.length);
	var arrReturn = new Array(0);
	arrReturn[0]= parseInt((varInput+'').replace(/[^01]/gi, ''),2);	
	arrReturn[1]=varResult.length;
	return arrReturn;

}

function btndBNumberPressed(){
	var varNumber=prompt("Enter discreetBreacket number: ");
	var decNumber= encode_dB_number(varNumber);
	var varInput=String.fromCharCode(decNumber[0]);
	prompt("Result: ", decNumber[0]+" = "+varInput+ " binary length: "+ decNumber[1]);

}

function btndBStringPressed(){
	var varInput=encodeData(prompt("Enter discreetBreacket string: "));
	var varNumber=prompt("discreetBreacket numbers: ", varInput);

	var decNumber=encode_dB_number(varNumber);
	var varInput=String.fromCharCode(decNumber[0]);
	prompt("Result: ", decNumber[0]+" = "+varInput+ " binary length: "+ decNumber[1]);

}

function init(){
	document.getElementById("btnEncode").onclick=btnEncodePressed;
	document.getElementById("btnDecode").onclick=btnDecodePressed;
	document.getElementById("btnDeencodeString").onclick=btnDeencodeStringPressed;
	document.getElementById("txtImpresionismArts").focus();
	document.getElementById("btnPrevCharsSide").onclick=btnPrevCharsSidePressed;
	document.getElementById("btnNextCharsSide").onclick=btnNextCharsSidePressed;
	document.getElementById("btnSearchDec").onclick=btnSearchDecPressed;
	document.getElementById("btnSearchHex").onclick=btnSearchHexPressed;
	document.getElementById("btnSearchChar").onclick=btnSearchCharPressed;
	document.getElementById("btnReset").onclick=btnResetPressed;
	document.getElementById("btndBNumber").onclick=btndBNumberPressed;
	document.getElementById("btndBString").onclick=btndBStringPressed;
	document.getElementById("btnCharTableUp").onclick=keyUpPressed;
	document.getElementById("btnCharTableLeft").onclick=keyLeftPressed;
	document.getElementById("btnCharTableDown").onclick=keyDownPressed;
	document.getElementById("btnCharTableRight").onclick=keyRightPressed;
	window.onkeydown=keyCallback;
	document.getElementById("chkFlush").onchange=chkFlushChanged;
	window.onkeydown=keyCallback;
	initCharsTable();
	setInterval(watch , 1000);
}

window.onload=init
