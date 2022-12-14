import * as React from 'react';
import { createRoot } from 'react-dom/client';

const Component = () => <p>Hello World 2 from React!</p>;

export function hello(renderElement: HTMLElement) {
    const root = createRoot(renderElement);
    root.render(<Component />);
}

//(window as any).renderReact = hello;