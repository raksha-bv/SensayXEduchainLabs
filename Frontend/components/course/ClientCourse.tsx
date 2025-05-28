"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Course, Lesson, ThemeMode } from "@/types/course";

// Import components
import CourseHeader from "./CourseHeader";
import CourseSidebar from "./CourseSidebar";
import CourseProgressBar from "./CourseProgressBar";
import LessonHeader from "./LessonHeader";
import ProblemStatementCard from "./ProblemStatementCard";
import LessonContent from "./LessonContent";
import LessonChallenge from "./LessonChallenge";
import LessonNavigation from "./LessonNavigation";
import LearningResources from "./LearningResourses";
import Notification from "./Notification";
import { ChatbotPopup } from "@/components/ChatbotPopup";
import CourseCompletion from "./CourseCompletion"; // Import the CourseCompletion component
import { useOCAuth } from "@opencampus/ocid-connect-js";

// Import data
import { courses } from "@/utils/solidityCourse";
import {
  problemStatements,
  getInitialCodeTemplate,
} from "@/utils/problemStatements";
import { LightbulbIcon } from "lucide-react";

// Define full course type with lessons
const coursesData: { [key: string]: Course } = {};

// Loop through all courses and map lessons with problem statements
courses.forEach((course) => {
  coursesData[course.id] = {
    ...course,
    lessons: course.lessons.map((lesson) => ({
      ...lesson,
      problemStatement: problemStatements[lesson.id],
    })),
  };
});

export type ClientCourseProps = {
  courseId: string;
  lessonId?: string;
};

