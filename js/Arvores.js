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

class Arvore {
    constructor(raiz) {
        this.raiz = raiz;
    }

    imprimirRecursivo(noh) {
        noh.imprimir();
        if(noh.filhos.length != 0) {
            for(let indice=0; indice<noh.filhos.length; indice++) {
                this.imprimirRecursivo(noh.filhos[indice]);
            }
        }
    }

    imprimir() {
        this.imprimirRecursivo(this.raiz);
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

//
