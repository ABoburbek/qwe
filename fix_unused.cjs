const fs = require('fs');
const path = require('path');

const tsErrorOutput = `
ts/ManagerDashboard.tsx(12,3): error TS6133: 'BookOpen' is declared but its value is never read.
src/components/ManagerDashboard.tsx(13,3): error TS6133: 'Send' is declared but its value is never read.
src/components/ManagerDashboard.tsx(15,3): error TS6133: 'Search' is declared but its value is never read.
src/components/ManagerDashboard.tsx(16,3): error TS6133: 'Filter' is declared but its value is never read.
src/components/ManagerDashboard.tsx(17,3): error TS6133: 'TrendingUp' is declared but its value is never read.
src/components/ManagerDashboard.tsx(26,5): error TS6133: 'progressMap' is declared but its value is never read.
src/components/MistakeGame.tsx(4,1): error TS6133: 'FailedQuestionMistake' is declared but its value is never read.
src/components/MistakeGame.tsx(11,3): error TS6133: 'HelpCircle' is declared but its value is never read.
src/components/MistakeGame.tsx(13,3): error TS6133: 'Zap' is declared but its value is never read.
src/components/MistakeGame.tsx(15,3): error TS6133: 'Flame' is declared but its value is never read.
src/components/MistakeGame.tsx(25,27): error TS6133: 'setActiveGameIndex' is declared but its value is never read.
src/components/NewsDetailModal.tsx(14,3): error TS6133: 'ShieldAlert' is declared but its value is never read.
src/components/NotificationPanel.tsx(15,3): error TS6133: 'Filter' is declared but its value is never read.
src/components/ObjectionBuster.tsx(13,3): error TS6133: 'TrendingUp' is declared but its value is never read.
src/components/ObjectionBuster.tsx(14,3): error TS6133: 'Filter' is declared but its value is never read.
src/components/ObjectionBuster.tsx(24,3): error TS6133: 'Volume2' is declared but its value is never read.
src/components/OnboardingRoadmap.tsx(6,3): error TS6133: 'CheckCircle2' is declared but its value is never read.
src/components/OnboardingRoadmap.tsx(8,3): error TS6133: 'UserCheck' is declared but its value is never read.
src/components/OnboardingRoadmap.tsx(9,3): error TS6133: 'Award' is declared but its value is never read.
src/components/OnboardingRoadmap.tsx(13,3): error TS6133: 'BookOpen' is declared but its value is never read.
src/components/OnboardingRoadmap.tsx(16,3): error TS6133: 'AlertCircle' is declared but its value is never read.
src/components/OnboardingRoadmap.tsx(17,3): error TS6133: 'ExternalLink' is declared but its value is never read.
src/components/SalesSimulator.tsx(8,3): error TS6133: 'Zap' is declared but its value is never read.
src/components/SalesSimulator.tsx(9,3): error TS6133: 'TrendingUp' is declared but its value is never read.
src/components/SalesSimulator.tsx(11,3): error TS6133: 'CheckCircle2' is declared but its value is never read.
src/components/SalesSimulator.tsx(12,3): error TS6133: 'AlertCircle' is declared but its value is never read.
src/components/SalesSimulator.tsx(14,3): error TS6133: 'ArrowRight' is declared but its value is never read.
src/components/SalesSimulator.tsx(16,3): error TS6133: 'HelpCircle' is declared but its value is never read.
src/components/SalesSimulator.tsx(18,3): error TS6133: 'ShieldCheck' is declared but its value is never read.
src/components/SalesSimulator.tsx(19,3): error TS6133: 'Play' is declared but its value is never read.
src/components/SalesSimulator.tsx(20,3): error TS6133: 'Flame' is declared but its value is never read.
src/components/SalesSimulator.tsx(21,3): error TS6133: 'Volume2' is declared but its value is never read.
src/components/SkillMatrixAnalyzer.tsx(5,3): error TS6133: 'Flame' is declared but its value is never read.
src/components/SkillMatrixAnalyzer.tsx(6,3): error TS6133: 'Award' is declared but its value is never read.
src/components/SkillMatrixAnalyzer.tsx(7,3): error TS6133: 'Sparkles' is declared but its value is never read.
src/components/SkillMatrixAnalyzer.tsx(11,3): error TS6133: 'BookOpen' is declared but its value is never read.
src/components/SkillMatrixAnalyzer.tsx(15,3): error TS6133: 'Target' is declared but its value is never read.
src/components/SkillMatrixAnalyzer.tsx(19,3): error TS6133: 'Filter' is declared but its value is never read.
src/components/SkillMatrixAnalyzer.tsx(21,3): error TS6133: 'ArrowUpRight' is declared but its value is never read.
src/components/SkillMatrixAnalyzer.tsx(22,3): error TS6133: 'ShieldCheck' is declared but its value is never read.
src/components/SkillMatrixAnalyzer.tsx(25,1): error TS6133: 'SkillHeatmapBranch' is declared but its value is never read.
src/components/SkillMatrixAnalyzer.tsx(29,5): error TS6133: 'currentUser' is declared but its value is never read.
src/components/SkillMatrixAnalyzer.tsx(34,5): error TS6133: 'courses' is declared but its value is never read.
src/components/SkillMatrixAnalyzer.tsx(35,5): error TS6133: 'stores' is declared but its value is never read.
src/components/SkillMatrixAnalyzer.tsx(63,9): error TS6133: 'lowestSkillCategory' is declared but its value is never read.
src/components/SmartPDP.tsx(7,3): error TS6133: 'TrendingUp' is declared but its value is never read.
src/components/SmartPDP.tsx(8,3): error TS6133: 'Award' is declared but its value is never read.
src/components/SmartPDP.tsx(10,3): error TS6133: 'AlertCircle' is declared but its value is never read.
src/components/SmartPDP.tsx(13,3): error TS6133: 'UserCheck' is declared but its value is never read.
src/components/SmartPDP.tsx(14,3): error TS6133: 'ShieldCheck' is declared but its value is never read.
src/components/SmartPDP.tsx(15,3): error TS6133: 'Zap' is declared but its value is never read.
src/components/SmartPDP.tsx(16,3): error TS6133: 'BookOpen' is declared but its value is never read.
src/components/SmartProductMatcher.tsx(6,3): error TS6133: 'Search' is declared but its value is never read.
src/components/SmartProductMatcher.tsx(7,3): error TS6133: 'CheckCircle2' is declared but its value is never read.
src/components/SmartProductMatcher.tsx(8,3): error TS6133: 'Tv' is declared but its value is never read.
src/components/SmartProductMatcher.tsx(9,3): error TS6133: 'HelpCircle' is declared but its value is never read.
src/components/SmartProductMatcher.tsx(11,3): error TS6133: 'Tag' is declared but its value is never read.
src/components/SmartProductMatcher.tsx(12,3): error TS6133: 'ArrowRight' is declared but its value is never read.
src/components/SmartProductMatcher.tsx(13,3): error TS6133: 'ShieldCheck' is declared but its value is never read.
src/components/StoreAuditChecklist.tsx(6,3): error TS6133: 'XCircle' is declared but its value is never read.
src/components/StoreAuditChecklist.tsx(7,3): error TS6133: 'AlertTriangle' is declared but its value is never read.
src/components/StoreAuditChecklist.tsx(10,3): error TS6133: 'Sparkles' is declared but its value is never read.
src/components/StoreAuditChecklist.tsx(11,3): error TS6133: 'Award' is declared but its value is never read.
src/components/StoreAuditChecklist.tsx(15,3): error TS6133: 'Building' is declared but its value is never read.
src/components/StoreAuditChecklist.tsx(16,3): error TS6133: 'CheckSquare' is declared but its value is never read.
src/components/StoreAuditChecklist.tsx(17,3): error TS6133: 'BarChart2' is declared but its value is never read.
src/components/StoreAuditChecklist.tsx(18,3): error TS6133: 'FileSpreadsheet' is declared but its value is never read.
src/components/StoreAuditChecklist.tsx(123,17): error TS6133: 'isPassed' is declared but its value is never read.
src/components/TrainerHub.tsx(18,3): error TS6133: 'CheckCircle2' is declared but its value is never read.
src/components/TrainerHub.tsx(39,17): error TS6133: 'setLevel' is declared but its value is never read.
src/components/UserProfile.tsx(4,3): error TS6133: 'User' is declared but its value is never read.
src/components/UserProfile.tsx(9,3): error TS6133: 'CheckCircle2' is declared but its value is never read.
src/components/UserProfile.tsx(13,3): error TS6133: 'MapPin' is declared but its value is never read.
src/components/UserProfile.tsx(29,17): error TS6133: 'setEmail' is declared but its value is never read.
src/context/AppContext.tsx(418,25): error TS6133: 'setDuelQuestions' is declared but its value is never read.
src/context/AppContext.tsx(1383,36): error TS6133: 'personaId' is declared but its value is never read.
`;

