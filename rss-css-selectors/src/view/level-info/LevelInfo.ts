import { Element } from '../../types/type';
import DataStorage from '../../data-storage/DataStorage';
import { ILevelData } from '../../types/interface';
import { StorageGameDataNames } from '../../types/enum';

export class LevelInfo {
    private storage = DataStorage.getInstance();
    private readonly levelsData: ILevelData[];

    constructor(levelsData: ILevelData[]) {
        this.levelsData = levelsData;
        this.storage.subscribe(StorageGameDataNames.CURRENT_LEVEL, (level) => this.draw(level as number));
    }

    private generateLayout(levelNumber: number): string {
        return `
            <h2 class='table__doThis'>${this.levelsData[levelNumber - 1].doThis}</h2>
            <div class='table__note'>
                <p class='table__toggle'>Help, I'm stuck!</p>
            </div> 
        `;
    }

    addEventListenerToHintBtn(helpBtn: HTMLElement, levelNumber: number): void {
        helpBtn.addEventListener('click', () => {
            this.storage.setHintLevel(levelNumber);
            helpBtn.classList.add('table__toggle_hidden');
        });
    }

    public draw(levelNumber: number): void {
        const levelInfoContainer: Element = document.querySelector<HTMLDivElement>('.level-info');
        const levelInfoLayout = this.generateLayout(levelNumber);

        if (levelInfoContainer) {
            levelInfoContainer.innerHTML = levelInfoLayout;
        }

        const helpBtn = document.querySelector('.table__toggle');
        if (helpBtn instanceof HTMLElement) {
            this.addEventListenerToHintBtn(helpBtn, levelNumber);
        }
    }
}
