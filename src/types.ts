export type UserRole = 'employee' | 'manager' | 'trainer' | 'admin';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  position: string;
  department: string;
  storeId: string;
  storeName: string;
  email: string;
  phone: string;
  avatar: string;
  coverImage?: string;
  bio: string;
  points: number;
  streakDays: number;
  completedCourseIds: string[];
  badges: Badge[];
  joinedDate: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide icon name or emoji
  earnedDate: string;
  color: string;
}

export interface NewsComment {
  id: string;
  articleId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userRole: string;
  text: string;
  date: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  imageUrl: string;
  author: string;
  date: string;
  likes: number;
  likedBy: string[]; // user ids
  commentsCount: number;
  comments?: NewsComment[];
  isImportant?: boolean;
}

export interface AchievementSpotlight {
  id: string;
  employeeName: string;
  employeeAvatar: string;
  position: string;
  storeName: string;
  title: string; // e.g. "Iyul oyining eng yaxshi sotuvchisi"
  description: string;
  pointsEarned: number;
  date: string;
}

export interface PresentationSlide {
  id: string;
  slideNumber: number;
  title: string;
  content: string;
  bulletPoints?: string[];
  imageUrl?: string;
  audioDurationSec?: number;
  speakerNotes?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  points: number;
}

export interface DialogueOption {
  id: string;
  text: string;
  nextStepId: string | 'finish';
  points: number; // e.g. +10, -5
  moodChange: 'angry' | 'neutral' | 'happy' | 'delighted';
  feedbackMessage: string;
}

export interface DialogueStep {
  id: string;
  characterName: string;
  characterRole: string;
  characterAvatar: string;
  characterMood: 'angry' | 'neutral' | 'happy' | 'delighted';
  speechBubble: string;
  options: DialogueOption[];
}

export interface DialogueSimulation {
  id: string;
  title: string;
  scenarioDescription: string;
  passingScore: number;
  steps: DialogueStep[];
}

export interface CourseModule {
  id: string;
  title: string;
  type: 'presentation' | 'video' | 'quiz' | 'pdf' | 'pptx' | 'dialogue_simulation' | 'scorm_package';
  slides?: PresentationSlide[];
  videoUrl?: string;
  documentUrl?: string;
  documentName?: string;
  durationMinutes: number;
  questions?: QuizQuestion[];
  dialogueData?: DialogueSimulation;
  scormZipName?: string;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  description: string;
  coverImage: string;
  author: string;
  durationHours: number;
  level: "Boshlang'ich" | "O'rta" | "Yuqori";
  modules: CourseModule[];
  assignedStores: string[]; // store IDs or 'all'
  passScorePercentage: number;
  createdDate: string;
}

export interface UserCourseProgress {
  userId: string;
  courseId: string;
  completedModuleIds: string[];
  quizScores: Record<string, number>; // moduleId -> score %
  status: 'not_started' | 'in_progress' | 'completed';
  lastAccessedDate: string;
  certificateEarnedDate?: string;
}

export interface StoreBranch {
  id: string;
  name: string;
  city: string;
  address: string;
  managerName: string;
  employeeCount: number;
  averageScore: number;
}

export interface WorkIssue {
  id: string;
  storeId: string;
  storeName: string;
  reportedBy: string; // Employee name
  reportedByRole: string;
  title: string;
  description: string;
  category: 'Kassa Tizimi' | 'Mijozlar Bilan Muloqot' | 'Mahsulot Boshqaruvi' | 'Boshqa';
  status: 'Yangi' | 'Jarayonda' | 'Hal Etildi';
  date: string;
  assignedManagerId?: string;
  notes?: string;
}

export interface AssignedTask {
  id: string;
  assignedByManagerId: string;
  assignedByManagerName: string;
  assignedToUserId: string;
  assignedToUserName: string;
  courseId?: string;
  title: string;
  description: string;
  deadline: string;
  status: 'Kutilmoqda' | 'Bajarilmoqda' | 'Bajarildi' | "Muddati o'tgan";
  createdDate: string;
}

