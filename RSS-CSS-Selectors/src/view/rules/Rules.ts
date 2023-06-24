import { ILevelData } from '../../types/interface';
import { Element } from '../../types/type';
import DataStorage from '../../data-storage/DataStorage';
import { StorageGameDataNames } from '../../types/enum';

export class Rules {
    private storage = DataStorage.getInstance();
    private readonly levelsData: ILevelData[];

    constructor(levelsData: ILevelData[]) {
        this.levelsData = levelsData;
        this.storage.subscribe(StorageGameDataNames.CURRENT_LEVEL, (level) => this.draw(this.levelsData[level - 1]));
    }

    public draw(level: ILevelData): void {
        const rulesContainer: Element = document.querySelector('.rules');
        const rulesLayout = `
            <h2 class='rules__header'>
                <span class='rules__text'>Level ${level.levelNumber} of 10</span>
                <span class='checkmark'></span>
            </h2>
            <div class='rules__content'>
                <h4 class='selector-name'>${level.selectorName}</h4>
                <h3 class='title'>${level.title}</h3>
                <h4 class='syntax'>${level.syntax}</h4>
                <div class='hint'>${level.hint}</div>
                <h5 class='examples-title'>Examples</h5>
                <div class='examples'>
                    ${level.examples
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
    }
}
