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
}

export interface ITemplateStartData {
    currentLevel: number;
    completed: Set<number>;
}
