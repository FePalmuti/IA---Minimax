class JogoDaVelha {
    grade = [];
    simboloDaVez = SIMBOLO_INICIAL;
    // Copia a lista do arquivo de constantes
    jogadasDisponiveis = IDS_CASAS.slice();
    fimDeJogo = false;
    vencedor = "";

    constructor() {
        for(let linha=0; linha<3; linha++) {
            this.grade.push([VAZIO, VAZIO, VAZIO]);
        }
    }

    trocarSimboloDaVez() {
        if(this.simboloDaVez == SIMBOLO_INICIAL) {
            this.simboloDaVez = OUTRO_SIMBOLO;
        }
        else {
            this.simboloDaVez = SIMBOLO_INICIAL;
        }
    }

    // Retorna true se a jogada pode ser realizada, se nao, retorna false
    jogadaDisponivel(jogada) {
        if(this.jogadasDisponiveis.includes(jogada)) {
            var indice = this.jogadasDisponiveis.indexOf(jogada);
            this.jogadasDisponiveis.splice(indice, 1);
            return true;
        }
        else {
            return false;
        }
    }

    // Recebe uma entrada do tipo "c01", extraindo o "0" e o "1"
    processarJogada(jogada) {
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
            var coordenadas = this.processarJogada(jogada);
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
                    if(this.grade[linha][2] != VAZIO) {
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
                    if(this.grade[2][coluna] != VAZIO) {
                        this.vencedor = this.grade[2][coluna];
                        return true;
                    }
                }
            }
        }
        // Busca vencedor na diagonal 1
        if(this.grade[0][0] == this.grade[1][1]) {
            if(this.grade[1][1] == this.grade[2][2]) {
                if(this.grade[2][2] != VAZIO) {
                    this.vencedor = this.grade[2][2];
                    return true;
                }
            }
        }
        // Busca vencedor na diagonal 2
        if(this.grade[0][2] == this.grade[1][1]) {
            if(this.grade[1][1] == this.grade[2][0]) {
                if(this.grade[2][0] != VAZIO) {
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

    // Retorna uma copia do proprio objeto
    clonar() {
        var novoJV = new JogoDaVelha();
        novoJV.grade = []
        // Clona a grade do jogo original, nao fazendo referencia
        for(let linha=0; linha<3; linha++) {
            novoJV.grade.push(this.grade[linha].slice());
        }
        novoJV.simboloDaVez = this.simboloDaVez;
        novoJV.jogadasDisponiveis = this.jogadasDisponiveis.slice();
        novoJV.fimDeJogo = this.fimDeJogo;
        novoJV.vencedor = this.vencedor;
        return novoJV;
    }
}
