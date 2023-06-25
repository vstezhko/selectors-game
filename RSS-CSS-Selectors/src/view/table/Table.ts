import { ILevelData } from '../../types/interface';
import { levelsData } from '../../model/levelsData';
import { Element } from '../../types/type';
import DataStorage from '../../data-storage/DataStorage';
import { StorageGameDataNames } from '../../types/enum';

export class Table {
    private storage = DataStorage.getInstance();
    private readonly levelsData;
    private readonly table: Element;

    constructor(levelsData: ILevelData[]) {
        this.storage.subscribe(StorageGameDataNames.CURRENT_LEVEL, (level) => this.draw(level));
        this.levelsData = levelsData;
        this.table = document.querySelector('.table');
    }

    public draw(currentLevel: number): void {
        if (this.table) {
            this.table.innerHTML = levelsData[currentLevel - 1].realMarkup;
        }
    }
}
