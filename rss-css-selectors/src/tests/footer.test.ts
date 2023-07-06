import { jest } from '@jest/globals';
import { Footer } from '../view/footer/Footer';

describe('Footer', () => {
    let footer: Footer;
    let footerContainerMock: HTMLElement;
    const footerLayout = `
        <a class="logo-img" href="https://rs.school/">
            <img src="./assets/logo_rs.svg" alt="logo">
            <h3>RS School 2023</h3>
        </a>

        <div class="github-img">
            <a href="https://github.com/vstezhko">
                <img src="./assets/gh3.svg" alt="github">
            </a>
        </div>
        `;

    beforeEach(() => {
        // Создаем моки для необходимых элементов DOM
        footerContainerMock = document.createElement('footer');

        // Создаем экземпляр класса Footer
        footer = new Footer();

        // Мокаем метод document.querySelector
        jest.spyOn(document, 'querySelector').mockImplementation((selector: string) => {
            if (selector === 'footer') return footerContainerMock;
            return null;
        });
    });

    afterEach(() => {
        // Восстанавливаем оригинальные реализации методов
        jest.restoreAllMocks();
    });

    test('draw sets footerLayout as innerHTML of footerContainer', () => {
        // Вызываем метод draw
        footer.draw();

        // Проверяем, что footerLayout стал innerHTML для footerContainer
        expect(footerContainerMock.innerHTML).toBe(footerLayout);
    });
});
