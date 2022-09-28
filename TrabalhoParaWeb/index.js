var port_n1 = $("#port_nota1")
var port_n2 = $("#port_nota2")
var port_n3 = $("#port_nota3")
var port_n4 = $("#port_nota4")
let port_mediaAnual = $("#port_mediaAnual");
let port_label_exame = $("#port_exame");
let port_exame_nota = $("#port_exame_nota");
let port_resultado = $("#port_resultado");

var mat_n1 = $("#mat_nota1")
var mat_n2 = $("#mat_nota2")
var mat_n3 = $("#mat_nota3")
var mat_n4 = $("#mat_nota4")
let mat_mediaAnual = $("#mat_mediaAnual");
let mat_label_exame = $("#mat_exame");
let mat_exame_nota = $("#mat_exame_nota");
let mat_resultado = $("#mat_resultado");

var hist_n1 = $("#hist_nota1")
var hist_n2 = $("#hist_nota2")
var hist_n3 = $("#hist_nota3")
var hist_n4 = $("#hist_nota4")
let hist_mediaAnual = $("#hist_mediaAnual");
let hist_label_exame = $("#hist_exame");
let hist_exame_nota = $("#hist_exame_nota");
let hist_resultado = $("#hist_resultado");

var geo_n1 = $("#geo_nota1")
var geo_n2 = $("#geo_nota2")
var geo_n3 = $("#geo_nota3")
var geo_n4 = $("#geo_nota4")
let geo_mediaAnual = $("#geo_mediaAnual");
let geo_label_exame = $("#geo_exame");
let geo_exame_nota = $("#geo_exame_nota");
let geo_resultado = $("#geo_resultado");

var ing_n1 = $("#ing_nota1")
var ing_n2 = $("#ing_nota2")
var ing_n3 = $("#ing_nota3")
var ing_n4 = $("#ing_nota4")
let ing_mediaAnual = $("#ing_mediaAnual");
let ing_label_exame = $("#ing_exame");
let ing_exame_nota = $("#ing_exame_nota");
let ing_resultado = $("#ing_resultado");


const materias = {
    calcularMedias: function(n1, n2, n3, n4, media_anual, label_exame, exame_nota, resultado){
        let checar_notas = true;
    
        if(n1.val().length == 0 || n2.val().length == 0 || n3.val().length == 0 || n4.val().length == 0 ){
            checar_notas = false;
            media_anual.text('');
        }
        if((n1.val() <  0 || n1.val() > 10) || (n2.val() <  0 || n2.val() > 10) ||  (n3.val() <  0 || n3.val() > 10) ||  (n4.val() <  0 || n4.val() > 10)){
            alert("As notas informadas estão invalidas. Nota minima: 0; Nota maxima: 10");
            return false;
        }

        if(checar_notas){
            let notas = operacoes.adicionarNotasArray(n1.val(), n2.val(), n3.val(), n4.val());
            let mediaAnual = parseFloat(operacoes.somar(notas) / 4);
            media_anual.text(mediaAnual.toString());

            if(mediaAnual < 4) media_anual.css("background-color", "red");
            else media_anual.css("background-color", "dodgerblue");
            
            let resultadoParcial = operacoes.resultadoParcial(mediaAnual);
            
            operacoes.verificar(resultadoParcial, label_exame, exame_nota, resultado);
        }
    },
    finalizar: function(label_exame, mediaAnual, exame_nota, rresultado){
        if(label_exame.text() == 'Sim'){
            let resultado = operacoes.resultadoFinal(mediaAnual.text(), exame_nota.val());
            if(resultado < 5){
                operacoes.verificar('Reprovado', label_exame, exame_nota, rresultado);
                label_exame.text('Sim');
            }else{
                operacoes.verificar('Aprovado', label_exame, exame_nota, rresultado);
                label_exame.text('Sim');
            }
        }
    }
}

const operacoes = {
    adicionarNotasArray: function(n1, n2, n3, n4){
        let arrayNotas = [];
        arrayNotas.push(parseFloat(n1));
        arrayNotas.push(parseFloat(n2));
        arrayNotas.push(parseFloat(n3));
        arrayNotas.push(parseFloat(n4));
        return arrayNotas;
    },
    somar: function(notas){
        let soma = 0;
        for(var i=0; i < notas.length; i++){
            soma = soma + notas[i];
        }
        return soma;
    },
    resultadoParcial: function(mediaAnual){
        if(mediaAnual < 4) return 'Reprovado';
        else if(mediaAnual >= 4 && mediaAnual < 7) return 'Exame';
        else return 'Aprovado';
    },
    verificar: function(resultadoParcial, label_exame, exame_nota, resultado){
        if(resultadoParcial === 'Reprovado') {
            label_exame.text('Não');
            label_exame.css("color", "black");
            resultado.text('Reprovado');
            resultado.css("background-color", "red");
        }else if(resultadoParcial === 'Exame'){
            label_exame.text('Sim');
            exame_nota[0].hidden = false;
            label_exame.css("color", "black");
        }else{
            label_exame.text('Não');
            label_exame.css("color", "black");
            resultado.text('Aprovado');
            resultado.css("background-color", "dodgerblue");
        }
    },
    resultadoFinal: function(mediaAnual, exame_nota){
        let soma = parseFloat(+mediaAnual + +exame_nota);
        let notaFinal = parseFloat(soma / 2);
        return notaFinal;
    }
}

$("#btnCalcularMedias").click(function(){
    materias.calcularMedias(port_n1, port_n2, port_n3, port_n4, port_mediaAnual, port_label_exame, port_exame_nota, port_resultado);
    materias.calcularMedias(mat_n1, mat_n2, mat_n3, mat_n4, mat_mediaAnual, mat_label_exame, mat_exame_nota, mat_resultado);
    materias.calcularMedias(hist_n1, hist_n2, hist_n3, hist_n4, hist_mediaAnual, hist_label_exame, hist_exame_nota, hist_resultado);
    materias.calcularMedias(geo_n1, geo_n2, geo_n3, geo_n4, geo_mediaAnual, geo_label_exame, geo_exame_nota, geo_resultado);
    materias.calcularMedias(ing_n1, ing_n2, ing_n3, ing_n4, ing_mediaAnual, ing_label_exame, ing_exame_nota, ing_resultado);
});

$("#btnFinalizar").click(function(){
    materias.finalizar(port_label_exame, port_mediaAnual, port_exame_nota, port_resultado);
    materias.finalizar(mat_label_exame, mat_mediaAnual, mat_exame_nota, mat_resultado);
    materias.finalizar(hist_label_exame, hist_mediaAnual, hist_exame_nota, hist_resultado);
    materias.finalizar(geo_label_exame, geo_mediaAnual, geo_exame_nota, geo_resultado);
    materias.finalizar(ing_label_exame, ing_mediaAnual, ing_exame_nota, ing_resultado);
});