export const transformToGameMarkup = (html: string[]): string => {
    const newArray = html.map((tag) => {
        // </ ... >   =>  /&gt;close      (=> /></div>;)
        if (/<\/\w+>/g.test(tag)) {
            tag = tag.replace(/>/g, '&gt;close');
        }

        // </   =>   &lt;/     (=> </)
        if (/<\//g.test(tag)) {
            tag = tag.replace(/<\//g, '&lt;/');
        }

        // />   =>  /&gt;close      (=> /></div>;)
        if (/\/>/g.test(tag)) {
            tag = tag.replace(/\/>/g, '/&gt;close');
        }

        // <   =>  open&lt;      (=> <div><;)
        if (/</g.test(tag)) {
            tag = tag.replace(/</g, 'open&lt;');
        }

        // >   =>  &gt;      (=> >)
        if (/>/g.test(tag)) {
            tag = tag.replace(/>/g, '&gt;');
        }

        return tag.replace(/open/g, '<div>').replace(/close/g, '</div>');
    });

    return newArray.join('');
};
