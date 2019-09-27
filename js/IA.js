class IA {
    arvoreJogos = null;
    arvoreMinimax = null;
    // Indica qual eh o simbolo representa a IA no jogo
    simbolo = "";

    constructor(jogoPrincipal, simbolo) {
        this.jogoPrincipal = jogoPrincipal;
        this.simbolo = simbolo;
        this.qntNohs = 0;
    }

    gerarArvoreJogos() {
        var nohRaiz = new NohJogo(this.qntNohs, this.jogoPrincipal);
        this.qntNohs++;
        this.arvoreJogos = new Arvore(nohRaiz);
        this.gerarArvoreJogosRecursivo(nohRaiz);
    }

    // Metodo recursivo para geracao de toda arvore
    gerarArvoreJogosRecursivo(noh) {
        var jogadasDisponiveis = noh.jv.jogadasDisponiveis.slice();
        var jogada, novoJV, nohFilho;
        var filhos = [];
        // Eh criado um novo filho para cada jogada possivel no jogo do noh pai
        while(jogadasDisponiveis.length > 0) {
            jogada = jogadasDisponiveis.pop();

            novoJV = noh.jv.clonar();
            var status = novoJV.fazerJogada(jogada);

            nohFilho = new NohJogo(this.qntNohs, novoJV);
            this.qntNohs++;
            filhos.push(nohFilho);

            if(status != "FIM") {
                // Se o jogo nao terminou, as jogadas possiveis sao feitas
                // em nohs filhos
                this.gerarArvoreJogosRecursivo(nohFilho);
            }
        }
        noh.adicionarFilhos(filhos);
    }

    mostrarJogosEmProfundidade() {
        var raiz = this.arvoreJogos.raiz;
        this.mostrarJogosEmProfundidadeRecursivo(raiz);
    }

    mostrarJogosEmProfundidadeRecursivo(noh) {
        noh.jv.imprimirJogo();
        for(let indice=0; indice<noh.filhos.length; indice++) {
            this.mostrarJogosEmProfundidadeRecursivo(noh.filhos[indice]);
        }
    }

    calcularValorNohMinimax(vencedor) {
        // Se a IA vence nesse noh
        if(vencedor == this.simbolo) {
            return 1;
        }
        else if(vencedor == "NINGUEM") {
            return 0;
        }
        else {
            return -1;
        }
    }

    gerarArvoreMinimax() {
        var raizJogo = this.arvoreJogos.raiz;
        var raizMinimax = new NohMinimax(raizJogo.id, true, null);
        this.arvoreMinimax = new Arvore(raizMinimax);
        this.gerarArvoreMinimaxRecursivo(raizJogo, raizMinimax);
    }

    gerarArvoreMinimaxRecursivo(nohJogo, nohMinimax) {
        var filhos = [];
        var novoNohMinimax, id, vencedor, valor, nohJogoFilho;
        var nivelTipoMax = ! nohMinimax.nivelTipoMax;
        for(let indice=0; indice<nohJogo.filhos.length; indice++) {
            id = nohJogo.filhos[indice].id;
            if(nohJogo.jv.fimDeJogo) {
                vencedor = nohJogo.jv.vencedor;
                valor = this.calcularValorNohMinimax(vencedor);
                novoNohMinimax = new NohMinimax(id, nivelTipoMax, valor);
                filhos.push(novoNohMinimax);
            }
            else {
                novoNohMinimax = new NohMinimax(id, nivelTipoMax, null);
                filhos.push(novoNohMinimax);
                nohJogoFilho = nohJogo.filhos[indice];
                this.gerarArvoreMinimaxRecursivo(nohJogoFilho, novoNohMinimax);
            }
        }
    }
}
