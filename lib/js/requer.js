
var url = "http://roberval.chaordicsystems.com/challenge/challenge.json";

var getJson = function (url, successHandler, errorHandler) {
    var data;
    var http = new XMLHttpRequest();
    http.open("GET", url, true);

    http.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            var jsonReq = http.responseText;

            /**TRATAMENTO DO JSON*/
            jsonReq = jsonReq.replace("X(","");
            jsonReq = jsonReq.replace(");", "");
            /* FIM DE TRATAMENTO */

            data = JSON.parse(jsonReq);
            successHandler && successHandler(data);
        } else {
            errorHandler && errorHandler(status);
        }

    };
    http.send();
};

getJson(url, function (data) {
    for (x in data.data.recommendation) {
        //console.log("JSON Recomendation:");
        //console.log(data.data.recommendation);

        function criarTabela(x) {
            var tabela = document.createElement("table");
            var thead = document.createElement("thead");
            var tbody=document.createElement("tbody");

            var thd=function(i){return (i==0)?"th":"td";};

            for (var i=0;i<x.length;i++) {
              var tr = document.createElement("tr");
              for(var o=0;o<x[i].length;o++){
                var t = document.createElement(thd(i));
                var texto=document.createTextNode(x[i][o]);
                t.appendChild(texto);
                tr.appendChild(t);
              }
              (i==0)?thead.appendChild(tr):tbody.appendChild(tr);
            }
            tabela.appendChild(thead);
            tabela.appendChild(tbody);
            return tabela;
          }
          document.getElementById("tabela").appendChild(criarTabela([
            [data.data.recommendation[x].imageName],
            [data.data.recommendation[x].businessId],
            [data.data.recommendation[x].name],
            [data.data.recommendation[x].oldPrice],
            [data.data.recommendation[x].price],
            [data.data.recommendation[x].productInfo.paymentConditions],

            // Captura o evento load da página
            window.onload=function(){
                // Localiza os elementos com o nome imagem
                var img = document.getElementsByTagName('imageName');
                
                // Laço para percorrer as imagens
                for ( var i = 0; i < img.length; i++ ) {
                    // Altera a url de todas as imagens
                    img.src = "http:" + data.data.recommendation[x].imageName;
                }
            }  
            
          ]));
    }

}, function (status) {
    //console.log(status);
});

const newLocal = "reference-paymentConditions";
getJson(url, function (data) {
    for (x in data.data.reference) {
        //console.log("JSON REFERENCE");
        //console.log(data.data.reference[x]);
        document.getElementById("reference-businessId").innerHTML = data.data.reference[x].businessId;
        document.getElementById("reference-name").innerHTML = data.data.reference[x].name;
        document.getElementById("reference-price").innerHTML = data.data.reference[x].price;
        //document.getElementById("reference-paymentConditions").innerHTML = data.data.reference[x].productInfox.paymentConditions;
    }

}, function (status) {
    //console.log(status);
});

getJson(url, function (data) {
        //console.log("JSON COMPLETO:");
        //console.log(data);

}, function (status) {
    //console.log(status);
});