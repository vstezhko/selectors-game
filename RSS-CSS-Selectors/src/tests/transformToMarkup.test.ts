import { transformToGameMarkup } from '../utils/transformToMarkup';

describe('transformToGameMarkup', () => {
    test('transforms HTML tags correctly', () => {
        const html = ['<plate />', '<plate />'];

        const expectedOutput = '<div>&lt;plate /&gt;</div><div>&lt;plate /&gt;</div>';
        const transformedMarkup = transformToGameMarkup(html);

        expect(transformedMarkup).toBe(expectedOutput);
    });

    test('transforms HTML tags correctly', () => {
        const html = ['<plate />', '<plate id="fancy" />', '<plate />'];

        const expectedOutput =
            '<div>&lt;plate /&gt;</div><div>&lt;plate id="fancy" /&gt;</div><div>&lt;plate /&gt;</div>';
        const transformedMarkup = transformToGameMarkup(html);

        expect(transformedMarkup).toBe(expectedOutput);
    });

    test('transforms HTML tags correctly', () => {
        const html = ['<plate>', '<apple />', '</plate>', '<plate id="fancy">', '<apple />', '</plate>'];

        const expectedOutput =
            '<div>&lt;plate&gt;<div>&lt;apple /&gt;</div>&lt;/plate&gt;</div><div>&lt;plate id="fancy"&gt;<div>&lt;apple /&gt;</div>&lt;/plate&gt;</div>';
        const transformedMarkup = transformToGameMarkup(html);

        expect(transformedMarkup).toBe(expectedOutput);
    });

    test('returns an empty string for empty input', () => {
        const html: string[] = [];
        const expectedOutput = '';
        const transformedMarkup = transformToGameMarkup(html);

        expect(transformedMarkup).toBe(expectedOutput);
    });
});