export interface ChatMessage {
  id: string;
  channelId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderRole: string;
  text: string;
  timestamp: string;
  fileAttachment?: {
    name: string;
    url: string;
    type: 'pdf' | 'image' | 'video' | 'doc';
  };
}

export interface ChatChannel {
  id: string;
  name: string;
  description: string;
  type: 'public' | 'store' | 'private';
  storeId?: string;
  unreadCount?: number;
  rulesOrNotice?: string;
}

export interface CourseQAAnswer {
  id: string;
  questionId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userRole: string;
  text: string;
  date: string;
  isOfficialSolution?: boolean;
}

export interface CourseQAQuestion {
  id: string;
  courseId: string;
  courseTitle: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userRole: string;
  title: string;
  content: string;
  date: string;
  likes: number;
  likedBy: string[];
  answers: CourseQAAnswer[];
}

export interface FailedQuestionMistake {
  id: string;
  userId: string;
  courseId: string;
  courseTitle: string;
  question: QuizQuestion;
  userWrongAnswerIndex: number;
  failedDate: string;
  isResolved: boolean;
}

export interface Certificate {
  id: string;
  certificateNumber: string;
  userId: string;
  userName: string;
  userPosition: string;
  courseId: string;
  courseTitle: string;
  scorePercentage: number;
  issuedDate: string;
}

export type NotificationType = 'course_assigned' | 'task_deadline' | 'task_assigned' | 'mistake_review' | 'announcement';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  date: string;
  deadlineDate?: string;
  daysRemaining?: number;
  urgency: 'high' | 'medium' | 'low';
  isRead: boolean;
  courseId?: string;
  taskId?: string;
  actionTab?: string;
  assignedByName?: string;
}

// ---------------- RETAIL & APPLIANCE MANAGEMENT TYPES ----------------
export interface ApplianceModelDetails {
  brand: string;
  name: string;
  specs: string[];
  pros: string[];
  priceUzs: number;
  image: string;
}

export interface ApplianceSpec {
  id: string;
  category: 'tv' | 'washers' | 'fridge' | 'ac' | 'kitchen' | string;
  categoryLabel?: string;
  modelA: string | ApplianceModelDetails;
  modelB: string | ApplianceModelDetails;
  keyDifference: string;
  customerObjection: string;
  salesPitch?: string;
  bestSalesPitch?: string;
}

export interface NasiyaPartner {
  id: string;
  name: string;
  ratePercent?: number;
  markupRate?: number;
  maxMonths?: number[];
  description: string;
  badgeColor?: string;
  color?: string;
}

export interface AuditCriterion {
  id: string;
  category: string;
  title: string;
  description: string;
  weight: number;
}

export interface DailyQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface RewardStoreItem {
  id: string;
  title: string;
  category: 'merch' | 'voucher' | 'perks' | 'badge';
  costCoins: number;
  image: string;
  description: string;
  stock: number;
}

// ---------------- 1. AI SALES SIMULATOR & OBJECTIONS ----------------
export interface CustomerPersona {
  id: string;
  name: string;
  role: string;
  avatar: string;
  difficulty: 'Oson' | "O'rta" | 'Qiyin' | 'Ekspert';
  personality: string;
  targetProduct: string;
  initialObjection: string;
  dialogueRounds: {
    roundNumber: number;
    customerSpeech: string;
    suggestedHints: string[];
    sampleBestAnswer: string;
    options: {
      id: string;
      text: string;
      score: number;
      feedback: string;
      customerReaction: string;
    }[];
  }[];
}

export interface SimulationEvaluation {
  empathyScore: number; // 0-100
  productKnowledgeScore: number; // 0-100
  objectionHandlingScore: number; // 0-100
  closingScore: number; // 0-100
  totalScore: number; // 0-100
  feedbackSummary: string;
  earnedCoins: number;
  passed: boolean;
}

// ---------------- 2. 1V1 KNOWLEDGE DUEL & STORE LEAGUE ----------------
export interface DuelParticipant {
  id: string;
  name: string;
  avatar: string;
  storeName: string;
  score: number;
  streak: number;
}

