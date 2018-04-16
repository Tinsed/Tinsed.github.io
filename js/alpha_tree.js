var N = 5;
var D = 3;
var radix = 10;

function createArray(length) {
	var arr = new Array(length || 0), i = length;
	if (arguments.length > 1) {
		var args = Array.prototype.slice.call(arguments, 1);
		while(i--) arr[length-1 - i] = createArray.apply(this, args);
	}
	return arr;
}

function print_string(str, res) {
	res.appendChild(document.createTextNode(str));
	res.appendChild(document.createElement("br"));
}

function print_tab_string(str, res) {
	let pretext = document.createElement("pre");
	pretext.appendChild(document.createTextNode(str));
	res.appendChild(pretext);
}

function brackets(weight, cost, size) {
	
}

function alpha_tree(w, res) {
	print_string("Пирамида МмМ:", res);
	
	var weight = createArray(w.length, w.length);
	var cost = createArray(w.length, w.length);
	
	// Заполняем первую строку таблицы
	var first_str = "n0\tw\t";
	var second_str = "\tc\t";
	for (let i = 0; i < w.length; i++) {
		cost[0][i] = 0;
		weight[0][i] = w[i];
		first_str += weight[0][i] + "\t";
		second_str += cost[0][i] + "\t";
	}
	print_tab_string(first_str, res);
	print_tab_string(second_str, res);
	

	// Цикл по строкам
	for (let i = 1; i < w.length; i++) {
		var temp_str1 = "n" + i + "\tw\t";
		var temp_str2 = "\tс\t";
		for (let j = 0; j < i; j++) {
			temp_str1 += "    ";
			temp_str2 += "    ";
		}
		for (let j = 0; j < w.length - i; j++) {
			// Считаем вес
			weight[i][j] = 0;
			for(let k = j; k < j + i + 1; k++) {
				weight[i][j] += weight[0][k];
			}
			// Считаем цену
			let min = cost[i - 1][j] + cost[0][i + j];
			for(let k = 1; k < i; k++){
				let val = cost[i - 1 - k][j] + cost[k][i + j - k];
				if (min > val) {
					min = val; 
				}
			}
			cost[i][j] = min + weight[i][j];
			
			temp_str1 += weight[i][j] + "\t" + ((i % 2 == 0)?"":"    ");			
			temp_str2 += cost[i][j] + "\t" + ((i % 2 == 0)?"":"    ");
		}
		print_tab_string(temp_str1, res);
		print_tab_string(temp_str2, res);
	}
	
	// Расставляем скобки
	let str = brackets(weight, cost, w.length);
	
	//print_string("Ответ: " + solution[weight.length][size], res);
	print_string("", res);
}