export type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export function ClientCourse({ courseId, lessonId }: ClientCourseProps) {
  const router = useRouter();
  const mainContentRef = useRef<HTMLDivElement>(null);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [course, setCourse] = useState<Course | null>(null);
  const [courseCompleted, setCourseCompleted] = useState<boolean>(false);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [darkMode, setDarkMode] = useState<ThemeMode>("dark");
  const [lessonCompleted, setLessonCompleted] = useState<{
    [key: string]: boolean;
  }>({});
  const [nftMinted, setNftMinted] = useState(false);
  const [showProblemStatement, setShowProblemStatement] = useState(true);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [userOCId, setUserOCId] = useState<string | null>(null);
  const { isInitialized, authState } = useOCAuth();

  // Get current lesson index
  const currentLessonIndex =
    course?.lessons.findIndex((l) => l.id === currentLesson?.id) ?? 0;

  useEffect(() => {
    // Set OCID from auth state when initialized
    if (isInitialized && authState.isAuthenticated) {
      setUserOCId(authState.OCId);
    }

    // Alternatively, get from localStorage as fallback
    else {
      const ocid = localStorage.getItem("userOCId");
      if (ocid) {
        setUserOCId(ocid);
      }
    }
  }, [isInitialized, authState]);

  // Properly implemented recordCourseCompletion function
  // Update the recordCourseCompletion function in ClientCourse.tsx

  useEffect(() => {
    const fetchUserCourseData = async () => {
      if (userOCId && courseId) {
        try {
          const response = await fetch(`/api/users/courses?OCId=${userOCId}`);
          const data = await response.json();

          if (data.success && data.courses) {
            // Find the current course
            const userCourse = data.courses.find((c: any) => c.id === courseId);
            if (userCourse) {
              // Update NFT minted status
              setNftMinted(userCourse.nftMinted || false);
            }
          }
        } catch (error) {
          console.error("Failed to fetch user course data:", error);
        }
      }
    };

    fetchUserCourseData();
  }, [userOCId, courseId]);

  useEffect(() => {
    // Only run if we have a user ID
    if (userOCId && course?.id) {
      const fetchUserCourseStatus = async () => {
        try {
          // Use your existing endpoint that returns all courses for a user
          const response = await fetch(`/api/users/courses?OCId=${userOCId}`);

          if (response.ok) {
            const data = await response.json();

            if (data.success && data.courses.length > 0) {
              // Find the current course in the user's courses
              const currentCourse = data.courses.find(
                (c: any) => c.id === course.id
              );

              if (currentCourse && currentCourse.completed) {
                console.log("Course is already completed, setting state");
                setCourseCompleted(true);

                // Mark all lessons as completed if the course is completed
                if (course.lessons) {
                  const allLessonsCompleted: Record<string, boolean> = {};
                  course.lessons.forEach((lesson) => {
                    allLessonsCompleted[lesson.id] = true;
                  });
                  setLessonCompleted(allLessonsCompleted);
                }
              }
            }
          }
        } catch (error) {
          console.error("Failed to fetch user course status:", error);
        }
      };

      fetchUserCourseStatus();
    }
  }, [userOCId, course]);

  const recordCourseCompletion = async () => {
    console.log("Course completed:", course?.id);

    // Only proceed if the course exists and user is authenticated
    if (course) {
      try {
        // Set courseCompleted to true immediately for UI feedback
        setCourseCompleted(true);

        // Only make API call if user is authenticated
        if (userOCId) {
          // Update user progress via API
          const response = await fetch("/api/users/courses", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              OCId: userOCId,
              courseId: course.id,
              completed: true,
            }),
          });

          const arrayResponse = await fetch("/api/users/course", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              OCId: userOCId,
              courseId: course.id,
              course: course,
            }),
          });

          const arrayData = await arrayResponse.json();
          if (arrayData.success) {
            console.log("Course added in the list");
          }

          const data = await response.json();

          if (data.success) {
            // Show notification
            setNotification({
              show: true,
              message: "Congratulations! You've completed the course.",
              type: "success",
            });

            // Hide notification after 5 seconds
            setTimeout(() => {
              setNotification({ show: false, message: "", type: "" });
            }, 5000);
          } else {
            console.error("Failed to record course completion:", data.error);
            setNotification({
              show: true,
              message: "Failed to record course completion.",
              type: "error",
            });
          }
        } else {
          // Show notification even without API call
          setNotification({
            show: true,
            message: "Congratulations! You've completed the course.",
            type: "success",
          });

          // Hide notification after 5 seconds
          setTimeout(() => {
            setNotification({ show: false, message: "", type: "" });
          }, 5000);
        }
      } catch (error) {
        console.error("Failed to record course completion:", error);
        setNotification({
          show: true,
          message: "Error recording course completion.",
          type: "error",
        });
      }
    }
  };
  useEffect(() => {
    if (course && lessonCompleted) {
      // Check if all lessons are completed
      const allLessonsCompleted = course.lessons.every(
        (lesson) => lessonCompleted[lesson.id] === true
      );

      // Only update course completion state if all lessons are completed
      // and the API hasn't already marked it as completed
      if (allLessonsCompleted && !courseCompleted) {
        // Automatically record course completion when all lessons are completed
        if (userOCId) {
          recordCourseCompletion();
        } else {
          setCourseCompleted(true);
        }
      }
    }
  }, [course, lessonCompleted, courseId, courseCompleted, userOCId]);

  useEffect(() => {
    // Fetch course data based on the courseId
    if (courseId) {
      const foundCourse = coursesData[courseId];
      if (foundCourse) {
        setCourse(foundCourse);

        // Set initial lesson
        if (lessonId) {
          const lesson = foundCourse.lessons.find((l) => l.id === lessonId);
          if (lesson) {
            setCurrentLesson(lesson);
          } else {
            setCurrentLesson(foundCourse.lessons[0]);
          }
        } else {
          setCurrentLesson(foundCourse.lessons[0]);
        }
      }
    }

    // Load completed lessons from localStorage
    const savedProgress = localStorage.getItem(`course_progress_${courseId}`);
    if (savedProgress) {
      setLessonCompleted(JSON.parse(savedProgress));
    }

    // Get user email from localStorage or auth state
    const ocid = localStorage.getItem("userOCId");
    if (ocid) {
      setUserOCId(ocid);
    }
  }, [courseId, lessonId]);

  useEffect(() => {
    if (currentLesson) {
      // Reset code editor state by modifying the LessonChallenge component
      const editorElement = document.querySelector("[data-lesson-editor]");
      if (editorElement) {
        // Reset any editor-related DOM state
        editorElement.innerHTML = "";
      }
    }
  }, [currentLesson?.id]);

  // Handle lesson change
  const handleLessonChange = (lesson: Lesson) => {
    // If we're moving away from a lesson without a challenge, mark it as completed
    if (currentLesson && !currentLesson.problemStatement) {
      const updatedCompletions = {
        ...lessonCompleted,
        [currentLesson.id]: true,
      };

      setLessonCompleted(updatedCompletions);

      // Save progress to localStorage
      localStorage.setItem(
        `course_progress_${courseId}`,
        JSON.stringify(updatedCompletions)
      );
    }

    setCurrentLesson(lesson);
    // Update URL
    router.push(`/courses/${courseId}?lessonId=${lesson.id}`);

    // Scroll main content to top
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0;
    }
  };

  // Handle challenge completion
  const handleChallengeComplete = () => {
    if (currentLesson) {
      const updatedCompletions = {
        ...lessonCompleted,
        [currentLesson.id]: true,
      };

      setLessonCompleted(updatedCompletions);

      // Save progress to localStorage
      localStorage.setItem(
        `course_progress_${courseId}`,
        JSON.stringify(updatedCompletions)
      );
    }
  };

  // Update user progress in the course route
  const updateUserProgress = async (courseId: string) => {
    try {
      const response = await fetch("/api/users/course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          OCId: userOCId,
          courseId,
          course,
        }),
      });

      const data = await response.json();

      if (data.success) {
        let message = "Course completed successfully!";

        // Add level up info if applicable
        if (data.levelUpdated) {
          message += ` You've reached level ${data.newLevel}!`;
        }

        // Add achievements info if applicable
        if (data.newAchievements && data.newAchievements.length > 0) {
          message += ` Achievement${
            data.newAchievements.length > 1 ? "s" : ""
          } unlocked: ${data.newAchievements
            .map((a: any) => a.name)
            .join(", ")}`;
        }

        // Show notification
        setNotification({
          show: true,
          message,
          type: "success",
        });

        // Hide notification after 5 seconds
        setTimeout(() => {
          setNotification({ show: false, message: "", type: "" });
        }, 5000);
      }
    } catch (error) {
      console.error("Failed to update user progress:", error);
    }
  };

  // Check if next lesson is available
  const canProceedToNextLesson = () => {
    if (!currentLesson) return false;
    return (
      !currentLesson.problemStatement ||
      lessonCompleted[currentLesson.id] === true
    );
  };

  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <ChatbotPopup
        buttonText="Chat with AI"
        initialMessage="Hello! I'm your blockchain assistant. How can I help you today?"
        title="Blockchain AI"
      />
      {/* Background gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_rgba(124,58,237,0.15),transparent_70%)]"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_rgba(124,58,237,0.1),transparent_70%)]"></div>
      </div>

      {/* Header */}
      <CourseHeader
        course={course}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="relative z-10 flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <CourseSidebar
          course={course}
          currentLesson={currentLesson}
          lessonCompleted={lessonCompleted}
          sidebarOpen={sidebarOpen}
          handleLessonChange={handleLessonChange}
          courseCompleted={courseCompleted}
        />
        {/* Main Content */}
        <main
          ref={mainContentRef}
          className="flex-1 overflow-y-auto relative z-10 h-[calc(100vh-4rem)]"
        >
          {/* Backdrop overlay when sidebar is open on mobile */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-10 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            ></div>
          )}

          <div className="max-w-3xl mx-auto px-6 py-8 pb-16">
            {/* Course progress */}
            <CourseProgressBar course={course} currentLesson={currentLesson} />

            {/* Display Course Completion component if course is completed */}
            {courseCompleted && (
              <CourseCompletion
                courseId={courseId}
                metadataURI={course.metadataUri}
                nftMinted={nftMinted}
              />
            )}

            {/* Title card */}
            <LessonHeader lesson={currentLesson} />

            {/* Problem Statement Card - Show before content */}
            {currentLesson.problemStatement && showProblemStatement && (
              <ProblemStatementCard
                problemStatement={currentLesson.problemStatement}
                showProblemStatement={showProblemStatement}
                setShowProblemStatement={setShowProblemStatement}
                darkMode={darkMode}
              />
            )}

            {/* Collapsed Problem Statement (when hidden) */}
            {currentLesson.problemStatement && !showProblemStatement && (
              <button
                onClick={() => setShowProblemStatement(true)}
                className={`w-full mb-8 p-4 flex items-center justify-between rounded-lg border ${
                  darkMode === "dark"
                    ? "border-violet-900/30 bg-gray-900/40 hover:bg-gray-900/60"
                    : "border-violet-200 bg-violet-50/70 hover:bg-violet-50"
                }`}
              >
                <div className="flex items-center">
                  <LightbulbIcon className="w-5 h-5 mr-2 text-violet-400" />
                  <span
                    className={
                      darkMode === "dark" ? "text-white" : "text-violet-900"
                    }
                  >
                    {currentLesson.problemStatement.title}
                  </span>
                </div>
                <span
                  className={`text-sm ${
                    darkMode === "dark" ? "text-violet-400" : "text-violet-600"
                  }`}
                >
                  Show Challenge
                </span>
              </button>
            )}

            {/* Markdown content */}
            <LessonContent lesson={currentLesson} />

            {/* Challenge component (only show if lesson has a problem statement) */}
            {currentLesson.problemStatement && (
              <LessonChallenge
                key={currentLesson.id}
                lessonId={currentLesson.id}
                darkMode={darkMode === "dark"}
                onChallengeComplete={handleChallengeComplete}
                initialCode={getInitialCodeTemplate(currentLesson.id)}
                problemStatement={currentLesson.problemStatement}
              />
            )}

            {/* Navigation buttons */}
            <LessonNavigation
              course={course}
              currentLesson={currentLesson}
              lessonCompleted={lessonCompleted}
              handleLessonChange={handleLessonChange}
              recordCourseCompletion={recordCourseCompletion}
              courseCompleted={courseCompleted}
            />

            {/* Additional info card */}
            <LearningResources />
          </div>
        </main>
      </div>

      {/* Notification component */}
      <Notification
        notification={notification}
        setNotification={setNotification}
      />
    </div>
  );
}
