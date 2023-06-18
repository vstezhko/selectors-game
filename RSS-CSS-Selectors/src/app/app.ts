import { AppView } from '../view/AppView';

class App {
    private readonly appView;
    constructor() {
        this.appView = new AppView();
    }

    public start(): void {
        console.log('start');
        this.appView.drawHeader();
    }
}

export default App;
