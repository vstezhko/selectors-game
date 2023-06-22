import { Header } from './header/Header';
import { Levels } from './levels/Levels';
import { Footer } from './footer/Footer';
import { Rules } from './rules/Rules';

const levelsData = require('../model/levelsData.json');

export class AppView {
    private readonly header;
    private readonly footer;
    private readonly levels;
    private readonly rules;
    constructor() {
        this.header = new Header();
        this.footer = new Footer();
        this.levels = new Levels();
        this.rules = new Rules();
    }

    public drawHeader(): void {
        console.log('header');
        this.header.draw();
        this.footer.draw();
        this.levels.draw();
        this.rules.draw(levelsData[0]);
    }
}
