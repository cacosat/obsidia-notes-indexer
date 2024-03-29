const fs = require('fs');
const path = require('path');

// const relativePathToDashboard = '../../Dashboard.md';
const targetNoteName = '../../Dashboard.md'; // Target Note
const fullPathToDashboard = path.join(__dirname, targetNoteName);
const sectionKeyword = 'reuniones'; // Keyword to identify the section

function updateObsidianNoteSection() {
    // Read the target note
    fs.readFile(path.join(fullPathToDashboard), 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading the file: ", err);
            return;
        }

        // Split the content at the section keyword
        const contentSections = data.split(new RegExp(`^.*${sectionKeyword}.*$`, 'm'));
        let preSectionContent = contentSections[0]; // Content before the keyword section
        let postSectionContent = contentSections.length > 1 ? contentSections[1] : ''; // Content after the keyword section

        // Find and update the section
        fs.readdir(fullPathToDashboard, (err, files) => {
            if (err) {
                console.error("Error reading the directory: ", err);
                return;
            }

            const mdLinks = files
                .filter(file => file.endsWith('.md') && file !== targetNoteName)
                .map(file => `[[${path.parse(file).name}]]`)
                .join('\n');

            // Combine the updated section with the rest of the content
            const updatedContent = preSectionContent + sectionKeyword + '\n' + mdLinks + '\n' + postSectionContent;

            // Write the updated content back to the target note
            fs.writeFile(path.join(fullPathToDashboard, targetNoteName), updatedContent, 'utf8', err => {
                if (err) {
                    console.error("Error writing to the file: ", err);
                } else {
                    console.log("Note section updated successfully.");
                }
            });
        });
    });
}

updateObsidianNoteSection();

// // ------------------
// // TEST FUNCTION
// // ------------------

// const fs = require('fs');
// const path = require('path');

// const relativePathToDashboard = '../../Dashboard.md';
// const fullPathToDashboard = path.join(__dirname, relativePathToDashboard);

// fs.readFile(fullPathToDashboard, 'utf8', (err, data) => {
//     if (err) {
//         console.error("Error reading the file: ", err);
//         return;
//     }
//     console.log("File content: ", data);
// });