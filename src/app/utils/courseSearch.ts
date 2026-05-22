import type { CourseSlide } from '@/data/courses/types';

/**
 * Calculates a relevance score for a course slide based on the search query
 * Higher score = better match
 */
export function scoreCoursSlide(slide: CourseSlide, query: string): number {
  if (!query || query.trim().length === 0) {
    return 0;
  }

  const normalizedQuery = query.toLowerCase().trim();
  let score = 0;

  // Score title matches (highest weight)
  const titleText = slide.title.join(' ').toLowerCase();
  if (titleText.includes(normalizedQuery)) {
    score += 100;
    // Exact match bonus
    if (titleText === normalizedQuery) {
      score += 50;
    }
    // Starts with query bonus
    if (titleText.startsWith(normalizedQuery)) {
      score += 25;
    }
  }

  // Score body text matches
  const bodyText = slide.body.toLowerCase();
  if (bodyText.includes(normalizedQuery)) {
    score += 50;
  }

  // Score curriculum title matches
  if (slide.curriculum?.title) {
    const curriculumTitle = slide.curriculum.title.toLowerCase();
    if (curriculumTitle.includes(normalizedQuery)) {
      score += 75;
    }
  }

  // Score week titles
  if (slide.curriculum?.weeks) {
    for (const week of slide.curriculum.weeks) {
      if (week.title.toLowerCase().includes(normalizedQuery)) {
        score += 20;
      }

      // Score lesson titles
      for (const lesson of week.lessons) {
        if (lesson.title.toLowerCase().includes(normalizedQuery)) {
          score += 15;
        }

        // Score lesson topics
        for (const topic of lesson.topics) {
          if (topic.toLowerCase().includes(normalizedQuery)) {
            score += 5;
          }
        }
      }
    }
  }

  return score;
}

/**
 * Finds the best matching course slide for a search query
 * Returns the index of the best match, or -1 if no match found
 */
export function findBestMatchingCourse(
  slides: CourseSlide[],
  query: string
): number {
  if (!query || query.trim().length === 0) {
    return -1;
  }

  let bestIndex = -1;
  let bestScore = 0;

  slides.forEach((slide, index) => {
    const score = scoreCoursSlide(slide, query);
    if (score > bestScore) {
      bestScore = score;
      bestIndex = index;
    }
  });

  // Only return a match if score is above threshold
  return bestScore >= 5 ? bestIndex : -1;
}
