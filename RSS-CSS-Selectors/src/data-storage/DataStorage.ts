import { generateStartData } from '../model/startStorageData';
import { StorageGameDataNames } from '../types/enum';

export default class DataStorage {
    private static instanceDataStorage = new DataStorage();

    // todo типизировать gameData
    private readonly gameData = generateStartData();
    private _listeners = new Map<StorageGameDataNames, Set<(param: number) => void>>();

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}

    static getInstance() {
        return this.instanceDataStorage;
    }

    setValue(name: StorageGameDataNames, value: number) {
        this.gameData.set(name, value);
        this.notify(name, value);
    }

    getValue(name: StorageGameDataNames) {
        if (this.gameData.has(name)) {
            return this.gameData.get(name);
        }
        return null;
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
