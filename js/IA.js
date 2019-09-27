class IA {
    arvoreJogos = null;
    arvoreMinimax = null;
    // Indica qual eh o simbolo representa a IA no jogo
    simboloIA = "";

    constructor(jogoPrincipal, simboloIA) {
        this.jogoPrincipal = jogoPrincipal;
        this.simboloIA = simboloIA;
        this.qntNohs = 0;
    }

    gerarArvoreJogos() {
        this.arvoreJogos = new ArvoreJogos(this.jogoPrincipal);
    }

    mostrarJogosEmProfundidade() {
        this.arvoreJogos.imprimir();
    }

    gerarArvoreMinimax() {
        this.arvoreMinimax = new ArvoreMinimax(this.arvoreJogos.raiz, this.simboloIA);
    }

    mostrarNohsMinimaxEmProfundidade() {
        this.arvoreMinimax.imprimir();
    }
}
