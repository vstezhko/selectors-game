import { ITemplateStartData } from '../types/interface';

export const generateStartData = (): ITemplateStartData => {
    const template = {
        hint: null,
        currentLevel: 1,
        completed: new Map(),
        win: false,
    };
    return Object.assign(template);
};
