import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data');

async function ensureDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (err) {
    // Ignore directory creation errors if it already exists
  }
}

async function readJSON(filename, defaultVal = []) {
  await ensureDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await writeJSON(filename, defaultVal);
      return defaultVal;
    }
    throw err;
  }
}

async function writeJSON(filename, data) {
  await ensureDir();
  const filePath = path.join(DATA_DIR, filename);
  const tempPath = `${filePath}.tmp`;
  await fs.writeFile(tempPath, JSON.stringify(data, null, 2), 'utf8');
  await fs.rename(tempPath, filePath);
}

export const db = {
  getUsers: () => readJSON('users.json'),
  saveUsers: (users) => writeJSON('users.json', users),
  
  getProfiles: () => readJSON('profiles.json'),
  saveProfiles: (profiles) => writeJSON('profiles.json', profiles),

  getResumes: () => readJSON('resumes.json'),
  saveResumes: (resumes) => writeJSON('resumes.json', resumes),

  getInternships: () => readJSON('internships.json', []),
  saveInternships: (internships) => writeJSON('internships.json', internships)
};
