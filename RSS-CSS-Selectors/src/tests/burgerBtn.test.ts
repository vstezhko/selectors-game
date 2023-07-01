import { BurgerBtn } from '../view/burgerBtn/BurgerBtn';
import { jest } from '@jest/globals';

describe('BurgerBtn', () => {
    let burgerBtn: BurgerBtn;
    let bodyMock: HTMLElement;
    let levelsContainerMock: HTMLElement;

    beforeEach(() => {
        // Создаем моки для необходимых элементов DOM
        bodyMock = document.createElement('body');
        levelsContainerMock = document.createElement('div');

        // Мокаем методы document.querySelector
        jest.spyOn(document, 'querySelector').mockImplementation((selector: string) => {
            if (selector === 'body') return bodyMock;
            if (selector === '.levels') return levelsContainerMock;
            return null;
        });
        // Создаем экземпляр класса BurgerBtn
        burgerBtn = new BurgerBtn();
    });

    afterEach(() => {
        // Восстанавливаем оригинальные реализации методов
        jest.restoreAllMocks();
    });

    test('toggleBtnLevels toggles the menu and levels container classes', () => {
        // Запоминаем начальные классы элементов
        const initialBodyClasses = bodyMock.classList.value;
        const initialBtnLayoutLevelsClasses = burgerBtn.BtnLayoutLevels.classList.value;
        const initialLevelsContainerClasses = levelsContainerMock.classList.value;

        // Вызываем метод toggleBtnLevels
        burgerBtn.toggleBtnLevels();

        console.log('dfdsfdfdfdf', bodyMock.classList.value);

        // Проверяем изменение классов элементов
        expect(bodyMock.classList.value).toContain('body_withPopup');
        expect(burgerBtn.BtnLayoutLevels.classList.value).toContain('menu_active');
        expect(levelsContainerMock.classList.value).toContain('levels_opened');

        // Вызываем метод toggleBtnLevels еще раз
        burgerBtn.toggleBtnLevels();

        // Проверяем возвращение начальных классов элементов
        expect(bodyMock.classList.value).toEqual(initialBodyClasses);
        expect(burgerBtn.BtnLayoutLevels.classList.value).toEqual(initialBtnLayoutLevelsClasses);
        expect(levelsContainerMock.classList.value).toEqual(initialLevelsContainerClasses);
    });

    test('draw appends BtnLayoutLevels to containerElement', () => {
        // Вызываем метод draw
        burgerBtn.draw(levelsContainerMock);

        // Проверяем, что BtnLayoutLevels был добавлен в containerElement
        expect(levelsContainerMock.querySelector('.menu')).toBe(burgerBtn.BtnLayoutLevels);
    });
});
