/**
 * Generates an ATS-compliant, print-optimized HTML template for the resume
 */
export function getPrintResumeHtml(resume) {
  // Parse fields split by newlines or commas into clean arrays of items
  const parseItems = (val) => {
    if (!val) return []
    return val.split(/\n/).map(item => item.trim()).filter(Boolean)
  }

  const parseSkills = (val) => {
    if (!val) return []
    return val.split(/,|\n/).map(item => item.trim()).filter(Boolean)
  }

  const educationItems = parseItems(resume.education)
  const skills = parseSkills(resume.skills)
  const projects = parseItems(resume.projects)
  const experience = parseItems(resume.experience)
  const achievements = parseItems(resume.achievements)

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${resume.fullName || 'Resume'} - HireHub Resume</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
    
    * {
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', -apple-system, sans-serif;
      color: #1e293b;
      line-height: 1.5;
      margin: 0;
      padding: 40px;
      background-color: #ffffff;
      font-size: 13.5px;
    }
    
    .header {
      text-align: center;
      border-bottom: 2px solid #f1f5f9;
      padding-bottom: 16px;
      margin-bottom: 20px;
    }
    
    .name {
      font-size: 28px;
      font-weight: 800;
      letter-spacing: -0.03em;
      color: #0f172a;
      margin: 0 0 6px 0;
    }
    
    .contact {
      color: #475569;
      font-size: 13px;
      font-weight: 500;
    }
    
    .section {
      margin-bottom: 20px;
    }
    
    .section-title {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: #4f46e5;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 4px;
      margin-bottom: 10px;
    }
    
    .summary {
      color: #334155;
      margin-top: 0;
      font-size: 13.5px;
    }
    
    .list-item {
      margin-bottom: 6px;
      color: #334155;
    }
    
    .skills-text {
      color: #334155;
      font-size: 13.5px;
    }

    ul {
      margin: 0;
      padding-left: 20px;
    }
    
    @media print {
      body {
        padding: 0;
      }
      @page {
        margin: 15mm;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1 class="name">${resume.fullName || 'Your Name'}</h1>
    <div class="contact">
      ${resume.email || 'your.email@example.com'} &nbsp;·&nbsp; ${resume.phone || '+91 00000 00000'}
    </div>
  </div>

  <div class="section">
    <div class="section-title">Summary</div>
    <p class="summary">
      Motivated developer focused on building high-performance, polished web interfaces and shipping solid product projects. Experienced with frontend frameworks, modern styling systems, and collaborative development.
    </p>
  </div>

  <div class="section">
    <div class="section-title">Education</div>
    <div class="list-item">${educationItems.join(' &nbsp;&nbsp;|&nbsp;&nbsp; ')}</div>
  </div>

  <div class="section">
    <div class="section-title">Skills</div>
    <div class="skills-text">
      ${skills.join(' &nbsp;·&nbsp; ')}
    </div>
  </div>

  <div class="section">
    <div class="section-title">Projects</div>
    <ul>
      ${projects.map(p => `<li class="list-item">${p}</li>`).join('')}
    </ul>
  </div>

  <div class="section">
    <div class="section-title">Experience</div>
    <ul>
      ${experience.map(e => `<li class="list-item">${e}</li>`).join('')}
    </ul>
  </div>

  <div class="section" style="margin-bottom: 0;">
    <div class="section-title">Achievements</div>
    <ul>
      ${achievements.map(a => `<li class="list-item">${a}</li>`).join('')}
    </ul>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
        window.close();
      }, 350);
    }
  </script>
</body>
</html>
  `
}
