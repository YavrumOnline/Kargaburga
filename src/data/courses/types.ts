export interface Lesson {
  title: string;
  topics: string[];
}

export interface Week {
  title: string;
  lessons: Lesson[];
}

export interface Curriculum {
  title: string;
  level?: string;
  focus?: string;
  weeks: Week[];
}

export interface CourseSlide {
  title: string[];
  body: string;
  duration: string;
  price: {
    online: string;
    örgün: string;
  };
  curriculum: Curriculum;
}