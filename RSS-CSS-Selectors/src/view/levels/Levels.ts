import { Element } from '../../types/type';
import { ILevelData } from '../../types/interface';

const levelsData = require('../../model/levelsData.json');

export class Levels {
    public draw(): void {
        console.log('levels', levelsData);
        const levelsContainer: Element = document.querySelector<HTMLDivElement>('.levels');
        let generatedLevels = '';
        levelsData.forEach((level: ILevelData) => {
            generatedLevels += `
                <a class="levels__level" data-id="1"><span class="checkmark"></span><span class="level-number">${level.levelNumber}</span>${level.syntax}</a>
            `;
        });
        const levelsLayout = `

            <h2>Levels</h2>
            <div class="levels__list">
                ${generatedLevels}
<!--                <a class="levels__level evels__level_completed" data-id='1'><span class='checkmark'></span><span class='level-number'>1</span>Text</a>-->
<!--                <a class="levels__level evels__level_current" data-id='1'><span class='checkmark'></span><span class='level-number'>1</span>Text</a>-->
            </div>
            <a class="reset-progress" href="#">Reset Progress</a>
        `;
        if (levelsContainer) {
            levelsContainer.innerHTML += levelsLayout;
        }

        const levelsBtn: Element = document.querySelector('.menu');
        if (levelsBtn && levelsContainer) {
            levelsBtn.addEventListener('click', () => {
                levelsBtn.classList.toggle('menu_active');
                levelsContainer.classList.toggle('levels_opened');
            });
        }
    }
}
