/**
 * Created by tania on 15.06.16.
 */

/**
 * @constructor
 */
function Input() {

}

Input.prototype.processTwoStep = function () {
    var self = this;
    $('#stepFirst').remove();
    var stepTwo = $('<div id="stepTwo">');

    var goalHtml = '<table>';
    goalHtml+='<tr>';
    for(var i =0; i<self.coll; ++i){
        goalHtml+='<th> <input id="goal' + i + '" type="text"/></th>';
    }
    goalHtml+='<td><select id="goal'+self.coll +'"><option value="-1">max</option><option value="1">min</option></select></td>';
    goalHtml+='</tr></table>';
    var tableHtml = '<table>';
    tableHtml += '<tr>';
    tableHtml += '<td></td>';
    for (var i = 0; i < this.coll; ++i) {
        tableHtml += '<td> x' + (i + 1) + '</td>';
    }
    tableHtml += '<td>знак</td>';
    tableHtml += '<td>в</td>';
    tableHtml += '</tr>';
    for (var y = 0; y < this.row; ++y) {
        tableHtml += '<tr>';
        tableHtml += '<td>f' + (y + 1) + '</td>';
        for (var x = 0; x < this.coll; ++x) {
            tableHtml += '<th><input id="cell' + y + x + '" type="text"/></th>';
        }
        tableHtml += '<td><select value = "-1" id="cell' + y + parseInt(this.coll) + '"><option value="-1"><=</option>' +
        '<option value="0">=</option>' +
        '<option value="1">>=</option></select></td>';
        tableHtml += '<td><input id="cell' + y + (parseInt(this.coll) + 1) + '" type="text"/></td>';
        tableHtml += '</tr>';

    }
    tableHtml += '</table>';
    tableHtml += '<button id="buttonTwoStep">рорахувати</button>';
    stepTwo.html(goalHtml + tableHtml);
    $('body').append(stepTwo);

    var self = this;
    $('#buttonTwoStep').on('click', function (event) {
        self.matrix = [];
        for (var y = 0; y < self.row; ++y) {
            var vector = [];
            for (var x = 0; x < parseInt(self.coll) + 2; ++x) {
                vector.push(parseFloat($('#cell' + y + x).val()));
            }
            self.matrix.push(vector);
        }
        self.goalFunction = [];
        for(var ix = 0; ix <parseInt(self.coll)+1; ++ix){
            self.goalFunction.push(parseFloat($('#goal'+ix).val()));
        }
        var simplex = new Simplex(self.goalFunction,self.matrix);
        var simplexRes = simplex.run();
        var elementarySimpelx = new ElementarySimplex(simplexRes['goalsFunction'],simplexRes['matrix'],simplexRes['base']);
        simplexRes = elementarySimpelx.run();
        switch (simplexRes['status']){
            case 'unlimited':{
                alert('функція цілі необмежена');
                break;
            }
            case 'end':{
                var result = true;
                var point = elementarySimpelx.getPoint();

                debugger;
                for(var i =0; i<simplexRes['goalFunction'].length;++i){
                    if(simplexRes['goalFunction'][i] === M && point[i]!==0){
                        result = false;
                        break;
                    }

                }
                if(result){
                    var functioPoint = 0;
                    for(var i =0; i<self.goalFunction.length; ++i){
                        functioPoint+=point[i] * simplexRes['goalFunction'][i];
                    }
                    if(self.goalFunction[self.goalFunction.length-1]===-1){
                        for(var i =0; i<point.length;++i){
                            point[i] = -point[i];
                        }
                    }
                    var resulHtml = '';
                    if(!result){
                        resulHtml = 'Нема Розв’язку';
                    }else{
                        resulHtml+='X(';
                        for(var i =0; i<self.coll; ++i){
                            resulHtml+=point[i] +',';
                        }
                        resulHtml+=') ';
                        resulHtml+='F(x)= ' + functioPoint;
                    }
                    alert(resulHtml);
                }else{
                    resulHtml = 'Нема Розв’язку оскільки не існує МПР';
                    alert(resulHtml);
                }

            }
        }
    });

};

Input.prototype.firstView = function () {
    var self = this;
    $('body').append('<div id="stepFirst"><table >' +
    '<tr><td>Ведіть кількість рівнянь</td><td><input id="row" type="text"></td></tr>' +
    '<tr><td>Ведіть кількість зміних</td><td><input id="coll" type="text"></td></tr>' +
    '</table>' +
    '<button id="buttonFirstStep">Далі</button></div>');

    $('#buttonFirstStep').on('click', function (event) {
        self.row = $('#row').val();
        self.coll = $('#coll').val();
        self.processTwoStep();
    });
};

