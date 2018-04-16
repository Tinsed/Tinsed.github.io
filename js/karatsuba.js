var A = 2401;
var B = 1221;
var radix = 10;

function setSpanValue(spanName, value) {
	let span = document.getElementById(spanName);
	let txt = document.createTextNode(value);
	span.removeChild(span.firstChild);
	span.appendChild(txt);
}

function countDig(dig) {
	return  Math.floor( Math.log(dig) / Math.LN10) + 1
}

function step(a, b, res, depth) {
	// Проверяем на элементарность
	if(a < 10 && b < 10) {
		/*res.appendChild(document.createTextNode(a + " * " + b + " = " + a * b));
		res.appendChild(document.createElement("br"));*/
		return a * b;
	}
	
	res.appendChild(document.createTextNode("--------"));
	res.appendChild(document.createElement("br"));
	
	res.appendChild(document.createTextNode(a + " x " + b));
	res.appendChild(document.createElement("br"));
	
	// Число десятичных разрядов
	var n = countDig((a > b)? a: b);
	if(n % 2 == 1) {
		n++;
	}
	
	res.appendChild(document.createTextNode("N = " + countDig((a > b)? a: b)));
	res.appendChild(document.createElement("br"));
	
	// Подготовка элементов
	var p = Math.pow(radix, n / 2);
	var A0 = Math.floor(a / p);
	var A1 = a % p;
	var B0 = Math.floor(b / p);
	var B1 = b % p;
	var C0 = A0 + A1;
	var C1 = B0 + B1;
	
	res.appendChild(document.createTextNode("A0 = " + A0 + ", A1 = " + A1));
	res.appendChild(document.createElement("br"));
	res.appendChild(document.createTextNode("B0 = " + B0 + ", B1 = " + B1));
	res.appendChild(document.createElement("br"));
	res.appendChild(document.createTextNode("C0 = " + A0 + "+" + A1 + " = " + C0));
	res.appendChild(document.createElement("br"));
	res.appendChild(document.createTextNode("C1 = " + B0 + "+" + B1 + " = " + C1));
	res.appendChild(document.createElement("br"));
	
	res.appendChild(document.createTextNode(a + " x " + b + " = "));
	res.appendChild(document.createTextNode("(" + A0 + "*" + B0 + ") " + " * " + Math.pow(radix, n) + " + "));
	res.appendChild(document.createTextNode("(" + C0 + "*" + C1 + " - " + A0 + "*" + B0 + " - " +  A1 + "*" + B1 + ")"));
	res.appendChild(document.createTextNode(" * " + p + " + "));
	res.appendChild(document.createTextNode(A1 + "*" + B1));
	
	var decomposing = (A0 >= 10 || A1 >= 10 || B0 >= 10 || B1 >= 10 || C0 >= 10 || C1 >= 10);
	if (decomposing)
		res.appendChild(document.createElement("br"));
	
	var X = step(A0, B0, res);
	var Y = step(A1, B1, res);
	var Z = step(C0, C1, res);
	var mul = X * Math.pow(radix, n) + (Z - X - Y) * p + Y;
	
	if (decomposing) {
		//res.appendChild(document.createElement("br"));
		res.appendChild(document.createTextNode("--------"));
		res.appendChild(document.createElement("br"));
		
		res.appendChild(document.createTextNode("... = "));
		res.appendChild(document.createTextNode("(" + A0 + "*" + B0 + ") " + " * " + Math.pow(radix, n) + " + "));
		res.appendChild(document.createTextNode("(" + C0 + "*" + C1 + " - " + A0 + "*" + B0 + " - " +  A1 + "*" + B1 + ")"));
		res.appendChild(document.createTextNode(" * " + p + " + "));
		res.appendChild(document.createTextNode(A1 + "*" + B1));
	}
	
	res.appendChild(document.createTextNode(
		" = " + X + " * " + Math.pow(radix, n) + 
		" + (" + Z + " - " + X + " - " +  Y + ") * " + p + 
		" + " + Y + " = " + mul));
	res.appendChild(document.createElement("br"));
	return mul;
}

