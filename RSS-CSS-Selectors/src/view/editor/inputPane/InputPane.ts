import { Element, Input } from '../../../types/type';
import { validateSolution } from '../../../utils/validateSolution';
import { ILevelData } from '../../../types/interface';
import DataStorage from '../../../data-storage/DataStorage';
import { StorageCompletedNames, StorageGameDataNames } from '../../../types/enum';

export class InputPane {
    private storage = DataStorage.getInstance();
    private readonly levelsData: ILevelData[];
    private input: Input;
    private hint: StorageCompletedNames;

    constructor(levelsData: ILevelData[]) {
        this.levelsData = levelsData;
        this.input = null;
        this.hint = StorageCompletedNames.SELF;
        this.storage.subscribe(StorageGameDataNames.HINT, (level) => this.setHintValue(level));
        this.storage.subscribe(StorageGameDataNames.CURRENT_LEVEL, () => this.clearInput());
    }

    clearInput() {
        this.input && (this.input.value = '');
    }

    setHintValue(level: number) {
        this.hint = StorageCompletedNames.HINT;
        const hint = this.levelsData[level - 1].selector;

        let index = 0;
        const interval = setInterval(() => {
            this.input && (this.input.value += hint[index]);
            index++;

            if (index === hint.length) {
                clearInterval(interval);
            }
        }, 150);
    }

    public draw(): void {
        console.log('InputPane');
        const inputPaneContainer: Element = document.querySelector<HTMLDivElement>('.input-pane');
        const inputPaneLayout = `
            <div class='pane-header'>
                <div class='pane-header__name'>CSS Editor</div>
                <div class='pane-header__file-name'>style.css</div>
            </div>
            <div class='pane-window pane-window_input-pane'>
                <div class='line-numbers'>
                    1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>18<br>19<br>20
                </div>
                    <input class='input-pane__input input-strobe' type='text' placeholder='Type in a CSS selector'>
                    <button class='input-pane__button'>enter</button>
                <div>
                    {<br>
                    /* Styles would go here. */<br>
                    }
                </div>
                <div class='help'>
                    <br>
                    /* <br>
                    Type a number to skip to a level.<br>
                    Ex → "5" for level 5 <br>*/
                </div>
            </div>
        `;

        if (inputPaneContainer) {
            inputPaneContainer.innerHTML = inputPaneLayout;
        }

        this.input = document.querySelector('.input-pane__input');
        const btn = document.querySelector('.input-pane__button');

        if (btn) {
            btn.addEventListener('click', () => {
                this.input && this.input.value && this.handleSubmitSolution(this.input);
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    this.input && this.input.value && this.handleSubmitSolution(this.input);
                }
            });
        }
    }

    handleSubmitSolution(input: Input, levelsData = this.levelsData) {
        const currentLevel = this.storage.getValue(StorageGameDataNames.CURRENT_LEVEL);
        if (input) {
            const res = validateSolution(input.value, levelsData[currentLevel - 1].answer);
            input.value = '';

            const editorContainer = document.querySelector('.editor');

            if (!res.checkResult) {
                if (editorContainer) {
                    editorContainer.classList.add('shake');
                    editorContainer.addEventListener('animationend', function() {
                        editorContainer.classList.remove('shake');
                    });
                }
            } else {
                res.nodes?.forEach((node, index) => {
                    if (node instanceof HTMLElement) {
                        node.classList.add('clean');

                        if (index + 1 === res.nodes?.length) {
                            node.addEventListener('animationend', () => {
                                this.storage.setCurrentLevel(currentLevel + 1);
                                this.storage.setCompletedLevel(currentLevel, this.hint);
                                this.hint = StorageCompletedNames.SELF;
                            });
                        }
                    }
                });
            }
        }
    }
}
