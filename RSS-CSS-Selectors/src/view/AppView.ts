import { Header } from './header/Header';
import { Levels } from './levels/Levels';
import { Footer } from './footer/Footer';
import { Rules } from './rules/Rules';
import { InputPane } from './editor/inputPane/InputPane';
import { MarkupPane } from './editor/markupPane/markupPane';
import { Table } from './table/Table';
import { LevelInfo } from './level-info/LevelInfo';

const levelsData = require('../model/levelsData.json');

export class AppView {
    private readonly header;
    private readonly footer;
    private readonly levels;
    private readonly rules;
    private readonly inputPane;
    private readonly markupPane;
    private readonly table;
    private readonly levelInfo;
    constructor() {
        this.header = new Header();
        this.footer = new Footer();
        this.levels = new Levels();
        this.rules = new Rules();
        this.inputPane = new InputPane();
        this.markupPane = new MarkupPane();
        this.table = new Table();
        this.levelInfo = new LevelInfo();
    }

    public drawHeader(): void {
        console.log('header');
        this.header.draw();
        this.footer.draw();
        this.levels.draw();
        this.inputPane.draw();
        this.markupPane.draw();
        this.table.draw();
        this.levelInfo.draw();
        this.rules.draw(levelsData[0]);
    }
}
