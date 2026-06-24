import type { TopicId } from './NavigationController';
import {
  autocadCourse,
  revitCourse,
  maxVrayCourse,
  rhinoVrayCourse,
  grasshopperCourse,
  photoshopCourse,
  illustratorCourse,
} from '@/data/courses';
import type { CourseSlide } from '@/data/courses/types';

/**
 * Single source of truth for URL <-> app-state mapping.
 * Every real, crawlable URL on the site is defined here.
 */

export interface CourseRouteInfo {
  slug: string;
  slideIndex: number;
  course: CourseSlide;
  metaDescription: string;
}

// Order matters: index here must match the slide order used everywhere else
// (App.tsx courseSlides array, NavigationController slideCount, etc.)
export const COURSE_ROUTES: CourseRouteInfo[] = [
  {
    slug: 'autocad',
    slideIndex: 0,
    course: autocadCourse,
    metaDescription: `AutoCAD kursu: ${autocadCourse.body} Süre: ${autocadCourse.duration}.`,
  },
  {
    slug: 'revit',
    slideIndex: 1,
    course: revitCourse,
    metaDescription: `Revit kursu: ${revitCourse.body} Süre: ${revitCourse.duration}.`,
  },
  {
    slug: '3ds-max-vray',
    slideIndex: 2,
    course: maxVrayCourse,
    metaDescription: `3ds Max + V-Ray kursu: ${maxVrayCourse.body} Süre: ${maxVrayCourse.duration}.`,
  },
  {
    slug: 'rhino-vray',
    slideIndex: 3,
    course: rhinoVrayCourse,
    metaDescription: `Rhino + V-Ray kursu: ${rhinoVrayCourse.body} Süre: ${rhinoVrayCourse.duration}.`,
  },
  {
    slug: 'grasshopper',
    slideIndex: 4,
    course: grasshopperCourse,
    metaDescription: `Grasshopper kursu: ${grasshopperCourse.body} Süre: ${grasshopperCourse.duration}.`,
  },
  {
    slug: 'photoshop',
    slideIndex: 5,
    course: photoshopCourse,
    metaDescription: `Photoshop kursu: ${photoshopCourse.body} Süre: ${photoshopCourse.duration}.`,
  },
  {
    slug: 'illustrator',
    slideIndex: 6,
    course: illustratorCourse,
    metaDescription: `Illustrator kursu: ${illustratorCourse.body} Süre: ${illustratorCourse.duration}.`,
  },
];

export const TOPIC_PATHS: Record<TopicId, string> = {
  values: '/',
  courses: '/kurslar',
  team: '/ekibimiz',
  contact: '/iletisim',
  login: '/giris',
};

export const TOPIC_META: Record<TopicId, { title: string; description: string }> = {
  values: {
    title: 'Kargaburga | İşin Uzmanından, İşin Kendisi',
    description:
      'Kargaburga, mimari tasarım yazılımlarında (AutoCAD, Revit, 3ds Max, Rhino, V-Ray, Grasshopper, Photoshop, Illustrator) sektör profesyonellerinden eğitim sunar.',
  },
  courses: {
    title: 'Kargaburga | Kurslarımız',
    description:
      'AutoCAD, Revit, 3ds Max, V-Ray, Rhino, Grasshopper, Photoshop ve Illustrator kursları. Mimarlık öğrencileri ve profesyoneller için uygulamalı eğitim.',
  },
  team: {
    title: 'Kargaburga | Ekibimiz',
    description:
      'Kargaburga eğitmen kadrosu: alanında deneyimli mimar ve tasarımcılardan oluşan ekibimizle tanışın.',
  },
  contact: {
    title: 'Kargaburga | İletişim',
    description: 'Kargaburga ile iletişime geçin: adres, telefon ve eğitim merkezi konum bilgileri.',
  },
  login: {
    title: 'Kargaburga | Giriş',
    description: 'Kargaburga öğrenci girişi.',
  },
};

/** Build the path for a given topic, optionally a specific course slug within "courses". */
export function pathForTopic(topicId: TopicId, courseSlug?: string): string {
  if (topicId === 'courses' && courseSlug) {
    return `/kurslar/${courseSlug}`;
  }
  return TOPIC_PATHS[topicId];
}

/** Resolve a pathname (e.g. from window.location) back into topic + optional course slide index. */
export function resolvePath(pathname: string): { topicId: TopicId; slideIndex?: number } {
  const normalized = pathname.replace(/\/+$/, '') || '/';

  if (normalized === '/') return { topicId: 'values' };
  if (normalized === '/ekibimiz') return { topicId: 'team' };
  if (normalized === '/iletisim') return { topicId: 'contact' };
  if (normalized === '/giris') return { topicId: 'login' };
  if (normalized === '/kurslar') return { topicId: 'courses' };

  const courseMatch = normalized.match(/^\/kurslar\/([a-z0-9-]+)$/);
  if (courseMatch) {
    const slug = courseMatch[1];
    const route = COURSE_ROUTES.find((r) => r.slug === slug);
    if (route) {
      return { topicId: 'courses', slideIndex: route.slideIndex };
    }
    return { topicId: 'courses' };
  }

  // Unknown path - fall back to homepage content (router itself will 404 at the
  // server level for genuinely unknown routes via the prerender step).
  return { topicId: 'values' };
}

/** Get the full list of static paths to prerender. */
export function getAllStaticPaths(): string[] {
  const topicPaths = Object.values(TOPIC_PATHS);
  const coursePaths = COURSE_ROUTES.map((r) => `/kurslar/${r.slug}`);
  return [...topicPaths, ...coursePaths];
}
