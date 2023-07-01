import { getAllDescendants } from '../utils/getAllDescendants';

describe('getAllDescendants', () => {
    test('returns all descendants of an element', () => {
        // Create a mock element with nested child elements
        const parentElement = document.createElement('div');
        const childElement1 = document.createElement('span');
        const childElement2 = document.createElement('div');
        const grandchildElement1 = document.createElement('p');
        const grandchildElement2 = document.createElement('a');

        parentElement.appendChild(childElement1);
        parentElement.appendChild(childElement2);
        childElement2.appendChild(grandchildElement1);
        grandchildElement1.appendChild(grandchildElement2);

        const expectedDescendants = [childElement1, childElement2, grandchildElement1, grandchildElement2];
        const descendants = getAllDescendants(parentElement);

        expect(descendants).toEqual(expectedDescendants);
    });

    test('returns an empty array for an element with no descendants', () => {
        const element = document.createElement('div');
        const expectedDescendants: HTMLElement[] = [];
        const descendants = getAllDescendants(element);

        expect(descendants).toEqual(expectedDescendants);
    });
});
