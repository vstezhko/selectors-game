import { ITemplateStartData } from '../types/interface';

export const generateStartData = () => {
    const template: ITemplateStartData = {
        hint: null,
        currentLevel: 1,
        completed: new Map(),
    };
    return new Map(Object.entries(template));
};
