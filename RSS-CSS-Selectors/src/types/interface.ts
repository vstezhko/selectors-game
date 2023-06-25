import { StorageCompletedNames } from './enum';

export interface ILevelData {
    levelNumber: number;
    title: string;
    selectorName: string;
    doThis: string;
    selector: string;
    syntax: string;
    hint: string;
    examples: string[];
    boardMarkup: string[];
    realMarkup: string;
    answer: string;
}

export interface ITemplateStartData {
    hint: null | number;
    currentLevel: number;
    completed: Map<number, StorageCompletedNames>;
}
