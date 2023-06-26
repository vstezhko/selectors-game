import { StorageCompletedNames } from './enum';
import { ITemplateStartData } from './interface';

export type Element = HTMLElement | null;
export type Input = HTMLInputElement | null;

export type ResultType = {
    checkResult: boolean;
    nodes: null | NodeList;
};

export type CompletedLevels = Map<number, StorageCompletedNames>;
export type StorageType = Map<string, number | CompletedLevels | null>;
