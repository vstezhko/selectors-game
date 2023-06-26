import { ILevelData } from '../../types/interface';
import { CompletedLevels, Element } from '../../types/type';
import DataStorage from '../../data-storage/DataStorage';
import { StorageGameDataNames } from '../../types/enum';

export class Rules {
    private storage = DataStorage.getInstance();
    private readonly levelsData: ILevelData[];
    private completedLevels: CompletedLevels;
    private currentLevel: number;

    constructor(levelsData: ILevelData[]) {
        this.levelsData = levelsData;
        this.completedLevels = this.storage.getValue(StorageGameDataNames.COMPLETED) as CompletedLevels;
        this.currentLevel = this.storage.getValue(StorageGameDataNames.CURRENT_LEVEL) as number;
        this.storage.subscribe(StorageGameDataNames.CURRENT_LEVEL, (level) => {
            this.currentLevel = level as number;
            this.draw(this.currentLevel);
        });
        this.storage.subscribe(StorageGameDataNames.COMPLETED, (completedLevels) => {
            this.completedLevels = completedLevels as CompletedLevels;
            this.draw(this.currentLevel);
        });
    }

    public draw(currentLevel: number): void {
        const rulesContainer: Element = document.querySelector('.rules');
        const rulesLayout = `
            <h2 class='rules__header ${
                this.completedLevels.has(this.currentLevel)
                    ? 'rules__header_completed-' + this.completedLevels.get(this.currentLevel)
                    : ''
            }'>
                <span class='rules__text'>Level ${this.levelsData[currentLevel - 1].levelNumber} of 10</span>
                <span class='checkmark'></span>
            </h2>
            <div class='level-nav'>
                <a class='prev'></a>
                <a class='next'></a>
            </div>
            <div class='rules__content'>
                <h4 class='selector-name'>${this.levelsData[currentLevel - 1].selectorName}</h4>
                <h3 class='title'>${this.levelsData[currentLevel - 1].title}</h3>
                <h4 class='syntax'>${this.levelsData[currentLevel - 1].syntax}</h4>
                <div class='hint'>${this.levelsData[currentLevel - 1].hint}</div>
                <h5 class='examples-title'>Examples</h5>
                <div class='examples'>
                    ${this.levelsData[currentLevel - 1].examples
                        .map(
                            (ex) => `<div class='example'>
                        ${ex}
                    </div>`
                        )
                        .join('')}
                </div>
            </div>
        `;

        if (rulesContainer) {
            rulesContainer.innerHTML = rulesLayout;
        }

        const prev = document.querySelector('.prev');
        const next = document.querySelector('.next');

        [prev, next].forEach((btn) => {
            if (btn) {
                btn.addEventListener('click', () => {
                    if (
                        btn.classList.contains('next') &&
                        this.levelsData[currentLevel - 1].levelNumber < this.levelsData.length
                    ) {
                        this.storage.setCurrentLevel(this.levelsData[currentLevel - 1].levelNumber + 1);
                    }

                    if (btn.classList.contains('prev') && this.levelsData[currentLevel - 1].levelNumber > 1) {
                        this.storage.setCurrentLevel(this.levelsData[currentLevel - 1].levelNumber - 1);
                    }
                });
            }
        });
    }
}
