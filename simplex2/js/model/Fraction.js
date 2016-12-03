/**
 * Created by tania on 2.12.16.
 */

define([], function () {

    function applyNumber(number, canZiro) {
        number = parseFloat(number);
        number = isNaN(number) ? 0 : number;
        number = (!canZiro && number === 0) ? 1 : number;

        return number;
    }

    /**
     * @param _numerator чисельник
     * @param _denominator знаменник
     * @constructor
     */
    function Fruction(_numerator, _denominator) {
        this._numerator = applyNumber(_numerator, true);
        this._denominator = applyNumber(_denominator, false);
    }

    Fruction.prototype.getNumerator = function () {
        return this._numerator;
    };
    Fruction.prototype.getDenuminator = function () {
        return this._denominator;
    };

    return Fruction;
});