import { ITemplateStartData } from '../types/interface';

export const generateStartData = () => {
    const template: ITemplateStartData = {
        currentLevel: 1,
        completed: new Set(),
    };
    return new Map(Object.entries(template));
};
