import { Element } from '../../../types/type';

export class InputPane {
    public draw(): void {
        console.log('InputPane');
        const inputPaneContainer: Element = document.querySelector<HTMLDivElement>('.input-pane');
        const inputPaneLayout = `
            <div class='pane-header'>
                <div class='pane-header__name'>CSS Editor</div>
                <div class='pane-header__file-name'>style.css</div>
            </div>
            <div class='pane-window pane-window_input-pane'>
                <div class='line-numbers'>
                    1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>18<br>19<br>20
                </div>
                <input class='input-pane__input input-strobe' type='text' placeholder='Type in a CSS selector'>
                <button class='input-pane__button'>enter</button>
                <div>
                    {<br>
                    /* Styles would go here. */<br>
                    }
                </div>
                <div class='help'>
                    <br>
                    /* <br>
                    Type a number to skip to a level.<br>
                    Ex → "5" for level 5 <br>*/
                </div>
            </div>
        `;

        if (inputPaneContainer) {
            inputPaneContainer.innerHTML = inputPaneLayout;
        }
    }
}
