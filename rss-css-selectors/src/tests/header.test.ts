import { jest } from '@jest/globals';
import { Header } from '../view/header/Header';

describe('Header', () => {
    let header: Header;
    let headerContainerMock: HTMLElement;
    const headerLayout = `
        <div class="logo">
            <h1>Selectors Game</h1>
        </div>
        <div class="menu-container"></div>
        `;

    beforeEach(() => {
        // Создаем моки для необходимых элементов DOM
        headerContainerMock = document.createElement('header');

        // Создаем экземпляр класса Header
        header = new Header();

        // Мокаем метод document.querySelector
        jest.spyOn(document, 'querySelector').mockImplementation((selector: string) => {
            if (selector === 'header') return headerContainerMock;
            return null;
        });
    });

    afterEach(() => {
        // Восстанавливаем оригинальные реализации методов
        jest.restoreAllMocks();
    });

    test('draw sets headerLayout as innerHTML of headerContainer', () => {
        // Вызываем метод draw
        header.draw();

        // Проверяем, что headerLayout стал innerHTML для headerContainer
        expect(headerContainerMock.innerHTML).toBe(headerLayout);
    });
});
