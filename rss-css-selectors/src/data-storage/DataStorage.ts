import { generateStartData } from '../model/startStorageData';
import { StorageCompletedNames, StorageGameDataNames } from '../types/enum';
import { ITemplateStartData } from '../types/interface';
import { CompletedLevels } from '../types/type';
import { levelsData } from '../model/levelsData';

export default class DataStorage {
    private static instanceDataStorage = new DataStorage();

    private readonly gameData = this.getGameDataFromLS() || generateStartData();
    private _listeners = new Map<StorageGameDataNames, Set<(param: number | CompletedLevels) => void>>();

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}

    static getInstance() {
        return this.instanceDataStorage;
    }

    setHintLevel(value: number) {
        this.gameData[StorageGameDataNames.HINT] = value;
        this.notify(StorageGameDataNames.HINT, value);
    }

    setCurrentLevel(value: number) {
        this.gameData[StorageGameDataNames.CURRENT_LEVEL] = value;
        if (this.gameData[StorageGameDataNames.COMPLETED].size === levelsData.length) {
            this.saveGameData();
            return;
        }
        this.notify(StorageGameDataNames.CURRENT_LEVEL, value);
        this.saveGameData();
    }

    saveGameData() {
        const completed = this.gameData[StorageGameDataNames.COMPLETED];
        const currLevel = this.gameData[StorageGameDataNames.CURRENT_LEVEL];
        const win = this.gameData[StorageGameDataNames.WIN];

        localStorage.setItem(StorageGameDataNames.COMPLETED, JSON.stringify(Array.from(completed)));
        localStorage.setItem(StorageGameDataNames.CURRENT_LEVEL, JSON.stringify(currLevel));
        localStorage.setItem(StorageGameDataNames.WIN, JSON.stringify(win));
    }

    setCompletedLevel(value: number, completedType: StorageCompletedNames) {
        const completedMap = this.gameData[StorageGameDataNames.COMPLETED];
        completedMap.set(value, completedType);
        this.gameData[StorageGameDataNames.COMPLETED] = completedMap;
        if (this.gameData[StorageGameDataNames.COMPLETED].size === levelsData.length) {
            this.gameData[StorageGameDataNames.WIN] = true;
            this.notify(StorageGameDataNames.WIN, this.gameData[StorageGameDataNames.COMPLETED]);
            this.saveGameData();
            return;
        }
        this.notify(StorageGameDataNames.COMPLETED, this.gameData[StorageGameDataNames.COMPLETED]);
        this.saveGameData();
    }

    resetGameProgress(): void {
        this.gameData[StorageGameDataNames.COMPLETED] = new Map();
        this.saveGameData();
        this.notify(StorageGameDataNames.COMPLETED, this.gameData[StorageGameDataNames.COMPLETED]);
    }

    getValue(name: StorageGameDataNames) {
        if (this.gameData[name]) {
            return this.gameData[name];
        }
        return null;
    }

    getGameDataFromLS(): ITemplateStartData | null {
        const lsDataCompleted = localStorage.getItem(StorageGameDataNames.COMPLETED);
        const lsDataCurrentLevel = localStorage.getItem(StorageGameDataNames.CURRENT_LEVEL);
        const lsDataWin = localStorage.getItem(StorageGameDataNames.WIN);

        if (lsDataCompleted && lsDataCurrentLevel && lsDataWin) {
            return {
                [StorageGameDataNames.HINT]: null,
                [StorageGameDataNames.CURRENT_LEVEL]: Number(JSON.parse(lsDataCurrentLevel)),
                [StorageGameDataNames.COMPLETED]: new Map<number, StorageCompletedNames>(JSON.parse(lsDataCompleted)),
                [StorageGameDataNames.WIN]: JSON.parse(lsDataWin),
            };
        } else {
            return null;
        }
    }

    subscribe(nameEvent: StorageGameDataNames, listenerMethod: (param: number | CompletedLevels) => void) {
        let listListeners = this._listeners.get(nameEvent);
        if (!listListeners) {
            listListeners = new Set<(param: number | CompletedLevels) => void>();
            this._listeners.set(nameEvent, listListeners);
        }
        listListeners.add(listenerMethod);
    }

    private notify(nameEvent: StorageGameDataNames, params: number | CompletedLevels) {
        const listListeners = this._listeners.get(nameEvent);
        if (listListeners) {
            listListeners.forEach((listener) => listener(params));
        }
    }
}
