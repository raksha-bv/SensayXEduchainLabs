// courses/[id]/page.tsx
import { ClientCourse } from "@/components/course/ClientCourse";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function CourseDetailPage({
  params,
  searchParams,
}: PageProps) {
  // Resolve the promises
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  return (
    <ClientCourse
      courseId={resolvedParams.id}
      lessonId={resolvedSearchParams.lessonId as string | undefined}
    />
  );
}
