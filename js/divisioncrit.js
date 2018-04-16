var N = 5;
var D = 3;
var radix = 10;

function setSpanValue(spanName, value) {
	let span = document.getElementById(spanName);
	let txt = document.createTextNode(value);
	span.removeChild(span.firstChild);
	span.appendChild(txt);
}

function pascal() {
	console.log("--- PASCAL METHOD ---");
	let res = document.getElementById("pascalMethodTitle");
	if (res.firstChild) res.removeChild(res.firstChild);
	res.appendChild(document.createTextNode("Признак Паскаля"));
	
	// display hint
	res = document.getElementById("pascalMethodHint");
	while (res.firstChild) res.removeChild(res.firstChild);
	
	res.appendChild(document.createTextNode("n / d <=> r / d, где:"));
	res.appendChild(document.createElement("br"));
	res.appendChild(document.createTextNode("r = r"));
	let sub_tag = document.createElement("sub");
	sub_tag.appendChild(document.createTextNode("k"));
	res.appendChild(sub_tag);
	res.appendChild(document.createTextNode("n"));
	sub_tag = document.createElement("sub");
	sub_tag.appendChild(document.createTextNode("k"));
	res.appendChild(sub_tag);
	res.appendChild(document.createTextNode(" + ... + r"));
	sub_tag = document.createElement("sub");
	sub_tag.appendChild(document.createTextNode("0"));
	res.appendChild(sub_tag);
	res.appendChild(document.createTextNode("n"));
	sub_tag = document.createElement("sub");
	sub_tag.appendChild(document.createTextNode("0"));
	res.appendChild(sub_tag);
	
	res.appendChild(document.createElement("br"));
	
	res.appendChild(document.createTextNode("r"));
	sub_tag = document.createElement("sub");
	sub_tag.appendChild(document.createTextNode("i"));
	res.appendChild(sub_tag);
	res.appendChild(document.createTextNode(" = " + radix));
	let sup_tag = document.createElement("sup");
	sup_tag.appendChild(document.createTextNode("i"));
	res.appendChild(sup_tag);
	res.appendChild(document.createTextNode(" mod d "));
	
	// clear old solution
	res = document.getElementById("pascalMethod");
	while(res.firstChild)
		res.removeChild(res.firstChild);

	// calculate r_array
	let max_power = 20;
	let r_array = [];
	let index = 0;
	while (N >= Math.pow(radix, index)) {
		r_array[index] = Math.pow(radix, index) % D;
		console.log("r[" + index + "] = " + r_array[index]);
		res.appendChild(document.createTextNode("r[" + index + "] = " + Math.pow(radix, index)  + " mod " + D + " = " + r_array[index]));
		res.appendChild(document.createElement("br"));
		index = index + 1;
	}
	
	res.appendChild(document.createElement("br"));
	
	// main loop 
	let temp = N;
	let counter = 1;
	while (temp > D) {
		res.appendChild(document.createTextNode("Итерация " + counter + ":"));
		res.appendChild(document.createElement("br"));
		res.appendChild(document.createTextNode(temp + " / " + D));
		res.appendChild(document.createElement("br"));
		
		let next = 0;
		index = 0;
		let str = "";
		let prev = temp;
		while (temp > 0) {		
			next = next + (temp % radix) * r_array[index];
			str = "(" + (temp % radix) + " * " + r_array[index] + ")" + ((index == 0) ? "" : " + ") + str;
			temp = Math.floor(temp / radix);
			index = index + 1;
		}
		
		temp = next;
		
		// print current step
		res.appendChild(document.createTextNode(str + " = " + next));
		res.appendChild(document.createElement("br"));
		
		if (next == prev) {
			console.log("Warning: cycle detected");
			break;
		}
						
		console.log(str + " = " + next);
		counter = counter + 1;
		
		if (counter > 40) {
			res.appendChild(document.createTextNode("Warning: cycle prevention"));
			res.appendChild(document.createElement("br"));
			break;
		}
	}
	res.appendChild(document.createTextNode("Итог: " + temp + " / " + D + " - " + ((temp % D == 0) ? "делится" : "не делится")));
}

