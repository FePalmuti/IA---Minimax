class JogoDaVelha {
    grade = [];
    simboloDaVez = "x";
    // Copia a lista do arquivo de constantes
    jogadasDisponiveis = idsCasas.slice();
    fimDeJogo = false;
    vencedor = "";

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

    // Retorna true se a jogada pode ser realizada, se nao, retorna false
    jogadaDisponivel(jogada) {
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

    // Retorna "OK" se a jogada foi realizada com sucesso;
    // Retorna "" se a jogada nao foi realizada;
    // Retorna "FIM" se o jogo terminou;
    fazerJogada(jogada) {
        if(this.fimDeJogo) {
            return "";
        }
        if(this.jogadaDisponivel(jogada)) {
            var coordenadas = this.processar_jogada(jogada);
            var linha = coordenadas["linha"];
            var coluna = coordenadas["coluna"];
            this.grade[linha][coluna] = this.simboloDaVez;
            if(this.verificarFimDeJogo()) {
                this.fimDeJogo = true;
                return "FIM";
            }
            else {
                this.trocarSimboloDaVez();
                return "OK";
            }
        }
        else {
            return "";
        }
    }

    // Retorna true se o jogo terminou, se nao, retorna false
    verificarFimDeJogo() {
        // Busca vencedor nas linhas
        for(let linha=0; linha<3; linha++) {
            if(this.grade[linha][0] == this.grade[linha][1]) {
                if(this.grade[linha][1] == this.grade[linha][2]) {
                    if(this.grade[linha][2] != "-") {
                        this.vencedor = this.grade[linha][2];
                        return true;
                    }
                }
            }
        }
        // Busca vencedor nas colunas
        for(let coluna=0; coluna<3; coluna++) {
            if(this.grade[0][coluna] == this.grade[1][coluna]) {
                if(this.grade[1][coluna] == this.grade[2][coluna]) {
                    if(this.grade[2][coluna] != "-") {
                        this.vencedor = this.grade[2][coluna];
                        return true;
                    }
                }
            }
        }
        // Busca vencedor na diagonal 1
        if(this.grade[0][0] == this.grade[1][1]) {
            if(this.grade[1][1] == this.grade[2][2]) {
                if(this.grade[2][2] != "-") {
                    this.vencedor = this.grade[2][2];
                    return true;
                }
            }
        }
        // Busca vencedor na diagonal 2
        if(this.grade[0][2] == this.grade[1][1]) {
            if(this.grade[1][1] == this.grade[2][0]) {
                if(this.grade[2][0] != "-") {
                    this.vencedor = this.grade[2][0];
                    return true;
                }
            }
        }
        // Verifica se o jogo empatou
        if(this.jogadasDisponiveis.length == 0) {
            this.vencedor = "NINGUEM";
            return true;
        }
        return false;
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

i = new Graficos(jv);

n1 = new Noh("1");

n2 = new Noh("2");
n3 = new Noh("3");
n1.adicionarFilhos([n2, n3]);

n4 = new Noh("4");
n2.adicionarFilhos([n4]);

a = new Arvore(n1);
a.imprimir();


//
