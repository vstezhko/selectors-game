import { generateStartData } from '../model/startStorageData';
import { StorageCompletedNames, StorageGameDataNames } from '../types/enum';
import { ITemplateStartData } from '../types/interface';

export default class DataStorage {
    private static instanceDataStorage = new DataStorage();

    // todo типизировать gameData
    private readonly gameData = this.getGameDataFromLS() || generateStartData();
    private _listeners = new Map<StorageGameDataNames, Set<(param: number) => void>>();

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
        this.notify(StorageGameDataNames.CURRENT_LEVEL, value);
        this.saveGameData();
    }

    saveGameData() {
        const completed = this.gameData[StorageGameDataNames.COMPLETED];
        const currLevel = this.gameData[StorageGameDataNames.CURRENT_LEVEL];

        localStorage.setItem(StorageGameDataNames.COMPLETED, JSON.stringify(Array.from(completed)));
        localStorage.setItem(StorageGameDataNames.CURRENT_LEVEL, JSON.stringify(currLevel));
    }

    setCompletedLevel(value: number, completedType: StorageCompletedNames) {
        const completedMap = this.gameData[StorageGameDataNames.COMPLETED];
        completedMap.set(value, completedType);

        // console.log(this.gameData);
        this.gameData[StorageGameDataNames.COMPLETED] = completedMap;
        this.notify(StorageGameDataNames.COMPLETED, value);
        this.saveGameData();
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

        if (lsDataCompleted && lsDataCurrentLevel) {
            return {
                [StorageGameDataNames.HINT]: null,
                [StorageGameDataNames.CURRENT_LEVEL]: Number(JSON.parse(lsDataCurrentLevel)),
                [StorageGameDataNames.COMPLETED]: new Map<number, StorageCompletedNames>(JSON.parse(lsDataCompleted)),
            };
        } else {
            return null;
        }
    }

    subscribe(nameEvent: StorageGameDataNames, listenerMethod: (param: number) => void) {
        let listListeners = this._listeners.get(nameEvent);
        if (!listListeners) {
            listListeners = new Set<(param: number) => void>();
            this._listeners.set(nameEvent, listListeners);
        }
        listListeners.add(listenerMethod);
    }

    private notify(nameEvent: StorageGameDataNames, params: number) {
        const listListeners = this._listeners.get(nameEvent);
        if (listListeners) {
            listListeners.forEach((listener) => listener(params));
        }
    }
}
