import { Element } from '../../types/type';

export class BurgerBtn {
    private static instanceBurgerBtn = new BurgerBtn();
    readonly BtnLayoutLevels: Node & Element;
    private readonly levelsContainer: Element;
    private readonly body: Element;

    constructor() {
        this.body = document.querySelector('body');
        this.levelsContainer = document.querySelector<HTMLDivElement>('.levels');
        this.BtnLayoutLevels = document.createElement('div');
        this.BtnLayoutLevels.classList.add('menu');
        this.BtnLayoutLevels.innerHTML = `<div>Levels</div><div class='menu-line'></div>`;

        if (this.BtnLayoutLevels) {
            this.BtnLayoutLevels.addEventListener('click', () => {
                this.toggleBtnLevels();
            });
        }
    }

    static getInstance(): BurgerBtn {
        return this.instanceBurgerBtn;
    }
    public draw(containerElement: Element) {
        if (containerElement) {
            containerElement.append(this.BtnLayoutLevels);
        }
    }

    toggleBtnLevels(): void {
        if (this.BtnLayoutLevels && this.levelsContainer) {
            this.body && this.body.classList.toggle('body_withPopup');
            this.BtnLayoutLevels.classList.toggle('menu_active');
            this.levelsContainer.classList.toggle('levels_opened');
        }
    }
}
