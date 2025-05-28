// Define or import the user object
const user = {
  data: {
    Achievement: [] as string[],
    courseCompleted: 0,
    submissions: 0,
    acceptedSubmissions: 0,
    Level: 0,
    AI_Scores: [],
  },
};

const allAchievements = [
  {
    id: "Course Master",
    name: "Course Master",
    description: "Complete 5 or more courses",
    criteria: "courseCompleted >= 5",
    earned: user.data.Achievement.includes("Course Master"),
    progress: Math.min(user.data.courseCompleted / 5, 1),
  },
  {
    id: "Submission Warrior",
    name: "Submission Warrior",
    description: "Submit 50 or more tasks",
    criteria: "submissions >= 6",
    earned: user.data.Achievement.includes("Submission Warrior"),
    progress: Math.min(user.data.submissions / 50, 1),
  },
  {
    id: "Quality Coder",
    name: "Quality Coder",
    description: "Get 25 or more submissions accepted",
    criteria: "acceptedSubmissions >= 25",
    earned: user.data.Achievement.includes("Quality Coder"),
    progress: Math.min(user.data.acceptedSubmissions / 25, 1),
  },
  {
    id: "Rising Star",
    name: "Rising Star",
    description: "Reach level 5 or higher",
    criteria: "Level >= 5",
    earned: user.data.Achievement.includes("Rising Star"),
    progress: Math.min(user.data.Level / 5, 1),
  },
  {
    id: "AI Prodigy",
    name: "AI Prodigy",
    description: "Get an average AI score of 90 or higher",
    criteria: "Average AI_Scores >= 90",
    earned: user.data.Achievement.includes("AI Prodigy"),
    progress:
      user.data.AI_Scores.length > 0
        ? Math.min(
            user.data.AI_Scores.reduce((a: any, b: any) => a + b, 0) /
              user.data.AI_Scores.length /
              90,
            1
          )
        : 0,
  },
];

export default allAchievements;