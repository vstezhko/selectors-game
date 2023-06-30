import { Element } from '../../types/type';

export class BurgerBtn {
    private static instanceBurgerBtn = new BurgerBtn();
    private readonly BtnLayoutLevels: Node & Element;
    private readonly BtnLayoutRules: Node & Element;
    private readonly levelsContainer: Element;
    private readonly rulesContainer: Element;

    constructor() {
        this.levelsContainer = document.querySelector<HTMLDivElement>('.levels');
        this.rulesContainer = document.querySelector<HTMLDivElement>('.rules');
        this.BtnLayoutLevels = document.createElement('div');
        this.BtnLayoutRules = document.createElement('div');
        this.BtnLayoutLevels.classList.add('menu');
        this.BtnLayoutLevels.innerHTML = `<div>Levels</div><div class='menu-line'></div>`;

        if (this.BtnLayoutLevels) {
            this.BtnLayoutLevels.addEventListener('click', () => {
                this.toggleBtnLevels();
            });
        }
    }

    static getInstance() {
        return this.instanceBurgerBtn;
    }
    public draw(containerElement: Element) {
        if (containerElement) {
            containerElement.append(this.BtnLayoutLevels);
        }
    }

    toggleBtnLevels() {
        if (this.BtnLayoutLevels && this.levelsContainer) {
            this.BtnLayoutLevels.classList.toggle('menu_active');
            this.levelsContainer.classList.toggle('levels_opened');
        }
    }
}