function karatsuba() {
	console.log("--- Karatsuba METHOD ---");
	let res = document.getElementById("karatsubaMethodTitle");
	if (res.firstChild) 
		res.removeChild(res.firstChild);
	res.appendChild(document.createTextNode("Умножение Каратсубы"));
	
	// display hint
	res = document.getElementById("karatsubaMethodHint");
	while (res.firstChild) 
		res.removeChild(res.firstChild);
	
	res.appendChild(document.createTextNode("A = A"));
	sub_tag = document.createElement("sub");
	sub_tag.appendChild(document.createTextNode("0"));
	res.appendChild(sub_tag);
	res.appendChild(document.createTextNode(" * 10"));
	sub_tag = document.createElement("sup");
	sub_tag.appendChild(document.createTextNode("n"));
	res.appendChild(sub_tag);
	res.appendChild(document.createTextNode(" + A"));
	sub_tag = document.createElement("sub");
	sub_tag.appendChild(document.createTextNode("1"));
	res.appendChild(sub_tag);
	res.appendChild(document.createElement("br"));
	res.appendChild(document.createTextNode("B = B"));
	sub_tag = document.createElement("sub");
	sub_tag.appendChild(document.createTextNode("0"));
	res.appendChild(sub_tag);
	res.appendChild(document.createTextNode(" * 10"));
	sub_tag = document.createElement("sup");
	sub_tag.appendChild(document.createTextNode("n"));
	res.appendChild(sub_tag);
	res.appendChild(document.createTextNode(" + B"));
	sub_tag = document.createElement("sub");
	sub_tag.appendChild(document.createTextNode("1"));
	res.appendChild(sub_tag);
	res.appendChild(document.createElement("br"));
	res.appendChild(document.createTextNode("A x B = A"));
	sub_tag = document.createElement("sub");
	sub_tag.appendChild(document.createTextNode("0"));
	res.appendChild(sub_tag);
	res.appendChild(document.createTextNode("*B"));
	sub_tag = document.createElement("sub");
	sub_tag.appendChild(document.createTextNode("0"));
	res.appendChild(sub_tag);
	res.appendChild(document.createTextNode("*10"));
	sub_tag = document.createElement("sup");
	sub_tag.appendChild(document.createTextNode("2n"));
	res.appendChild(sub_tag);
	res.appendChild(document.createTextNode(" + (C"));
	sub_tag = document.createElement("sub");
	sub_tag.appendChild(document.createTextNode("0"));
	res.appendChild(sub_tag);
	res.appendChild(document.createTextNode("*C"));
	sub_tag = document.createElement("sub");
	sub_tag.appendChild(document.createTextNode("1"));
	res.appendChild(sub_tag);
	res.appendChild(document.createTextNode(" - A"));
	sub_tag = document.createElement("sub");
	sub_tag.appendChild(document.createTextNode("0"));
	res.appendChild(sub_tag);
	res.appendChild(document.createTextNode("*B"));
	sub_tag = document.createElement("sub");
	sub_tag.appendChild(document.createTextNode("0"));
	res.appendChild(sub_tag);
	res.appendChild(document.createTextNode(" - A"));
	sub_tag = document.createElement("sub");
	sub_tag.appendChild(document.createTextNode("1"));
	res.appendChild(sub_tag);
	res.appendChild(document.createTextNode("*B"));
	sub_tag = document.createElement("sub");
	sub_tag.appendChild(document.createTextNode("1"));
	res.appendChild(sub_tag);
	res.appendChild(document.createTextNode("1)*10"));
	sub_tag = document.createElement("sup");
	sub_tag.appendChild(document.createTextNode("n"));
	res.appendChild(sub_tag);
	res.appendChild(document.createTextNode(" + A"));
	sub_tag = document.createElement("sub");
	sub_tag.appendChild(document.createTextNode("1"));
	res.appendChild(sub_tag);
	res.appendChild(document.createTextNode("*B"));
	sub_tag = document.createElement("sub");
	sub_tag.appendChild(document.createTextNode("1"));
	res.appendChild(sub_tag);
	
	
	res.appendChild(document.createElement("br"));
	res.appendChild(document.createTextNode("C"));
	sub_tag = document.createElement("sub");
	sub_tag.appendChild(document.createTextNode("0"));
	res.appendChild(sub_tag);
	res.appendChild(document.createTextNode(" = A"));
	sub_tag = document.createElement("sub");
	sub_tag.appendChild(document.createTextNode("0"));
	res.appendChild(sub_tag);
	res.appendChild(document.createTextNode(" + A"));
	sub_tag = document.createElement("sub");
	sub_tag.appendChild(document.createTextNode("1"));
	res.appendChild(sub_tag);
	
	
	res.appendChild(document.createElement("br"));
	res.appendChild(document.createTextNode("C"));
	sub_tag = document.createElement("sub");
	sub_tag.appendChild(document.createTextNode("1"));
	res.appendChild(sub_tag);
	res.appendChild(document.createTextNode(" = B"));
	sub_tag = document.createElement("sub");
	sub_tag.appendChild(document.createTextNode("0"));
	res.appendChild(sub_tag);
	res.appendChild(document.createTextNode(" + B"));
	sub_tag = document.createElement("sub");
	sub_tag.appendChild(document.createTextNode("1"));
	res.appendChild(sub_tag);
	
	// clear old solution
	res = document.getElementById("karatsubaMethod");
	while(res.firstChild)
		res.removeChild(res.firstChild);

	// main calculation tree
	var result = step(A, B, res);
	
	res.appendChild(document.createElement("br"));
	res.appendChild(document.createTextNode("Итог: " + result));
}
