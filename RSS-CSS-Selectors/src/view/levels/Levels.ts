const levelsData = require('../../model/levelsData.json');

type LevelDataType = {
    doThis: string;
};

export class Levels {
    public draw(): void {
        console.log('levels', levelsData);
        const levelsContainer = document.querySelector<HTMLDivElement>('.levels');
        let generatedLevels = '';
        levelsData.forEach((level: LevelDataType) => {
            generatedLevels += `
                <a class="levels__level" data-id="1"><span class="checkmark"></span><span class="level-number">1</span>${level.doThis}</a>
            `;
        });
        const levelsLayout = `

            <h2>Levels</h2>
            <div class="levels__list">
                ${generatedLevels}
<!--                <a class="levels__level completed" data-id='1'><span class='checkmark'></span><span class='level-number'>1</span>Text</a>-->
<!--                <a class="levels__level current" data-id='1'><span class='checkmark'></span><span class='level-number'>1</span>Text</a>-->
            </div>
            <a class="reset-progress" href="#">Reset Progress</a>
        `;
        if (levelsContainer) {
            levelsContainer.innerHTML += levelsLayout;
        }

        const levelsBtn = document.querySelector('.menu');
        if (levelsBtn && levelsContainer) {
            levelsBtn.addEventListener('click', () => {
                levelsBtn.classList.toggle('menu_active');
                levelsContainer.classList.toggle('levels_opened');
            });
        }
    }
}
