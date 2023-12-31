import { CompletedLevels, Element, Input } from '../../../types/type';
import { validateSolution } from '../../../utils/validateSolution';
import { ILevelData } from '../../../types/interface';
import DataStorage from '../../../data-storage/DataStorage';
import { StorageCompletedNames, StorageGameDataNames } from '../../../types/enum';

export class InputPane {
    private storage = DataStorage.getInstance();
    private readonly levelsData: ILevelData[];
    private input: Input;
    private btn: HTMLButtonElement | null;
    private hint: StorageCompletedNames;

    constructor(levelsData: ILevelData[]) {
        this.levelsData = levelsData;
        this.input = null;
        this.btn = null;
        this.hint = StorageCompletedNames.SELF;
        this.storage.subscribe(StorageGameDataNames.HINT, (level) => this.setHintValue(level as number));
        this.storage.subscribe(StorageGameDataNames.CURRENT_LEVEL, () => this.clearInput());
    }

    clearInput(): void {
        this.input && (this.input.value = '');
    }

    setHintValue(level: number): void {
        this.hint = StorageCompletedNames.HINT;
        const hint = this.levelsData[level - 1].selector;
        this.btn && (this.btn.disabled = true);
        document.removeEventListener('keydown', this.keyDownListener);

        let index = 0;
        const interval = setInterval(() => {
            this.input && (this.input.value += hint[index]);
            index++;

            if (index === hint.length) {
                clearInterval(interval);
                this.btn && (this.btn.disabled = false);
                document.addEventListener('keydown', this.keyDownListener);
            }
        }, 150);
    }

    public draw(): void {
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
            </div>
        `;

        if (inputPaneContainer) {
            inputPaneContainer.innerHTML = inputPaneLayout;
        }

        this.input = document.querySelector('.input-pane__input');
        this.btn = document.querySelector('.input-pane__button');

        if (this.btn) {
            this.btn.addEventListener('click', () => {
                this.btn && this.pressSubmitBtn(this.btn);
                this.input && this.handleSubmitSolution(this.input);
            });

            document.addEventListener('keydown', this.keyDownListener);
        }
    }

    handleSubmitSolution(input: Input, levelsData = this.levelsData): void {
        const currentLevel = this.storage.getValue(StorageGameDataNames.CURRENT_LEVEL) as number;
        if (input) {
            const res = validateSolution(input.value, levelsData[currentLevel - 1].answer);
            input.value = '';

            const editorContainer = document.querySelector('.editor');

            if (!res.checkResult) {
                if (editorContainer) {
                    editorContainer.classList.add('shake');
                    editorContainer.addEventListener('animationend', () => {
                        editorContainer.classList.remove('shake');
                    });
                }
            } else {
                res.nodes &&
                    res.nodes?.forEach((node, index) => {
                        if (node instanceof HTMLElement) {
                            node.classList.remove('strobe');
                            node.classList.add('clean');

                            if (res.nodes) {
                                if (index + 1 === res.nodes.length) {
                                    node.addEventListener('animationend', () => {
                                        this.storage.setCompletedLevel(currentLevel, this.hint);
                                        const completedLevels = this.storage.getValue(
                                            StorageGameDataNames.COMPLETED
                                        ) as CompletedLevels;

                                        if (currentLevel < this.levelsData.length) {
                                            this.storage.setCurrentLevel(currentLevel + 1);
                                        } else {
                                            if (completedLevels && completedLevels.size < 10) {
                                                let level = 1;
                                                while (completedLevels.get(level)) {
                                                    level += 1;
                                                }
                                                this.storage.setCurrentLevel(level);
                                            }
                                        }
                                        this.hint = StorageCompletedNames.SELF;
                                    });
                                }
                            }
                        }
                    });
            }
        }
    }

    keyDownListener = (e: KeyboardEvent): void => {
        if (e.key === 'Enter') {
            this.btn && this.pressSubmitBtn(this.btn);
            this.input && this.handleSubmitSolution(this.input);
        }
    };

    pressSubmitBtn = (btn: HTMLButtonElement): void => {
        btn.classList.add('enterhit');
        btn.addEventListener('animationend', () => {
            btn.classList.remove('enterhit');
        });
    };
}
