export function parseRecommendations(text) {
  // Return empty result if no text provided
  if (!text || typeof text !== 'string') {
    return {
      skills: [],
      courses: []
    };
  }

  const result = {
    skills: [],
    courses: []
  };

  try {
    // Normalize line endings and split sections
    const normalizedText = text.replace(/\r\n/g, '\n');
    const parts = normalizedText.split('\n\nCourses:\n');
    
    // Parse skills if section exists
    if (parts.length > 0 && parts[0].includes('Skills:')) {
      const skillsSection = parts[0].replace('Skills:\n', '').trim();
      result.skills = skillsSection.split('\n')
        .map(s => s.trim().replace(/^- /, ''))
        .filter(s => s.length > 0);
    }

    // Parse courses if section exists
    if (parts.length > 1) {
      const coursesSection = parts[1].trim();
      const courseBlocks = coursesSection.split('\n\nCourse ');
      
      courseBlocks.forEach(block => {
        if (!block.trim()) return;
        
        const lines = block.split('\n');
        const firstLine = lines[0];
        
        // Handle course line format (either "Course X: [Name] - [Platform]" or "[Name] - [Platform]")
        let courseName, platform;
        if (firstLine.includes(':') && firstLine.includes(' - ')) {
          const colonIndex = firstLine.indexOf(':');
          const dashIndex = firstLine.indexOf(' - ');
          courseName = firstLine.substring(colonIndex + 1, dashIndex).trim();
          platform = firstLine.substring(dashIndex + 3).trim();
        } else if (firstLine.includes(' - ')) {
          const dashIndex = firstLine.indexOf(' - ');
          courseName = firstLine.substring(0, dashIndex).trim();
          platform = firstLine.substring(dashIndex + 3).trim();
        } else {
          courseName = firstLine.trim();
          platform = 'Unknown platform';
        }
        
        const course = {
          courseName,
          platform,
          skills: []
        };
        
        for (let i = 1; i < lines.length; i++) {
          const skill = lines[i].trim().replace(/^- /, '');
          if (skill) {
            course.skills.push({ skillName: skill });
          }
        }
        
        result.courses.push(course);
      });
    }
  } catch (error) {
    console.error('Error parsing recommendations:', error);
    // Return partial results if available
  }
  
  return result;
}