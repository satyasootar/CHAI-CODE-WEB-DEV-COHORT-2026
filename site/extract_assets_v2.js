const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'components', 'Instructors.tsx');
const content = fs.readFileSync(inputFile, 'utf8');

// Regex for Logos
// format: logoDark: "data:image/svg+xml,..."
const logoRegex = /(logoDark|logoLight):\s*"data:image\/svg\+xml,(.*?)"/g;

// Ensure directories exist
const assetsDir = path.join(__dirname, 'public', 'assets');
if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

let match;
let count = 0;
// We expect 4 matches in order:
// 1. Hitesh Dark
// 2. Hitesh Light
// 3. Piyush Dark
// 4. Piyush Light

const filenames = [
    'hitesh-logo-dark.svg',
    'hitesh-logo-light.svg',
    'piyush-logo-dark.svg',
    'piyush-logo-light.svg'
];

while ((match = logoRegex.exec(content)) !== null) {
    if (count >= 4) break;
    
    // Decode the URI component
    const encodedSvg = match[2];
    const decodedSvg = decodeURIComponent(encodedSvg);
    
    const outputPath = path.join(assetsDir, filenames[count]);
    fs.writeFileSync(outputPath, decodedSvg);
    console.log(`Written: ${outputPath}`);
    count++;
}
