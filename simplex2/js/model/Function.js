/**
 * Created by tania on 3.12.16.
 */

define(['jquery'], function ($) {

    function Function(){
        this._arrayCKoef = [];
        this._sign = 0;
        this._b = 0;
    }

    Function.prototype.getCKoef = function(){
        return this._arrayCKoef;
    };

    Function.prototype.setCKoef = function(_cKoef){
        this._arrayCKoef = _cKoef;
        return this;
    };

    Function.prototype.getSign = function(){
        return this._sign;
    };

    Function.prototype.setSign = function(_sign){
        this._sign = _sign;
        return this;
    };

    Function.prototype.getB = function(){
        return this._b;
    };

    Function.prototype.setB = function(_b){
        this._b = _b;
        return this;
    };

    return Function;
});