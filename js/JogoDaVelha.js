class JogoDaVelha {
    grade = [];
    simboloDaVez = "x";
    // Copia a lista do arquivo de constantes
    jogadasDisponiveis = idsCasas.slice();

    constructor() {
        for(let linha=0; linha<3; linha++) {
            this.grade.push(["-", "-", "-"]);
        }
    }

    trocarSimboloDaVez() {
        if(this.simboloDaVez == "x") {
            this.simboloDaVez = "o";
        }
        else {
            this.simboloDaVez = "x";
        }
    }

    jogadasDisponivel(jogada) {
        if(this.jogadasDisponiveis.includes(jogada)) {
            var indice = this.jogadasDisponiveis.indexOf(jogada);
            delete this.jogadasDisponiveis[indice];
            return true;
        }
        else {
            return false;
        }
    }

    // Recebe uma entrada do tipo "c01", extraindo o "0" e o "1"
    processar_jogada(jogada) {
        var linha, coluna;
        linha = jogada.substring(1, 2);
        coluna = jogada.substring(2, 3);
        var coordenadas = {linha: linha, coluna: coluna};
        return coordenadas;
    }

    fazerJogada(jogada) {
        if(this.jogadasDisponivel(jogada)) {
            var coordenadas = this.processar_jogada(jogada);
            var linha = coordenadas["linha"];
            var coluna = coordenadas["coluna"];
            this.grade[linha][coluna] = this.simboloDaVez;
            return true;
        }
        else {
            return false;
        }
    }

    imprimirJogo() {
        var retorno = "";
        for(let linha=0; linha<3; linha++) {
            for(let coluna=0; coluna<3; coluna++) {
                retorno += this.grade[linha][coluna];
                retorno += "   ";
            }
            retorno += "\n";
        }
        alert(retorno);
    }
}

jv = new JogoDaVelha();
jv.imprimirJogo();

i = new GraficosJV(jv);
i.casas[6].text("trollei!");

n1 = new Noh("1");

n2 = new Noh("2");
n3 = new Noh("3");
n1.adicionarFilhos([n2, n3]);

n4 = new Noh("4");
n2.adicionarFilhos([n4]);

a = new Arvore(n1);
a.imprimir();

//
