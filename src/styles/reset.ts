export const reset = `
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :host {
    display: block;
    font-family: var(--sui-font-family);
    color: var(--sui-text);
    line-height: 1.5;
  }

  :host([hidden]) {
    display: none;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font: inherit;
    color: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
