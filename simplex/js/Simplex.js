/**
 * Created by t.blindaruk on 17.06.16.
 */

/**
 * @param goalsFunction
 * @param matrix
 * @constructor
 */
function Simplex(goalsFunction, matrix) {
    this.goalsFunction = goalsFunction;
    this.matrix = matrix;
    this.changeGoalFunction = 0;
    this.changeMatrix = [];
}

Simplex.prototype.run = function () {
    var self = this;

    if (self.goalsFunction[self.goalsFunction.length - 1] === -1) {
        self.changeGoalFunction = 1;
        for (var i = 0; i < self.goalsFunction.length; ++i) {
            self.goalsFunction[i] = -self.goalsFunction[i];
        }
    }
    self.goalsFunction.splice(-1, 1);
    self.base = [];

    this.checkB();
    this.lessEqual();
    if (!this.moreEqualAndEqual()) {
        this.more();
    }
    this.equals();

    for (var y = 0; y < self.matrix.length; ++y) {
        self.matrix[y].splice(-2, 1);
    }
    debugger;
    for (var iy = 0; iy < self.matrix.length; ++iy) {
        for (var ix = self.matrix[iy].length - 2; ix >= 0; --ix) {
            if (self.matrix[iy][ix] === 1) {
                var count = 0;
                for (var iyy = 0; iyy < self.matrix.length; ++iyy) {
                    if (self.matrix[iyy][ix] === 1) {
                        count++;
                    }
                }
                if (count === 1) {
                    self.base.push(ix);
                    break;
                }
            }
        }
    }
    debugger;
    return {
        'matrix': self.matrix,
        'goalsFunction': self.goalsFunction,
        'base':self.base
    }

};
Simplex.prototype.getBasis = function(){
    var self  = this;
    for (var iy = 0; iy < self.matrix.length; ++iy) {
        for (var ix = self.matrix[iy].length - 2; ix >= 0; --ix) {
            if (self.matrix[iy][ix] === 1) {
                var count = 0;
                for (var iyy = 0; iyy < self.matrix.length; ++iyy) {
                    if (self.matrix[iyy][ix] === 1) {
                        count++;
                    }
                }
                if (count === 1) {
                    self.base.push(ix);
                    break;
                }
            }
        }
    }
    return self.base;
};
Simplex.prototype.checkB = function () {
    var self = this;
    for (var i = 0; i < self.matrix.length; ++i) {
        if (self.matrix[i][self.matrix[i].length - 1] < 0) {
            for (var ix = 0; ix < self.matrix[i].length; ++ix) {
                self.matrix[i][ix] = -self.matrix[i][ix];
            }
        }
    }
};

Simplex.prototype.lessEqual = function () {
    var self = this;
    for (var y = 0; y < self.matrix.length; ++y) {
        var lengthVectorY = self.matrix[y].length;
        if (self.matrix[y][lengthVectorY - 2] === -1) {
            for (var yy = 0; yy < self.matrix.length; ++yy) {
                self.matrix[yy].splice(-2, 0, ((yy === y) ? 1 : 0));
            }
            self.goalsFunction.push(0);
            self.changeMatrix.push(y);
        }
    }
};

Simplex.prototype.moreEqualAndEqual = function () {
    var self = this;
    var bestEqualIndex = -1;
    var bestEqualValue = -1;
    var vectorMore = [];

    var bestMoreIndex = -1;
    var bestMoreValue = -1;
    for (var y = 0; y < self.matrix.length; ++y) {
        var sign = self.matrix[y][self.matrix[y].length - 2];
        if (sign === 1) {
            vectorMore.push(y);
            var value = self.matrix[y][self.matrix[y].length - 1];
            if (bestMoreValue < value) {
                bestMoreIndex = y;
                bestMoreValue = value;
            }
        } else if (sign === 0) {
            var value = self.matrix[y][self.matrix[y].length - 1];
            if (bestEqualValue < value) {
                bestEqualIndex = y;
                bestEqualValue = value;
            }
        }
    }
    if (bestEqualIndex !== -1 && bestMoreIndex !== -1) {
        if (bestEqualValue < bestMoreValue) {
            var k = parseInt((bestMoreValue / bestEqualValue) + 1);
            for (var i = 0; i < self.matrix[bestEqualIndex].length; ++i) {
                self.matrix[bestEqualIndex][i] *= k;
            }
        }
        for (var y = 0; y < self.matrix.length; ++y) {
            var lengthVectorY = self.matrix[y].length;
            if (self.matrix[y][lengthVectorY - 2] === 1) {
                for (var yy = 0; yy < self.matrix.length; ++yy) {
                    self.matrix[yy].splice(-2, 0, ((yy === y) ? -1 : 0));
                }
                for (var ix = 0; ix < self.matrix[y].length; ++ix) {
                    self.matrix[y][ix] = self.matrix[bestEqualIndex][ix] - self.matrix[y][ix];
                }
                self.goalsFunction.push(0);
                self.changeMatrix.push(y);
            }
        }
        return true;
    }
    return false;
};

Simplex.prototype.more = function () {
    var self = this;
    var bestMoreIndex = -1;
    var bestMoreValue = -1;
    for (var i = 0; i < self.matrix.length; ++i) {
        if (self.matrix[i][self.matrix[i].length - 2] === 1) {
            var value = self.matrix[i][self.matrix[i].length - 1];
            if (bestMoreValue < value) {
                bestMoreIndex = i;
                bestMoreValue = value;
            }
        }
    }

    if (bestMoreIndex !== -1) {
        for (var iy = 0; iy < self.matrix.length; ++iy) {
            self.matrix[iy].splice(-2, 0, ((iy === bestMoreIndex) ? -1 : 0));
        }
        self.goalsFunction.push(bestMoreIndex);
        for (var y = 0; y < self.matrix.length; ++y) {
            if (self.matrix[y][self.matrix[y].length - 2] === 1 && y !== bestMoreIndex) {
                for (var iy = 0; iy < self.matrix.length; ++iy) {
                    self.matrix[iy].splice(-2, 0, ((iy === y) ? -1 : 0));
                }
                for (var ix = 0; ix < self.matrix[y].length; ++ix) {
                    self.matrix[y][ix] = self.matrix[bestMoreIndex][ix] - self.matrix[y][ix];
                }
                self.changeMatrix.push(y);
                self.goalsFunction.push(0);
            }
        }
    }
};
function find(array, value) {
    var result = false;
    for (var i = 0; i < array.length; ++i) {
        if (array[i] === value) {
            result = true;
            break;
        }
    }
    return result;
}
Simplex.prototype.equals = function () {
    var self = this;
    for (var y = 0; y < self.matrix.length; ++y) {
        if (!find(self.changeMatrix, y)) {
            for (var iy = 0; iy < self.matrix.length; ++iy) {
                self.matrix[iy].splice(-2, 0, (iy === y) ? 1 : 0);
            }
            self.goalsFunction.push(M);
        }
    }
}
