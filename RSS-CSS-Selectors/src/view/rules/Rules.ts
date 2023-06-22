import { ILevelData } from '../../types/interface';
import { Element } from '../../types/type';

export class Rules {
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
