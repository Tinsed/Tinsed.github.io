function printMatrix(matrix, size, res) {	
	for (let i = 0; i < size; i++) {
		let str = "";
		for (let j = 0; j < size; j++) str += matrix[i][j] + " ";
		res.appendChild(document.createTextNode(str));
		res.appendChild(document.createElement("br"));
		
	}
	res.appendChild(document.createTextNode("------------------"));
	res.appendChild(document.createElement("br"));
}

function createArray(length) {
	var arr = new Array(length || 0),
		i = length;

	if (arguments.length > 1) {
		var args = Array.prototype.slice.call(arguments, 1);
		while(i--) arr[length-1 - i] = createArray.apply(this, args);
	}

	return arr;
}

function condensate(items, size, res) {
	let A_size = size;
	let B_size = size-1;
	let C_size = B_size-1;
	
	let A = items;
	let B = createArray(B_size, B_size);
	
	let counter = 0;
	
	res.appendChild(document.createTextNode("Исходная матрица (M0):"));
	res.appendChild(document.createElement("br"));
	printMatrix(A, A_size, res);
	do {
	
		B_size = A_size - 1;
		C_size = B_size - 1;
		
		if (counter == 0) {
			B = createArray(B_size, B_size);		
			for (let i = 0; i < B_size; i++)
				for (let j = 0; j < B_size; j++)
					B[i][j] = A[i][j] * A[i+1][j+1] - A[i+1][j] * A[i][j+1];
			res.appendChild(document.createTextNode("М" + ++counter + ":"));
			res.appendChild(document.createElement("br"));
			printMatrix(B, B_size, res);
		}
		
		let C = createArray(C_size, C_size);
		for (let i = 0; i < C_size; i++)
			for (let j = 0; j < C_size; j++) {
				C[i][j] = (B[i][j] * B[i+1][j+1] - B[i+1][j] * B[i][j+1]);
			}
		res.appendChild(document.createTextNode("М" + ++counter + ":"));
		res.appendChild(document.createElement("br"));
		printMatrix(C, C_size, res);
		
		
		for (let i = 0; i < C_size; i++)
			for (let j = 0; j < C_size; j++) {
				if (A[i+1][j+1] == 0) return "zero_division";
				C[i][j] /= A[i+1][j+1];
			}
		
		res.appendChild(document.createTextNode("М" + ++counter + 
			" (получена делением M" + (counter-1) + 
			" на внутреннюю часть M" + (counter - ((counter <= 3) ? 3 : 4)) +"):"));
		res.appendChild(document.createElement("br"));
		printMatrix(C, C_size, res);
		
		if (C_size == 1)
			return C[0][0];
					
		A = B;
		B = C;
			
		A_size--;
		
	} while (C_size > 1);
	return "unknown_error";
}