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
                    e.target.dataset.gameId && this.hoverElements(e.target.dataset.gameId);
                }
            });
            this.table.addEventListener('mouseout', (e: MouseEvent) => {
                if (e.target instanceof HTMLElement) {
                    e.target.dataset.gameId && this.unHoverElements(e.target.dataset.gameId);
                }
            });

            this.markupPane.addEventListener('mouseover', (e: MouseEvent) => {
                if (e.target instanceof HTMLElement) {
                    e.target.dataset.gameId && this.hoverElements(e.target.dataset.gameId);
                }
            });
            this.markupPane.addEventListener('mouseout', (e: MouseEvent) => {
                if (e.target instanceof HTMLElement) {
                    e.target.dataset.gameId && this.unHoverElements(e.target.dataset.gameId);
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

    createTagInfoLabel(el: HTMLElement): void {
        const tagName = el.nodeName.toLowerCase();
        const className = Array.from(el.classList).filter((i) => i !== 'strobe')[0];
        const idName = el.id;
        const tagInfo = `<${tagName}${idName ? " id='" + idName + "'" : ''}${
            className ? " class='" + className + "'" : ''
        }></${tagName}>`;

        const tagLabel = document.createElement('div');
        tagLabel.classList.add('tag-label');
        tagLabel.textContent = tagInfo;
        this.table && this.table.appendChild(tagLabel);
        tagLabel.style.left = `${el.getBoundingClientRect().left - 110}px`;
    }

    removeTagInfoLabel(): void {
        const tagLabel = document.querySelector('.tag-label');
        tagLabel && tagLabel.remove();
    }

    hoverElements(id: string): void {
        const allElements = this.gatherElements();
        allElements &&
            allElements.forEach((el) => {
                if (el.dataset.gameId === id) {
                    el.dataset.hovered = 'true';
                    if (el.nodeName !== 'DIV') {
                        this.createTagInfoLabel(el);
                    }
                }
            });
    }

    unHoverElements(id: string): void {
        const allElements = this.gatherElements();
        allElements &&
            allElements.forEach((el) => {
                if (el.dataset.gameId === id) {
                    delete el.dataset.hovered;
                    if (el.nodeName !== 'DIV') {
                        this.removeTagInfoLabel();
                    }
                }
            });
    }
}
