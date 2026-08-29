const fs = require('fs');

let content = fs.readFileSync('src/components/HomeFeed.tsx', 'utf-8');

// The issue is definitely this text: "  Gamepad2, useApp } from '../context/AppContext';"
content = content.replace('  Gamepad2, useApp } from \'../context/AppContext\';', 'useApp } from \'../context/AppContext\';');
content = content.replace('Gamepad2, useApp } from \'../context/AppContext\';', 'useApp } from \'../context/AppContext\';');

fs.writeFileSync('src/components/HomeFeed.tsx', content);
