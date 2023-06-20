import { Header } from './header/Header';
import { Levels } from './levels/Levels';
import { Footer } from './footer/Footer';

export class AppView {
    private readonly header;
    private readonly footer;
    private readonly levels;
    constructor() {
        this.header = new Header();
        this.footer = new Footer();
        this.levels = new Levels();
    }

    public drawHeader(): void {
        console.log('header');
        this.header.draw();
        this.levels.draw();
    }
}
