import { Element } from '../../types/type';

export class LevelInfo {
    public draw(): void {
        console.log('LevelInfo');
        const levelInfoContainer: Element = document.querySelector<HTMLDivElement>('.level-info');
        const levelInfoLayout = `
            <h2 class='table__doThis'>Select the fancy plate</h2>
            <div class='table__note'>
                <h3>No worries, you've got this!</h3>
                <p>
                    You're about to learn CSS Selectors!
                    Selectors are how you pick which element to apply styles to.
                </p>
                <h4>Exhibit 1 - A CSS Rule</h4>
                <pre>p {margin-bottom: 12px;}</pre>
                <p>
                    Here, the "p" is the selector (selects all &lt;p&gt; elements) and applies the margin-bottom style.
                </p>
                <p>
                    To play, type in a CSS selector in the editor below to select the correct items on the table.If you get
                    it right, you'll advance to the next level.
                </p>
                <p>
                    Hover over the items on the table to see their HTML markup.
                </p>
                <p>
                    Get help with selectors on the right! →
                </p>
                <a class='table__note-toggle table__note-toggle_inner' href='#'>Ok, got it!</a>
            </div>
            <a class="table__note-toggle" href="#">Help, I'm stuck!</a>
        `;

        if (levelInfoContainer) {
            levelInfoContainer.innerHTML = levelInfoLayout;
        }
    }
}
