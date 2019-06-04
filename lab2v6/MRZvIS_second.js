/////////////////////////////////////////////////////////////////////////////////////////
// Лабораторная работа №2 по дисциплине МРЗвИС
// Выполнена студентом группы 721702
// БГУИР Каленик Павел Романович
//
// Вариант 5
//
// 25.05.2019
//
// Подсчёт Lavg, Lsum взят из книги Карцев М.А., Брик В.А. Вычислительные системы и синхронная арифметика. – М: Радио и связь, 1981. – 360с. на странице 19.
// Реализация подсчёта Lavg взята из лабораторной работы №2 студента Икбаев Е.
// Основные методы для создания таблицы взяты из ресурса: http://www.w3schools.com/js/

var timeSum = 0;
var timeDiff = 0;
var timeMult = 0;
var timeDiv = 0;
var timeCompare = 0;

var countSum = 0;
var countDiff = 0;
var countMult = 0;
var countDiv = 0;
var countCompare = 0;

var counterOfnotAndF = 0;
var counterOfnotOrD = 0;
var counterOfimplicationAandB = 0;
var counterOfimplicationBandA = 0;
var counterOfmaxFandD = 0;

var r = 0;
var T1 = 0;
var Tn = 0;
var Ky = 0;
var e = 0;
var D = 0;
var Lsum = 0;
var Lavg = 0;


var matrixA;
var matrixB;
var matrixE;
var matrixG;
var matrixC;

var m;
var p;
var q;
var n;

var f;
var d;

function main(){
    m = +document.getElementById("m").value;
    p = +document.getElementById("p").value;
    q = +document.getElementById("q").value;

    timeSum = +document.getElementById("sum").value;
    timeDiff = +document.getElementById("dif").value;
    timeMult = +document.getElementById("mul").value;
    timeCompare = +document.getElementById("com").value;
    timeDiv =+document.getElementById("div").value;

    n = +document.getElementById("n").value;

    r = p * q * m;

    matrixA = setMatrix(p, m);
    drawTable(matrixA, p, m, "a");

    matrixB = setMatrix(m, q);
    drawTable(matrixB, m, q, "b");

    matrixE = setMatrix(1, m);
    drawTable(matrixE, 1, m, "e");

    matrixG = setMatrix(p, q);
    drawTable(matrixG, p, q, "g");

    d = calculateDijk();
    f = calculateFijk();

    matrixC = calculateCij();
    drawTable(matrixC, p, q, "c");

    T1 = timeSum * countSum + timeDiff * countDiff + timeMult * countMult + timeDiv * countDiv + timeCompare * countCompare;

    Lsum = Tn;

    Ky = T1 / Tn;

    e = Ky / n;

    Lavg += (7 * timeMult + 2 * timeSum + 3 * timeDiff) * p * q; //C
    Lavg += (7 * timeMult + 2 * timeSum + 3 * timeDiff) * r;
    Lavg += timeMult * r;
    Lavg += timeMult * (m - 1) * counterOfnotAndF; //~f
    Lavg += (timeDiff * (m + 1) + timeMult * (m - 1)) * counterOfnotOrD; //~d
    Lavg += (timeDiff + timeMult + timeCompare) * counterOfmaxFandD; //max f d
    Lavg += (timeDiv + timeDiff) * counterOfimplicationAandB; //a->b
    Lavg += (timeDiv + timeDiff) * counterOfimplicationBandA;   //b->a
    Lavg /= r;

    D = Lsum / Lavg;

    var timeTable = [["Operation", "Sum", "Difference", "Multiplicity", "Division", "Comparing"], ["Total time", timeSum * countSum, timeDiff * countDiff, timeMult * countMult, timeDiv * countDiv, timeCompare * countCompare]];
    drawTable(timeTable, 2, 6, "timeTable");
    
    var dataTable = [["n", "r", "T1", "Tn", "Ky", "e", "Lsum", "Lavg", "D"], [n, r, T1, Tn, Ky, e, Lsum, Lavg, D]];
    drawTable(dataTable, 2, 9, "dataTable");
}

