// Лабораторная работа №1 по дисциплине МРЗвИС
// Выполнена студенткой группы 721702
// БГУИР Феденко Екатерина Сергеевна

// Вариант 1: Aлгоритм вычисления произведения пары 4-разрядных 
// чисел умножением с младших разрядов со сдвигом множимого влево	

// 13.05.2019
// Операция умножения : учебник "Организация ЭВМ и систем"
// Методы для работы с DOM взяты из ресурса: http://learn.javascript.ru/document
// Методы для создания таблицы взяты из ресурса: https://www.w3schools.com/jsref/coll_table_rows.asp

var A, B, time;
var mult, sum, power;
var tableCell, column;

function main() {
	/*Получаем значения 1-го и 2-го векторов и время выполнения*/
	var A_vector = document.getElementById('A').value.split(' ');
	var B_vector = document.getElementById('B').value.split(' ');
	time = document.getElementById('time').value;
	time = parseInt(time, 10);
	const max_size = 4;

	/*Валидность введенных данных*/
	for(var i = 0; i < A_vector.length; i++) {
		if(isNaN(time) || time == 0 || time < 0 || isNaN(A_vector[i]) || isNaN(B_vector[i]) || 
			A_vector[i] > 15 || B_vector[i] > 15 || A_vector.length != B_vector.length) {
				alert("Введены некорректные данные");
				return;
			}
	}
	/*Формируем таблицу*/
	var tableRows = 5 + B_vector.length;
	var tableColumns = max_size + 2;
	
	tableCell = new Array(tableRows);
	for(var i = 0; i < tableCell.length; i++) {
		tableCell[i] = new Array(tableColumns);
		for(var j = 0; j < tableCell[i].length; j++) {
			tableCell[i][j] = "";
		}
	}
	
	/*Заполняем таблицу*/
	tableCell[0][0] = "Исходные данные:";
	for(var i = 0; i < max_size; i++) {
		tableCell[0][i+1] = (i+1) + " этап";
	}
	tableCell[0][max_size + 1] = "Результат:";

	for(var i = 0; i < A_vector.length; i++) {
		tableCell[i + 1][0] = (i+1) + " пара: <br>Множимое = " + A_vector[i] + "<sub>10</sub>" + 
		" или " + rank(parseInt(A_vector[i], 10).toString(2), 4) +
		"<sub>2</sub>" + "<br> Множитель = " + B_vector[i] + "<sub>10</sub>" + 
		" или " + rank(parseInt(B_vector[i], 10).toString(2), 4) + "<sub>2</sub>";
	}
	
	for(var i = 0; i < A_vector.length; i++) {
		mult = 0;
		sum = 0;
		A = parseInt(A_vector[i], 10); 
		B = parseInt(B_vector[i], 10);
		power = 0;
		column = 0;
		for(var j = max_size-1; j >= 0 ; j--){
			multiplication(i,j);
			power++;
			column++;
		}
		tableCell[i + max_size + 1][max_size + 1] = "Произведение = " + sum + "<sub>10</sub> или " + 
		rank(sum.toString(2), 8) + "<sub>2</sub>.";
	}
	/*Создаем таблицу и заполняем ее полученными данными*/
	document.write('<h1>'+"Результат операции"+'</h1>');
	document.write('<table id = "table" border = "1"');
	for (var i = 0; i < tableRows; i++) {
		document.write('<tr>');
		for (var j=0; j< tableColumns; j++) {
			document.write('<td>'+ '<br>' +'</td>');
		}
		document.write('</tr>');
	}
	document.write('</table>');

	var table = document.getElementById("table");
	for (var i = 0; table.rows[i]; i++) {
		for (var j = 0; table.rows[i].cells[j]; j++) {
			col = table.rows[i].cells[j];
			col.innerHTML = tableCell[i][j];
		}  
	}
}

function multiplication(i,j) {
	var B_binary= rank(B.toString(2), 4);
	mult = A * parseInt(B_binary[j], 10) * Math.pow(2, power);
	sum += mult;
	tableCell[i + column + 1][column + 1] = "B<sub>" + column.toString() + "</sub> = " + B_binary[j] + 
	"<br>Частичное произведение = " + rank(mult.toString(2), 8) + ";" + 
	"<br>Частичная сумма = " + rank(sum.toString(2), 8) + ";" + 
	"<br>Время : " + (time*(i+1) + time*column);
	mult = 0;
	return tableCell[i + column + 1][column + 1];
}

function rank(binary, size) {
	while(binary.length < size) {
		binary = "0" + binary;
	}	
	return binary;
}
