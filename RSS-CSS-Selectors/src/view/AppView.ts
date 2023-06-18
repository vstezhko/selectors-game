import { Header } from './header/Header';

export class AppView {
    private readonly header;
    constructor() {
        this.header = new Header();
    }

    public drawHeader(): void {
        console.log('header');
        this.header.draw();
    }
}
