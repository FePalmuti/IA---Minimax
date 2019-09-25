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
