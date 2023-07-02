import { Levels } from '../view/levels/Levels';

describe('Levels', () => {
    let levels: Levels;
    let levelsListContainer: HTMLElement;

    beforeEach(() => {
        levels = new Levels([]);
        levelsListContainer = document.createElement('div');
        levels['levelsListContainer'] = levelsListContainer;
    });

    afterEach(() => {
        levelsListContainer.innerHTML = '';
    });

    describe('showWinMessage', () => {
        it('should add win message to levels list container', () => {
            levels.showWinMessage();
            const winMessage = levelsListContainer.querySelector('.win');
            expect(winMessage).toBeDefined();
        });
    });
});
