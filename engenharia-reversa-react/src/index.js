// import React from 'react';
// import { render } from 'react-dom';

function convertToHtml(virtualNode) {
  if (typeof virtualNode === 'string' || typeof virtualNode === 'number') {
    return document.createTextNode(`${virtualNode}`);
  }

  const $domElement = document.createElement(virtualNode.tagName);

  const attributes = virtualNode.props || [];
  Object.keys(attributes).forEach((key) =>
    $domElement.setAttribute(key, attributes[key])
  );

  (virtualNode.children || []).forEach((virtualChild) =>
    $domElement.appendChild(convertToHtml(virtualChild))
  );

  return $domElement;
}

function render(initialVirtualTree, $dom) {
  const $appHTML = convertToHtml(initialVirtualTree);
  console.log($appHTML);
  $dom.appendChild($appHTML);
}

function createElement(elementType, props, ...children) {
  const virtualElementProps = {
    ...props,
    children,
  };

  if (typeof elementType === 'function') {
    return elementType(virtualElementProps);
  }

  return {
    tagName: elementType,
    props,
    children,
  };
}

const React = {
  createElement,
};

const Title = () => React.createElement('h1', null, 'Bla');

const App = (props) =>
  React.createElement(
    'section',
    {
      className: 'App',
    },
    React.createElement(Title, null),
    React.createElement(
      'div',
      null,
      React.createElement('div', null, '0'),
      React.createElement('button', null, 'Incrementar'),
      React.createElement('button', null, 'Decrementar')
    )
  );
// <section className="App">
//   <h1>Contador</h1>
//   <div>
//     <div>0</div>
//     <button>Incrementar</button>
//     <button>Decrementar</button>
//   </div>
// </section>

render(React.createElement(App, null), document.getElementById('root'));
