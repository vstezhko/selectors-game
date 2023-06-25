import { Element } from '../../types/type';
import DataStorage from '../../data-storage/DataStorage';
import { ILevelData } from '../../types/interface';
import { StorageGameDataNames } from '../../types/enum';

export class LevelInfo {
    private storage = DataStorage.getInstance();
    private readonly levelsData: ILevelData[];

    constructor(levelsData: ILevelData[]) {
        this.levelsData = levelsData;
        this.storage.subscribe(StorageGameDataNames.CURRENT_LEVEL, (level) => this.draw(level));
    }

    public draw(levelNumber: number): void {
        console.log('LevelInfo');
        const levelInfoContainer: Element = document.querySelector<HTMLDivElement>('.level-info');
        const levelInfoLayout = `
            <h2 class='table__doThis'>${this.levelsData[levelNumber - 1].doThis}</h2>
            <p class='table__note-toggle'>Help, I'm stuck!</p>
        `;

        if (levelInfoContainer) {
            levelInfoContainer.innerHTML = levelInfoLayout;
        }

        const helpBtn = document.querySelector('.table__note-toggle');
        if (helpBtn) {
            helpBtn.addEventListener('click', () => {
                this.storage.setHintLevel(levelNumber);
            });
        }
    }
}
