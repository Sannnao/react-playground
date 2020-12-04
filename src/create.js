const fs = require('fs');

let withCallbackString = '';
let withoutCallbackString = '';

const count = 100000;

for (let i = 0; i < count; i++) {
  withCallbackString += `const func${i} = useCallback(() => {
    console.log(${i});
    console.log(${i});
    console.log(${i});
    console.log(${i});
    console.log(${i});
    console.log(${i});
    console.log(${i});
    console.log(${i});
    console.log(${i});
    console.log(${i});
  }, ${i !== 0 ? `[func${i - 1}]` : '[]'})\n`;
}

for (let i = 0; i < count; i++) {
  withoutCallbackString += `const func${i} = () => {
    console.log(${i});
    console.log(${i});
    console.log(${i});
    console.log(${i});
    console.log(${i});
    console.log(${i});
    console.log(${i});
    console.log(${i});
    console.log(${i});
    console.log(${i});
  }\n`
}

const appendData = `
  import { useCallback } from 'react'\n

  const arr = new Array(${count});\n
  arr.fill(null);
  const fillArr = arr.map((el, i) => {\n
    return i\n
  })\n

  export const WithCallback = () => {\n
    ${withCallbackString}
    return (\n
      <div>\n
        WithCallback\n
      </div>\n
    )\n
  }\n

  export const WithoutCallback = () => {\n
    ${withoutCallbackString}
    return (\n
      <div>\n
        WithoutCallback\n
      </div>\n
    )\n
  }\n
`

fs.writeFileSync('./src/callback-test.js', appendData);
