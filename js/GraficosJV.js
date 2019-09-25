class GraficosJV {
    jv = null;
    casas = [];

    constructor(jv) {
        this.jv = jv;
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
                var pos = $(this).attr("id");
                var status = self.jv.fazerJogada(pos);
                if(status) {
                    $(this).text(self.jv.simboloDaVez);
                    self.jv.trocarSimboloDaVez();
                    self.jv.imprimirJogo();
                }
            });
            self.casas.push(casa);
        });
    }
}

//
