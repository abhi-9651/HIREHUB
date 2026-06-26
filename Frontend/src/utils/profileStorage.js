const STORAGE_KEY = 'hirehub_profile';

export const DEFAULT_PROFILE = {
  name: 'Abhi',
  college: 'MMMUT Gorakhpur',
  degree: 'B.Tech Computer Science & Engineering',
  duration: '2024 - 2028',
  headline: 'Aspiring Software Engineer • MERN Stack Developer',
  bio: 'Building full-stack web applications, solving DSA problems, and preparing for internship opportunities.',
  skills: {
    Frontend: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind'],
    Backend: ['Node.js', 'Express', 'MongoDB'],
    Programming: ['C++', 'Java', 'DSA', 'Git']
  },
  projects: [
    { name: 'HireHub', desc: 'AI-powered internship discovery platform.' },
    { name: 'EduSmaran', desc: 'Smart attendance and curriculum planner.' },
    { name: 'Career Copilot', desc: 'AI-guided career assistant dashboard.' },
    { name: 'Resume Studio', desc: 'ATS-friendly resume builder.' }
  ],
  goals: {
    targetRole: 'Software Engineer',
    preferredDomain: 'Full Stack Development',
    workPreference: 'Remote / Hybrid',
    expectedStipend: '₹20k+'
  },
  stats: {
    matchRate: 87,
    applications: 12
  }
};

/**
 * Calculates the profile completeness score (0-100) based on filled-in fields.
 */
export function calculateProfileScore(profile) {
  let totalFields = 9;
  let filledFields = 0;

  if (profile.name?.trim()) filledFields++;
  if (profile.college?.trim()) filledFields++;
  if (profile.degree?.trim()) filledFields++;
  if (profile.headline?.trim()) filledFields++;
  if (profile.bio?.trim()) filledFields++;
  if (profile.duration?.trim()) filledFields++;
  
  // Check goals
  if (profile.goals && Object.values(profile.goals).some(val => val?.trim())) {
    filledFields++;
  } else {
    totalFields--;
  }

  // Check skills
  const totalSkillsCount = Object.values(profile.skills || {}).flat().length;
  if (totalSkillsCount > 0) filledFields++;

  // Check projects
  if (profile.projects && profile.projects.length > 0) filledFields++;

  return Math.round((filledFields / totalFields) * 100);
}

/**
 * Retrieves the profile from localStorage, fallback to DEFAULT_PROFILE
 */
export function getProfile() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      // Save default profile so it's initialized
      saveProfile(DEFAULT_PROFILE);
      return DEFAULT_PROFILE;
    }
    const profile = JSON.parse(data);
    return profile;
  } catch (error) {
    console.error('Error reading profile from localStorage', error);
    return DEFAULT_PROFILE;
  }
}

/**
 * Saves the profile to localStorage
 */
export function saveProfile(profile) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    // Dispatch custom event to notify other components/pages
    window.dispatchEvent(new Event('profile_updated'));
  } catch (error) {
    console.error('Error saving profile to localStorage', error);
  }
}
