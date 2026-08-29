const fs = require('fs');

let content = fs.readFileSync('src/components/HomeFeed.tsx', 'utf-8');

content = content.replace('import {\n  Gamepad2, useApp } from \'../context/AppContext\';', 'import { useApp } from \'../context/AppContext\';');
content = content.replace('import {  Gamepad2, useApp }', 'import { useApp }');
content = content.replace('import { Gamepad2, useApp }', 'import { useApp }');

if (!content.includes('Gamepad2,')) {
    content = content.replace('import {', 'import {\n  Gamepad2,');
}

fs.writeFileSync('src/components/HomeFeed.tsx', content);