function firstMethod() {
	console.log("--- FIRST METHOD ---");
	let res = document.getElementById("firstMethodTitle");
	if (res.firstChild) res.removeChild(res.firstChild);
	res.appendChild(document.createTextNode("Первый признак Рачинского"));
	
	res = document.getElementById("firstMethodHint");
	while (res.firstChild) res.removeChild(res.firstChild);
	res.appendChild(document.createTextNode("p = 10a + b, 0 <= b <= 9"));
	res.appendChild(document.createElement("br"));
	res.appendChild(document.createTextNode("n = 10m + k, 0 <= k <= 9"));
	res.appendChild(document.createElement("br"));
	res.appendChild(document.createTextNode("n / p <=> |ak - bm| / p"));
	res.appendChild(document.createElement("br"));
	
	// clear old solution
	res = document.getElementById("firstMethod");
	while(res.firstChild)
		res.removeChild(res.firstChild);
		
	// main loop 
	let temp = N;
	let counter = 1;
	
	let b = D % radix;
	let a = Math.floor(D / radix);
	
	while (temp > D) {
		let oldTemp = temp;
		res.appendChild(document.createTextNode("Итерация " + counter + ":"));
		res.appendChild(document.createElement("br"));
		res.appendChild(document.createTextNode(temp + " / " + D));
		res.appendChild(document.createElement("br"));
	
		let k = temp % radix;
		let m = Math.floor(temp / radix);
		
		temp = Math.abs(a*k - b*m);
		let str = "|" + a + "*" + k + " - " + b + "*" + m + "| = " + temp;
		res.appendChild(document.createTextNode(str));
		res.appendChild(document.createElement("br"));
		
		console.log(document.createTextNode(str));
		
		if (oldTemp == temp) {
			console.log("Warning: cycle detected");
			break;
		}
		
		counter = counter + 1;
		
		if (counter > 40) {
			res.appendChild(document.createTextNode("Warning: cycle prevention"));
			res.appendChild(document.createElement("br"));
			break;
		}
	}
	
	res.appendChild(document.createTextNode("Итог: " + temp + " / " + D + " - " + ((temp % D == 0) ? "делится" : "не делится")));
}

function secondMethod() {
	console.log("--- SECOND METHOD ---");
	let res = document.getElementById("secondMethodTitle");
	if (res.firstChild) res.removeChild(res.firstChild);
	res.appendChild(document.createTextNode("Второй признак Рачинского"));
	
	res = document.getElementById("secondMethodHint");
	while (res.firstChild) res.removeChild(res.firstChild);
	res.appendChild(document.createTextNode("n / p <=> (m + kq) / p"));
	res.appendChild(document.createElement("br"));
	res.appendChild(document.createTextNode("q = (p • b* + 1) / 10, где:"));
	res.appendChild(document.createElement("br"));
	res.appendChild(document.createTextNode("b* = b, если b = 3 или 7"));
	res.appendChild(document.createElement("br"));
	res.appendChild(document.createTextNode("b* = 10-b, если b = 1 или 9"));
	res.appendChild(document.createElement("br"));
	
	// clear old solution
	res = document.getElementById("secondMethod");
	while(res.firstChild)
		res.removeChild(res.firstChild);
		
	// main loop 
	let temp = N;
	let counter = 1;
	let errorFlag = false;
	
	let b = D % radix;
	let a = Math.floor(D / radix);
	
	while (temp > D) {
		let oldTemp = temp;
		res.appendChild(document.createTextNode("Итерация " + counter + ":"));
		res.appendChild(document.createElement("br"));
		res.appendChild(document.createTextNode(temp + " / " + D));
		res.appendChild(document.createElement("br"));
	
		let k = temp % radix;
		let m = Math.floor(temp / radix);
		
		let b_star = b;
		if ((b == 1) || (b == 9)) {
			b_star = 10 - b;
		}
		else if ((b != 3) && (b != 7)) {
			console.log("Error: b = " + b + ", method not applicable");
			errorFlag = true;
			break;
		}
		
		let q = (D * b_star + 1) / 10;
		console.log("q = " + q);
		res.appendChild(document.createTextNode("q = " + q));
		res.appendChild(document.createElement("br"));
		temp = m + k*q;
		
		let str = m + " + " + k + "*" + q + " = " + temp;
		res.appendChild(document.createTextNode(str));
		res.appendChild(document.createElement("br"));
		
		console.log(document.createTextNode(str));
		
		if (oldTemp == temp) {
			console.log("Warning: cycle detected");
			res.appendChild(document.createTextNode("Цикл!"));
			res.appendChild(document.createElement("br"));
			break;
		}
		
		counter = counter + 1;
		
		if (counter > 40) {
			res.appendChild(document.createTextNode("Warning: cycle prevention"));
			res.appendChild(document.createElement("br"));
			break;
		}
	}
	
	if (!errorFlag)
		res.appendChild(document.createTextNode("Итог: " + temp + " / " + D + " - " + ((temp % D == 0) ? "делится" : "не делится")));
	else 
		res.appendChild(document.createTextNode("Error: b = " + b + ", method not applicable"));
}

