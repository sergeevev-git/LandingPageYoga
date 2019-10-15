class Options {
    constructor() {
        this.heigth = '';
        this.width = '';
        this.bg = '';
        this.fontSize = '';
        this.textAlign = '';
    }
    createDiv (height, width, bg, fontSize, textAlign) {
        let div = document.createElement('div');
        div.style.cssText = `height:${height}px;width:${width}%;background-color:${bg};
            font-size:${fontSize}px; text-align: ${textAlign}`;
        document.body.appendChild(div);
    }
}

let a = new Options();
console.log(a);
a.createDiv(300, 75, 'red', 20, 'center');
a.createDiv(300, 100, 'red', 20, 'center');

//у лектора немного по-другому