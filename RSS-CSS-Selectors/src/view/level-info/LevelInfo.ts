import { Element } from '../../types/type';

export class LevelInfo {
    public draw(): void {
        console.log('LevelInfo');
        const levelInfoContainer: Element = document.querySelector<HTMLDivElement>('.level-info');
        const levelInfoLayout = `
            <h2 class='table__doThis'>Select the fancy plate</h2>
            <a class="table__note-toggle" href="#">Help, I'm stuck!</a>
        `;

        if (levelInfoContainer) {
            levelInfoContainer.innerHTML = levelInfoLayout;
        }
    }
}
