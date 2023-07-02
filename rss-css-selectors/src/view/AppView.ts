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
import { BurgerBtn } from './burgerBtn/BurgerBtn';
import { Element } from '../types/type';
import { HoverElementsWatcher } from './hoverElementsWatcher/HoverElementsWatcher';

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
    private readonly hoverElementsWatcher;

    constructor() {
        this.startLevel = this.storage.getValue(StorageGameDataNames.CURRENT_LEVEL) as number;
        this.header = new Header();
        this.footer = new Footer();
        this.levels = new Levels(levelsData);
        this.rules = new Rules(levelsData);
        this.inputPane = new InputPane(levelsData);
        this.markupPane = new MarkupPane(levelsData);
        this.table = new Table(levelsData);
        this.levelInfo = new LevelInfo(levelsData);
        this.hoverElementsWatcher = new HoverElementsWatcher();
    }

    public drawComponents(): void {
        this.header.draw();
        this.footer.draw();
        this.levels.draw(this.startLevel);
        this.inputPane.draw();
        this.markupPane.draw(this.startLevel);
        this.table.draw(this.startLevel);
        this.levelInfo.draw(this.startLevel);
        this.rules.draw(this.startLevel);
    }

    public drawBurgerBtn(): void {
        const btn = BurgerBtn.getInstance();
        const menu: Element = document.querySelector('.menu-container');
        btn.draw(menu);
    }
}
