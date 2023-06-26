import { ResultType } from '../types/type';

export const validateSolution = (solution: string, answer: string): ResultType => {
    console.log(solution);
    const table = document.querySelector('.table');
    const result: ResultType = {
        checkResult: false,
        nodes: null,
    };

    if (table && solution) {
        const arr: string[] = Array.from(table.querySelectorAll(solution)).map((elem) => elem.tagName.toLowerCase());
        result.checkResult = arr.join(' ') === answer;
        if (result.checkResult) {
            result.nodes = table.querySelectorAll(solution);
        }
    }
    return result;
};
