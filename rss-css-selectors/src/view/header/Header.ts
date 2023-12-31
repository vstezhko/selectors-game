import { Element } from '../../types/type';

export class Header {
    public draw(): void {
        const headerContainer: Element = document.querySelector<HTMLDivElement>('header');
        const headerLayout = `
        <div class='logo'>
            <h1>Selectors Game</h1>
        </div>
        <div class='menu-container'></div>
        `;

        if (headerContainer) {
            headerContainer.innerHTML = headerLayout;
        }
    }
}
