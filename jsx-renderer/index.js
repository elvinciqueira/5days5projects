/** @jsx h */
const ITEMS = 'hello there people'.split(' ');

//turn an Array into list items
let list = (items) => items.map((textNode) => <li>{textNode}</li>);

// view with a call out ("partial") to generate a list from an Array:
let vdom = (
  <div id="foo">
    <p>Look, a simple JSX DOM renderer!</p>
    <ul>{list(ITEMS)}</ul>
  </div>
);

// VDOM -> DOM:
let dom = render(vdom);

// add the tree to <body>:
document.body.appendChild(dom);

// // Remember that "virtual DOM"? It's just JSON - each "VNode" is an object with 3 properties.
let json = JSON.stringify(vdom, null, '  ');

// // The whole process (JSX -> VDOM -> DOM) in one step:
document.body.appendChild(render(<pre id="vdom">{json}</pre>));

function render(vnode) {
  //String converts to #text nodes
  if (vnode.split) {
    return document.createTextNode(vnode);
  }

  //Create a DOM element with the nodeName of VDOM element:
  const node = document.createElement(vnode.nodeName);

  //copy attributes onto new node:
  const attributes = vnode.attributes || {};
  Object.keys(attributes).forEach((key) =>
    node.setAttribute(key, attributes[key])
  );

  //render (build) and then append child nodes
  (vnode.children || []).forEach((c) => node.appendChild(render(c)));

  return node;
}

function h(nodeName, attributes, ...args) {
  const children = args.length ? [].concat(...args) : null;

  return { nodeName, attributes, children };
}
