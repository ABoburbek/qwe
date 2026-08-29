const fs = require('fs');

let content = fs.readFileSync('src/components/HomeFeed.tsx', 'utf-8');

// The old quick tools block starts with "{/* Quick Access Tools Bar for Appliance Retail */}"
// and ends with 3 buttons.
const startIndex = content.indexOf('{/* Quick Access Tools Bar for Appliance Retail */}');
if (startIndex !== -1) {
    const searchString = 'className="grid grid-cols-1 sm:grid-cols-3 gap-4"';
    const gridIndex = content.indexOf(searchString, startIndex);
    if(gridIndex !== -1) {
        // Find the closing div of this grid.
        // It has 3 buttons inside.
        let openDivs = 1;
        let currentIndex = gridIndex + searchString.length + 1; // start after <div ...>
        
        while(openDivs > 0 && currentIndex < content.length) {
            const nextOpen = content.indexOf('<div', currentIndex);
            const nextClose = content.indexOf('</div', currentIndex);
            
            // Also need to account for <button ... > and </button> if they wrap divs. But actually we just count divs.
            // Oh wait, the parent is a div, the children are buttons which contain divs.
            // Let's just use regex or split to cut it out.
            
            if(nextOpen !== -1 && nextOpen < nextClose) {
                openDivs++;
                currentIndex = nextOpen + 4;
            } else if (nextClose !== -1) {
                openDivs--;
                currentIndex = nextClose + 6;
            } else {
                break;
            }
        }
        
        // Remove from startIndex to currentIndex
        content = content.substring(0, startIndex) + content.substring(currentIndex);
        fs.writeFileSync('src/components/HomeFeed.tsx', content);
    }
}
