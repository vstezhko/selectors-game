import { Element } from '../../types/type';
import { getAllDescendants } from '../../utils/getAllDescendants';

export class HoverElementsWatcher {
    private readonly table: Element;
    private readonly markupPane: Element;

    constructor() {
        this.table = document.querySelector('.table');
        this.markupPane = document.querySelector('.markup-pane');

        if (this.table && this.markupPane) {
            this.table.addEventListener('mouseover', (e: MouseEvent) => {
                if (e.target instanceof HTMLElement) {
                    e.target.dataset.id && this.hoverElements(e.target.dataset.id);
                }
            });
            this.table.addEventListener('mouseout', (e: MouseEvent) => {
                if (e.target instanceof HTMLElement) {
                    e.target.dataset.id && this.unHoverElements(e.target.dataset.id);
                }
            });

            this.markupPane.addEventListener('mouseover', (e: MouseEvent) => {
                if (e.target instanceof HTMLElement) {
                    e.target.dataset.id && this.hoverElements(e.target.dataset.id);
                }
            });
            this.markupPane.addEventListener('mouseout', (e: MouseEvent) => {
                if (e.target instanceof HTMLElement) {
                    e.target.dataset.id && this.unHoverElements(e.target.dataset.id);
                }
            });
        }
    }

    gatherElements(): HTMLElement[] | null {
        if (this.table instanceof HTMLElement && this.markupPane instanceof HTMLElement) {
            return [...getAllDescendants(this.table), ...getAllDescendants(this.markupPane)];
        } else {
            return null;
        }
    }

    hoverElements(id: string) {
        const allElements = this.gatherElements();
        allElements &&
            allElements.forEach((el) => {
                if (el.dataset.id === id) {
                    el.dataset.hovered = 'true';
                }
            });
    }

    unHoverElements(id: string) {
        const allElements = this.gatherElements();
        allElements &&
            allElements.forEach((el) => {
                if (el.dataset.id === id) {
                    delete el.dataset.hovered;
                }
            });
    }
}
