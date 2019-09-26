class IA {
    arvoreDeJogos = null;

    constructor(jogoPrincipal) {
        this.jogoPrincipal = jogoPrincipal;
        this.qntNohs = 0;
    }

    gerarArvoreDeJogos() {
        var nohRaiz = new NohJogo(this.qntNohs, this.jogoPrincipal);
        this.qntNohs++;
        this.arvoreDeJogos = new Arvore(nohRaiz);
        this.gerarFilhos(nohRaiz);
        console.log(this.qntNohs);
    }

    // Metodo recursivo para geracao de toda a arvore
    gerarFilhos(noh) {
        var jogadasDisponiveis = noh.jv.jogadasDisponiveis.slice();
        var jogada, novoJV, nohFilho;
        var filhos = [];
        // Eh criado um novo filho para cada jogada possivel no jogo do noh pai
        while(jogadasDisponiveis.length > 0) {
            jogada = jogadasDisponiveis.pop();

            novoJV = noh.jv.clonar();
            novoJV.jogadasDisponiveis.pop();

            novoJV.fazerJogada(jogada);
            nohFilho = new NohJogo(this.qntNohs, novoJV);
            this.qntNohs++;
            filhos.push(nohFilho);
            this.gerarFilhos(nohFilho);
        }
        noh.adicionarFilhos(filhos);
    }
}
