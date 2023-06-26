import { Element } from '../../../types/type';
import { transformToGameMarkup } from '../../../utils/transformToMarkup';
import DataStorage from '../../../data-storage/DataStorage';
import { ILevelData } from '../../../types/interface';
import { StorageGameDataNames } from '../../../types/enum';
import { levelsData } from '../../../model/levelsData';

export class MarkupPane {
    private storage = DataStorage.getInstance();
    private levelsData: ILevelData[];

    constructor(levelsData: ILevelData[]) {
        this.levelsData = levelsData;
        this.storage.subscribe(StorageGameDataNames.CURRENT_LEVEL, (level) => this.draw(level as number));
    }

    public draw(level: number): void {
        const markupPaneContainer: Element = document.querySelector<HTMLDivElement>('.markup-pane');
        // const innerMarkup = transformToGameMarkup(['<plate>', '<apple />', '</plate>', '<plate />']);
        const innerMarkup = transformToGameMarkup(levelsData[level - 1].boardMarkup);
        const markupPaneLayout = `
            <div class='pane-header'>
                <div class='pane-header__name'>HTML Editor</div>
                <div class='pane-header__file-name'>table.html</div>
            </div>
            <div class='pane-window'>
                <div class='line-numbers'>
                    1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>18<br>19<br>20
                </div>
                <div class='pane-window__content'>
                    <div>&lt;div class="table"&gt;
                    ${innerMarkup}

<!--                    <div>&lt;orange class="small" /&gt;</div>-->
<!--                        <div class=''>&lt;orange class="small" /&gt;</div>-->
<!--                        <div>&lt;pickle /&gt;</div>-->
<!--                        <div class=''>&lt;pickle /&gt;</div>-->
<!--                        <div class=''>&lt;apple class="small" /&gt;</div>-->
<!--                        <div>&lt;apple class="small" /&gt;</div>-->
                        
                        &lt;/div&gt;
                    </div>
                </div>
            </div>
        `;

        if (markupPaneContainer) {
            markupPaneContainer.innerHTML = markupPaneLayout;
        }
    }
}
