import { StorageCompletedNames } from './enum';

export type Element = HTMLElement | null;
export type Input = HTMLInputElement | null;

export type ResultType = {
    checkResult: boolean;
    nodes: null | NodeList;
};

export type CompletedLevels = Map<number, StorageCompletedNames>;
