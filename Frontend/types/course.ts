// types/course.ts
export type ThemeMode = "dark" | "light";

export interface ProblemStatement {
  title: string;
  description: string;
  requirements: string[];
  hints: string[];
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  problemStatement?: ProblemStatement;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  lessonCount: number;
  image: string;
  tags: string[];
  lessons: Lesson[];
  registrations: number;
  metadataUri: string;
  index: number;
}
