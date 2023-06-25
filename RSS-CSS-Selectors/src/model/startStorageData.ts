import { ITemplateStartData } from '../types/interface';

export const generateStartData = () => {
    const template: ITemplateStartData = {
        currentLevel: 1,
        completed: new Map(),
    };
    return new Map(Object.entries(template));
};