const lines = tsErrorOutput.trim().split('\n');

const modifications = {};

lines.forEach(line => {
  const match = line.match(/(src\/.*?): error TS6133: '(.*?)' is declared but its value is never read\./);
  if (match) {
    let fileMatch = match[1];
    // fileMatch looks like "src/components/ManagerDashboard.tsx(13,3)"
    const fileSplit = fileMatch.split('(');
    const filePath = fileSplit[0];
    const variable = match[2];

    if (!modifications[filePath]) modifications[filePath] = [];
    modifications[filePath].push(variable);
  }
});

for (const [file, vars] of Object.entries(modifications)) {
  let content = fs.readFileSync(file, 'utf-8');
  
  vars.forEach(v => {
    // Basic regex to remove unused imports: 
    // This removes the variable from an import statement, like `import { A, B, C } from 'x'`
    // Be careful with commas.
    const importRegex = new RegExp(`(\\s*\\b${v}\\b\\s*,?|,\\s*\\b${v}\\b\\s*)`, 'g');
    content = content.replace(importRegex, (match, p1, offset, string) => {
        // If it's part of an import statement, we remove it.
        const lineStart = string.lastIndexOf('\n', offset);
        const lineEnd = string.indexOf('\n', offset);
        const line = string.substring(lineStart, lineEnd);
        if (line.includes('import')) {
            return '';
        }
        return match;
    });

    // Fix empty import curly braces e.g., `import { } from 'lucide-react';`
    content = content.replace(/import\s*\{\s*\}\s*from\s*['"][^'"]+['"];\n/g, '');

    // For other unused declarations (useState, variables), we can prefix with _
    const declarationRegex = new RegExp(`\\b${v}\\b(?=\\s*[=:])`, 'g');
    content = content.replace(declarationRegex, `_${v}`);
    
    // specifically for arrays in destructuring like `const [val, setVal]`
    const arrayDestructRegex = new RegExp(`\\[\\s*${v}\\s*,`, 'g');
    content = content.replace(arrayDestructRegex, `[_${v},`);
    
    const arrayDestructRegex2 = new RegExp(`,\\s*${v}\\s*\\]`, 'g');
    content = content.replace(arrayDestructRegex2, `,_${v}]`);
    
    // specifically for function params like `(personaId: string, ...)`
    const funcParamRegex = new RegExp(`\\b${v}\\s*:`, 'g');
    content = content.replace(funcParamRegex, `_${v}:`);
  });

  fs.writeFileSync(file, content, 'utf-8');
  console.log(`Updated ${file}`);
}
