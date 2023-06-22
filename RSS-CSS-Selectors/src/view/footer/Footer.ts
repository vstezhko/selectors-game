import { Element } from '../../types/type';

export class Footer {
    public draw(): void {
        console.log('footer');
        const footerContainer: Element = document.querySelector<HTMLDivElement>('footer');
        const footerLayout = `
        <a class='logo-img' href='https://rs.school/'>
            <img src='./assets/logo_rs.svg' alt='logo'>
            <h3>RS School 2023</h3>
        </a>

        <div class='github-img'>
            <a href='https://github.com/vstezhko'>
                <img src='./assets/gh3.svg' alt='github'>
            </a>
        </div>
        `;

        if (footerContainer) {
            footerContainer.innerHTML = footerLayout;
        }
    }
}
