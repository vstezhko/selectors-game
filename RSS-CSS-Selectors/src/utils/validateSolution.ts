export const validateSolution = (solution: string, answer: string): boolean => {
    const table = document.querySelector('.table');
    let result = false;
    if (table) {
        const arr: string[] = Array.from(table.querySelectorAll(solution)).map((elem) => elem.tagName.toLowerCase());
        result = arr.join(' ') === answer;
    }

    return result;
};
