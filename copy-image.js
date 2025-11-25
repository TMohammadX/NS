const fs = require('fs');
const path = require('path');

const source = 'C:\\Users\\moham\\.gemini\\antigravity\\brain\\ab579b32-54b7-4d24-807d-0291135b34f3\\app_interface_mockup_1764101180753.png';
const dest = path.join(__dirname, 'public', 'app-mockup.png');

try {
    fs.copyFileSync(source, dest);
    console.log('Image copied successfully to ' + dest);
} catch (err) {
    console.error('Error copying image:', err);
    process.exit(1);
}
