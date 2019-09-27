class Graficos {
    jv = null;
    ia = null;
    casas = [];

    constructor(jv, ia) {
        this.jv = jv;
        this.ia = ia;
        // Atribuicao necessaria, pois o programa perde a referencia da palavra
        // "this", onde ocorre a definicao do "on click"
        var self = this;
        // Lista do arquivo de constantes
        idsCasas.forEach(function(id) {
            // Padrao para uso do select
            // Ex: c11 -> #c11
            id = "#" + id;
            var casa = d3.select(id);
            casa.on("click", function() {
                var casaClicada = $(this);
                var pos = casaClicada.attr("id");
                var status = self.jv.fazerJogada(pos);
                if(status == "OK") {
                    status = ia.fazerJogada();
                }
                if(status == "FIM") {
                    if(self.jv.vencedor != "NINGUEM") {
                        var mensagem = "O jogador "+self.jv.vencedor+" venceu!";
                    }
                    else {
                        var mensagem = "O jogo empatou!";
                    }
                    alert(mensagem);
                }
                self.atualizar();
            });
            self.casas.push(casa);
        });
    }

    atualizar() {
        // Indice para acessar a lista de casas do objeto graficos
        var indice = 0;
        var simbolo;
        for(let linha=0; linha<3; linha++) {
            for(let coluna=0; coluna<3; coluna++) {
                simbolo = this.jv.grade[linha][coluna];
                this.casas[indice].text(simbolo);
                indice++;
            }
        }
    }
}



//
