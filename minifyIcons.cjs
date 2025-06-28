const fs = require('fs');

const rawData = fs.readFileSync('./src/assets/icons.json', 'utf-8');
const original = JSON.parse(rawData);

const styleShort = {
  solid: 's',
  regular: 'r',
  brands: 'b',
  light: 'l',
  duotone: 'd'
};

const stripped = [];

for (const key in original) {
  const item = original[key];

  const styles = {};
  for (const style in item.svg) {
    const shortStyle = styleShort[style] || style;
    styles[shortStyle] = item.svg[style]?.raw || '';
  }

  stripped.push({
    f: item.search?.terms || [],
    s: styles
  });
}

fs.writeFileSync('./src/assets/fa.min.json', JSON.stringify(stripped), 'utf-8');
