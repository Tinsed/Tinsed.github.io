function multiply(A, B, res) {
	let reversedB = B.split("").reverse().join("");
	
	res.appendChild(document.createTextNode(B + " -> " + reversedB + " (развернули второе число)"));
	res.appendChild(document.createElement("br"));
	res.appendChild(document.createElement("br"));
	
	let extras = 0;
	let str = "";
	
	for (let i = 0; i < A.length + reversedB.length - 1; i++) {

		res.appendChild(document.createTextNode("Шаг " + i + ":"));
		res.appendChild(document.createElement("br"));
		
		for (let k = 0; k < B.length; k++)
			res.appendChild(document.createTextNode(" "));
		res.appendChild(document.createTextNode(A));
		res.appendChild(document.createElement("br"));
		
		for (let k = 0; k < A.length + B.length - 1 - i; k++)
			res.appendChild(document.createTextNode(" "));
		res.appendChild(document.createTextNode(reversedB));
		res.appendChild(document.createElement("br"));
		
		
		let sum = 0;
		let sumLine = "";
		for (let j = 0; j < reversedB.length; j++) {
			let indexA = A.length + reversedB.length - 2 - i - j;
			if ((indexA >= A.length) || (indexA < 0)) continue;
			
			let numA = parseInt(A[indexA], 10);
			let numB = parseInt(B[j], 10);
			sum += numA * numB;
			if (sumLine.length != 0) sumLine += "+";
			sumLine += "(" + numA + "*" + numB + ")";
		}
		
		sum += extras;
		sumLine += (((extras != 0) ? ("+" + extras) : "") + " = " + sum);
		extras = (sum - (sum % 10)) / 10;
		sum = sum % 10;
		
		str = sum.toString(10) + str;
		
		for (let k = 0; k < A.length + B.length; k++)
			res.appendChild(document.createTextNode("-"));
		res.appendChild(document.createElement("br"));
		
		for (let k = 0; k < A.length + B.length - str.length; k++)
			res.appendChild(document.createTextNode(" "));
		res.appendChild(document.createTextNode(str));
		res.appendChild(document.createElement("br"));
		
		res.appendChild(document.createTextNode(sumLine));
		res.appendChild(document.createElement("br"));
		res.appendChild(document.createTextNode("Записали " + sum));
		if (extras != 0)
			res.appendChild(document.createTextNode(", " + extras + " перенесем в следующий разряд"));
		res.appendChild(document.createElement("br"));
		res.appendChild(document.createElement("br"));
	}
	
	if (extras != 0) {
		res.appendChild(document.createTextNode("С учетом переноса из последнего разряда получаем: "));
		res.appendChild(document.createElement("br"));
		
		str = extras.toString(10) + str;
		
		for (let k = 0; k < A.length + B.length; k++)
			res.appendChild(document.createTextNode("-"));
		res.appendChild(document.createElement("br"));
		
		for (let k = 0; k < A.length + B.length - str.length; k++)
			res.appendChild(document.createTextNode(" "));
		res.appendChild(document.createTextNode(str));
		res.appendChild(document.createElement("br"));
		res.appendChild(document.createElement("br"));
	}
	
	return parseInt(str);
}