/**
 * Created by tania on 15.06.16.
 */

/**
 * @param goalFunction
 * @param matrix
 * @param basis
 * @constructor
 */
function ElementarySimplex(goalFunction, matrix, basis) {
    var self = this;
    self._option = {};
    //self._option.goalFunction = [-2, -1, 0, 0, 0];
    self._option.goalFunction = goalFunction;

    //self._option.matrix = [
    //    [-1, 1, 1, 0, 0, 2],
    //    [3, 0, -2, 1, 0, 3],
    //    [1, 0, 3, 0, 1, 12]
    //];

    self._option.matrix = matrix;

    //self._option.basis = [1, 3, 4];
    self._option.basis = basis;
}

/**
 * @returns {{status: string, goalFunction: (*|Array), matrix: (*|Array), basis: (*|Array)}}
 */
ElementarySimplex.prototype.run = function () {
    var result = {
        'status': 'go',
        'goalFunction': this._option.goalFunction,
        'matrix': this._option.matrix,
        'basis': this._option.basis
    };
    do {
        debugger;
        result = this.runIteration(result);
    } while (result['status'] === 'go');

    return result;
};

/**
 * @param option
 * @returns {{status: string, goalFunction: *, matrix: *, basis: *}}
 */
ElementarySimplex.prototype.runIteration = function (option) {
    var goalFunction = option['goalFunction'];
    var matrix = option['matrix'];
    var basis = option['basis'];

    var evaluationVector = this.findEvaluation(goalFunction, matrix, basis);
    var maxEv = this.findMaxEvaluation(evaluationVector);
    var status = 'go';
    if (maxEv !== -1) {
        var row = this.findMinX(matrix, maxEv);
        if (row !== '-') {
            matrix = this.nextTable(matrix, row, maxEv);
            if(basis[row] === maxEv){
                status = 'end';
            }
            basis[row] = maxEv;
        } else {
            status = 'unlimited';
        }
    } else {
        status = 'end';
    }
    return {
        'status': status,
        'goalFunction': goalFunction,
        'matrix': matrix,
        'basis': basis
    }
};

/**
 * @param goalFunction
 * @param matrix
 * @param basis
 * @returns {Array}
 */
ElementarySimplex.prototype.findEvaluation = function (goalFunction, matrix, basis) {
    var functionVector = new Array(goalFunction.length);
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length - 1; ++x) {
            if (!functionVector[x]) {
                functionVector[x] = 0;
            }
            functionVector[x] += goalFunction[basis[y]] * matrix[y][x];
        }
    }
    for (var i = 0; i < goalFunction.length; ++i) {
        functionVector[i] -= goalFunction[i];
    }
    return functionVector;
};

/**
 * @param vectorEvaluation
 * @returns {number}
 */
ElementarySimplex.prototype.findMaxEvaluation = function (vectorEvaluation) {
    var j = -1;
    var evaluation = -1;

    for (var i = 0; i < vectorEvaluation.length; ++i) {
        if (evaluation < vectorEvaluation[i]) {
            evaluation = vectorEvaluation[i];
            j = i;
        }
    }

    return j;
};

/**
 * @param matrix
 * @param maxEvaluation
 * @returns {string}
 */
ElementarySimplex.prototype.findMinX = function (matrix, maxEvaluation) {
    var vectorRelations = [];
    var functionLenght = 0;
    for (var y = 0; y < matrix.length; ++y) {
        functionLenght = matrix[y].length;
        if (matrix[y][maxEvaluation] <= 0) {
            vectorRelations.push('-');
        } else {
            vectorRelations.push(matrix[y][functionLenght - 1] / matrix[y][maxEvaluation]);
        }
    }

    var min = '-';
    var j = '-';
    for (var i = 0; i < vectorRelations.length; ++i) {
        if ((!isFinite(min) && isFinite(vectorRelations[i])) ||
            (isFinite(min) && isFinite(vectorRelations[i]) && min > vectorRelations[i])
        ) {
            min = vectorRelations[i];
            j = i;
        }
    }
    return j;
};

/**
 * @param matrix
 * @param row
 * @param coll
 * @returns {*}
 */
ElementarySimplex.prototype.nextTable = function (matrix, row, coll) {
    var pivotNumber = matrix[row][coll];
    for (var i = 0; i < matrix[row].length; ++i) {
        matrix[row][i] /= pivotNumber;
    }
    for (var y = 0; y < matrix.length; ++y) {
        if (y !== row) {
            var pivotRowNumber = -matrix[y][coll];
            for (var x = 0; x < matrix[y].length; ++x) {
                matrix[y][x] += matrix[row][x] * pivotRowNumber;
            }
        }
    }
    return matrix;
};

ElementarySimplex.prototype.getPoint = function(){
    var self = this;
    var point =[];
    for(var i =0; i<self._option.goalFunction.length; ++i){
        point.push(0);
    }
    for(var i =0; i<self._option.basis.length; ++i){
        point[self._option.basis[i]] = self._option.matrix[i][self._option.matrix[i].length-1];
    }
    return point;
}
