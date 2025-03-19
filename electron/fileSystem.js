
const fs = require('fs');
const config = require('./config');

// Ensure required directories exist
function ensureDirectoriesExist() {
  [config.paths.QUARANTINE_DIR, config.paths.BACKUP_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
}

module.exports = {
  ensureDirectoriesExist
};