function setMatrix(rows, columns) {
    var matrix = [];
    for (var row = 0; row < rows; row++) {
        matrix[row] = [];
        for (var column = 0; column < columns; column++) {
            matrix[row][column] = Math.random() * (1 + 1) - 1;
        }
    }
    return matrix;
}

function drawTable(information, rows, columns, tableName) {
    var table = document.getElementById(tableName);
    for (var row = 0; row < rows; row++) {
        table.insertRow(-1);
    	for (var column = 0; column < columns; column++) {
            table.rows[row].insertCell(-1);
            table.rows[row].cells[column].innerText = information[row][column];
        }
    }
}

function calculateCij() {
    var cij = [];
    var operationTime = 0;
    for (var i = 0; i < p; i++) {
        cij[i] = [];
        for (var j = 0; j < q; j++) {
            cij[i][j] = notAndF(i, j) * (3 * matrixG[i][j] - 2) * matrixG[i][j] + (notOrD(i, j) + (4 * maxFandD(i, j) - 3 * notOrD(i, j)) * matrixG[i][j]) * (1 - matrixG[i][j]);
            countMult += 7;
            countDiff += 3;
            countSum += 2;
        }
    }
    
    operationTime = (7 * timeMult + 3 * timeSum + 4 * timeDiff + 2 * (m - 1) * timeMult + 3 * (timeDiff * (m + 1) + timeMult * (m - 1)) + timeCompare) * Math.ceil(p * q / n);
    Tn += operationTime;
    return cij;
}
function deltaCalculation(a, b) {
    countDiff++;
    countDiv++;
    counterOfimplicationAandB++;
    return b / (1 - a);
  }
  
function calculateFijk() {
    var fijk = [];
    var operationTime = 0;
    for (var i = 0; i < p; i++) {
        fijk[i] = [];
        for (var j = 0; j < q; j++) {
            fijk[i][j] = [];
            for (var k = 0; k < m; k++) {
                fijk[i][j][k] = deltaCalculation(matrixA[i][k], matrixB[k][j]) * (2 * matrixE[0][k] - 1) * matrixE[0][k] + deltaCalculation(matrixB[k][j], matrixA[i][k]) * (1 + (4 * deltaCalculation(matrixA[i][k], matrixB[k][j]) - 2) * matrixE[0][k]) * (1 - matrixE[0][k]);
                countMult += 7;
                countDiff += 3;
                countSum +=2;
            }
        }
    }
    operationTime = (7 * timeMult + 2 * timeSum + 4 * timeDiff + timeDiv) * Math.ceil(p * q * m / n);
    Tn += operationTime;
    return fijk;
}

function calculateDijk() {
    var dijk = [];
    var operationTime = 0;
    for (var i = 0; i < p; i++) {
        dijk[i] = [];
        for (var j = 0; j < q; j++) {
            dijk[i][j] = [];
            for (var k = 0; k < m; k++) {
                dijk[i][j][k] = matrixA[i][k] * matrixB[k][j];
                countMult++;
            }
        }
    }
    operationTime = timeMult * Math.ceil(p * q * m / n);
    Tn += operationTime;
    return dijk;
}

function notAndF(i, j) {
    var result = 1;
    for (var k = 0; k < m; k++) {
        result *= f[i][j][k];
    }
    counterOfnotAndF++;
    countMult += m - 1;
    return result;
}

function notOrD(i, j) {
    var result = 1;
    for (var k = 0; k < m; k++) {
        result *= 1 - d[i][j][k];
    }
    counterOfnotOrD++;
    countMult += m - 1;
    countDiff += +m + 1;
    return 1 - result;
}

function maxFandD(i, j) {
    var result = 0;
    result = notAndF(i, j) + notOrD(i, j) - 1;
    countDiff++;
    countSum++;
    countCompare++;
    counterOfmaxFandD++;
    if (result >= 0) return result;
    else return 0;
}