export interface DuelQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  category: string;
  timeLimitSec: number;
}

export interface StoreLeagueBranch {
  rank: number;
  storeId: string;
  storeName: string;
  city: string;
  duelsWon: number;
  totalPoints: number;
  winRatePercent: number;
  trend: 'up' | 'down' | 'same';
  badge: string;
}

// ---------------- 3. AI SMART PDP (INDIVIDUAL RIVOJLANISH XARITASI) ----------------
export interface PDPCompetency {
  key: string;
  name: string;
  currentLevel: number; // 0 - 100
  targetLevel: number; // 0 - 100
  status: 'needs_focus' | 'good' | 'master';
  recommendedAction: string;
}

export interface PDPMilestone {
  id: string;
  title: string;
  category: string;
  duration: string;
  isCompleted: boolean;
  scoreRequirement?: number;
  actionTab?: string;
  tips: string;
}

// ---------------- 4. ONBOARDING & STAJYOR ROADMAP ----------------
export interface OnboardingTask {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  isDone: boolean;
  requiredType: 'reading' | 'practice' | 'quiz' | 'mentor_check';
  linkedTab?: string;
}

export interface OnboardingDayPlan {
  dayNumber: number;
  title: string;
  stage: 'madaniyat' | 'texnika' | 'savdo_mijoz' | 'imtihon';
  description: string;
  tasks: OnboardingTask[];
  mentorSigned: boolean;
}

// ---------------- 5. OBJECTION BUSTER & SCRIPT DATABASE ----------------
export interface ObjectionScript {
  id: string;
  customerObjection: string;
  category: 'price' | 'warranty' | 'brand' | 'credit' | 'hesitation';
  difficulty: 'Oson' | "O'rta" | 'Qiyin';
  shortQuickAnswer: string;
  detailedScript: string;
  psychologyTip: string;
  tags: string[];
}

// ---------------- 6. SMART PRODUCT MATCHER ----------------
export interface ProductMatcherItem {
  id: string;
  category: 'tv' | 'fridge' | 'washer' | 'ac' | 'kitchen';
  productName: string;
  brand: string;
  price: number;
  budgetTier: 'budget' | 'mid' | 'premium';
  roomSize?: string;
  familySize?: string;
  keyFeature: string;
  whyRecommended: string;
  salesPitch: string;
  imageUrl: string;
}

// ---------------- 7. SKILL MATRIX & BRANCH HEATMAP ----------------
export interface BranchSkillScore {
  techKnowledge: number; // 0 - 100
  salesPsychology: number; // 0 - 100
  serviceAndWarranty: number; // 0 - 100
  cashAndStandards: number; // 0 - 100
  creditAndNasiya: number; // 0 - 100
  overallScore: number;
}

export interface SkillHeatmapBranch {
  storeId: string;
  storeName: string;
  city: string;
  managerName: string;
  employeeCount: number;
  skills: BranchSkillScore;
  criticalGaps: string[];
  recommendedCourseId?: string;
  lastAssessmentDate: string;
}

// ---------------- 8. STORE COMPETITIONS & LEAGUES ----------------
export interface StoreCompetitionChallenge {
  id: string;
  title: string;
  category: string;
  description: string;
  prizePool: string;
  bonusCoins: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'upcoming' | 'finished';
  bannerImage: string;
  targetMetric: string; // e.g. "Eng yuqori test o'zlashtirish va sotuv konversiyasi"
  topBranches: {
    rank: number;
    storeId: string;
    storeName: string;
    score: number;
    salesVolumeUzs: number;
    badge: string;
  }[];
}

// ---------------- 9. ROI & BUSINESS IMPACT CORRELATION ----------------
export interface RoiCorrelationData {
  storeName: string;
  city: string;
  trainingCompletionRate: number; // e.g. 92%
  salesRevenueGrowthPercent: number; // e.g. +28%
  customerSatisfactionScore: number; // e.g. 4.9
  complaintsReducedPercent: number; // e.g. -45%
  status: 'high_performer' | 'growing' | 'needs_attention';
}


