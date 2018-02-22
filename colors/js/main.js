/* author: mccrush.ru */

'use strict';

var selectColor; // Значение выбранного цвета
var selectVariants; // Значение количества указанных вариантов

// Обработка клика по цвету
var color1 = document.getElementById('color1');
var color2 = document.getElementById('color2');
var color3 = document.getElementById('color3');
var color4 = document.getElementById('color4');
var color5 = document.getElementById('color5');
var color6 = document.getElementById('color6');
var color7 = document.getElementById('color7');

var tdColor = document.getElementsByClassName('select-color');
for (var i = 0; i < tdColor.length; i++) {
    tdColor[i].onclick = function () {
        selectColor = this.getAttribute('id');
        color1.style.background = "#151515";
        color2.style.background = "#151515";
        color3.style.background = "#151515";
        color4.style.background = "#151515";
        color5.style.background = "#151515";
        color6.style.background = "#151515";
        color7.style.background = "#151515";
        this.style.background = 'rgb(' + valColor[selectColor] + ')';
    }
}


var setVariants = document.getElementById('setVariants');
var submit = document.getElementById('submit');
submit.onclick = function () {
    selectVariants = setVariants.value;
    for (; newTable.childElementCount;)
        newTable.removeChild(newTable.children[0]);
    result.value = "";
    outResult.innerHTML = "&nbsp";
    proverka.disabled = false;
    createTable();
}


var valColor = {
    color1: '255,0,0',
    color2: '255,128,0',
    color3: '255,255,0',
    color4: '0,255,0',
    color5: '0,255,255',
    color6: '0,0,255',
    color7: '128,0,255'
}

// Функция генерации случайных целых чисел от Мин до Макс
function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

// Функция возврата массива с уникальными значениями
function unique(arr) {
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        var str = arr[i];
        obj[str] = true; // запомнить строку в виде свойства объекта
    }
    return Object.keys(obj); // или собрать ключи перебором для IE8-
}

var realLength;
// Функция постраения таблицы со случайными оттенками
function createTable() {
    var sizesTable = [[1, 2], [2, 2], [2, 3], [2, 4], [2, 5], [3, 4], [4, 4], [4, 8]];
    var rsTable = sizesTable[selectVariants][0];
    var csTable = sizesTable[selectVariants][1];
    var newTable = document.getElementById('newTable');


    console.log('Количество\n\t\tстрок: ' + rsTable + '\n\t столбцов: ' + csTable);

    var valOtten = randomInteger(1, rsTable * csTable);
    console.log('\t оттенков: ' + valOtten);
    var stepOtten = Math.round(100 / valOtten);
    console.log('Шаг изменения цвета: ' + stepOtten);

    // Заполним массив по количеству получившихся оттенков с шагом
    var masOtten = [];
    for (var i = 1; i < 100; i += stepOtten) {
        var newI = i < 10 ? i + '0' : i;
        masOtten.push('0.' + newI);
    }
    console.log('Длина получившегося массива: ' + masOtten.length);
    console.log(masOtten);

    // Затем будем случайным образом выбирать получившиеся оттенки 
    //и подставлять в качестве фона ячеек в создаваемую таблицу

    // Массив для сохранения реальных выводов цветов на экран
    var realColor = [];

    // Строим таблицу
    for (var i = 0; i < rsTable; i++) {
        var isTr = document.createElement('tr');
        for (var j = 0; j < csTable; j++) {
            var nasishen = masOtten[randomInteger(0, masOtten.length - 1)];
            realColor.push(nasishen);
            var isTd = document.createElement('td');
            isTd.style.background = 'rgba(' + valColor[selectColor] + ',' + nasishen + ')';
            isTd.innerHTML = '<span class="showPercent">' + nasishen.substr(2) + '%</span>';
            isTr.appendChild(isTd);
        }
        newTable.appendChild(isTr);
    }

    // Реальный массив значений оттенков
    console.log('Реальный массив значений оттенков:\n\t' + realColor);
    realLength = unique(realColor).length;
    console.log('Реальное значение количества оттенков:\n\t' + realLength);
}

var result = document.getElementById('result');
var proverka = document.getElementById('proverka');
var outResult = document.getElementById('outResult');

// Склонение "лишних оттенков"
function decOtt(diff) {
    var l, o;
    l = (diff === 1) ? 'лишний' : 'лишних';

    if ([11, 12, 13, 14].includes(diff % 100))
        o = 'оттенков';
    else if (diff % 10 === 1)
        o = 'оттенок';
    else if ([2, 3, 4].includes(diff % 10))
        o = 'оттенка';
    else if ([5, 6, 7, 8, 9, 0].includes(diff % 10))
        o = 'оттенков';

    return diff + ' ' + l + ' ' + o;
}

proverka.onclick = function() {
	if( newTable.childElementCount === 0 || result.value === "" ) return false;
    this.disabled = true;
    if (result.value <= realLength)
        outResult.innerHTML = 'Вы различили '+result.value+' из '+realLength+' оттенков';
    else
        outResult.innerHTML = 'Вы различили '+decOtt(result.value-realLength)+' ['+result.value+'/'+realLength+']';

    var spanShowPercent = document.getElementsByClassName('showPercent');
    for (var i = 0; i < spanShowPercent.length; i++) {
		spanShowPercent[i].style.opacity = '1';
    }
}