import { CompletedLevels, Element } from '../../types/type';
import { ILevelData } from '../../types/interface';
import DataStorage from '../../data-storage/DataStorage';
import { StorageGameDataNames } from '../../types/enum';
import { BurgerBtn } from '../burgerBtn/BurgerBtn';

export class Levels {
    private storage = DataStorage.getInstance();
    private levelsListContainer: Element;
    private readonly levelsData: ILevelData[];
    private readonly completedLevels: CompletedLevels;
    private currentLevel: number;

    constructor(levelsData: ILevelData[]) {
        this.levelsData = levelsData;
        this.completedLevels = this.storage.getValue(StorageGameDataNames.COMPLETED);
        this.currentLevel = this.storage.getValue(StorageGameDataNames.CURRENT_LEVEL);
        this.storage.subscribe(StorageGameDataNames.CURRENT_LEVEL, (level) => {
            this.renderLevels(level);
            this.currentLevel = level;
        });
        this.storage.subscribe(StorageGameDataNames.COMPLETED, () => this.renderLevels(this.currentLevel));
        this.levelsListContainer = null;
    }

    private generateLevelsListLayout(currentLevel: number) {
        let generatedLevels = '';

        this.levelsData.forEach((level: ILevelData) => {
            generatedLevels += `
                <a class='levels__level ${level.levelNumber === currentLevel && 'levels__level_current'}' 
                data-id='${level.levelNumber}'>
                <span class='checkmark ${
                    this.completedLevels.has(level.levelNumber)
                        ? 'checkmark_completed-' + this.completedLevels.get(level.levelNumber)
                        : ''
                }'></span>
                <span class='level-number'>${level.levelNumber}</span>${level.syntax}</a>
            `;
        });
        return generatedLevels;
    }

    public draw(currentLevel: number): void {
        const levelsContainer: Element = document.querySelector<HTMLDivElement>('.levels');
        const levelsLayout = `
            <h2>Levels</h2>
            <div class='levels__list'>
                ${this.generateLevelsListLayout(currentLevel)}
            </div>
            <a class='reset-progress' href='#'>Reset Progress</a>
        `;
        if (levelsContainer) {
            levelsContainer.innerHTML += levelsLayout;
        }

        this.levelsListContainer = document.querySelector('.levels__list');

        if (this.levelsListContainer instanceof HTMLElement && !!this.levelsListContainer) {
            this.levelsListContainer.addEventListener('click', (e: Event) => {
                if (e.target instanceof HTMLElement && e.target.classList.contains('levels__level')) {
                    if (e.target.dataset.id) {
                        const level: number = +e.target.dataset.id;
                        this.storage.setCurrentLevel(level);

                        const burgerBtn = BurgerBtn.getInstance();
                        burgerBtn.toggleBtn();
                    }
                }
            });
        }
    }

    renderLevels(currentLevel: number) {
        if (this.levelsListContainer) {
            console.log('rendering new Levels');
            this.levelsListContainer.innerHTML = this.generateLevelsListLayout(currentLevel);
        }
    }
}
