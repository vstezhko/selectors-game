import { AppView } from '../view/AppView';

class App {
    private readonly appView;
    constructor() {
        this.appView = new AppView();
    }

    public start(): void {
        this.appView.drawComponents();
        this.appView.drawBurgerBtn();
    }
}

export default App;