function thirdMethod() {
	console.log("--- THIRD METHOD ---");
	let res = document.getElementById("thirdMethodTitle");
	if (res.firstChild) res.removeChild(res.firstChild);
	res.appendChild(document.createTextNode("Третий признак Рачинского"));
	
	res = document.getElementById("thirdMethodHint");
	while (res.firstChild) res.removeChild(res.firstChild);
	while (res.firstChild) res.removeChild(res.firstChild);
	res.appendChild(document.createTextNode("n / p <=> |m - kq*| / p"));
	res.appendChild(document.createElement("br"));
	res.appendChild(document.createTextNode("q* = |p - q|"));
	res.appendChild(document.createElement("br"));
	res.appendChild(document.createTextNode("q = (p • b* + 1) / 10, где:"));
	res.appendChild(document.createElement("br"));
	res.appendChild(document.createTextNode("b* = b, если b = 3 или 7"));
	res.appendChild(document.createElement("br"));
	res.appendChild(document.createTextNode("b* = 10-b, если b = 1 или 9"));
	res.appendChild(document.createElement("br"));
	
	// clear old solution
	res = document.getElementById("thirdMethod");
	while(res.firstChild)
		res.removeChild(res.firstChild);
		
	// main loop 
	let temp = N;
	let counter = 1;
	let errorFlag = false;
	
	let b = D % radix;
	let a = Math.floor(D / radix);
	
	while (temp > D) {
		let oldTemp = temp;
		res.appendChild(document.createTextNode("Итерация " + counter + ":"));
		res.appendChild(document.createElement("br"));
		res.appendChild(document.createTextNode(temp + " / " + D));
		res.appendChild(document.createElement("br"));
	
		let k = temp % radix;
		let m = Math.floor(temp / radix);
		
		let b_star = b;
		if ((b == 1) || (b == 9)) {
			b_star = 10 - b;
		}
		else if ((b != 3) && (b != 7)) {
			console.log("Error: b = " + b + ", method not applicable");
			errorFlag = true;
			break;
		}
		
		let q = (D * b_star + 1) / 10;
		let q_star = Math.abs(D - q);
		console.log("q = " + q, ", q* = " + q_star);
		res.appendChild(document.createTextNode("q = " + q + ", q* = " + q_star));
		res.appendChild(document.createElement("br"));
		
		temp = Math.abs(m - k*q_star);
		
		let str = m + " - " + k + "*" + q_star + " = " + temp;
		console.log(str);
		res.appendChild(document.createTextNode(str));
		res.appendChild(document.createElement("br"));
		
		console.log(document.createTextNode(str));
		
		if (oldTemp == temp) {
			console.log("Warning: cycle detected");
			res.appendChild(document.createTextNode("Цикл!"));
			res.appendChild(document.createElement("br"));
			break;
		}
		
		counter = counter + 1;
		
		if (counter > 40) {
			res.appendChild(document.createTextNode("Warning: cycle prevention"));
			res.appendChild(document.createElement("br"));
			break;
		}
	}
	
	if (!errorFlag)
		res.appendChild(document.createTextNode("Итог: " + temp + " / " + D + " - " + ((temp % D == 0) ? "делится" : "не делится")));
	else 
		res.appendChild(document.createTextNode("Error: b = " + b + ", method not applicable"));
}