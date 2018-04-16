var N = 5;
var D = 3;
var radix = 10;

function createArray(length) {
	var arr = new Array(length || 0),
		i = length;

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

function greedy_cmp(w1, v1, w2, v2, mode) {
	if (mode == 0) // relative value
		return (v1/w1 < v2/w2);
	else if (mode == 1) // min weight
		return (w1 > w2);
	else		// max value
		return (v1 < v2);	
}

function greedy(w, v, size, res) {
	
	let ind = [1, 2];
	for (let i = 0; i < w.length; i++)
		ind[i] = i + 1;
	
	for (let m = 0; m < 3; m++) {
		
		for (let j = 0; j < w.length; j++)
			for (let i = 0; i < w.length - 1; i++)
				if (greedy_cmp(w[i], v[i], w[i+1], v[i+1], m)) {
					let temp = w[i];
					w[i] = w[i+1];
					w[i+1] = temp;				
					temp = v[i];
					v[i] = v[i+1];
					v[i+1] = temp;
					temp = ind[i];
					ind[i] = ind[i+1];
					ind[i+1] = temp;
				}
		
		if (m == 0) print_string("1) Сортировка по удельной стоимости:", res);
		else if (m == 1) print_string("2) Сортировка по минимальному весу:", res);
		else if (m == 2) print_string("3) Сортировка по максимальной стоимости:", res);
		let str_i = "i\t";
		let str_w = "w_i\t";
		let str_v = "v_i\t";
		let str_r = "r_i\t";
		for (let i = 0; i < w.length; i++) {
			str_i += ind[i] + "\t";
			str_w += w[i] + "\t";
			str_v += v[i] + "\t";
			str_r += v[i] / w[i] + "\t";
		}
		print_tab_string(str_i, res);
		print_tab_string(str_w, res);
		print_tab_string(str_v, res);
		if (m == 0) print_tab_string(str_r, res);
		let str_ans = "Ответ: ";
		let size_tmp = size;
		let sum_val = 0;
		for (let i = 0; i < w.length; i++)
			if (size_tmp - w[i] >= 0) {
				str_ans += ind[i] + " ";
				size_tmp -= w[i];
				sum_val += v[i];
			}
		print_string(str_ans + "(суммарная стоимость = " + sum_val + ")", res);
		print_string("", res);
	}
}


function dyn_prog(w, v, size, res) {
	
	print_string("4) Динамическое программирование:", res);
	
	var arr = createArray(w.length + 1, size + 1);
	var solution = createArray(w.length + 1, size + 1);
	
	for (let i = 0; i < w.length + 1; i++) {
		arr[i][0] = 0;
		solution[i][0] = " ";
	}
	for (let j = 0; j < size + 1; j++) {
		arr[0][j] = 0;
		solution[0][j] = " ";
	}
	
	var title = "\t\ti\\j\t";
	var first_line = "w_i\tv_i\t0\t";
	
	for (let j = 0; j < size + 1; j++) {
		title += j + "\t";
		first_line += "0\t";
	}
	
	print_tab_string(title, res);
	print_tab_string(first_line, res);
	
	for (let i = 1; i < w.length + 1; i++) {
		var temp_str = w[i-1] + "\t" + v[i-1] + "\t" + i + "\t0\t";
		for (let j = 1; j < size + 1; j++) {
			if (j - w[i-1] < 0) {
				arr[i][j] = arr[i-1][j];
				solution[i][j] = solution[i-1][j];
			}
			else {
				let a = arr[i-1][j];
				let b = arr[i-1][j - w[i-1]] + v[i-1];
				if (a > b) {
					arr[i][j] = a;
					solution[i][j] = solution[i-1][j];
				}
				else {
					arr[i][j] = b;
					solution[i][j] = solution[i-1][j - w[i-1]] + " " + i;
				}
			}
			temp_str += arr[i][j] + "\t";
		}
		print_tab_string(temp_str, res);
	}
	
	print_string("Ответ: " + solution[w.length][size], res);
	print_string("", res);
}