export const getAllDescendants = (element: HTMLElement): HTMLElement[] => {
    const descendants: HTMLElement[] = [];

    function getDescendants(element: HTMLElement): void {
        const children = element.childNodes;

        children.forEach((child) => {
            if (child.nodeType === Node.ELEMENT_NODE) {
                if (child instanceof HTMLElement) {
                    descendants.push(child);
                    getDescendants(child);
                }
            }
        });
    }

    getDescendants(element);
    return descendants;
};
