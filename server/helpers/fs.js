const fs = require('fs').promises;
const path = require('path');

async function deleteFile(filePath) {
  try {
    await fs.unlink(path.join(process.env.PWD, `/public/${filePath}`));
  } catch (error) {
    console.log(`Got an error trying to delete the file: ${error.message}`);
  }
}
function saveFile(img) {
  img.mv(`public/${img.name}`, (err) => {
    if (err) { console.log(err); }
  });
}
module.exports = { deleteFile, saveFile };
