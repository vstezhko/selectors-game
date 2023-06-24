import { Header } from './header/Header';
import { Levels } from './levels/Levels';
import { Footer } from './footer/Footer';
import { Rules } from './rules/Rules';
import { InputPane } from './editor/inputPane/InputPane';
import { MarkupPane } from './editor/markupPane/markupPane';
import { Table } from './table/Table';
import { LevelInfo } from './level-info/LevelInfo';
import { levelsData } from '../model/levelsData';
import DataStorage from '../data-storage/DataStorage';
import { StorageGameDataNames } from '../types/enum';

export class AppView {
    private readonly header;
    private readonly footer;
    private readonly levels;
    private readonly rules;
    private readonly inputPane;
    private readonly markupPane;
    private readonly table;
    private readonly levelInfo;
    private storage = DataStorage.getInstance();
    private readonly startLevel;
    constructor() {
        this.startLevel = this.storage.getValue(StorageGameDataNames.CURRENT_LEVEL);
        this.header = new Header();
        this.footer = new Footer();
        this.levels = new Levels();
        this.rules = new Rules(levelsData);
        this.inputPane = new InputPane();
        this.markupPane = new MarkupPane();
        this.table = new Table();
        this.levelInfo = new LevelInfo();
    }

    public drawHeader(): void {
        console.log('header');
        this.header.draw();
        this.footer.draw();
        this.levels.draw(1);
        this.inputPane.draw();
        this.markupPane.draw();
        this.table.draw();
        this.levelInfo.draw();
        this.rules.draw(levelsData[0]);
    }
}
