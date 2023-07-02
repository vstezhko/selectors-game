import { LevelInfo } from '../view/level-info/LevelInfo';
import { ILevelData } from '../types/interface';

describe('LevelInfo', () => {
    let levelInfo: LevelInfo;
    let helpBtnMock: HTMLElement;
    let levelInfoContainerMock: HTMLDivElement;
    const levelsDataMock: ILevelData[] = [
        {
            levelNumber: 1,
            title: 'Level 1',
            selectorName: 'Selector 1',
            doThis: 'Do This 1',
            selector: '.selector1',
            syntax: 'Syntax 1',
            hint: 'Hint 1',
            examples: ['Example 1'],
            boardMarkup: ['Board Markup 1'],
            realMarkup: 'Real Markup 1',
            answer: 'Answer 1',
        },
        {
            levelNumber: 2,
            title: 'Level 2',
            selectorName: 'Selector 2',
            doThis: 'Do This 2',
            selector: '.selector2',
            syntax: 'Syntax 2',
            hint: 'Hint 2',
            examples: ['Example 2'],
            boardMarkup: ['Board Markup 2'],
            realMarkup: 'Real Markup 2',
            answer: 'Answer 2',
        },
    ];

    beforeEach(() => {
        // Создаем экземпляр класса LevelInfo
        levelInfo = new LevelInfo(levelsDataMock);

        // Создаем мок help button
        helpBtnMock = document.createElement('p');
        helpBtnMock.classList.add('table__toggle');

        levelInfoContainerMock = document.createElement('div');
        levelInfoContainerMock.classList.add('level-info');

        // Мокаем методы document.querySelector и addEventListener
        jest.spyOn(document, 'querySelector').mockImplementation((selector: string) => {
            if (selector === '.level-info') return levelInfoContainerMock;
            if (selector === '.table__toggle') return helpBtnMock;
            return null;
        });
    });

    afterEach(() => {
        // Восстанавливаем оригинальные реализации методов
        jest.restoreAllMocks();
    });

    test('generateLayout returns correct layout string', () => {
        const levelNumber = 2;

        const expectedLayout = `
            <h2 class='table__doThis'>${levelsDataMock[levelNumber - 1].doThis}</h2>
            <div class='table__note'>
                <p class='table__toggle'>Help, I'm stuck!</p>
            </div> 
        `;

        const layout = levelInfo['generateLayout'](levelNumber);

        expect(layout).toBe(expectedLayout);
    });

    test('draw sets levelInfoLayout as innerHTML of levelInfoContainer', () => {
        const levelNumber = 2;

        // Вызываем метод draw
        levelInfo.draw(levelNumber);

        // Проверяем, что levelInfoLayout стал innerHTML для levelInfoContainerMock
        expect(levelInfoContainerMock.innerHTML).toContain(`<h2 class="table__doThis">`);
        expect(levelInfoContainerMock.innerHTML).toContain(`<div class="table__note">`);
        expect(levelInfoContainerMock.innerHTML).toContain(`<p class="table__toggle">Help, I'm stuck!</p>`);
    });

    test('addEventListenerToHintBtn adds class to help button', () => {
        const levelNumber = 1;

        // Вызываем метод addEventListenerToHintBtn
        levelInfo.addEventListenerToHintBtn(helpBtnMock, levelNumber);

        // Вызываем зарегистрированную функцию события
        helpBtnMock.dispatchEvent(new Event('click'));

        // Проверяем, что класс был добавлен к help button
        expect(helpBtnMock.classList.contains('table__toggle_hidden')).toBe(true);
    });
});
