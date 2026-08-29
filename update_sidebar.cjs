const fs = require('fs');

let content = fs.readFileSync('src/components/Sidebar.tsx', 'utf-8');

// We need to add a search input for tabs.

if (!content.includes('const [searchQuery, setSearchQuery] = useState(')) {
    content = content.replace(
        'const [salesToolsOpen, setSalesToolsOpen] = useState(true);',
        `const [salesToolsOpen, setSalesToolsOpen] = useState(true);\n  const [searchQuery, setSearchQuery] = useState('');`
    );
    content = content.replace(
        `import {`,
        `import { Search,`
    );
    
    // We will inject the search input just below the user profile / top of sidebar.
    // Let's find the start of the return statement
    const returnIndex = content.indexOf('return (');
    const insertPoint = content.indexOf('<div className="p-4">', returnIndex);
    
    if(insertPoint > -1) {
       const searchHtml = `
        <div className="px-4 pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Bo'limlarni qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            />
          </div>
        </div>
`;
       // Actually wait, let's just make it simpler by injecting right after `<aside ...>` or `<nav>`
       content = content.replace(
           '<div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">',
           '<div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">\n' + searchHtml
       );
       
       // And we need to filter the items based on searchQuery.
       // We can just filter them directly in the map functions, but it's easier to dynamically hide them.
       content = content.replace(
           /\{item\.label\}/g,
           '{item.label}' // We don't change this
       );
    }
}
fs.writeFileSync('src/components/Sidebar.tsx', content);
