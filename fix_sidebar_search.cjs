const fs = require('fs');

let content = fs.readFileSync('src/components/Sidebar.tsx', 'utf-8');

// Replace the renderNavItem function to check search query
const renderItemMatch = /const renderNavItem = \(item: any\) => \{/;
if (renderItemMatch.test(content) && content.includes('searchQuery')) {
    content = content.replace(
        'const renderNavItem = (item: any) => {',
        `const renderNavItem = (item: any) => {
    if (searchQuery.trim() && !item.label.toLowerCase().includes(searchQuery.toLowerCase())) return null;`
    );
}

fs.writeFileSync('src/components/Sidebar.tsx', content);
