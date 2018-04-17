let bounds = [];

let currentNode = {};
let answer = {};
let max = -1;
let res;

const branchAndBound = (w, v, limitWeight, _res) => {
    answer = {};
    bounds = [];
    max = -1;
    res = _res;

    let arr = [];
    for(let i = 0; i < w.length; i++){
        arr[i] = {w: w[i], v: v[i], vw: v[i]/w[i]};
    }
    arr.sort((a, b) => b.vw-a.vw);

    let data = {};
    data.values = arr.map(el => el.v);
    data.weights = arr.map(el => el.w);
    data.limitWeight = limitWeight;
    for(let i = data.values.length - 1; i >= 0; i--){
        bounds = [data.values[i] + (bounds[0] || 0)].concat(bounds);
    }

    printInputData(arr);
    print_string("");
    print_string("Решение:");
    deepDarkFantasies([], 0, data.weights, data.values, data.limitWeight);

    print_string("");
    print_string("Ответ:");
    printCurrentPosition(answer, answer.length);
};

const printInputData = (arr) =>{
    function print_tab_string(str) {
        let pretext = document.createElement("pre");
        pretext.appendChild(document.createTextNode(str));
        res.appendChild(pretext);
    }

    print_string("Отсортированные входные данные:");
    let str = "i:\t";
    arr.forEach((item, index) => str+=`${index + 1}\t`);
    print_tab_string(str);
    str = "w:\t";
    arr.forEach((item) => str+=`${item.w}\t`);
    print_tab_string(str);
    str = "v:\t";
    arr.forEach((item) => str+=`${item.vw}\t`);
    print_tab_string(str);
};

const validate = (tempArr,weights,limitWeight) => {
    let tempWeight = 0;

    for(let i = 0; i < tempArr.length ; i++){
        if(tempArr[i] === 1){
            tempWeight += weights[i]
        }
    }

    if(tempWeight > limitWeight) return false;
    return true;
};

const validateBound = (tempArr, values, bounds) => {
    let sumValue = 0;
    for(let i = 0; i < tempArr.length; i++){
        if(tempArr[i] === 1){
            sumValue += values[i];
        }
    }
    if(max > sumValue + bounds[tempArr.length-1]) return false;
    return true;
};


const deepDarkFantasies = (tempArr, index, weights, values, limitWeight) => {
    let result = validate(tempArr,weights,limitWeight);
    printLog(tempArr, weights, values, index, limitWeight);
    printCurrentPosition(tempArr, weights.length);
    if(!result){ print_string("СТОП! Переполнение! Шаг наверх");return }

    // Мы на дне
    if(index === weights.length){
        let sumWeight = 0;
        let sumValue = 0;

        for(let i = 0; i < tempArr.length; i++){
            if(tempArr[i] === 1){
                sumWeight += weights[i];
                sumValue += values[i];
            }
        }

        //сетапим максимум
        if(sumWeight <= limitWeight && sumValue > max ){
            max = Math.max(max, sumValue);
            answer = tempArr.slice();
        }

        print_string("Дно!");
        return;
    }

    result = validateBound(tempArr,values,bounds);
    if(!result){ print_string("СТОП! Нарушение границ!");return }

    if(currentNode.U <= max) { print_string("СТОП! Существует более хорошая U чем на этом уровне (" +index+")");return }

    deepDarkFantasies(tempArr.concat(1),index+1, weights, values, limitWeight);
    deepDarkFantasies(tempArr.concat(0),index+1, weights, values, limitWeight);
};

const printLog = (tempArr, weights, values, index, limitWeight) =>{
    print_string("");
    let sumWeight=0, sumValue=0;
    for(let i = 0; i < tempArr.length; i++){
        if(tempArr[i] === 1){
            sumWeight += weights[i];
            sumValue += values[i];
        }
    }
    currentNode.W = sumWeight;
    currentNode.V = sumValue;
    currentNode.U = sumValue + (limitWeight - sumWeight) * (values[index]/weights[index]);
    if(index === weights.length)  currentNode.U = sumValue;
    print_node(currentNode);
};

const print_node = (currentNode) => {
    let str = `W=${currentNode.W}, V=${currentNode.V} | U=${currentNode.U}`;
    print_string(str);
};

const print_string = (str) => {
    res.appendChild(document.createTextNode(str));
    res.appendChild(document.createElement("br"));
};

const printCurrentPosition = (tempArr, length) =>{
    let str = "Состояние рюкзака: ";
    for(let i = 0; i < length; i++){
        for(; i < tempArr.length; i++)
            str += (tempArr[i]===1?'+':'-') + (i+1)+" ";
        if(length !== tempArr.length)str += "* ";
    }
    print_string(str);
};
