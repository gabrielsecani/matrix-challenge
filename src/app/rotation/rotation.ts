export class Rotation {
    matriz = [];
    size = 0;

    Lin = 0;
    Col = 0;
    Anterior = 0;
    Atual = 0;
    ultimaLinha = this.size;
    ultimaColuna = this.size;

    constructor(vector) {
        this.setVector(vector);
    }

    setVector(vector) {
        this.size = Math.sqrt(vector.length);
        if (!Number.isInteger(this.size) && vector.length > 1) {
            this.size = 0;
            // throw Error('vetor não contem uma matriz quadrada');
        } else {
            this.matriz = new Array(this.size).fill(null).map(_ => new Array(this.size).fill(null));
            vector.forEach((element, index) => {
                const x = ~~(index / this.size), y = (index % this.size);
                this.matriz[x][y] = element;
            });
        }
    }

    getMatriz() {
        return this.matriz;
    }
    getMatrizClone() {
        return this.matriz.map(a => new Array(a.map(b => b)));
    }
    getVector() {
        if (this.size === 0) return "[]";
        return this.matriz.map(a => a.join(',')).join(',');
    }

    job01_firstLine_tilLastColumnMinusOne() {
        for (var i = this.Col; i < this.ultimaColuna; i++) {
            this.Atual = this.matriz[this.Lin][i];
            this.matriz[this.Lin][i] = this.Anterior;
            this.Anterior = this.Atual;
        }
    }

    job02_notFirstLine_tilLastColumnMinusOne() {
        this.Lin++;
        for (var i = this.Lin; i < this.ultimaLinha; i++) {
            this.Atual = this.matriz[i][this.ultimaColuna - 1];
            this.matriz[i][this.ultimaColuna - 1] = this.Anterior;
            this.Anterior = this.Atual;
        }
        this.ultimaColuna--;
    }

    job03_notLastLine() {
        if (this.Lin < this.ultimaLinha) {
            for (var i = this.ultimaColuna - 1; i >= this.Col; i--) {
                this.Atual = this.matriz[this.ultimaLinha - 1][i];
                this.matriz[this.ultimaLinha - 1][i] = this.Anterior;
                this.Anterior = this.Atual;
            }
        }
        this.ultimaLinha--;
    }
    job04_notLastColumn() {
        if (this.Col < this.ultimaColuna) {
            for (var i = this.ultimaLinha - 1; i >= this.Lin; i--) {
                this.Atual = this.matriz[i][this.Col];
                this.matriz[i][this.Col] = this.Anterior;
                this.Anterior = this.Atual;
            }
        }
        this.Col++;
    }
    rotate() {

        this.Lin = 0;
        this.Col = 0;
        this.Anterior = 0;
        this.Atual = 0;
        this.ultimaLinha = this.size;
        this.ultimaColuna = this.size;

        while (this.Lin + 1 < this.ultimaLinha &&
            this.Col + 1 < this.ultimaColuna) {

            this.Anterior = this.matriz[this.Lin + 1][this.Col];

            this.job01_firstLine_tilLastColumnMinusOne();
            this.job02_notFirstLine_tilLastColumnMinusOne();
            this.job03_notLastLine();
            this.job04_notLastColumn();
        }

        return this;
    }
}
