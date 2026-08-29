const fs = require('fs');

const fileContent = `import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { supabase } from '../services/supabase';
import {
  User, UserRole, NewsArticle, NewsComment, AchievementSpotlight, Course, UserCourseProgress, StoreBranch,
  WorkIssue, AssignedTask, ChatChannel, ChatMessage, FailedQuestionMistake, Certificate, QuizQuestion,
  CourseQAQuestion, CourseQAAnswer, ApplianceSpec, NasiyaPartner, AuditCriterion, DailyQuizQuestion,
  RewardStoreItem, AppNotification, CustomerPersona, SimulationEvaluation, DuelQuestion, StoreLeagueBranch,
  PDPCompetency, PDPMilestone, OnboardingDayPlan, ObjectionScript, ProductMatcherItem, SkillHeatmapBranch,
  StoreCompetitionChallenge, RoiCorrelationData,
} from '../types';

interface AppContextType {
  currentUser: User | null;
  users: User[];
  switchUserRole: (role: UserRole) => void;
  switchUserById: (userId: string) => void;
  loginUser: (userId: string) => void;
  registerUser: (userData: Partial<User>) => void;
  updateUserProfile: (userId: string, data: Partial<User>) => void;
  addUser: (user: User) => void;
  deleteUser: (userId: string) => void;
  addCoinsToUser: (amount: number, reason: string) => void;
  
  courses: Course[];
  addCourse: (course: Course) => void;
  updateCourse: (courseId: string, course: Partial<Course>) => void;
  deleteCourse: (courseId: string) => void;
  
  progressMap: Record<string, UserCourseProgress>;
  recordModuleCompletion: (courseId: string, moduleId: string) => void;
  recordQuizScore: (courseId: string, moduleId: string, scorePercentage: number, wrongQuestions: { question: QuizQuestion; wrongOptionIndex: number }[]) => void;

  newsList: NewsArticle[];
  newsCategories: string[];
  addNewsCategory: (categoryName: string) => void;
  deleteNewsCategory: (categoryName: string) => void;
  addNews: (news: NewsArticle) => void;
  updateNews: (id: string, news: Partial<NewsArticle>) => void;
  deleteNews: (id: string) => void;
  likeNews: (id: string) => void;
  addNewsComment: (articleId: string, text: string) => void;
  deleteNewsComment: (articleId: string, commentId: string) => void;
  editNewsComment: (articleId: string, commentId: string, text: string) => void;

  qaQuestions: CourseQAQuestion[];
  addQAQuestion: (data: { courseId: string; courseTitle: string; title: string; content: string }) => void;
  addQAAnswer: (questionId: string, text: string, isOfficial?: boolean) => void;
  toggleQALike: (questionId: string) => void;
  markAnswerOfficial: (questionId: string, answerId: string) => void;
  deleteQAQuestion: (questionId: string) => void;
  deleteQAAnswer: (questionId: string, answerId: string) => void;

  spotlights: AchievementSpotlight[];
  addSpotlight: (spotlight: AchievementSpotlight) => void;
  updateSpotlight: (id: string, spotlight: Partial<AchievementSpotlight>) => void;
  deleteSpotlight: (id: string) => void;

  stores: StoreBranch[];
  addStore: (store: StoreBranch) => void;
  updateStore: (id: string, store: Partial<StoreBranch>) => void;
  deleteStore: (id: string) => void;

  workIssues: WorkIssue[];
  addWorkIssue: (issue: WorkIssue) => void;
  updateWorkIssueStatus: (id: string, status: WorkIssue['status'], notes?: string) => void;

  tasks: AssignedTask[];
  assignTask: (task: AssignedTask) => void;
  updateTaskStatus: (id: string, status: AssignedTask['status']) => void;

  channels: ChatChannel[];
  messages: ChatMessage[];
  activeChannelId: string;
  setActiveChannelId: (id: string) => void;
  sendChatMessage: (text: string, fileAttachment?: ChatMessage['fileAttachment']) => void;
  deleteChatMessage: (messageId: string) => void;
  updateChatChannel: (channelId: string, data: Partial<ChatChannel>) => void;

  mistakes: FailedQuestionMistake[];
  resolveMistake: (mistakeId: string) => void;

  certificates: Certificate[];

  applianceSpecs: ApplianceSpec[];
  addApplianceSpec: (spec: ApplianceSpec) => void;
  updateApplianceSpec: (id: string, spec: Partial<ApplianceSpec>) => void;
  deleteApplianceSpec: (id: string) => void;

  nasiyaPartners: NasiyaPartner[];
  addNasiyaPartner: (partner: NasiyaPartner) => void;
  updateNasiyaPartner: (id: string, partner: Partial<NasiyaPartner>) => void;
  deleteNasiyaPartner: (id: string) => void;

  auditCriteria: AuditCriterion[];
  addAuditCriterion: (criterion: AuditCriterion) => void;
  updateAuditCriterion: (id: string, criterion: Partial<AuditCriterion>) => void;
  deleteAuditCriterion: (id: string) => void;

  dailyQuizQuestions: DailyQuizQuestion[];
  addDailyQuizQuestion: (q: DailyQuizQuestion) => void;
  updateDailyQuizQuestion: (id: string, q: Partial<DailyQuizQuestion>) => void;
  deleteDailyQuizQuestion: (id: string) => void;

  rewardStoreItems: RewardStoreItem[];
  addRewardStoreItem: (item: RewardStoreItem) => void;
  updateRewardStoreItem: (id: string, item: Partial<RewardStoreItem>) => void;
  deleteRewardStoreItem: (id: string) => void;

  notifications: AppNotification[];
  unreadNotificationsCount: number;
  markNotificationAsRead: (id: string) => void;
  markNotificationAsUnread: (id: string) => void;
  markAllNotificationsAsRead: () => void;

  customerPersonas: CustomerPersona[];
  addCustomerPersona: (persona: CustomerPersona) => void;
  updateCustomerPersona: (id: string, persona: Partial<CustomerPersona>) => void;
  deleteCustomerPersona: (id: string) => void;
  completeSalesSimulation: (_personaId: string, evaluation: SimulationEvaluation) => void;

  duelQuestions: DuelQuestion[];
  storeLeague: StoreLeagueBranch[];
  recordDuelResult: (won: boolean, wagerCoins: number, opponentName: string) => void;

  pdpCompetencies: PDPCompetency[];
  pdpMilestones: PDPMilestone[];
  addPDPMilestone: (milestone: PDPMilestone) => void;
  updatePDPMilestone: (id: string, milestone: Partial<PDPMilestone>) => void;
  deletePDPMilestone: (id: string) => void;
  togglePDPMilestone: (milestoneId: string) => void;
  updatePDPCompetency: (key: string, newLevel: number) => void;

  onboardingDays: OnboardingDayPlan[];
  addOnboardingDay: (day: OnboardingDayPlan) => void;
  updateOnboardingDay: (dayNumber: number, day: Partial<OnboardingDayPlan>) => void;
  deleteOnboardingDay: (dayNumber: number) => void;
  toggleOnboardingTask: (dayNumber: number, taskId: string) => void;
  signOnboardingDay: (dayNumber: number) => void;

  objectionScripts: ObjectionScript[];
  addObjectionScript: (script: ObjectionScript) => void;
  updateObjectionScript: (id: string, script: Partial<ObjectionScript>) => void;
  deleteObjectionScript: (id: string) => void;

  productMatchers: ProductMatcherItem[];
  addProductMatcher: (matcher: ProductMatcherItem) => void;
  updateProductMatcher: (id: string, matcher: Partial<ProductMatcherItem>) => void;
  deleteProductMatcher: (id: string) => void;

  skillHeatmaps: SkillHeatmapBranch[];
  updateSkillHeatmap: (storeId: string, data: Partial<SkillHeatmapBranch>) => void;
  addSkillHeatmap: (branch: SkillHeatmapBranch) => void;
  deleteSkillHeatmap: (storeId: string) => void;
  autoAssignRemedialCourse: (storeId: string, gapName: string, courseId: string) => void;

  storeCompetitions: StoreCompetitionChallenge[];
  addStoreCompetition: (comp: StoreCompetitionChallenge) => void;
  updateStoreCompetition: (id: string, comp: Partial<StoreCompetitionChallenge>) => void;
  deleteStoreCompetition: (id: string) => void;

  roiData: RoiCorrelationData[];
  updateRoiData: (storeName: string, data: Partial<RoiCorrelationData>) => void;

  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [progressMap, setProgressMap] = useState<Record<string, UserCourseProgress>>({});
  const [newsList, setNewsList] = useState<NewsArticle[]>([]);
  const [newsCategories, setNewsCategories] = useState<string[]>(["Korporativ Yangiliklar", "Yutuqlar va E'tirof", "Texnik Yo'riqnoma"]);
  const [qaQuestions, setQaQuestions] = useState<CourseQAQuestion[]>([]);
  const [spotlights, setSpotlights] = useState<AchievementSpotlight[]>([]);
  const [stores, setStores] = useState<StoreBranch[]>([]);
  const [workIssues, setWorkIssues] = useState<WorkIssue[]>([]);
  const [tasks, setTasks] = useState<AssignedTask[]>([]);
  const [channels, setChannels] = useState<ChatChannel[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [mistakes, setMistakes] = useState<FailedQuestionMistake[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [applianceSpecs, setApplianceSpecs] = useState<ApplianceSpec[]>([]);
  const [nasiyaPartners, setNasiyaPartners] = useState<NasiyaPartner[]>([]);
  const [auditCriteria, setAuditCriteria] = useState<AuditCriterion[]>([]);
  const [dailyQuizQuestions, setDailyQuizQuestions] = useState<DailyQuizQuestion[]>([]);
  const [rewardStoreItems, setRewardStoreItems] = useState<RewardStoreItem[]>([]);
  
  const [activeChannelId, setActiveChannelId] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Dummy states for other complex UI items (can be extended to DB later)
  const [readNotificationIds, setReadNotificationIds] = useState<string[]>([]);
  const [customerPersonas, setCustomerPersonas] = useState<CustomerPersona[]>([]);
  const [duelQuestions, setDuelQuestions] = useState<DuelQuestion[]>([]);
  const [storeLeague, setStoreLeague] = useState<StoreLeagueBranch[]>([]);
  const [pdpCompetencies, setPdpCompetencies] = useState<PDPCompetency[]>([]);
  const [pdpMilestones, setPdpMilestones] = useState<PDPMilestone[]>([]);
  const [onboardingDays, setOnboardingDays] = useState<OnboardingDayPlan[]>([]);
  const [objectionScripts, setObjectionScripts] = useState<ObjectionScript[]>([]);
  const [productMatchers, setProductMatchers] = useState<ProductMatcherItem[]>([]);
  const [skillHeatmaps, setSkillHeatmaps] = useState<SkillHeatmapBranch[]>([]);
  const [storeCompetitions, setStoreCompetitions] = useState<StoreCompetitionChallenge[]>([]);
  const [roiData, setRoiData] = useState<RoiCorrelationData[]>([]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 4000);
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data } = await supabase.from('users').select('*').eq('id', session.user.id).single();
        if (data) setCurrentUser(data as User);
      } else {
        // Fallback for development if no actual auth is enforced
        const { data } = await supabase.from('users').select('*').limit(1).single();
        if (data) setCurrentUser(data as User);
      }
    });

    fetchData();

    // Setup Subscriptions
    const channelsSub = supabase.channel('public:chat_channels').on('postgres_changes', { event: '*', schema: 'public', table: 'chat_channels' }, (payload) => {
      fetchData(); // Simplistic refresh
    }).subscribe();

    const messagesSub = supabase.channel('public:chat_messages').on('postgres_changes', { event: '*', schema: 'public', table: 'chat_messages' }, (payload) => {
      fetchData(); // Simplistic refresh
    }).subscribe();
    
    return () => {
      supabase.removeChannel(channelsSub);
      supabase.removeChannel(messagesSub);
    };
  }, []);

  const fetchData = async () => {
    try {
      const [
        usersRes, coursesRes, newsRes, spotlightsRes, tasksRes, channelsRes, 
        messagesRes, mistakesRes, certsRes, progressRes
      ] = await Promise.all([
        supabase.from('users').select('*'),
        supabase.from('courses').select('*, modules(*)'),
        supabase.from('news').select('*'),
        supabase.from('spotlights').select('*'),
        supabase.from('tasks').select('*'),
        supabase.from('chat_channels').select('*'),
        supabase.from('chat_messages').select('*'),
        supabase.from('mistakes').select('*'),
        supabase.from('certificates').select('*'),
        supabase.from('progress').select('*')
      ]);

      if (usersRes.data) setUsers(usersRes.data);
      if (coursesRes.data) setCourses(coursesRes.data);
      if (newsRes.data) setNewsList(newsRes.data);
      if (spotlightsRes.data) setSpotlights(spotlightsRes.data);
      if (tasksRes.data) setTasks(tasksRes.data);
      if (channelsRes.data) setChannels(channelsRes.data);
      if (messagesRes.data) setMessages(messagesRes.data);
      if (mistakesRes.data) setMistakes(mistakesRes.data);
      if (certsRes.data) setCertificates(certsRes.data);
      
      if (progressRes.data) {
        const pMap: Record<string, UserCourseProgress> = {};
        progressRes.data.forEach(p => {
           if(p.course_id) pMap[p.course_id] = p; // Mapping to local struct
        });
        setProgressMap(pMap);
      }
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  };

  // Auth Mocks (Switching)
  const switchUserRole = (role: UserRole) => {
    const targetUser = users.find((u) => u.role === role);
    if (targetUser) {
      setCurrentUser(targetUser);
      showToast(\`Rol almashtirildi: \${targetUser.name}\`);
    }
  };

  const switchUserById = (userId: string) => {
    const targetUser = users.find((u) => u.id === userId);
    if (targetUser) {
      setCurrentUser(targetUser);
      showToast(\`Akkuntga kirildi: \${targetUser.name}\`);
    }
  };
  const loginUser = (userId: string) => switchUserById(userId);
  const registerUser = async (userData: Partial<User>) => { /* mock */ };
  const updateUserProfile = async (userId: string, data: Partial<User>) => {
    const { error } = await supabase.from('users').update(data).eq('id', userId);
    if (!error) {
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, ...data } : u));
      if (currentUser?.id === userId) setCurrentUser({ ...currentUser, ...data } as User);
      showToast("Profil yangilandi");
    }
  };
  const addUser = async (user: User) => {
    await supabase.from('users').insert(user);
    fetchData();
  };
  const deleteUser = async (userId: string) => {
    await supabase.from('users').delete().eq('id', userId);
    fetchData();
  };
  const addCoinsToUser = (amount: number, reason: string) => {};

  // Courses
  const addCourse = async (course: Course) => {
    await supabase.from('courses').insert({ title: course.title, description: course.description });
    fetchData();
    showToast("Kurs qo'shildi!");
  };
  const updateCourse = async (courseId: string, updated: Partial<Course>) => {
    await supabase.from('courses').update(updated).eq('id', courseId);
    fetchData();
    showToast("Kurs yangilandi!");
  };
  const deleteCourse = async (courseId: string) => {
    await supabase.from('courses').delete().eq('id', courseId);
    fetchData();
    showToast("Kurs o'chirildi.");
  };

  const recordModuleCompletion = async (courseId: string, moduleId: string) => {
    // simplified
  };

  const recordQuizScore = async (courseId: string, moduleId: string, scorePercentage: number, wrongQuestions: any[]) => {
    if (!currentUser) return;
    
    // Save progress
    const { data: existing } = await supabase.from('progress').select('*').eq('user_id', currentUser.id).eq('course_id', courseId).single();
    if (existing) {
       await supabase.from('progress').update({ status: scorePercentage >= 70 ? 'completed' : existing.status }).eq('id', existing.id);
    } else {
       await supabase.from('progress').insert({ user_id: currentUser.id, course_id: courseId, status: scorePercentage >= 70 ? 'completed' : 'in_progress' });
    }

    if (scorePercentage >= 70) {
      await supabase.from('certificates').insert({ user_id: currentUser.id, course_id: courseId, url: "new_cert_url" });
      showToast("Sertifikat olindi!");
    } else {
      showToast("Testdan yiqildingiz.");
    }
    fetchData();
  };

  // News
  const addNewsCategory = (name: string) => setNewsCategories(prev => [...prev, name]);
  const deleteNewsCategory = (name: string) => setNewsCategories(prev => prev.filter(c => c !== name));
  
  const addNews = async (news: NewsArticle) => {
    await supabase.from('news').insert({ title: news.title, content: news.content });
    fetchData();
  };
  const updateNews = async (id: string, news: Partial<NewsArticle>) => {
    await supabase.from('news').update(news).eq('id', id);
    fetchData();
  };
  const deleteNews = async (id: string) => {
    await supabase.from('news').delete().eq('id', id);
    fetchData();
  };
  const likeNews = async (id: string) => {
    // simplified like toggle
    showToast("Yangilik yoqdi!");
  };
  const addNewsComment = (aId: string, text: string) => {};
  const deleteNewsComment = (aId: string, cId: string) => {};
  const editNewsComment = (aId: string, cId: string, t: string) => {};

  // Q&A
  const addQAQuestion = (data: any) => {};
  const addQAAnswer = (qid: string, txt: string, off?: boolean) => {};
  const toggleQALike = (qid: string) => {};
  const markAnswerOfficial = (qid: string, aid: string) => {};
  const deleteQAQuestion = (qid: string) => {};
  const deleteQAAnswer = (qid: string, aid: string) => {};

  // Spotlights
  const addSpotlight = async (spotlight: AchievementSpotlight) => {
    await supabase.from('spotlights').insert({ title: spotlight.employeeName, content: spotlight.reason });
    fetchData();
  };
  const updateSpotlight = async (id: string, spotlight: Partial<AchievementSpotlight>) => {
    await supabase.from('spotlights').update(spotlight).eq('id', id);
    fetchData();
  };
  const deleteSpotlight = async (id: string) => {
    await supabase.from('spotlights').delete().eq('id', id);
    fetchData();
  };

  // Stores
  const addStore = (store: StoreBranch) => {};
  const updateStore = (id: string, store: Partial<StoreBranch>) => {};
  const deleteStore = (id: string) => {};

  // Work Issues
  const addWorkIssue = (issue: WorkIssue) => {};
  const updateWorkIssueStatus = (id: string, st: any, notes?: string) => {};

  // Tasks
  const assignTask = async (task: AssignedTask) => {
    await supabase.from('tasks').insert({ title: task.title, assigned_by: task.assignedByManagerId, assigned_to: task.assignedToUserId });
    fetchData();
    showToast("Vazifa biriktirildi!");
  };
  const updateTaskStatus = async (id: string, status: any) => {
    await supabase.from('tasks').update({ status }).eq('id', id);
    fetchData();
  };

  // Chat
  const sendChatMessage = async (text: string, fileAttachment?: any) => {
    if (!currentUser || !activeChannelId) return;
    await supabase.from('chat_messages').insert({ content: text, channel_id: activeChannelId, sender_id: currentUser.id });
    showToast("Xabar yuborildi");
  };
  const deleteChatMessage = async (messageId: string) => {
    await supabase.from('chat_messages').delete().eq('id', messageId);
  };
  const updateChatChannel = async (channelId: string, data: Partial<ChatChannel>) => {
    await supabase.from('chat_channels').update(data).eq('id', channelId);
  };

  // Mistakes
  const resolveMistake = (id: string) => {};

  // Admin modules
  const addApplianceSpec = (s: any) => {};
  const updateApplianceSpec = (i: string, s: any) => {};
  const deleteApplianceSpec = (i: string) => {};
  const addNasiyaPartner = (p: any) => {};
  const updateNasiyaPartner = (i: string, p: any) => {};
  const deleteNasiyaPartner = (i: string) => {};
  const addAuditCriterion = (c: any) => {};
  const updateAuditCriterion = (i: string, c: any) => {};
  const deleteAuditCriterion = (i: string) => {};
  const addDailyQuizQuestion = (q: any) => {};
  const updateDailyQuizQuestion = (i: string, q: any) => {};
  const deleteDailyQuizQuestion = (i: string) => {};
  const addRewardStoreItem = (i: any) => {};
  const updateRewardStoreItem = (i: string, item: any) => {};
  const deleteRewardStoreItem = (i: string) => {};

  const notifications: AppNotification[] = [];
  const unreadNotificationsCount = 0;
  const markNotificationAsRead = (i: string) => {};
  const markNotificationAsUnread = (i: string) => {};
  const markAllNotificationsAsRead = () => {};

  const addCustomerPersona = (p: any) => {};
  const updateCustomerPersona = (i: string, p: any) => {};
  const deleteCustomerPersona = (i: string) => {};
  const completeSalesSimulation = (pId: string, evalResult: any) => {};
  const recordDuelResult = (won: boolean, wager: number, opponentName: string) => {};
  const addPDPMilestone = (m: any) => {};
  const updatePDPMilestone = (i: string, m: any) => {};
  const deletePDPMilestone = (i: string) => {};
  const togglePDPMilestone = (m: string) => {};
  const updatePDPCompetency = (k: string, level: number) => {};
  const addOnboardingDay = (d: any) => {};
  const updateOnboardingDay = (n: number, d: any) => {};
  const deleteOnboardingDay = (n: number) => {};
  const toggleOnboardingTask = (n: number, t: string) => {};
  const signOnboardingDay = (n: number) => {};
  const addObjectionScript = (s: any) => {};
  const updateObjectionScript = (i: string, s: any) => {};
  const deleteObjectionScript = (i: string) => {};
  const addProductMatcher = (m: any) => {};
  const updateProductMatcher = (i: string, m: any) => {};
  const deleteProductMatcher = (i: string) => {};
  const updateSkillHeatmap = (s: string, d: any) => {};
  const addSkillHeatmap = (b: any) => {};
  const deleteSkillHeatmap = (s: string) => {};
  const autoAssignRemedialCourse = (s: string, g: string, c: string) => {};
  const addStoreCompetition = (c: any) => {};
  const updateStoreCompetition = (i: string, c: any) => {};
  const deleteStoreCompetition = (i: string) => {};
  const updateRoiData = (s: string, d: any) => {};

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        switchUserRole,
        switchUserById,
        loginUser,
        registerUser,
        updateUserProfile,
        addUser,
        deleteUser,
        addCoinsToUser,
        courses,
        addCourse,
        updateCourse,
        deleteCourse,
        progressMap,
        recordModuleCompletion,
        recordQuizScore,
        newsList,
        newsCategories,
        addNewsCategory,
        deleteNewsCategory,
        addNews,
        updateNews,
        deleteNews,
        likeNews,
        addNewsComment,
        deleteNewsComment,
        editNewsComment,
        qaQuestions,
        addQAQuestion,
        addQAAnswer,
        toggleQALike,
        markAnswerOfficial,
        deleteQAQuestion,
        deleteQAAnswer,
        spotlights,
        addSpotlight,
        updateSpotlight,
        deleteSpotlight,
        stores,
        addStore,
        updateStore,
        deleteStore,
        workIssues,
        addWorkIssue,
        updateWorkIssueStatus,
        tasks,
        assignTask,
        updateTaskStatus,
        channels,
        messages,
        activeChannelId,
        setActiveChannelId,
        sendChatMessage,
        deleteChatMessage,
        updateChatChannel,
        mistakes,
        resolveMistake,
        certificates,
        applianceSpecs,
        addApplianceSpec,
        updateApplianceSpec,
        deleteApplianceSpec,
        nasiyaPartners,
        addNasiyaPartner,
        updateNasiyaPartner,
        deleteNasiyaPartner,
        auditCriteria,
        addAuditCriterion,
        updateAuditCriterion,
        deleteAuditCriterion,
        dailyQuizQuestions,
        addDailyQuizQuestion,
        updateDailyQuizQuestion,
        deleteDailyQuizQuestion,
        rewardStoreItems,
        addRewardStoreItem,
        updateRewardStoreItem,
        deleteRewardStoreItem,
        notifications,
        unreadNotificationsCount,
        markNotificationAsRead,
        markNotificationAsUnread,
        markAllNotificationsAsRead,
        customerPersonas,
        addCustomerPersona,
        updateCustomerPersona,
        deleteCustomerPersona,
        completeSalesSimulation,
        duelQuestions,
        storeLeague,
        recordDuelResult,
        pdpCompetencies,
        pdpMilestones,
        addPDPMilestone,
        updatePDPMilestone,
        deletePDPMilestone,
        togglePDPMilestone,
        updatePDPCompetency,
        onboardingDays,
        addOnboardingDay,
        updateOnboardingDay,
        deleteOnboardingDay,
        toggleOnboardingTask,
        signOnboardingDay,
        objectionScripts,
        addObjectionScript,
        updateObjectionScript,
        deleteObjectionScript,
        productMatchers,
        addProductMatcher,
        updateProductMatcher,
        deleteProductMatcher,
        skillHeatmaps,
        updateSkillHeatmap,
        addSkillHeatmap,
        deleteSkillHeatmap,
        autoAssignRemedialCourse,
        storeCompetitions,
        addStoreCompetition,
        updateStoreCompetition,
        deleteStoreCompetition,
        roiData,
        updateRoiData,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
`;

fs.writeFileSync('src/context/AppContext.tsx', fileContent, 'utf-8');
console.log('Done replacing AppContext.tsx');
