import { mkdirSync, writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

const name = process.argv[2];
if (!name) {
  console.error('Usage: tsx scripts/generate-component.ts <component-name>');
  process.exit(1);
}

const kebab = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
const pascal = kebab
  .split('-')
  .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
  .join('');

const dir = join('src', 'components', kebab);
mkdirSync(dir, { recursive: true });

// Component file
writeFileSync(
  join(dir, `${kebab}.ts`),
  `import { BaseElement } from '../../shared/base-element';
import { styles } from './${kebab}.styles';

export class ${pascal} extends BaseElement {
  static properties = {};

  protected styles(): string {
    return styles;
  }

  protected render(): string {
    return \`
      <div class="${kebab}" part="${kebab}">
        <slot></slot>
      </div>
    \`;
  }
}

customElements.define('ecom-${kebab}', ${pascal});
`,
);

// Styles file
writeFileSync(
  join(dir, `${kebab}.styles.ts`),
  `import { tokens } from '../../styles/tokens';
import { reset } from '../../styles/reset';

export const styles = \`
  \${tokens}
  \${reset}

  .${kebab} {
    /* Add styles here */
  }
\`;
`,
);

// Stories file
writeFileSync(
  join(dir, `${kebab}.stories.ts`),
  `import './${kebab}';

export default {
  title: 'Components/${pascal}',
  tags: ['autodocs'],
};

export const Default = () => {
  const el = document.createElement('ecom-${kebab}');
  el.innerHTML = '<p>Hello ${pascal}</p>';
  return el;
};
`,
);

// Test file
writeFileSync(
  join(dir, `${kebab}.test.ts`),
  `import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './${kebab}';

describe('ecom-${kebab}', () => {
  let el: HTMLElement;

  beforeEach(async () => {
    el = document.createElement('ecom-${kebab}');
    document.body.appendChild(el);
    await new Promise((r) => queueMicrotask(r));
  });

  afterEach(() => {
    el.remove();
  });

  it('renders', () => {
    const root = el.shadowRoot?.querySelector('.${kebab}');
    expect(root).toBeTruthy();
  });
});
`,
);

// Update index.ts
const indexPath = join('src', 'index.ts');
const indexContent = readFileSync(indexPath, 'utf-8');
const exportLine = `export { ${pascal} } from './components/${kebab}/${kebab}';\n`;
if (!indexContent.includes(exportLine)) {
  const lines = indexContent.split('\n');
  const lastExportIdx = lines.findLastIndex((l) => l.startsWith('export {'));
  lines.splice(lastExportIdx + 1, 0, exportLine.trimEnd());
  writeFileSync(indexPath, lines.join('\n'));
}

console.log(`Component ecom-${kebab} created!`);
console.log(`  - ${dir}/${kebab}.ts`);
console.log(`  - ${dir}/${kebab}.styles.ts`);
console.log(`  - ${dir}/${kebab}.stories.ts`);
console.log(`  - ${dir}/${kebab}.test.ts`);
console.log(`  - Added export to src/index.ts`);
