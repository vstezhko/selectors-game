import { ILevelData } from '../types/interface';

export const levelsData: ILevelData[] = [
    {
        levelNumber: 1,
        title: 'Select elements by their type',
        selectorName: 'Type Selector',
        doThis: 'Select the plates',
        selector: 'plate',
        syntax: 'A',
        hint: 'Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.',
        examples: [
            '<strong>div</strong> selects all <tag>div</tag> elements.',
            '<strong>p</strong> selects all <tag>p</tag> elements.',
        ],
        boardMarkup: ['<plate />', '<plate />'],
    },
    {
        levelNumber: 2,
        title: '2Select elements by their type',
        selectorName: '2Type Selector',
        doThis: '2Select the plates',
        selector: 'plate',
        syntax: 'A',
        hint: 'Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.',
        examples: [
            '<strong>div</strong> selects all <tag>div</tag> elements.',
            '<strong>p</strong> selects all <tag>p</tag> elements.',
        ],
        boardMarkup: ['<plate>', '<apple/>', '</plate>', '<plate />'],
    },
    {
        levelNumber: 3,
        title: '3Select elements by their type',
        selectorName: '3Type Selector',
        doThis: '3Select the plates',
        selector: 'plate',
        syntax: 'A',
        hint: 'Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.',
        examples: [
            '<strong>div</strong> selects all <tag>div</tag> elements.',
            '<strong>p</strong> selects all <tag>p</tag> elements.',
        ],
        boardMarkup: ['<plate>', '<apple/>', '</plate>', '<plate />'],
    },
    {
        levelNumber: 4,
        title: '4Select elements by their type',
        selectorName: '4Type Selector',
        doThis: '4Select the plates',
        selector: 'plate',
        syntax: 'A',
        hint: 'Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.',
        examples: [
            '<strong>div</strong> selects all <tag>div</tag> elements.',
            '<strong>p</strong> selects all <tag>p</tag> elements.',
        ],
        boardMarkup: ['<plate>', '<apple/>', '</plate>', '<plate />'],
    },
    {
        levelNumber: 5,
        title: '5Select elements by their type',
        selectorName: '5Type Selector',
        doThis: '5Select the plates',
        selector: 'plate',
        syntax: 'A',
        hint: 'Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.',
        examples: [
            '<strong>div</strong> selects all <tag>div</tag> elements.',
            '<strong>p</strong> selects all <tag>p</tag> elements.',
        ],
        boardMarkup: ['<plate>', '<apple/>', '</plate>', '<plate />'],
    },
    // {
    //     levelNumber: '6',
    //     title: '6Select elements by their type',
    //     selectorName: '6Type Selector',
    //     doThis: '6Select the plates',
    //     selector: 'plate',
    //     syntax: 'A',
    //     hint: 'Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.',
    //     examples: [
    //         '<strong>div</strong> selects all <tag>div</tag> elements.',
    //         '<strong>p</strong> selects all <tag>p</tag> elements.',
    //     ],
    //     boardMarkup: '<plate/><plate/>',
    // },
    // {
    //     levelNumber: '7',
    //     title: '7Select elements by their type',
    //     selectorName: '7Type Selector',
    //     doThis: '7Select the plates',
    //     selector: 'plate',
    //     syntax: 'A',
    //     hint: 'Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.',
    //     examples: [
    //         '<strong>div</strong> selects all <tag>div</tag> elements.',
    //         '<strong>p</strong> selects all <tag>p</tag> elements.',
    //     ],
    //     boardMarkup: '<plate/><plate/>',
    // },
    // {
    //     levelNumber: '8',
    //     title: '8Select elements by their type',
    //     selectorName: '8Type Selector',
    //     doThis: '8Select the plates',
    //     selector: 'plate',
    //     syntax: 'A',
    //     hint: 'Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.',
    //     examples: [
    //         '<strong>div</strong> selects all <tag>div</tag> elements.',
    //         '<strong>p</strong> selects all <tag>p</tag> elements.',
    //     ],
    //     boardMarkup: '<plate/><plate/>',
    // },
    // {
    //     levelNumber: '9',
    //     title: '9Select elements by their type',
    //     selectorName: '9Type Selector',
    //     doThis: '9Select the plates',
    //     selector: 'plate',
    //     syntax: 'A',
    //     hint: 'Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.',
    //     examples: [
    //         '<strong>div</strong> selects all <tag>div</tag> elements.',
    //         '<strong>p</strong> selects all <tag>p</tag> elements.',
    //     ],
    //     boardMarkup: '<plate/><plate/>',
    // },
    // {
    //     levelNumber: '10',
    //     title: '10 Select elements by their type',
    //     selectorName: '10 Type Selector',
    //     doThis: '10 Select the plates',
    //     selector: 'plate',
    //     syntax: 'A',
    //     hint: 'Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.',
    //     examples: [
    //         '<strong>div</strong> selects all <tag>div</tag> elements.',
    //         '<strong>p</strong> selects all <tag>p</tag> elements.',
    //     ],
    //     boardMarkup: '<plate/><plate/>',
    // },
];
