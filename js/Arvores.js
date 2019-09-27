class Noh {
    constructor(id) {
        this.id = id;
        this.filhos = [];
    }

    adicionarFilhos(filhos) {
        this.filhos = filhos;
    }

    imprimir() {
        console.log(this.id);
        var idsFilhos = "( ";
        for(let indice=0; indice<this.filhos.length; indice++) {
            idsFilhos += this.filhos[indice].id + " ";
        }
        idsFilhos += ")";
        console.log(idsFilhos);
    }
}

class NohJogo extends Noh {
    constructor(id, jogoDaVelha) {
        super(id);
        this.jv = jogoDaVelha;
    }
}

class NohMinimax extends Noh {
    // "nivelTipoMax" eh um booleano que, se for igual a true, indica que
    // o nivel da arvore em que o noh se encontra eh do tipo max (conceito de
    // minimax). Se for igual a false, o eh do tipo min.
    constructor(id, nivelTipoMax, valor) {
        super(id);
        this.nivelTipoMax = nivelTipoMax;
        this.valor = valor;
    }
}

class Arvore {
    raiz = null
    qntNohs = 0;

    constructor() {}

    autoGeracaoRecursiva() {}

    imprimir() {
        this.imprimirRecursivo(this.raiz);
    }

    imprimirRecursivo() {}
}

class ArvoreJogos extends Arvore {
    constructor(jogoPrincipal) {
        super();
        this.raiz = new NohJogo(this.qntNohs, jogoPrincipal);
        this.qntNohs++;
        this.autoGeracaoRecursiva(this.raiz);
    }

    autoGeracaoRecursiva(noh) {
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
                this.autoGeracaoRecursiva(nohFilho);
            }
        }
        noh.adicionarFilhos(filhos);
    }

    imprimirRecursivo(noh) {
        noh.jv.imprimirJogo();
        for(let indice=0; indice<noh.filhos.length; indice++) {
            this.imprimirRecursivo(noh.filhos[indice]);
        }
    }
}

class ArvoreMinimax extends Arvore {
    constructor(raizJogo, simboloIA) {
        super();
        this.simboloIA = simboloIA;
        this.raiz = new NohMinimax(raizJogo.id, true, null);
        this.autoGeracaoRecursiva(raizJogo, this.raiz);
    }

    autoGeracaoRecursiva(nohJogo, nohMinimax) {
        var filhos = [];
        var nohJogoFilho, id, vencedor, valor, novoNohMinimax;
        var nivelTipoMax = ! nohMinimax.nivelTipoMax;
        for(let indice=0; indice<nohJogo.filhos.length; indice++) {
            nohJogoFilho = nohJogo.filhos[indice];
            id = nohJogoFilho.id;
            if(nohJogoFilho.jv.fimDeJogo) {
                vencedor = nohJogoFilho.jv.vencedor;
                valor = this.calcularValorNohMinimax(vencedor);
                novoNohMinimax = new NohMinimax(id, nivelTipoMax, valor);
                filhos.push(novoNohMinimax);
            }
            else {
                novoNohMinimax = new NohMinimax(id, nivelTipoMax, null);
                filhos.push(novoNohMinimax);
                this.autoGeracaoRecursiva(nohJogoFilho, novoNohMinimax);
            }
        }
        nohMinimax.adicionarFilhos(filhos);
    }

    calcularValorNohMinimax(vencedor) {
        // Se a IA vence nesse noh
        if(vencedor == this.simboloIA) {
            return 1;
        }
        else if(vencedor == "NINGUEM") {
            return 0;
        }
        else {
            return -1;
        }
    }

    imprimirRecursivo(noh) {
        var representacao = noh.id+" "+noh.nivelTipoMax+" "+noh.valor;
        alert(representacao);
        for(let indice=0; indice<noh.filhos.length; indice++) {
            this.imprimirRecursivo(noh.filhos[indice]);
        }
    }
}
//
