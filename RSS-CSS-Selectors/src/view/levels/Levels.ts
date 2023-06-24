import { Element } from '../../types/type';
import { ILevelData } from '../../types/interface';
import { levelsData } from '../../model/levelsData';
import DataStorage from '../../data-storage/DataStorage';
import { StorageGameDataNames } from '../../types/enum';

export class Levels {
    private storage = DataStorage.getInstance();
    private levelsListContainer: Element;

    constructor() {
        this.storage.subscribe(StorageGameDataNames.CURRENT_LEVEL, (level) => this.renderLevels(level));
        this.levelsListContainer = null;
    }

    public draw(currentNumber: number): void {
        console.log('levels', levelsData);
        console.log('levelNumber', currentNumber);
        const levelsContainer: Element = document.querySelector<HTMLDivElement>('.levels');
        let generatedLevels = '';
        levelsData.forEach((level: ILevelData) => {
            generatedLevels += `
                <a class='levels__level ${level.levelNumber === currentNumber && 'levels__level_current'}' 
                data-id='${level.levelNumber}'>
                <span class='checkmark'></span>
                <span class='level-number'>${level.levelNumber}</span>${level.syntax}</a>
            `;
        });
        const levelsLayout = `
            <h2>Levels</h2>
            <div class='levels__list'>
                ${generatedLevels}
            </div>
            <a class='reset-progress' href='#'>Reset Progress</a>
        `;
        if (levelsContainer) {
            levelsContainer.innerHTML += levelsLayout;
        }

        // todo remove menu methods
        const levelsBtn: Element = document.querySelector('.menu');
        if (levelsBtn && levelsContainer) {
            levelsBtn.addEventListener('click', () => {
                levelsBtn.classList.toggle('menu_active');
                levelsContainer.classList.toggle('levels_opened');
            });
        }

        this.levelsListContainer = document.querySelector('.levels__list');

        if (this.levelsListContainer instanceof HTMLElement && !!this.levelsListContainer) {
            this.levelsListContainer.addEventListener('click', (e: Event) => {
                if (e.target instanceof HTMLElement && e.target.classList.contains('levels__level')) {
                    if (e.target.dataset.id) {
                        const level: number = +e.target.dataset.id;
                        this.storage.setValue(StorageGameDataNames.CURRENT_LEVEL, level);

                        // todo refactor
                        if (levelsBtn && levelsContainer) {
                            levelsBtn.classList.remove('menu_active');
                            levelsContainer.classList.remove('levels_opened');
                        }
                    }
                }
            });
        }
    }

    renderLevels(currentNumber: number) {
        let generatedLevels = '';

        levelsData.forEach((level: ILevelData) => {
            generatedLevels += `
                <a class='levels__level ${level.levelNumber === currentNumber && 'levels__level_current'}' 
                data-id='${level.levelNumber}'>
                <span class='checkmark'></span>
                <span class='level-number'>${level.levelNumber}</span>${level.syntax}</a>
            `;
        });

        if (this.levelsListContainer) {
            this.levelsListContainer.innerHTML = generatedLevels;
        }
    }
}
