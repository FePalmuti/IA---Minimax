class IA {
    //
    jogoPrincipal = null;
    //
    arvoreJogos = null;
    arvoreMinimax = null;
    // Indica qual eh o simbolo representa a IA no jogo
    simboloIA = "";

    constructor(jogoPrincipal, simboloIA) {
        this.jogoPrincipal = jogoPrincipal;
        this.simboloIA = simboloIA;
        this.qntNohs = 0;
    }

    // Busca na arvore minimax
    identificarPosMelhorFilho() {
        var raiz = this.arvoreMinimax.raiz;
        var filhosRaiz = raiz.filhos;
        // Percebe de qual ramo filho veio a melhor jogada possivel
        for(let posFilho=0; posFilho<filhosRaiz.length; posFilho++) {
            if(raiz.valor == filhosRaiz[posFilho].valor) {
                return posFilho;
            }
        }
    }

    // Busca na arvore de jogos
    obterJogoMelhorFilho(pos) {
        var filhosRaiz = this.arvoreJogos.raiz.filhos;
        return filhosRaiz[pos].jv;
    }

    fazerJogada() {
        this.gerarArvoreJogos();
        this.gerarArvoreMinimax();
        var pos = this.identificarPosMelhorFilho();
        var melhorJogo = this.obterJogoMelhorFilho(pos);

        var possibilidadesJogoPai = this.arvoreJogos.raiz.jv.jogadasDisponiveis;
        var possibilidadesMelhorJogo = melhorJogo.jogadasDisponiveis;
        var melhorJogada;
        possibilidadesJogoPai.forEach(function(jogada) {
            if(! possibilidadesMelhorJogo.includes(jogada)) {
                melhorJogada = jogada;
            }
        });
        return this.jogoPrincipal.fazerJogada(melhorJogada);
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
