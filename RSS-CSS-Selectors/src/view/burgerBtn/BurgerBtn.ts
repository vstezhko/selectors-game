import { Element } from '../../types/type';

export class BurgerBtn {
    private static instanceBurgerBtn = new BurgerBtn();
    private readonly BtnLayout: Node & Element;
    private readonly levelsContainer: Element;

    constructor() {
        this.levelsContainer = document.querySelector<HTMLDivElement>('.levels');
        this.BtnLayout = document.createElement('div');
        this.BtnLayout.classList.add('menu');
        this.BtnLayout.innerHTML = `<div class='menu-line'></div>`;

        if (this.BtnLayout) {
            this.BtnLayout.addEventListener('click', () => {
                this.toggleBtn();
            });
        }
    }

    static getInstance() {
        return this.instanceBurgerBtn;
    }
    public draw(containerElement: Element) {
        if (containerElement) {
            containerElement.append(this.BtnLayout);
        }
    }

    toggleBtn() {
        if (this.BtnLayout && this.levelsContainer) {
            this.BtnLayout.classList.toggle('menu_active');
            this.levelsContainer.classList.toggle('levels_opened');
        }
    }
}
