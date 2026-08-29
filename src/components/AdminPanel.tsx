import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  NewsArticle,
  StoreBranch,
  AchievementSpotlight,
  User,
  UserRole,
  Course,
  ApplianceSpec,
  AuditCriterion,
  DailyQuizQuestion,
  RewardStoreItem,
  CustomerPersona,
  PDPMilestone,
  OnboardingDayPlan,
  OnboardingTask,
  ObjectionScript,
  ProductMatcherItem,
  SkillHeatmapBranch,
  StoreCompetitionChallenge,
  RoiCorrelationData,
} from '../types';
import { CourseEditorModal } from './CourseEditorModal';
import {
  Settings,
  Newspaper,
  Building2,
  Award,
  PlusCircle,
  Trash2,
  Edit,
  CheckCircle2,
  Users,
  ShieldCheck,
  Sparkles,
  BookOpen,
  Search,
  X,
  Camera,
  Layers,
  Tv,
  CreditCard,
  ClipboardCheck,
  HelpCircle,
  Coins,
  DollarSign,
  Percent,
  ShoppingBag,
  Zap,
  Compass,
  FileCheck,
  Target,
  MessageSquare,
  MessageSquareQuote,
  SlidersHorizontal,
  Tag,
  BrainCircuit,
  Trophy,
  BarChart3,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const {
    newsList,
    newsCategories,
    addNewsCategory,
    deleteNewsCategory,
    addNews,
    updateNews,
    deleteNews,
    stores,
    addStore,
    updateStore,
    deleteStore,
    spotlights,
    addSpotlight,
    updateSpotlight,
    deleteSpotlight,
    users,
    addUser,
    updateUserProfile,
    deleteUser,
    courses,
    addCourse,
    updateCourse,
    deleteCourse,
    currentUser,
    applianceSpecs,
    addApplianceSpec,
    updateApplianceSpec,
    deleteApplianceSpec,
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
    customerPersonas,
    addCustomerPersona,
    updateCustomerPersona,
    deleteCustomerPersona,
    pdpMilestones,
    addPDPMilestone,
    updatePDPMilestone,
    deletePDPMilestone,
    onboardingDays,
    addOnboardingDay,
    updateOnboardingDay,
    deleteOnboardingDay,
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
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<
    | 'news'
    | 'spotlights'
    | 'stores'
    | 'users'
    | 'courses'
    | 'appliance_specs'
    | 'store_audit'
    | 'daily_quiz'
    | 'coins_market'
    | 'ai_personas'
    | 'pdp_milestones'
    | 'onboarding_plans'
    | 'objection_scripts'
    | 'product_matchers'
    | 'skill_matrix'
    | 'store_competitions'
    | 'roi_correlation'
  >('news');
  const [selectedMenuCategory, setSelectedMenuCategory] = useState<'all' | 'org' | 'learning' | 'sales' | 'analytics'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ---------------- NEWS MODAL STATE ----------------
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategoryInput, setNewCategoryInput] = useState('');
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [newsCategory, setNewsCategory] = useState('Korporativ Yangiliklar');
  const [newsImg, setNewsImg] = useState('');
  const [isImportant, setIsImportant] = useState(false);

  const handleNewsFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setNewsImg(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const openNewsModal = (article?: NewsArticle) => {
    if (article) {
      setEditingNewsId(article.id);
      setNewsTitle(article.title);
      setNewsContent(article.content);
      setNewsCategory(article.category);
      setNewsImg(article.imageUrl);
      setIsImportant(article.isImportant || false);
    } else {
      setEditingNewsId(null);
      setNewsTitle('');
      setNewsContent('');
      setNewsCategory('Korporativ Yangiliklar');
      setNewsImg('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80');
      setIsImportant(false);
    }
    setShowNewsModal(true);
  };

  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle.trim() || !newsContent.trim()) return;

    if (editingNewsId) {
      updateNews(editingNewsId, {
        title: newsTitle,
        content: newsContent,
        category: newsCategory,
        imageUrl: newsImg || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
        isImportant,
      });
    } else {
      const newArticle: NewsArticle = {
        id: `news_${Date.now()}`,
        title: newsTitle,
        content: newsContent,
        category: newsCategory,
        imageUrl: newsImg || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
        author: `${currentUser.name} (Admin)`,
        date: new Date().toISOString().split('T')[0],
        likes: 0,
        likedBy: [],
        commentsCount: 0,
        isImportant,
      };
      addNews(newArticle);
    }
    setShowNewsModal(false);
  };

  // ---------------- SPOTLIGHT MODAL STATE ----------------
  const [showSpotlightModal, setShowSpotlightModal] = useState(false);
  const [editingSptId, setEditingSptId] = useState<string | null>(null);
  const [sptEmpName, setSptEmpName] = useState('');
  const [sptEmpAvatar, setSptEmpAvatar] = useState('');
  const [sptPosition, setSptPosition] = useState("A'lochi Xodim");
  const [sptStore, setSptStore] = useState('Chilonzor Filiali');
  const [sptTitle, setSptTitle] = useState('');
  const [sptDesc, setSptDesc] = useState('');
  const [sptPoints, setSptPoints] = useState(500);

  const openSpotlightModal = (spt?: AchievementSpotlight) => {
    if (spt) {
      setEditingSptId(spt.id);
      setSptEmpName(spt.employeeName);
      setSptEmpAvatar(spt.employeeAvatar);
      setSptPosition(spt.position);
      setSptStore(spt.storeName);
      setSptTitle(spt.title);
      setSptDesc(spt.description);
      setSptPoints(spt.pointsEarned);
    } else {
      setEditingSptId(null);
      setSptEmpName('');
      setSptEmpAvatar('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80');
      setSptPosition("A'lochi Xodim");
      setSptStore(stores[0]?.name || 'Chilonzor Filiali');
      setSptTitle('');
      setSptDesc('');
      setSptPoints(500);
    }
    setShowSpotlightModal(true);
  };

  const handleSaveSpotlight = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sptEmpName.trim() || !sptTitle.trim()) return;

    if (editingSptId) {
      updateSpotlight(editingSptId, {
        employeeName: sptEmpName,
        employeeAvatar: sptEmpAvatar,
        position: sptPosition,
        storeName: sptStore,
        title: sptTitle,
        description: sptDesc,
        pointsEarned: Number(sptPoints),
      });
    } else {
      const newSpotlight: AchievementSpotlight = {
        id: `spt_${Date.now()}`,
        employeeName: sptEmpName,
        employeeAvatar: sptEmpAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        position: sptPosition,
        storeName: sptStore,
        title: sptTitle,
        description: sptDesc,
        pointsEarned: Number(sptPoints),
        date: new Date().toISOString().split('T')[0],
      };
      addSpotlight(newSpotlight);
    }
    setShowSpotlightModal(false);
  };

  // ---------------- STORES / SECTIONS MODAL STATE ----------------
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [editingStoreId, setEditingStoreId] = useState<string | null>(null);
  const [storeName, setStoreName] = useState('');
  const [storeCity, setStoreCity] = useState('Toshkent');
  const [storeAddress, setStoreAddress] = useState('');
  const [storeManager, setStoreManager] = useState('');
  const [storeEmployeeCount, setStoreEmployeeCount] = useState(10);
  const [storeAverageScore, setStoreAverageScore] = useState(90);

  const openStoreModal = (st?: StoreBranch) => {
    if (st) {
      setEditingStoreId(st.id);
      setStoreName(st.name);
      setStoreCity(st.city);
      setStoreAddress(st.address);
      setStoreManager(st.managerName);
      setStoreEmployeeCount(st.employeeCount);
      setStoreAverageScore(st.averageScore);
    } else {
      setEditingStoreId(null);
      setStoreName('');
      setStoreCity('Toshkent');
      setStoreAddress('');
      setStoreManager('');
      setStoreEmployeeCount(10);
      setStoreAverageScore(90);
    }
    setShowStoreModal(true);
  };

  const handleSaveStore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeName.trim() || !storeAddress.trim()) return;

    if (editingStoreId) {
      updateStore(editingStoreId, {
        name: storeName,
        city: storeCity,
        address: storeAddress,
        managerName: storeManager || 'Tayinlanmagan',
        employeeCount: Number(storeEmployeeCount),
        averageScore: Number(storeAverageScore),
      });
    } else {
      const newBranch: StoreBranch = {
        id: `store_${Date.now()}`,
        name: storeName,
        city: storeCity,
        address: storeAddress,
        managerName: storeManager || 'Tayinlanmagan',
        employeeCount: Number(storeEmployeeCount),
        averageScore: Number(storeAverageScore),
      };
      addStore(newBranch);
    }
    setShowStoreModal(false);
  };

  // ---------------- USER PROFILE MODAL STATE ----------------
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [usrName, setUsrName] = useState('');
  const [usrRole, setUsrRole] = useState<UserRole>('employee');
  const [usrPosition, setUsrPosition] = useState('Sotuvchi Mutaxassis');
  const [usrDepartment, setUsrDepartment] = useState('Chakana Savdo');
  const [usrStore, setUsrStore] = useState('Chilonzor Filiali');
  const [usrPhone, setUsrPhone] = useState('+998 90 123 45 67');
  const [usrEmail, setUsrEmail] = useState('');
  const [usrAvatar, setUsrAvatar] = useState('');
  const [usrBio, setUsrBio] = useState('');
  const [usrPoints, setUsrPoints] = useState(100);
  const [usrStreakDays, setUsrStreakDays] = useState(1);

  const openUserModal = (u?: User) => {
    if (u) {
      setEditingUserId(u.id);
      setUsrName(u.name);
      setUsrRole(u.role);
      setUsrPosition(u.position);
      setUsrDepartment(u.department || 'Chakana Savdo');
      setUsrStore(u.storeName);
      setUsrPhone(u.phone);
      setUsrEmail(u.email);
      setUsrAvatar(u.avatar);
      setUsrBio(u.bio || '');
      setUsrPoints(u.points);
      setUsrStreakDays(u.streakDays);
    } else {
      setEditingUserId(null);
      setUsrName('');
      setUsrRole('employee');
      setUsrPosition('Kassa Mutaxassisi');
      setUsrDepartment('Chakana Savdo');
      setUsrStore(stores[0]?.name || 'Chilonzor Filiali');
      setUsrPhone('+998 90 123 45 67');
      setUsrEmail('');
      setUsrAvatar('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80');
      setUsrBio('');
      setUsrPoints(100);
      setUsrStreakDays(1);
    }
    setShowUserModal(true);
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usrName.trim() || !usrPosition.trim()) return;

    if (editingUserId) {
      updateUserProfile(editingUserId, {
        name: usrName,
        role: usrRole,
        position: usrPosition,
        department: usrDepartment,
        storeName: usrStore,
        phone: usrPhone,
        email: usrEmail,
        avatar: usrAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        bio: usrBio,
        points: Number(usrPoints),
        streakDays: Number(usrStreakDays),
      });
    } else {
      const newUser: User = {
        id: `usr_${Date.now()}`,
        name: usrName,
        email: usrEmail || `${usrName.toLowerCase().replace(/\s+/g, '.')}@hamkor.uz`,
        role: usrRole,
        position: usrPosition,
        department: usrDepartment,
        storeId: stores.find((s) => s.name === usrStore)?.id || 'store_1',
        storeName: usrStore,
        phone: usrPhone,
        avatar: usrAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        bio: usrBio || 'Hamkor portali xodimi.',
        joinedDate: new Date().toISOString().split('T')[0],
        points: Number(usrPoints),
        streakDays: Number(usrStreakDays),
        completedCourseIds: [],
        badges: [
          {
            id: `bdg_${Date.now()}`,
            title: 'Yangi Xodim',
            description: 'Jamoamizga xush kelibsiz!',
            icon: 'Sparkles',
            earnedDate: new Date().toISOString().split('T')[0],
            color: 'bg-emerald-500',
          },
        ],
      };
      addUser(newUser);
    }
    setShowUserModal(false);
  };

  // ---------------- COURSE MODAL STATE ----------------
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const openCourseModal = (crs?: Course) => {
    if (crs) {
      setEditingCourse(crs);
    } else {
      setEditingCourse(null);
    }
    setShowCourseModal(true);
  };

  const handleSaveCourseModal = (updatedCourse: Course) => {
    if (editingCourse) {
      updateCourse(editingCourse.id, updatedCourse);
    } else {
      addCourse(updatedCourse);
    }
    setShowCourseModal(false);
  };

  // Filtered Lists
  const filteredNews = newsList.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSpotlights = spotlights.filter(
    (s) =>
      s.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredStores = stores.filter(
    (st) =>
      st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ---------------- APPLIANCE SPEC MODAL STATE ----------------
  const [showSpecModal, setShowSpecModal] = useState(false);
  const [editingSpecId, setEditingSpecId] = useState<string | null>(null);
  const [specCategory, setSpecCategory] = useState<'tv' | 'fridge' | 'washer' | 'ac'>('tv');
  const [specModelA, setSpecModelA] = useState('');
  const [specModelB, setSpecModelB] = useState('');
  const [specKeyDifference, setSpecKeyDifference] = useState('');
  const [specCustomerObjection, setSpecCustomerObjection] = useState('');
  const [specSalesPitch, setSpecSalesPitch] = useState('');

  const openSpecModal = (spec?: ApplianceSpec) => {
    if (spec) {
      setEditingSpecId(spec.id);
      setSpecCategory((spec.category as any) || 'tv');
      setSpecModelA(typeof spec.modelA === 'string' ? spec.modelA : spec.modelA.name);
      setSpecModelB(typeof spec.modelB === 'string' ? spec.modelB : spec.modelB.name);
      setSpecKeyDifference(spec.keyDifference);
      setSpecCustomerObjection(spec.customerObjection);
      setSpecSalesPitch(spec.salesPitch || spec.bestSalesPitch || '');
    } else {
      setEditingSpecId(null);
      setSpecCategory('tv');
      setSpecModelA('');
      setSpecModelB('');
      setSpecKeyDifference('');
      setSpecCustomerObjection('');
      setSpecSalesPitch('');
    }
    setShowSpecModal(true);
  };

  const handleSaveSpec = (e: React.FormEvent) => {
    e.preventDefault();
    if (!specModelA.trim() || !specModelB.trim()) return;

    if (editingSpecId) {
      updateApplianceSpec(editingSpecId, {
        category: specCategory,
        modelA: specModelA,
        modelB: specModelB,
        keyDifference: specKeyDifference,
        customerObjection: specCustomerObjection,
        salesPitch: specSalesPitch,
      });
    } else {
      addApplianceSpec({
        id: `spec_${Date.now()}`,
        category: specCategory,
        modelA: specModelA,
        modelB: specModelB,
        keyDifference: specKeyDifference,
        customerObjection: specCustomerObjection,
        salesPitch: specSalesPitch,
      });
    }
    setShowSpecModal(false);
  };

  // ---------------- AUDIT CRITERION MODAL STATE ----------------
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [editingAuditId, setEditingAuditId] = useState<string | null>(null);
  const [auditCategory, setAuditCategory] = useState('');
  const [auditTitle, setAuditTitle] = useState('');
  const [auditDesc, setAuditDesc] = useState('');
  const [auditWeight, setAuditWeight] = useState(15);

  const openAuditModal = (c?: AuditCriterion) => {
    if (c) {
      setEditingAuditId(c.id);
      setAuditCategory(c.category);
      setAuditTitle(c.title);
      setAuditDesc(c.description);
      setAuditWeight(c.weight);
    } else {
      setEditingAuditId(null);
      setAuditCategory('Vitrina va Merchandising');
      setAuditTitle('');
      setAuditDesc('');
      setAuditWeight(15);
    }
    setShowAuditModal(true);
  };

  const handleSaveAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditTitle.trim()) return;

    if (editingAuditId) {
      updateAuditCriterion(editingAuditId, {
        category: auditCategory,
        title: auditTitle,
        description: auditDesc,
        weight: Number(auditWeight),
      });
    } else {
      addAuditCriterion({
        id: `audit_${Date.now()}`,
        category: auditCategory,
        title: auditTitle,
        description: auditDesc,
        weight: Number(auditWeight),
      });
    }
    setShowAuditModal(false);
  };

  // ---------------- DAILY QUIZ MODAL STATE ----------------
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [editingQuizId, setEditingQuizId] = useState<string | null>(null);
  const [quizQuestion, setQuizQuestion] = useState('');
  const [quizOpt0, setQuizOpt0] = useState('');
  const [quizOpt1, setQuizOpt1] = useState('');
  const [quizOpt2, setQuizOpt2] = useState('');
  const [quizOpt3, setQuizOpt3] = useState('');
  const [quizCorrectIdx, setQuizCorrectIdx] = useState(1);
  const [quizExplanation, setQuizExplanation] = useState('');

  const openQuizModal = (q?: DailyQuizQuestion) => {
    if (q) {
      setEditingQuizId(q.id);
      setQuizQuestion(q.question);
      setQuizOpt0(q.options[0] || '');
      setQuizOpt1(q.options[1] || '');
      setQuizOpt2(q.options[2] || '');
      setQuizOpt3(q.options[3] || '');
      setQuizCorrectIdx(q.correctIndex);
      setQuizExplanation(q.explanation);
    } else {
      setEditingQuizId(null);
      setQuizQuestion('');
      setQuizOpt0('');
      setQuizOpt1('');
      setQuizOpt2('');
      setQuizOpt3('');
      setQuizCorrectIdx(1);
      setQuizExplanation('');
    }
    setShowQuizModal(true);
  };

  const handleSaveQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quizQuestion.trim() || !quizOpt0.trim() || !quizOpt1.trim()) return;

    const options = [quizOpt0, quizOpt1, quizOpt2, quizOpt3].filter((o) => o.trim() !== '');

    if (editingQuizId) {
      updateDailyQuizQuestion(editingQuizId, {
        question: quizQuestion,
        options,
        correctIndex: Number(quizCorrectIdx),
        explanation: quizExplanation,
      });
    } else {
      addDailyQuizQuestion({
        id: `dq_${Date.now()}`,
        question: quizQuestion,
        options,
        correctIndex: Number(quizCorrectIdx),
        explanation: quizExplanation,
      });
    }
    setShowQuizModal(false);
  };

  // ---------------- REWARD ITEM MODAL STATE ----------------
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [editingRewardId, setEditingRewardId] = useState<string | null>(null);
  const [rewardTitle, setRewardTitle] = useState('');
  const [rewardCategory, setRewardCategory] = useState<'merch' | 'voucher' | 'perks' | 'badge'>('merch');
  const [rewardCost, setRewardCost] = useState(200);
  const [rewardImage, setRewardImage] = useState('');
  const [rewardDesc, setRewardDesc] = useState('');
  const [rewardStock, setRewardStock] = useState(10);

  const openRewardModal = (r?: RewardStoreItem) => {
    if (r) {
      setEditingRewardId(r.id);
      setRewardTitle(r.title);
      setRewardCategory(r.category);
      setRewardCost(r.costCoins);
      setRewardImage(r.image);
      setRewardDesc(r.description);
      setRewardStock(r.stock);
    } else {
      setEditingRewardId(null);
      setRewardTitle('');
      setRewardCategory('merch');
      setRewardCost(200);
      setRewardImage('https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=300');
      setRewardDesc('');
      setRewardStock(10);
    }
    setShowRewardModal(true);
  };

  const handleSaveReward = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rewardTitle.trim()) return;

    if (editingRewardId) {
      updateRewardStoreItem(editingRewardId, {
        title: rewardTitle,
        category: rewardCategory,
        costCoins: Number(rewardCost),
        image: rewardImage || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=300',
        description: rewardDesc,
        stock: Number(rewardStock),
      });
    } else {
      addRewardStoreItem({
        id: `reward_${Date.now()}`,
        title: rewardTitle,
        category: rewardCategory,
        costCoins: Number(rewardCost),
        image: rewardImage || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=300',
        description: rewardDesc,
        stock: Number(rewardStock),
      });
    }
    setShowRewardModal(false);
  };

  // ---------------- CUSTOMER PERSONA MODAL STATE ----------------
  const [showPersonaModal, setShowPersonaModal] = useState(false);
  const [editingPersonaId, setEditingPersonaId] = useState<string | null>(null);
  const [personaName, setPersonaName] = useState('');
  const [personaRole, setPersonaRole] = useState('');
  const [personaAvatar, setPersonaAvatar] = useState('');
  const [personaDiff, setPersonaDiff] = useState<'Oson' | "O'rta" | 'Qiyin' | 'Ekspert'>("O'rta");
  const [personaProduct, setPersonaProduct] = useState('');
  const [personaInitialObjection, setPersonaInitialObjection] = useState('');
  const [personaPersonality, setPersonaPersonality] = useState('');

  const openPersonaModal = (p?: CustomerPersona) => {
    if (p) {
      setEditingPersonaId(p.id);
      setPersonaName(p.name);
      setPersonaRole(p.role);
      setPersonaAvatar(p.avatar);
      setPersonaDiff(p.difficulty);
      setPersonaProduct(p.targetProduct);
      setPersonaInitialObjection(p.initialObjection);
      setPersonaPersonality(p.personality);
    } else {
      setEditingPersonaId(null);
      setPersonaName('');
      setPersonaRole('Xaridor');
      setPersonaAvatar('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80');
      setPersonaDiff("O'rta");
      setPersonaProduct('Muzlatgich Samsung NoFrost');
      setPersonaInitialObjection("Narxi boshqa joyda arzonroq ekan, sizlarda qimmat.");
      setPersonaPersonality("Tejamkor va sifatga e'tiborli");
    }
    setShowPersonaModal(true);
  };

  const handleSavePersona = (e: React.FormEvent) => {
    e.preventDefault();
    if (!personaName.trim()) return;

    if (editingPersonaId) {
      updateCustomerPersona(editingPersonaId, {
        name: personaName,
        role: personaRole,
        avatar: personaAvatar,
        difficulty: personaDiff,
        targetProduct: personaProduct,
        initialObjection: personaInitialObjection,
        personality: personaPersonality,
      });
    } else {
      addCustomerPersona({
        id: `persona_${Date.now()}`,
        name: personaName,
        role: personaRole,
        avatar: personaAvatar,
        difficulty: personaDiff,
        targetProduct: personaProduct,
        initialObjection: personaInitialObjection,
        personality: personaPersonality,
        dialogueRounds: [
          {
            roundNumber: 1,
            customerSpeech: personaInitialObjection,
            suggestedHints: ["Mijozga do'kon rasmiy kafolati va servis xizmatini tushuntiring"],
            sampleBestAnswer: "Hurmatli mijoz, bizda 3 yillik to'liq rasmiy kafolat va bepul yetkazib berish xizmati mavjud.",
            options: [
              {
                id: 'opt_1',
                text: "To'g'ri aytasiz, lekin bizda 3 yillik rasmiy kafolat va original servis ta'minlanadi.",
                score: 100,
                feedback: "Ajoyib javob! Sifat va rasmiy kafolat afzalligini ko'rsatdingiz.",
                customerReaction: "Ha, rasmiy servis va bepul yetkazib berish juda muhim omil.",
              },
              {
                id: 'opt_2',
                text: "Yo'q, u yerdagilar kontrabanda sotadi, ulardan olmang.",
                score: 30,
                feedback: "Raqobatchini yomonlash professional sotuvchiga to'g'ri kelmaydi.",
                customerReaction: "Balki, lekin ular ham kafolat beramiz deyishgan edi.",
              },
            ],
          },
        ],
      });
    }
    setShowPersonaModal(false);
  };

  // ---------------- PDP MILESTONE MODAL STATE ----------------
  const [showPdpModal, setShowPdpModal] = useState(false);
  const [editingPdpId, setEditingPdpId] = useState<string | null>(null);
  const [pdpTitle, setPdpTitle] = useState('');
  const [pdpCat, setPdpCat] = useState('E\'tirozlar');
  const [pdpDuration, setPdpDuration] = useState('15 daqiqa');
  const [pdpTips, setPdpTips] = useState('');
  const [pdpActionTab, setPdpActionTab] = useState('sales_sim');

  const openPdpModal = (m?: PDPMilestone) => {
    if (m) {
      setEditingPdpId(m.id);
      setPdpTitle(m.title);
      setPdpCat(m.category);
      setPdpDuration(m.duration);
      setPdpTips(m.tips);
      setPdpActionTab(m.actionTab || 'sales_sim');
    } else {
      setEditingPdpId(null);
      setPdpTitle('');
      setPdpCat('Texnika Bilimi');
      setPdpDuration('15 daqiqa');
      setPdpTips('Texnik xususiyatlarni taqqoslash va amaliyot');
      setPdpActionTab('cheat_sheet');
    }
    setShowPdpModal(true);
  };

  const handleSavePdp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pdpTitle.trim()) return;

    if (editingPdpId) {
      updatePDPMilestone(editingPdpId, {
        title: pdpTitle,
        category: pdpCat,
        duration: pdpDuration,
        tips: pdpTips,
        actionTab: pdpActionTab,
      });
    } else {
      addPDPMilestone({
        id: `pdp_m_${Date.now()}`,
        title: pdpTitle,
        category: pdpCat,
        duration: pdpDuration,
        isCompleted: false,
        tips: pdpTips,
        actionTab: pdpActionTab,
      });
    }
    setShowPdpModal(false);
  };

  // ---------------- ONBOARDING DAY PLAN MODAL STATE ----------------
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [editingDayNum, setEditingDayNum] = useState<number | null>(null);
  const [onbDayNumber, setOnbDayNumber] = useState(1);
  const [onbTitle, setOnbTitle] = useState('');
  const [onbStage, setOnbStage] = useState<'madaniyat' | 'texnika' | 'savdo_mijoz' | 'imtihon'>('madaniyat');
  const [onbDesc, setOnbDesc] = useState('');
  const [onbTaskTitle1, setOnbTaskTitle1] = useState('');
  const [onbTaskTitle2, setOnbTaskTitle2] = useState('');

  const openOnboardingModal = (d?: OnboardingDayPlan) => {
    if (d) {
      setEditingDayNum(d.dayNumber);
      setOnbDayNumber(d.dayNumber);
      setOnbTitle(d.title);
      setOnbStage(d.stage);
      setOnbDesc(d.description);
      setOnbTaskTitle1(d.tasks[0]?.title || '');
      setOnbTaskTitle2(d.tasks[1]?.title || '');
    } else {
      setEditingDayNum(null);
      const nextNum = onboardingDays.length > 0 ? Math.max(...onboardingDays.map((d) => d.dayNumber)) + 1 : 1;
      setOnbDayNumber(nextNum);
      setOnbTitle(`${nextNum}-Kun: Stajirovka Standartlari`);
      setOnbStage('madaniyat');
      setOnbDesc("Do'kon ichki tartib-qoidalari va amaliyot.");
      setOnbTaskTitle1("Xodim ichki qoidalari bilan tanishish");
      setOnbTaskTitle2("Murabbiy bilan amaliy suhbat");
    }
    setShowOnboardingModal(true);
  };

  const handleSaveOnboarding = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onbTitle.trim()) return;

    const tasks: OnboardingTask[] = [
      {
        id: `tsk_${Date.now()}_1`,
        title: onbTaskTitle1 || "Amaliy topshiriqni bajarish",
        description: "Murabbiy nazorati ostida amaliy mashg'ulot.",
        durationMinutes: 30,
        isDone: false,
        requiredType: 'practice',
      },
    ];
    if (onbTaskTitle2.trim()) {
      tasks.push({
        id: `tsk_${Date.now()}_2`,
        title: onbTaskTitle2,
        description: "O'zlashtirilgan bilimlarni tekshirish.",
        durationMinutes: 20,
        isDone: false,
        requiredType: 'mentor_check',
      });
    }

    if (editingDayNum !== null) {
      updateOnboardingDay(editingDayNum, {
        title: onbTitle,
        stage: onbStage,
        description: onbDesc,
      });
    } else {
      addOnboardingDay({
        dayNumber: onbDayNumber,
        title: onbTitle,
        stage: onbStage,
        description: onbDesc,
        tasks,
        mentorSigned: false,
      });
    }
    setShowOnboardingModal(false);
  };

  // ---------------- OBJECTION SCRIPT MODAL STATE ----------------
  const [showObjectionModal, setShowObjectionModal] = useState(false);
  const [editingObjectionId, setEditingObjectionId] = useState<string | null>(null);
  const [objObjection, setObjObjection] = useState('');
  const [objCategory, setObjCategory] = useState<'price' | 'warranty' | 'brand' | 'credit' | 'hesitation'>('price');
  const [objDifficulty, setObjDifficulty] = useState<'Oson' | "O'rta" | 'Qiyin'>("O'rta");
  const [objQuickAnswer, setObjQuickAnswer] = useState('');
  const [objScript, setObjScript] = useState('');
  const [objTip, setObjTip] = useState('');
  const [objTags, setObjTags] = useState('');

  const openObjectionModal = (s?: ObjectionScript) => {
    if (s) {
      setEditingObjectionId(s.id);
      setObjObjection(s.customerObjection);
      setObjCategory(s.category);
      setObjDifficulty(s.difficulty);
      setObjQuickAnswer(s.shortQuickAnswer);
      setObjScript(s.detailedScript);
      setObjTip(s.psychologyTip);
      setObjTags(s.tags.join(', '));
    } else {
      setEditingObjectionId(null);
      setObjObjection('');
      setObjCategory('price');
      setObjDifficulty("O'rta");
      setObjQuickAnswer('');
      setObjScript('');
      setObjTip('');
      setObjTags('narx, aksiya, chegirma');
    }
    setShowObjectionModal(true);
  };

  const handleSaveObjection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!objObjection.trim() || !objScript.trim()) return;

    const tagsArray = objTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingObjectionId) {
      updateObjectionScript(editingObjectionId, {
        customerObjection: objObjection,
        category: objCategory,
        difficulty: objDifficulty,
        shortQuickAnswer: objQuickAnswer,
        detailedScript: objScript,
        psychologyTip: objTip,
        tags: tagsArray.length > 0 ? tagsArray : ['savdo', 'mijoz'],
      });
    } else {
      addObjectionScript({
        id: `obj_${Date.now()}`,
        customerObjection: objObjection,
        category: objCategory,
        difficulty: objDifficulty,
        shortQuickAnswer: objQuickAnswer || objObjection,
        detailedScript: objScript,
        psychologyTip: objTip || "Mijoz fikriga qo'shiling va foydani ko'rsating.",
        tags: tagsArray.length > 0 ? tagsArray : ['savdo', 'mijoz'],
      });
    }
    setShowObjectionModal(false);
  };

  // ---------------- PRODUCT MATCHER MODAL STATE ----------------
  const [showMatcherModal, setShowMatcherModal] = useState(false);
  const [editingMatcherId, setEditingMatcherId] = useState<string | null>(null);
  const [pmCategory, setPmCategory] = useState<'tv' | 'fridge' | 'washer' | 'ac' | 'kitchen'>('tv');
  const [pmName, setPmName] = useState('');
  const [pmBrand, setPmBrand] = useState('Samsung');
  const [pmPrice, setPmPrice] = useState(5500000);
  const [pmBudgetTier, setPmBudgetTier] = useState<'budget' | 'mid' | 'premium'>('mid');
  const [pmRoomSize, setPmRoomSize] = useState('20-30 kv.m');
  const [pmFamilySize, setPmFamilySize] = useState('4-5 kishi');
  const [pmKeyFeature, setPmKeyFeature] = useState('');
  const [pmWhy, setPmWhy] = useState('');
  const [pmPitch, setPmPitch] = useState('');
  const [pmImage, setPmImage] = useState('');

  const openMatcherModal = (m?: ProductMatcherItem) => {
    if (m) {
      setEditingMatcherId(m.id);
      setPmCategory(m.category);
      setPmName(m.productName);
      setPmBrand(m.brand);
      setPmPrice(m.price);
      setPmBudgetTier(m.budgetTier);
      setPmRoomSize(m.roomSize || '');
      setPmFamilySize(m.familySize || '');
      setPmKeyFeature(m.keyFeature);
      setPmWhy(m.whyRecommended);
      setPmPitch(m.salesPitch);
      setPmImage(m.imageUrl);
    } else {
      setEditingMatcherId(null);
      setPmCategory('tv');
      setPmName('');
      setPmBrand('Samsung');
      setPmPrice(5500000);
      setPmBudgetTier('mid');
      setPmRoomSize('20-30 kv.m');
      setPmFamilySize('4-5 kishi');
      setPmKeyFeature('4K UltraHD, Smart TV, Tezkor protsessor');
      setPmWhy("O'rta oilalar uchun eng optimal narx-sifat balansi.");
      setPmPitch("Hurmatli mijoz, aynan ushbu model sizning xonangiz maydoni uchun eng tiniq tasvir va uzoq muddatli kafolat beradi.");
      setPmImage('https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&auto=format&fit=crop&q=80');
    }
    setShowMatcherModal(true);
  };

  const handleSaveMatcher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pmName.trim() || !pmPitch.trim()) return;

    if (editingMatcherId) {
      updateProductMatcher(editingMatcherId, {
        category: pmCategory,
        productName: pmName,
        brand: pmBrand,
        price: pmPrice,
        budgetTier: pmBudgetTier,
        roomSize: pmRoomSize,
        familySize: pmFamilySize,
        keyFeature: pmKeyFeature,
        whyRecommended: pmWhy,
        salesPitch: pmPitch,
        imageUrl: pmImage || 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&auto=format&fit=crop&q=80',
      });
    } else {
      addProductMatcher({
        id: `pm_${Date.now()}`,
        category: pmCategory,
        productName: pmName,
        brand: pmBrand,
        price: pmPrice,
        budgetTier: pmBudgetTier,
        roomSize: pmRoomSize,
        familySize: pmFamilySize,
        keyFeature: pmKeyFeature,
        whyRecommended: pmWhy,
        salesPitch: pmPitch,
        imageUrl: pmImage || 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&auto=format&fit=crop&q=80',
      });
    }
    setShowMatcherModal(false);
  };

  // ---------------- SKILL MATRIX / HEATMAP MODAL STATE ----------------
  const [showHeatmapModal, setShowHeatmapModal] = useState(false);
  const [editingHeatmapStoreId, setEditingHeatmapStoreId] = useState<string | null>(null);
  const [hmStoreName, setHmStoreName] = useState('');
  const [hmCity, setHmCity] = useState('Toshkent');
  const [hmManagerName, setHmManagerName] = useState('');
  const [hmEmployeeCount, setHmEmployeeCount] = useState(10);
  const [hmTechKnowledge, setHmTechKnowledge] = useState(85);
  const [hmSalesPsychology, setHmSalesPsychology] = useState(80);
  const [hmServiceAndWarranty, setHmServiceAndWarranty] = useState(85);
  const [hmCashAndStandards, setHmCashAndStandards] = useState(90);
  const [hmCreditAndNasiya, setHmCreditAndNasiya] = useState(75);
  const [hmCriticalGaps, setHmCriticalGaps] = useState('');
  const [hmRecommendedCourseId, setHmRecommendedCourseId] = useState('crs_1');

  const openHeatmapModal = (branch?: SkillHeatmapBranch) => {
    if (branch) {
      setEditingHeatmapStoreId(branch.storeId);
      setHmStoreName(branch.storeName);
      setHmCity(branch.city);
      setHmManagerName(branch.managerName);
      setHmEmployeeCount(branch.employeeCount);
      setHmTechKnowledge(branch.skills.techKnowledge);
      setHmSalesPsychology(branch.skills.salesPsychology);
      setHmServiceAndWarranty(branch.skills.serviceAndWarranty);
      setHmCashAndStandards(branch.skills.cashAndStandards);
      setHmCreditAndNasiya(branch.skills.creditAndNasiya);
      setHmCriticalGaps(branch.criticalGaps.join(', '));
      setHmRecommendedCourseId(branch.recommendedCourseId || 'crs_1');
    } else {
      setEditingHeatmapStoreId(null);
      setHmStoreName('');
      setHmCity('Toshkent');
      setHmManagerName('Aziz Rahimov');
      setHmEmployeeCount(12);
      setHmTechKnowledge(85);
      setHmSalesPsychology(80);
      setHmServiceAndWarranty(85);
      setHmCashAndStandards(90);
      setHmCreditAndNasiya(75);
      setHmCriticalGaps("Inverter konditsionerlar maydon hisobi, Nasiya shartlari");
      setHmRecommendedCourseId('crs_1');
    }
    setShowHeatmapModal(true);
  };

  const handleSaveHeatmap = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hmStoreName.trim()) return;

    const gapsArray = hmCriticalGaps
      .split(',')
      .map((g) => g.trim())
      .filter(Boolean);

    const overall = Math.round(
      (hmTechKnowledge + hmSalesPsychology + hmServiceAndWarranty + hmCashAndStandards + hmCreditAndNasiya) / 5
    );

    const branchData: SkillHeatmapBranch = {
      storeId: editingHeatmapStoreId || `store_hm_${Date.now()}`,
      storeName: hmStoreName,
      city: hmCity,
      managerName: hmManagerName || "Do'kon Boshqaruvchisi",
      employeeCount: Number(hmEmployeeCount) || 8,
      skills: {
        techKnowledge: Number(hmTechKnowledge),
        salesPsychology: Number(hmSalesPsychology),
        serviceAndWarranty: Number(hmServiceAndWarranty),
        cashAndStandards: Number(hmCashAndStandards),
        creditAndNasiya: Number(hmCreditAndNasiya),
        overallScore: overall,
      },
      criticalGaps: gapsArray.length > 0 ? gapsArray : ['Umumiy malaka oshirish'],
      recommendedCourseId: hmRecommendedCourseId,
      lastAssessmentDate: new Date().toISOString().split('T')[0],
    };

    if (editingHeatmapStoreId) {
      updateSkillHeatmap(editingHeatmapStoreId, branchData);
    } else {
      addSkillHeatmap(branchData);
    }
    setShowHeatmapModal(false);
  };

  // ---------------- STORE COMPETITIONS MODAL STATE ----------------
  const [showCompetitionModal, setShowCompetitionModal] = useState(false);
  const [editingCompetitionId, setEditingCompetitionId] = useState<string | null>(null);
  const [cmpTitle, setCmpTitle] = useState('');
  const [cmpDescription, setCmpDescription] = useState('');
  const [cmpCategory, setCmpCategory] = useState('Mavsumiy Savdo');
  const [cmpStartDate, setCmpStartDate] = useState('');
  const [cmpEndDate, setCmpEndDate] = useState('');
  const [cmpPrizePool, setCmpPrizePool] = useState('25,000,000 so\'m');
  const [cmpBonusCoins, setCmpBonusCoins] = useState(5000);
  const [cmpBannerImage, setCmpBannerImage] = useState('https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=80');
  const [cmpTargetMetric, setCmpTargetMetric] = useState("O'quv kursi o'zlashtirish 90%+ va savdo tushumi");
  const [cmpStatus, setCmpStatus] = useState<'active' | 'upcoming' | 'finished'>('active');

  const openCompetitionModal = (comp?: StoreCompetitionChallenge) => {
    if (comp) {
      setEditingCompetitionId(comp.id);
      setCmpTitle(comp.title);
      setCmpDescription(comp.description);
      setCmpCategory(comp.category);
      setCmpStartDate(comp.startDate);
      setCmpEndDate(comp.endDate);
      setCmpPrizePool(comp.prizePool);
      setCmpBonusCoins(comp.bonusCoins);
      setCmpBannerImage(comp.bannerImage);
      setCmpTargetMetric(comp.targetMetric);
      setCmpStatus(comp.status);
    } else {
      setEditingCompetitionId(null);
      setCmpTitle('');
      setCmpDescription("Eng yuqori o'quv testi o'zlashtirishi va premium texnika savdosi bo'yicha do'konlar bellashuvi.");
      setCmpCategory('Mavsumiy Savdo');
      setCmpStartDate(new Date().toISOString().split('T')[0]);
      setCmpEndDate(new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]);
      setCmpPrizePool('25,000,000 so\'m');
      setCmpBonusCoins(5000);
      setCmpBannerImage('https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=80');
      setCmpTargetMetric("O'quv testi 90%+ va savdo rejasi");
      setCmpStatus('active');
    }
    setShowCompetitionModal(true);
  };

  const handleSaveCompetition = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cmpTitle.trim()) return;

    if (editingCompetitionId) {
      updateStoreCompetition(editingCompetitionId, {
        title: cmpTitle,
        description: cmpDescription,
        category: cmpCategory,
        startDate: cmpStartDate,
        endDate: cmpEndDate,
        prizePool: cmpPrizePool,
        bonusCoins: Number(cmpBonusCoins),
        bannerImage: cmpBannerImage,
        targetMetric: cmpTargetMetric,
        status: cmpStatus,
      });
    } else {
      const initialTop = [
        {
          rank: 1,
          storeId: 'store_1',
          storeName: 'Chilonzor Flagman Filiali',
          score: 96,
          salesVolumeUzs: 485000000,
          badge: "🥇 1-O'rin",
        },
        {
          rank: 2,
          storeId: 'store_3',
          storeName: 'Samarqand Registon Filiali',
          score: 92,
          salesVolumeUzs: 420000000,
          badge: "🥈 2-O'rin",
        },
      ];

      addStoreCompetition({
        id: `comp_${Date.now()}`,
        title: cmpTitle,
        description: cmpDescription,
        category: cmpCategory,
        startDate: cmpStartDate,
        endDate: cmpEndDate,
        prizePool: cmpPrizePool,
        bonusCoins: Number(cmpBonusCoins),
        bannerImage: cmpBannerImage,
        targetMetric: cmpTargetMetric,
        status: cmpStatus,
        topBranches: initialTop,
      });
    }
    setShowCompetitionModal(false);
  };

  // ---------------- ROI ANALYTICS MODAL STATE ----------------
  const [showRoiModal, setShowRoiModal] = useState(false);
  const [editingRoiStoreName, setEditingRoiStoreName] = useState<string | null>(null);
  const [roiStoreName, setRoiStoreName] = useState('');
  const [roiCity, setRoiCity] = useState('Toshkent');
  const [roiTrainingRate, setRoiTrainingRate] = useState(90);
  const [roiRevenueGrowth, setRoiRevenueGrowth] = useState(25);
  const [roiCsat, setRoiCsat] = useState(4.8);
  const [roiComplaintsReduced, setRoiComplaintsReduced] = useState(40);
  const [roiPerfStatus, setRoiPerfStatus] = useState<'high_performer' | 'growing' | 'needs_attention'>('high_performer');

  const openRoiModal = (item?: RoiCorrelationData) => {
    if (item) {
      setEditingRoiStoreName(item.storeName);
      setRoiStoreName(item.storeName);
      setRoiCity(item.city);
      setRoiTrainingRate(item.trainingCompletionRate);
      setRoiRevenueGrowth(item.salesRevenueGrowthPercent);
      setRoiCsat(item.customerSatisfactionScore);
      setRoiComplaintsReduced(item.complaintsReducedPercent);
      setRoiPerfStatus(item.status);
    } else {
      setEditingRoiStoreName(null);
      setRoiStoreName('Chilonzor Flagman Filiali');
      setRoiCity('Toshkent');
      setRoiTrainingRate(92);
      setRoiRevenueGrowth(28);
      setRoiCsat(4.8);
      setRoiComplaintsReduced(45);
      setRoiPerfStatus('high_performer');
    }
    setShowRoiModal(true);
  };

  const handleSaveRoi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roiStoreName.trim()) return;

    updateRoiData(editingRoiStoreName || roiStoreName, {
      storeName: roiStoreName,
      city: roiCity,
      trainingCompletionRate: Number(roiTrainingRate),
      salesRevenueGrowthPercent: Number(roiRevenueGrowth),
      customerSatisfactionScore: Number(roiCsat),
      complaintsReducedPercent: Number(roiComplaintsReduced),
      status: roiPerfStatus,
    });
    setShowRoiModal(false);
  };

  return (
    <div className="space-y-5 animate-fadeIn pb-12 w-full min-w-0">
      {/* Main Admin Header Card */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 rounded-2xl p-5 sm:p-6 text-white border border-slate-800 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="p-2 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 backdrop-blur-md">
                <Settings className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-rose-300">
                Markaziy Admin Boshqaruv Paneli
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Tizimdagi Har Bir Bo'lim, Profil va Yangilikni Boshqarish
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Barcha yangiliklarni tahrirlash, yangi filial va bo'limlar yaratish, xodimlar profillarini yangilash va ta'lim kurslarini boshqarish.
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 px-3.5 py-2.5 rounded-xl text-xs text-slate-300 flex items-center gap-2.5 shrink-0">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div className="font-bold text-white text-xs">{currentUser.name}</div>
              <div className="text-[10px] text-emerald-400 font-bold uppercase">Tizim Ma'muri (Admin)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs & Global Search */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
        {/* Top Category Filter & Global Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'Barcha Bo\'limlar', count: 17 },
              { id: 'org', label: '🏢 Tashkiliy & Xodimlar', count: 4 },
              { id: 'learning', label: '🎓 Ta\'lim & O\'quv', count: 5 },
              { id: 'sales', label: '⚡ Savdo & Showroom', count: 5 },
              { id: 'analytics', label: '📊 Filiallar & Analitika', count: 3 },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedMenuCategory(cat.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  selectedMenuCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100/90 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-black ${
                  selectedMenuCategory === cat.id ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-600'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Bo'lim ichidan izlash..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Sub-Tabs Grid / Flex */}
        <div className="flex flex-wrap items-center gap-2 w-full">
          {[
            // Group 1: Org & Staff
            { id: 'news', label: 'Yangiliklar', cat: 'org', count: newsList.length, icon: Newspaper, color: 'text-emerald-600', iconBg: 'bg-emerald-50 text-emerald-600' },
            { id: 'users', label: 'Xodimlar Profillari', cat: 'org', count: users.length, icon: Users, color: 'text-purple-600', iconBg: 'bg-purple-50 text-purple-600' },
            { id: 'stores', label: 'Filial va Bo\'limlar', cat: 'org', count: stores.length, icon: Building2, color: 'text-blue-600', iconBg: 'bg-blue-50 text-blue-600' },
            { id: 'spotlights', label: 'Faxrli Xodimlar', cat: 'org', count: spotlights.length, icon: Award, color: 'text-amber-600', iconBg: 'bg-amber-50 text-amber-600' },

            // Group 2: Learning & Training
            { id: 'courses', label: 'Ta\'lim Kurslari', cat: 'learning', count: courses.length, icon: BookOpen, color: 'text-indigo-600', iconBg: 'bg-indigo-50 text-indigo-600' },
            { id: 'onboarding_plans', label: '14-Kun Onboarding', cat: 'learning', count: onboardingDays.length, icon: FileCheck, color: 'text-teal-600', iconBg: 'bg-teal-50 text-teal-600' },
            { id: 'pdp_milestones', label: 'Smart PDP Maqsadlar', cat: 'learning', count: pdpMilestones.length, icon: Compass, color: 'text-indigo-600', iconBg: 'bg-indigo-50 text-indigo-600' },
            { id: 'daily_quiz', label: 'Kunlik Viktorina', cat: 'learning', count: dailyQuizQuestions.length, icon: HelpCircle, color: 'text-amber-600', iconBg: 'bg-amber-50 text-amber-600' },
            { id: 'coins_market', label: 'Sovg\'alar Do\'koni', cat: 'learning', count: rewardStoreItems.length, icon: Coins, color: 'text-amber-600', iconBg: 'bg-amber-50 text-amber-600' },

            // Group 3: Sales & Smart Tools
            { id: 'appliance_specs', label: 'Texnika Taqqoslagich', cat: 'sales', count: applianceSpecs.length, icon: Tv, color: 'text-indigo-600', iconBg: 'bg-indigo-50 text-indigo-600' },
            { id: 'ai_personas', label: 'AI Mijoz Personalar', cat: 'sales', count: customerPersonas.length, icon: Sparkles, color: 'text-emerald-600', iconBg: 'bg-emerald-50 text-emerald-600' },
            { id: 'objection_scripts', label: 'E\'tirozlar Skript Bazasi', cat: 'sales', count: objectionScripts.length, icon: MessageSquareQuote, color: 'text-rose-600', iconBg: 'bg-rose-50 text-rose-600' },
            { id: 'product_matchers', label: 'Smart Texnika Tanlash', cat: 'sales', count: productMatchers.length, icon: SlidersHorizontal, color: 'text-cyan-600', iconBg: 'bg-cyan-50 text-cyan-600' },
            { id: 'store_audit', label: 'Do\'kon Auditi', cat: 'sales', count: auditCriteria.length, icon: ClipboardCheck, color: 'text-emerald-600', iconBg: 'bg-emerald-50 text-emerald-600' },

            // Group 4: Analytics & Competitions
            { id: 'skill_matrix', label: 'Skill Matrix & Heatmap', cat: 'analytics', count: skillHeatmaps.length, icon: BrainCircuit, color: 'text-purple-600', iconBg: 'bg-purple-50 text-purple-600' },
            { id: 'store_competitions', label: 'Filiallar Bellashuvi', cat: 'analytics', count: storeCompetitions.length, icon: Trophy, color: 'text-amber-600', iconBg: 'bg-amber-50 text-amber-600' },
            { id: 'roi_correlation', label: 'ROI & Samara Metrikalari', cat: 'analytics', count: roiData.length, icon: BarChart3, color: 'text-emerald-600', iconBg: 'bg-emerald-50 text-emerald-600' },
          ]
            .filter((tab) => selectedMenuCategory === 'all' || tab.cat === selectedMenuCategory)
            .map((tab) => {
              const Icon = tab.icon;
              const isActive = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveSubTab(tab.id as any);
                    setSearchQuery('');
                  }}
                  className={`group px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 border ${
                    isActive
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900/10'
                      : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-white hover:border-slate-300 hover:text-slate-950 hover:shadow-sm'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg transition-colors ${
                    isActive ? 'bg-slate-800 text-white' : tab.iconBg
                  }`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span>{tab.label}</span>
                  <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-black ${
                    isActive ? 'bg-slate-800 text-slate-300' : 'bg-slate-200/80 text-slate-600 group-hover:bg-slate-200'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
        </div>
      </div>

      {/* ==================== SUBTAB 1: NEWS MANAGER ==================== */}
      {activeSubTab === 'news' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 gap-3">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">Yangilik va E'lonlar Boshqaruvi</h3>
              <p className="text-xs text-slate-600">Bosh sahifadagi barcha e'lon, yangiliklar va ularning kategoriyalarini boshqarish.</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setShowCategoryModal(true)}
                className="px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl flex items-center gap-2 shadow-sm transition-all"
              >
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Kategoriyalar ({newsCategories.length})</span>
              </button>
              <button
                onClick={() => openNewsModal()}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-2 shadow-md transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Yangi Yangilik Qoshish</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredNews.map((article) => (
              <div
                key={article.id}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-emerald-300 transition-all"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shrink-0 ring-1 ring-slate-200"
                  />
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-extrabold text-emerald-700 uppercase bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-lg">
                        {article.category}
                      </span>
                      {article.isImportant && (
                        <span className="text-[10px] font-extrabold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-lg">
                          Muhim E'lon
                        </span>
                      )}
                      <span className="text-[10px] text-slate-400">{article.date}</span>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      {article.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {article.content}
                    </p>
                    <div className="text-[11px] text-slate-400 pt-1">Muallif: {article.author}</div>
                  </div>
                </div>

                {/* Edit & Delete Action Buttons */}
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => openNewsModal(article)}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all border border-slate-200"
                    title="Batafsil tahrirlash"
                  >
                    <Edit className="w-3.5 h-3.5 text-blue-600" />
                    <span>Tahrirlash</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`"${article.title}" yangiligini o'chirishni tasdiqlaysizmi?`)) {
                        deleteNews(article.id);
                      }
                    }}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors border border-transparent hover:border-rose-200"
                    title="O'chirish"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {filteredNews.length === 0 && (
              <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 text-xs">
                Ushbu So'rov Bo'yicha Yangiliklar Topilmadi.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== SUBTAB 2: USERS PROFILES MANAGER ==================== */}
      {activeSubTab === 'users' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-purple-50/70 p-4 rounded-2xl border border-purple-200">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">Xodimlar Profillarini Boshqarish</h3>
              <p className="text-xs text-slate-600">Har bir xodimning rolik, lavozim, biriktirilgan filial, telefon hamda ballarini tahrirlash.</p>
            </div>
            <button
              onClick={() => openUserModal()}
              className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-2 shadow-md transition-all shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Yangi Xodim Qo'shish</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-900 font-extrabold uppercase text-[10px]">
                  <tr>
                    <th className="p-4">Xodim / F.I.Sh</th>
                    <th className="p-4">Lavozim & Rol</th>
                    <th className="p-4">Bo'lim & Filial</th>
                    <th className="p-4">Ballar & Zanjir</th>
                    <th className="p-4">Aloqa</th>
                    <th className="p-4 text-right">Boshqaruv</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={u.avatar}
                            alt={u.name}
                            className="w-10 h-10 rounded-2xl object-cover ring-2 ring-slate-100 shadow-sm shrink-0"
                          />
                          <div>
                            <div className="font-extrabold text-slate-900 text-xs">{u.name}</div>
                            <div className="text-[11px] text-slate-400 font-medium">{u.email}</div>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="font-extrabold text-slate-800">{u.position}</div>
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase inline-block mt-0.5 ${
                            u.role === 'admin'
                              ? 'bg-rose-100 text-rose-800'
                              : u.role === 'manager'
                              ? 'bg-blue-100 text-blue-800'
                              : u.role === 'trainer'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {u.role === 'admin'
                            ? 'Admin'
                            : u.role === 'manager'
                            ? 'Menejer'
                            : u.role === 'trainer'
                            ? 'Trener'
                            : 'Xodim'}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="font-semibold text-slate-800">{u.storeName}</div>
                        <div className="text-[10px] text-slate-400">{u.department || 'Chakana Savdo'}</div>
                      </td>

                      <td className="p-4">
                        <div className="font-extrabold text-amber-600 flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{u.points} pt</span>
                        </div>
                        <div className="text-[10px] text-emerald-600 font-bold">{u.streakDays} kun ketma-ket</div>
                      </td>

                      <td className="p-4 text-slate-600 font-medium">
                        <div>{u.phone}</div>
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openUserModal(u)}
                            className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs rounded-xl flex items-center gap-1 border border-purple-200 transition-all"
                            title="Profilni tahrirlash"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Tahrirlash</span>
                          </button>

                          {u.id !== currentUser.id && (
                            <button
                              onClick={() => {
                                if (confirm(`"${u.name}" xodimini tizimdan o'chirishni tasdiqlaysizmi?`)) {
                                  deleteUser(u.id);
                                }
                              }}
                              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors border border-transparent hover:border-rose-200"
                              title="Xodimni o'chirish"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="p-12 text-center text-slate-400 text-xs">
                Ushbu Qidiruv Bo'yicha Xodimlar Topilmadi.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== SUBTAB 3: STORES / SECTIONS MANAGER ==================== */}
      {activeSubTab === 'stores' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-blue-50/70 p-4 rounded-2xl border border-blue-200">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">Do'kon Filiallari va Bo'limlar Boshqaruvi</h3>
              <p className="text-xs text-slate-600">Yangi do'kon filiallarini yaratish, menejer biriktirish va manzillarini o'zgartirish.</p>
            </div>
            <button
              onClick={() => openStoreModal()}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-2 shadow-md transition-all shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Yangi Filial Qo'shish</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStores.map((st) => (
              <div
                key={st.id}
                className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-3 hover:border-blue-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-lg">
                      {st.city}
                    </span>
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-lg">
                      {st.employeeCount} ta xodim
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-base">{st.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{st.address}</p>

                  <div className="pt-2 border-t border-slate-100 text-xs text-slate-700 space-y-1">
                    <div>Menejer: <strong className="text-slate-900 font-extrabold">{st.managerName}</strong></div>
                    <div>O'rtacha KPI Balli: <strong className="text-emerald-600 font-extrabold">{st.averageScore}%</strong></div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => openStoreModal(st)}
                    className="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl flex items-center gap-1.5 border border-blue-200 transition-all"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Tahrirlash</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`"${st.name}" filialini o'chirishni tasdiqlaysizmi?`)) {
                        deleteStore(st.id);
                      }
                    }}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors border border-transparent hover:border-rose-200"
                    title="Filialni o'chirish"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {filteredStores.length === 0 && (
              <div className="col-span-full p-12 text-center text-slate-400 text-xs bg-white rounded-2xl border border-slate-200">
                Filiallar Topilmadi.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== SUBTAB 4: SPOTLIGHTS MANAGER ==================== */}
      {activeSubTab === 'spotlights' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">Faxrli Xodimlar Yutuqlarini Boshqarish</h3>
              <p className="text-xs text-slate-600">A'lochi xodimlarni e'tirof etish, unvon va mukofot ballarini berish hamda tahrirlash.</p>
            </div>
            <button
              onClick={() => openSpotlightModal()}
              className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-2 shadow-md transition-all shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Yangi Faxrli Xodim E'lon Qilish</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSpotlights.map((spt) => (
              <div
                key={spt.id}
                className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-3 hover:border-amber-300 transition-all"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={spt.employeeAvatar}
                    alt={spt.employeeName}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-amber-400 shadow-md shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-slate-900 text-sm">{spt.employeeName}</h4>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                        +{spt.pointsEarned} pt
                      </span>
                    </div>
                    <p className="text-xs font-extrabold text-amber-600">{spt.title}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{spt.description}</p>
                    <div className="text-[10px] text-slate-400 pt-1">
                      {spt.storeName} • {spt.position} • {spt.date}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => openSpotlightModal(spt)}
                    className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs rounded-xl flex items-center gap-1 border border-amber-200 transition-all"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Tahrirlash</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`"${spt.employeeName}" yutug'ini o'chirishni tasdiqlaysizmi?`)) {
                        deleteSpotlight(spt.id);
                      }
                    }}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors border border-transparent hover:border-rose-200"
                    title="Yutuqni o'chirish"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {filteredSpotlights.length === 0 && (
              <div className="col-span-full p-12 text-center text-slate-400 text-xs bg-white rounded-2xl border border-slate-200">
                Faxrli Xodimlar Topilmadi.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== SUBTAB 5: COURSES MANAGER ==================== */}
      {activeSubTab === 'courses' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-indigo-50/70 p-4 rounded-2xl border border-indigo-200">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">Ta'lim Kurslari Boshqaruvi</h3>
              <p className="text-xs text-slate-600">Xodimlar o'rganishi uchun yangi kurslar nashr etish, o'tish ballari va modullarini tahrirlash.</p>
            </div>
            <button
              onClick={() => openCourseModal()}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-2 shadow-md transition-all shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Yangi Kurs Yaratish</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCourses.map((crs) => (
              <div
                key={crs.id}
                className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-3 hover:border-indigo-300 transition-all"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={crs.coverImage}
                    alt={crs.title}
                    className="w-20 h-20 rounded-2xl object-cover shrink-0 ring-1 ring-slate-200"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                        {crs.category}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        O'tish: {crs.passScorePercentage}%
                      </span>
                    </div>

                    <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">{crs.title}</h4>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{crs.description}</p>
                    <div className="text-[10px] text-slate-400 pt-1">
                      Modullar: {crs.modules.length} ta • Daraja: {crs.level}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => openCourseModal(crs)}
                    className="px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl flex items-center gap-1.5 border border-indigo-200 transition-all"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Tahrirlash</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`"${crs.title}" kursini o'chirishni tasdiqlaysizmi?`)) {
                        deleteCourse(crs.id);
                      }
                    }}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors border border-transparent hover:border-rose-200"
                    title="Kursni o'chirish"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {filteredCourses.length === 0 && (
              <div className="col-span-full p-12 text-center text-slate-400 text-xs bg-white rounded-2xl border border-slate-200">
                Kurslar Topilmadi.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== SUBTAB 6: APPLIANCE SPECS MANAGER ==================== */}
      {activeSubTab === 'appliance_specs' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-indigo-50/70 p-4 rounded-2xl border border-indigo-200 gap-3">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">Texnika Taqqoslagich va E'tirozlar Konstruktori</h3>
              <p className="text-xs text-slate-600">Televizor, muzlatgich, kir yuvish mashinalari modellari va xaridor e'tiroziga javoblarni boshqarish.</p>
            </div>
            <button
              onClick={() => openSpecModal()}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-2 shadow-md transition-all shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Yangi Taqqoslash Qo'shish</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(applianceSpecs || [])
              .filter((s) => {
                const modelAStr = typeof s.modelA === 'object' && s.modelA ? s.modelA.name : String(s.modelA || '');
                const modelBStr = typeof s.modelB === 'object' && s.modelB ? s.modelB.name : String(s.modelB || '');
                const keyDiff = s.keyDifference || '';
                return (
                  modelAStr.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  modelBStr.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  keyDiff.toLowerCase().includes(searchQuery.toLowerCase())
                );
              })
              .map((spec) => {
                const modelAName = typeof spec.modelA === 'object' && spec.modelA ? spec.modelA.name : String(spec.modelA || '');
                const modelBName = typeof spec.modelB === 'object' && spec.modelB ? spec.modelB.name : String(spec.modelB || '');
                return (
                  <div
                    key={spec.id}
                    className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:border-indigo-300 transition-all"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {(spec.category || 'texnika').toUpperCase()} TOIFASI
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openSpecModal(spec)}
                          className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteApplianceSpec(spec.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <span className="text-slate-800">{modelAName}</span>
                      <span className="text-xs font-mono text-rose-500 font-extrabold">VS</span>
                      <span className="text-slate-800">{modelBName}</span>
                    </div>

                    <div className="text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1">
                      <div className="font-bold text-slate-700">Asosiy farqi:</div>
                      <div className="text-slate-600 leading-relaxed">{spec.keyDifference}</div>
                    </div>

                    <div className="text-xs bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/80 space-y-1">
                      <div className="font-bold text-amber-900">Mijoz E'tirozi & Sotuv Argumenti:</div>
                      <div className="text-amber-800 font-medium">"{spec.customerObjection}"</div>
                      <div className="text-emerald-700 font-extrabold pt-1">💡 {spec.salesPitch || spec.bestSalesPitch}</div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* ==================== SUBTAB 8: STORE AUDIT MANAGER ==================== */}
      {activeSubTab === 'store_audit' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 gap-3">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">Do'kon Audit Standardi va Mezonlar Boshqaruvi</h3>
              <p className="text-xs text-slate-600">Inspektor va rahbarlar ishlatadigan audit mezonlari, tavsifi va ball og'irligini (weight) tahrirlash.</p>
            </div>
            <button
              onClick={() => openAuditModal()}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-2 shadow-md transition-all shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Yangi Mezon Qo'shish</span>
            </button>
          </div>

          <div className="space-y-3">
            {auditCriteria
              .filter(
                (c) =>
                  c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  c.category.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((crit, idx) => (
                <div
                  key={crit.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-emerald-300 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                        MEZON #{idx + 1} • {crit.category}
                      </span>
                      <span className="text-xs font-black text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded">
                        Maksimal: {crit.weight} Ball
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900">{crit.title}</h4>
                    <p className="text-xs text-slate-500">{crit.description}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => openAuditModal(crit)}
                      className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all flex items-center gap-1"
                    >
                      <Edit className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Tahrirlash</span>
                    </button>
                    <button
                      onClick={() => deleteAuditCriterion(crit.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ==================== SUBTAB 9: DAILY QUIZ MANAGER ==================== */}
      {activeSubTab === 'daily_quiz' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-amber-50/70 p-4 rounded-2xl border border-amber-200 gap-3">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">Kunlik Viktorina Savollari Boshqaruvi</h3>
              <p className="text-xs text-slate-600">Xodimlar har kuni 1 daqiqada ishlaydigan test savollari, javob variantlari va tushuntirishlarni yaratish.</p>
            </div>
            <button
              onClick={() => openQuizModal()}
              className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-2 shadow-md transition-all shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Yangi Savol Qo'shish</span>
            </button>
          </div>

          <div className="space-y-3">
            {dailyQuizQuestions
              .filter(
                (q) =>
                  q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  q.explanation.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((quiz, idx) => (
                <div
                  key={quiz.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:border-amber-300 transition-all"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                      SAVOL #{idx + 1}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openQuizModal(quiz)}
                        className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteDailyQuizQuestion(quiz.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h4 className="font-extrabold text-sm text-slate-900">{quiz.question}</h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {quiz.options.map((opt, optIdx) => (
                      <div
                        key={optIdx}
                        className={`p-2.5 rounded-xl border font-medium ${
                          optIdx === quiz.correctIndex
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-extrabold'
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        {optIdx === quiz.correctIndex ? '✓ ' : ''}
                        {opt}
                      </div>
                    ))}
                  </div>

                  <div className="text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 text-slate-600">
                    <span className="font-bold text-slate-900">Izoh: </span>
                    {quiz.explanation}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ==================== SUBTAB 10: COINS MARKET MANAGER ==================== */}
      {activeSubTab === 'coins_market' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-amber-50/70 p-4 rounded-2xl border border-amber-200 gap-3">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">Coins Sovg'alar Do'koni Boshqaruvi</h3>
              <p className="text-xs text-slate-600">Xodimlar tangalariga sotib oladigan sovg'a va vaucherlar, ularning narxi va zaxirasini (stock) tahrirlash.</p>
            </div>
            <button
              onClick={() => openRewardModal()}
              className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-2 shadow-md transition-all shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Yangi Sovg'a Qo'shish</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rewardStoreItems
              .filter((r) => r.title.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((reward) => (
                <div
                  key={reward.id}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between hover:border-amber-300 transition-all"
                >
                  <div className="space-y-2">
                    <div className="relative h-36 rounded-xl overflow-hidden bg-slate-100">
                      <img src={reward.image} alt={reward.title} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 bg-slate-900/90 text-amber-400 text-xs font-mono font-black px-2.5 py-1 rounded-full border border-slate-700">
                        {reward.costCoins} Coins
                      </div>
                    </div>

                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-sm text-slate-900 leading-snug">{reward.title}</h4>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => openRewardModal(reward)}
                          className="p-1 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteRewardStoreItem(reward.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed">{reward.description}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Ombordagi zaxira:</span>
                    <span className="font-black text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-lg">
                      {reward.stock} dona
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ==================== SUBTAB 11: AI CUSTOMER PERSONAS ==================== */}
      {activeSubTab === 'ai_personas' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 gap-3">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">AI Sotuv Trenajyori: Mijoz Personalar Boshqaruvi</h3>
              <p className="text-xs text-slate-600">Simulyatordagi xaridor personajlari, ularning e'tirozlari va javob mezonlarini sozlash.</p>
            </div>
            <button
              onClick={() => openPersonaModal()}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-md shrink-0 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Yangi Persona Qo'shish</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {customerPersonas
              .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.targetProduct.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((persona) => (
                <div
                  key={persona.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between hover:border-emerald-300 transition-all"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img src={persona.avatar} alt={persona.name} className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">{persona.name}</h4>
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            {persona.difficulty}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openPersonaModal(persona)}
                          className="p-1 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteCustomerPersona(persona.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs">
                      <div className="text-slate-500 font-medium">Mahsulot: <span className="text-slate-900 font-bold">{persona.targetProduct}</span></div>
                      <div className="text-slate-500 font-medium">Xarakter: <span className="text-slate-700">{persona.personality}</span></div>
                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] text-slate-700 italic">
                        "{persona.initialObjection}"
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Dialog bosqichlari:</span>
                    <span className="font-bold text-slate-900">{persona.dialogueRounds.length} ta raund</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ==================== SUBTAB 12: SMART PDP MILESTONES ==================== */}
      {activeSubTab === 'pdp_milestones' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-indigo-50/70 p-4 rounded-2xl border border-indigo-200 gap-3">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">AI Smart PDP (Individual Xarita) Maqsadlari</h3>
              <p className="text-xs text-slate-600">Xodimlarning individual rivojlanish rejasi va haftalik amaliy topshiriqlari.</p>
            </div>
            <button
              onClick={() => openPdpModal()}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-md shrink-0 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Yangi PDP Maqsad</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pdpMilestones
              .filter((m) => m.title.toLowerCase().includes(searchQuery.toLowerCase()) || m.category.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((milestone) => (
                <div
                  key={milestone.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between hover:border-indigo-300 transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {milestone.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openPdpModal(milestone)}
                          className="p-1 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deletePDPMilestone(milestone.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900">{milestone.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{milestone.tips}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>Muddati: <strong className="text-slate-800">{milestone.duration}</strong></span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] font-mono font-bold text-slate-700">
                      {milestone.actionTab || 'standart'}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ==================== SUBTAB 13: ONBOARDING PLANS ==================== */}
      {activeSubTab === 'onboarding_plans' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-teal-50/70 p-4 rounded-2xl border border-teal-200 gap-3">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">14-Kunlik Onboarding & Stajirovka Dasturi</h3>
              <p className="text-xs text-slate-600">Yangi ishga qabul qilingan xodimlarning 14 kunlik tizimli amaliyot va imtihon kunlari.</p>
            </div>
            <button
              onClick={() => openOnboardingModal()}
              className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-md shrink-0 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Yangi Kun Rejasi</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {onboardingDays
              .filter((d) => d.title.toLowerCase().includes(searchQuery.toLowerCase()) || d.description.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((day) => (
                <div
                  key={day.dayNumber}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between hover:border-teal-300 transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-900">
                        {day.dayNumber}-KUN ({day.stage})
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openOnboardingModal(day)}
                          className="p-1 text-slate-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteOnboardingDay(day.dayNumber)}
                          className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900">{day.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{day.description}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>Vazifalar soni:</span>
                    <span className="font-extrabold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-md">
                      {day.tasks.length} ta amal
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ==================== SUBTAB 14: OBJECTION SCRIPTS DATABASE ==================== */}
      {activeSubTab === 'objection_scripts' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-rose-50/70 p-4 rounded-2xl border border-rose-200 gap-3">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <MessageSquareQuote className="w-4 h-4 text-rose-600" />
                <span>Mijoz E'tirozlari va Muzokara Skriptlari Bazasi</span>
              </h3>
              <p className="text-xs text-slate-600">Sotuvchilar uchun mijozlarning eng ko'p beradigan e'tirozlari (narx, sifat, kafolat, ikkilanish) va ularga 100% professional javoblar.</p>
            </div>
            <button
              onClick={() => openObjectionModal()}
              className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-md shrink-0 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Yangi E'tiroz Skripti</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {objectionScripts
              .filter(
                (s) =>
                  s.customerObjection.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  s.shortQuickAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  s.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
              )
              .map((script) => (
                <div
                  key={script.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between hover:border-rose-300 transition-all"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                          {script.category === 'price'
                            ? 'Narx / Qimmat'
                            : script.category === 'warranty'
                            ? 'Kafolat / Servis'
                            : script.category === 'brand'
                            ? 'Brend Shubhasi'
                            : script.category === 'credit'
                            ? "Nasiya / Bo'lib to'lash"
                            : 'Ikkilanish'}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {script.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openObjectionModal(script)}
                          className="p-1 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteObjectionScript(script.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Mijoz E'tirozi:</span>
                      <h4 className="font-extrabold text-sm text-slate-900">"{script.customerObjection}"</h4>
                    </div>

                    <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100 space-y-1">
                      <span className="text-[10px] font-bold text-emerald-800 uppercase">3-Soniya Tezkor Javob:</span>
                      <p className="text-xs text-emerald-950 font-medium leading-relaxed">{script.shortQuickAnswer}</p>
                    </div>

                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">To'liq Muzokara Skripti:</span>
                      <p className="text-xs text-slate-700 leading-relaxed">{script.detailedScript}</p>
                    </div>

                    {script.psychologyTip && (
                      <div className="p-2 bg-amber-50/70 rounded-lg border border-amber-100 text-[11px] text-amber-900">
                        💡 <strong>Psixologik sir:</strong> {script.psychologyTip}
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center gap-1 flex-wrap">
                    {script.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ==================== SUBTAB 15: SMART PRODUCT MATCHER ==================== */}
      {activeSubTab === 'product_matchers' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-cyan-50/70 p-4 rounded-2xl border border-cyan-200 gap-3">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-cyan-600" />
                <span>Smart Texnika Tanlash Yordamchisi Tavsiyalar Bazasi</span>
              </h3>
              <p className="text-xs text-slate-600">Sotuvchilar mijoz parametrlari (xona maydoni, oila a'zolari, byudjet) bo'yicha eng to'g'ri texnika modelini tavsiya qilishlari uchun modellar ro'yxati.</p>
            </div>
            <button
              onClick={() => openMatcherModal()}
              className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-md shrink-0 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Yangi Texnika Modeli</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {productMatchers
              .filter(
                (m) =>
                  m.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  m.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  m.keyFeature.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  m.salesPitch.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:border-cyan-300 transition-all"
                >
                  <div>
                    <div className="h-40 bg-slate-900 relative">
                      <img src={item.imageUrl} alt={item.productName} className="w-full h-full object-cover opacity-90" />
                      <div className="absolute top-2 left-2 flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-slate-950/80 text-white backdrop-blur-sm">
                          {item.category.toUpperCase()}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-cyan-500 text-slate-950 font-bold">
                          {item.budgetTier}
                        </span>
                      </div>
                      <div className="absolute top-2 right-2 flex items-center gap-1 bg-slate-950/80 p-1 rounded-lg backdrop-blur-sm">
                        <button
                          onClick={() => openMatcherModal(item)}
                          className="p-1 text-slate-200 hover:text-cyan-400 rounded transition-all"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteProductMatcher(item.id)}
                          className="p-1 text-slate-200 hover:text-rose-400 rounded transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="p-4 space-y-2.5">
                      <div>
                        <div className="text-[11px] font-extrabold text-cyan-600 uppercase">{item.brand}</div>
                        <h4 className="font-extrabold text-sm text-slate-900">{item.productName}</h4>
                        <div className="text-sm font-extrabold text-emerald-600 mt-0.5">
                          {item.price.toLocaleString('uz-UZ')} so'm
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                        {item.roomSize && (
                          <div className="p-1.5 bg-slate-50 rounded-lg border border-slate-200/70 text-slate-600">
                            🏢 Xona: <strong>{item.roomSize}</strong>
                          </div>
                        )}
                        {item.familySize && (
                          <div className="p-1.5 bg-slate-50 rounded-lg border border-slate-200/70 text-slate-600">
                            👨‍👩‍👧 Oila: <strong>{item.familySize}</strong>
                          </div>
                        )}
                      </div>

                      <div className="text-xs text-slate-600">
                        ⚡ <strong>Afzalligi:</strong> {item.keyFeature}
                      </div>

                      <div className="p-2.5 bg-cyan-50/70 rounded-xl border border-cyan-100 space-y-1">
                        <span className="text-[10px] font-bold text-cyan-900 uppercase">Mijozga Tayyor Sotuv Argumenti:</span>
                        <p className="text-xs text-cyan-950 font-medium leading-relaxed italic">"{item.salesPitch}"</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500">
                    💡 Tavsiya sababi: {item.whyRecommended}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ==================== SUBTAB 16: SKILL MATRIX & HEATMAP MANAGER ==================== */}
      {activeSubTab === 'skill_matrix' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-purple-50/70 p-4 rounded-2xl border border-purple-200 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-purple-600" />
                <h3 className="font-extrabold text-slate-900 text-sm">Filiallar Kompetensiya Matritsasi va Heatmap Boshqaruvi</h3>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Har bir filialning 5 ta asosiy savdo yo'nalishi bo'yicha ko'rsatkichlari, kamchiliklar tahlili va avtomatik remedial kurslar.
              </p>
            </div>
            <button
              onClick={() => openHeatmapModal()}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-sm shrink-0 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Yangi Filial Heatmap Qo'shish</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skillHeatmaps
              .filter(
                (hm) =>
                  hm.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  hm.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  hm.criticalGaps.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase()))
              )
              .map((branch) => {
                const getScoreColor = (score: number) => {
                  if (score >= 80) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
                  if (score >= 65) return 'text-amber-600 bg-amber-50 border-amber-200';
                  return 'text-rose-600 bg-rose-50 border-rose-200';
                };

                return (
                  <div
                    key={branch.storeId}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4 hover:border-purple-300 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-base text-slate-900">{branch.storeName}</h4>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-600">
                            {branch.city}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          Menejer: {branch.managerName} ({branch.employeeCount} xodim) • {branch.lastAssessmentDate}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className={`px-2.5 py-1 rounded-xl text-xs font-black border ${getScoreColor(branch.skills.overallScore)}`}>
                          KPI: {branch.skills.overallScore}%
                        </div>
                        <button
                          onClick={() => openHeatmapModal(branch)}
                          className="p-1.5 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
                          title="Tahrirlash"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`"${branch.storeName}" heatmap ma'lumotlarini o'chirishni tasdiqlaysizmi?`)) {
                              deleteSkillHeatmap(branch.storeId);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                          title="O'chirish"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Skill progress bars */}
                    <div className="space-y-2 text-xs">
                      <div>
                        <div className="flex justify-between font-bold text-slate-700 mb-1 text-[11px]">
                          <span>📺 Texnika Bilimi</span>
                          <span className="text-slate-900">{branch.skills.techKnowledge}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-indigo-500 rounded-full transition-all"
                            style={{ width: `${branch.skills.techKnowledge}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between font-bold text-slate-700 mb-1 text-[11px]">
                          <span>🗣️ Savdo Psixologiyasi</span>
                          <span className="text-slate-900">{branch.skills.salesPsychology}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-rose-500 rounded-full transition-all"
                            style={{ width: `${branch.skills.salesPsychology}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between font-bold text-slate-700 mb-1 text-[11px]">
                          <span>💳 Nasiya & Muddatli To'lov</span>
                          <span className="text-slate-900">{branch.skills.creditAndNasiya}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full transition-all"
                            style={{ width: `${branch.skills.creditAndNasiya}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between font-bold text-slate-700 mb-1 text-[11px]">
                          <span>🤝 Servis & Kafolat</span>
                          <span className="text-slate-900">{branch.skills.serviceAndWarranty}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full transition-all"
                            style={{ width: `${branch.skills.serviceAndWarranty}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between font-bold text-slate-700 mb-1 text-[11px]">
                          <span>🎯 Kassa & Standartlar</span>
                          <span className="text-slate-900">{branch.skills.cashAndStandards}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-amber-500 rounded-full transition-all"
                            style={{ width: `${branch.skills.cashAndStandards}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Identified Gaps */}
                    <div className="pt-2 border-t border-slate-100 space-y-1.5">
                      <div className="text-[10px] font-extrabold uppercase text-slate-400">Aniqlangan Kamchiliklar:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {branch.criticalGaps.map((gap, gIdx) => (
                          <span
                            key={gIdx}
                            className="px-2 py-0.5 bg-rose-50 text-rose-700 border border-rose-200/80 rounded-md text-[10px] font-bold"
                          >
                            ⚠️ {gap}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Remedial action button */}
                    <button
                      onClick={() =>
                        autoAssignRemedialCourse(
                          branch.storeId,
                          branch.criticalGaps[0] || 'Kredit va Nasiya',
                          branch.recommendedCourseId || 'crs_1'
                        )
                      }
                      className="w-full py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Filial Xodimlariga Qayta O'qitish Kursini Biriktirish</span>
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* ==================== SUBTAB 17: STORE COMPETITIONS MANAGER ==================== */}
      {activeSubTab === 'store_competitions' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-amber-50/70 p-4 rounded-2xl border border-amber-200 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-600" />
                <h3 className="font-extrabold text-slate-900 text-sm">Filiallararo Bellashuvlar va Ligalar (Gamification) Boshqaruvi</h3>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Do'konlar o'rtasida sotuv o'sishi, mukofot jamg'armalari va jonli reyting ligalarini tashkil qilish.
              </p>
            </div>
            <button
              onClick={() => openCompetitionModal()}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-sm shrink-0 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Yangi Musobaqa Yaratish</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {storeCompetitions
              .filter(
                (comp) =>
                  comp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  comp.targetMetric.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((comp) => (
                <div
                  key={comp.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4 hover:border-amber-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${
                              comp.status === 'active'
                                ? 'bg-emerald-100 text-emerald-800'
                                : comp.status === 'upcoming'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {comp.status === 'active' ? '● Faol Musobaqa' : comp.status === 'upcoming' ? 'Kutilmoqda' : 'Yakunlangan'}
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                            {comp.category}
                          </span>
                        </div>
                        <h4 className="font-extrabold text-base text-slate-900 mt-1">{comp.title}</h4>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openCompetitionModal(comp)}
                          className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"
                          title="Tahrirlash"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`"${comp.title}" musobaqasini o'chirishni tasdiqlaysizmi?`)) {
                              deleteStoreCompetition(comp.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                          title="O'chirish"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{comp.description}</p>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 bg-amber-50/60 rounded-xl border border-amber-100">
                        <div className="text-[10px] font-bold text-amber-800 uppercase">🏆 Mukofot Jamg'armasi:</div>
                        <div className="font-black text-amber-950 text-sm mt-0.5">{comp.prizePool}</div>
                      </div>
                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="text-[10px] font-bold text-slate-500 uppercase">📅 Muddat:</div>
                        <div className="font-bold text-slate-800 text-xs mt-0.5">
                          {comp.startDate} ~ {comp.endDate}
                        </div>
                      </div>
                    </div>

                    {/* Leaderboard preview */}
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[10px] font-extrabold uppercase text-slate-400">Joriy Reyting (Top Filiallar):</div>
                      <div className="space-y-1">
                        {comp.topBranches.slice(0, 3).map((lead) => (
                          <div
                            key={lead.storeId}
                            className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100 text-xs font-bold"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-xs">{lead.badge}</span>
                              <span className="text-slate-900">{lead.storeName}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-slate-600">{lead.score} ball</span>
                              <span className="text-emerald-600 font-extrabold">
                                {(lead.salesVolumeUzs / 1000000).toFixed(0)}M so'm
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                    <span>🎯 Mezon: <strong>{comp.targetMetric}</strong></span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ==================== SUBTAB 18: ROI & IMPACT ANALYTICS MANAGER ==================== */}
      {activeSubTab === 'roi_correlation' && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-slate-900 text-sm">L&D Ta'lim Samara va ROI (Return On Investment) Boshqaruvi</h3>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Xodimlar ta'limining biznes ko'rsatkichlari, savdo o'sishi, xaridorlar qoniqishi va e'tirozlar qisqarishiga bevosita ta'siri tahlili.
              </p>
            </div>
            <button
              onClick={() => openRoiModal()}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-sm shrink-0 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Yangi Filial ROI Ma'lumotini Qo'shish / Yangilash</span>
            </button>
          </div>

          {/* Aggregate KPI cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold text-slate-500">O'rtacha Ta'lim O'zlashtirish</span>
                <BookOpen className="w-4 h-4 text-indigo-500" />
              </div>
              <div className="text-2xl font-black text-slate-900">
                {Math.round(roiData.reduce((a, b) => a + b.trainingCompletionRate, 0) / (roiData.length || 1))}%
              </div>
              <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> Yuqori intizom
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold text-slate-500">O'rtacha Savdo O'sishi</span>
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-2xl font-black text-emerald-600">
                +{Math.round(roiData.reduce((a, b) => a + b.salesRevenueGrowthPercent, 0) / (roiData.length || 1))}%
              </div>
              <div className="text-[11px] text-slate-500">
                Ta'lim olgan filiallar daromadi
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold text-slate-500">Mijozlar Qoniqishi (CSAT)</span>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-2xl font-black text-slate-900">
                {(roiData.reduce((a, b) => a + b.customerSatisfactionScore, 0) / (roiData.length || 1)).toFixed(1)} <span className="text-xs font-medium text-slate-500">/ 5.0</span>
              </div>
              <div className="text-[11px] text-emerald-600 font-bold">
                Xizmat ko'rsatish standarti
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold text-slate-500">E'tirozlar Qisqarishi</span>
                <ShieldCheck className="w-4 h-4 text-purple-500" />
              </div>
              <div className="text-2xl font-black text-purple-600">
                -{Math.round(roiData.reduce((a, b) => a + b.complaintsReducedPercent, 0) / (roiData.length || 1))}%
              </div>
              <div className="text-[11px] text-slate-500">
                Kassadagi xatoliklar kamayishi
              </div>
            </div>
          </div>

          {/* Detailed Branch ROI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roiData
              .filter(
                (item) =>
                  item.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  item.city.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((item) => (
                <div
                  key={item.storeName}
                  className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3 hover:border-emerald-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-extrabold text-sm text-slate-900">{item.storeName}</h4>
                        </div>
                        <div className="text-[11px] text-slate-500">{item.city} viloyati</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            item.status === 'high_performer'
                              ? 'bg-emerald-100 text-emerald-800'
                              : item.status === 'growing'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {item.status === 'high_performer'
                            ? 'Top Lider'
                            : item.status === 'growing'
                            ? "O'sayotgan"
                            : 'Diqqat Talab'}
                        </span>
                        <button
                          onClick={() => openRoiModal(item)}
                          className="p-1 text-slate-400 hover:text-emerald-600 rounded transition-all"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                      <div className="p-2 bg-slate-50 rounded-xl">
                        <div className="text-[10px] text-slate-500 font-bold">Ta'lim Qamrovi</div>
                        <div className="font-extrabold text-slate-900 text-sm mt-0.5">{item.trainingCompletionRate}%</div>
                      </div>
                      <div className="p-2 bg-emerald-50 rounded-xl">
                        <div className="text-[10px] text-emerald-700 font-bold">Savdo O'sishi</div>
                        <div className="font-extrabold text-emerald-700 text-sm mt-0.5">+{item.salesRevenueGrowthPercent}%</div>
                      </div>
                      <div className="p-2 bg-amber-50 rounded-xl">
                        <div className="text-[10px] text-amber-800 font-bold">CSAT Bahosi</div>
                        <div className="font-extrabold text-amber-900 text-sm mt-0.5">⭐ {item.customerSatisfactionScore}</div>
                      </div>
                      <div className="p-2 bg-purple-50 rounded-xl">
                        <div className="text-[10px] text-purple-700 font-bold">Xatolar Kamayishi</div>
                        <div className="font-extrabold text-purple-800 text-sm mt-0.5">-{item.complaintsReducedPercent}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ==================== MODAL 1: NEWS EDIT / CREATE ==================== */}
      {showNewsModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  {editingNewsId ? "Yangilikni Tahrirlash" : "Yangi Yangilik / E'lon Qo'shish"}
                </h3>
              </div>
              <button
                onClick={() => setShowNewsModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xs p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNews} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Yangilik Sarlavhasi
                </label>
                <input
                  type="text"
                  required
                  placeholder="Diqqat! Muhim korporativ e'lon..."
                  value={newsTitle}
                  onChange={(e) => setNewsTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Batafsil Mazmuni va Matni
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Yangilik va e'lon matnini kiriting..."
                  value={newsContent}
                  onChange={(e) => setNewsContent(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kategoriya
                </label>
                <select
                  value={newsCategory}
                  onChange={(e) => setNewsCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  {newsCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image upload section (Local Device + URL) */}
              <div className="space-y-2 border border-slate-200 bg-slate-50/80 p-3.5 rounded-2xl">
                <label className="block text-xs font-bold text-slate-800">
                  Yangilik Surati (Qurilmangizdan yuklang yoki URL kiriting)
                </label>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <label className="cursor-pointer px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all shrink-0">
                    <Camera className="w-4 h-4" />
                    <span>Qurilmadan Surat Tanlash</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleNewsFileUpload}
                      className="hidden"
                    />
                  </label>

                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="yoki rasm havolasi URL (https://...)"
                      value={newsImg}
                      onChange={(e) => setNewsImg(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                {newsImg && (
                  <div className="relative mt-2 rounded-xl overflow-hidden border border-slate-200 h-32 bg-slate-900 flex items-center justify-center">
                    <img
                      src={newsImg}
                      alt="Yangilik surati albomi"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-slate-950/80 text-white text-[10px] px-2 py-1 rounded-lg font-bold backdrop-blur-sm">
                      Ko'rinish
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 pt-1 bg-rose-50/60 p-3 rounded-xl border border-rose-100">
                <input
                  type="checkbox"
                  id="imp_news"
                  checked={isImportant}
                  onChange={(e) => setIsImportant(e.target.checked)}
                  className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
                />
                <label htmlFor="imp_news" className="text-xs font-bold text-rose-700 cursor-pointer">
                  Bosh Sahifada Muhim E'lon Sifatida Ajratib Ko'rsatilsin
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewsModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200"
                >
                  Bekor Qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  {editingNewsId ? 'Saqlash' : 'Chop Etish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL 1.5: NEWS CATEGORIES MANAGER ==================== */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  Yangiliklar Kategoriyalarini Boshqarish
                </h3>
              </div>
              <button
                onClick={() => setShowCategoryModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xs p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Add New Category */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (newCategoryInput.trim()) {
                  addNewsCategory(newCategoryInput.trim());
                  setNewCategoryInput('');
                }
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                placeholder="Yangi kategoriya nomi..."
                value={newCategoryInput}
                onChange={(e) => setNewCategoryInput(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!newCategoryInput.trim()}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow-sm shrink-0"
              >
                Qo'shish
              </button>
            </form>

            {/* Category List */}
            <div className="space-y-2 max-h-60 overflow-y-auto pt-2">
              <div className="text-xs font-bold text-slate-500 mb-1">Mavjud Kategoriyalar:</div>
              {newsCategories.map((cat) => (
                <div
                  key={cat}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-800 font-medium"
                >
                  <span>{cat}</span>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`"${cat}" kategoriyasini o'chirishni tasdiqlaysizmi?`)) {
                        deleteNewsCategory(cat);
                      }
                    }}
                    className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Kategoriyani o'chirish"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowCategoryModal(false)}
                className="px-5 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MODAL 2: USER PROFILE EDIT / CREATE ==================== */}
      {showUserModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  {editingUserId ? "Xodim Profilini Tahrirlash" : "Yangi Xodim Qo'shish"}
                </h3>
              </div>
              <button
                onClick={() => setShowUserModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xs p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveUser} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Xodim F.I.Sh (Ism Familiya)
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Sardor Aliyev"
                  value={usrName}
                  onChange={(e) => setUsrName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tizimdagi Roli
                  </label>
                  <select
                    value={usrRole}
                    onChange={(e) => setUsrRole(e.target.value as UserRole)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  >
                    <option value="employee">Xodim (Hodim)</option>
                    <option value="manager">Menejer (Filial Rahbari)</option>
                    <option value="trainer">Trener (L&D Boshlig'i)</option>
                    <option value="admin">Admin (Tizim Boshqaruvchisi)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Lavozim Nomi
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Masalan: Sotuvchi Mutaxassis"
                    value={usrPosition}
                    onChange={(e) => setUsrPosition(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Biriktirilgan Do'kon Filiali
                  </label>
                  <select
                    value={usrStore}
                    onChange={(e) => setUsrStore(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  >
                    {stores.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Bo'lim (Department)
                  </label>
                  <input
                    type="text"
                    placeholder="Chakana Savdo"
                    value={usrDepartment}
                    onChange={(e) => setUsrDepartment(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Telefon Raqami
                  </label>
                  <input
                    type="text"
                    required
                    value={usrPhone}
                    onChange={(e) => setUsrPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="xodim@hamkor.uz"
                    value={usrEmail}
                    onChange={(e) => setUsrEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Jamg'argan Ballari (Points)
                  </label>
                  <input
                    type="number"
                    value={usrPoints}
                    onChange={(e) => setUsrPoints(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ketma-ket Faollik (Streak kunlar)
                  </label>
                  <input
                    type="number"
                    value={usrStreakDays}
                    onChange={(e) => setUsrStreakDays(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Avatar Surat URL
                </label>
                <input
                  type="text"
                  value={usrAvatar}
                  onChange={(e) => setUsrAvatar(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Bio / Xodim Haqida Tavsif
                </label>
                <textarea
                  rows={2}
                  placeholder="Xodim haqida qisqacha ma'lumot..."
                  value={usrBio}
                  onChange={(e) => setUsrBio(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowUserModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200"
                >
                  Bekor Qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  {editingUserId ? 'Profilni Saqlash' : "Xodimni Qo'shish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL 3: STORE / SECTION EDIT / CREATE ==================== */}
      {showStoreModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  {editingStoreId ? "Filial / Bo'limni Tahrirlash" : "Yangi Filial Qo'shish"}
                </h3>
              </div>
              <button
                onClick={() => setShowStoreModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xs p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStore} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Filial / Bo'lim Nomi
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Samarqand Filiali"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Shahar
                  </label>
                  <input
                    type="text"
                    required
                    value={storeCity}
                    onChange={(e) => setStoreCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Menejer Nomi
                  </label>
                  <input
                    type="text"
                    placeholder="Menejer ismi..."
                    value={storeManager}
                    onChange={(e) => setStoreManager(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Manzil
                </label>
                <input
                  type="text"
                  required
                  placeholder="To'liq ko'cha va bino manzili..."
                  value={storeAddress}
                  onChange={(e) => setStoreAddress(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Xodimlar Soni
                  </label>
                  <input
                    type="number"
                    value={storeEmployeeCount}
                    onChange={(e) => setStoreEmployeeCount(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    O'rtacha KPI Balli (%)
                  </label>
                  <input
                    type="number"
                    value={storeAverageScore}
                    onChange={(e) => setStoreAverageScore(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowStoreModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200"
                >
                  Bekor Qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  {editingStoreId ? 'Saqlash' : "Filialni Qo'shish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL 4: SPOTLIGHT EDIT / CREATE ==================== */}
      {showSpotlightModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  {editingSptId ? "Faxrli Xodim Yutug'ini Tahrirlash" : "Yangi Faxrli Xodim E'lon Qilish"}
                </h3>
              </div>
              <button
                onClick={() => setShowSpotlightModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xs p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSpotlight} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Xodim F.I.Sh
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Anvar Rahimov"
                  value={sptEmpName}
                  onChange={(e) => setSptEmpName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Yutuq Unvoni / Maqom
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Oyni Eng Yaxshi Sotuvchisi"
                    value={sptTitle}
                    onChange={(e) => setSptTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mukofot Ballari
                  </label>
                  <input
                    type="number"
                    value={sptPoints}
                    onChange={(e) => setSptPoints(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Do'kon Filiali
                  </label>
                  <select
                    value={sptStore}
                    onChange={(e) => setSptStore(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    {stores.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Lavozimi
                  </label>
                  <input
                    type="text"
                    value={sptPosition}
                    onChange={(e) => setSptPosition(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Yutuq Tavsifi va Natijalar
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Sardor ushbu oyda 120% reja bajardi..."
                  value={sptDesc}
                  onChange={(e) => setSptDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowSpotlightModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200"
                >
                  Bekor Qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  {editingSptId ? 'Saqlash' : "E'lon Qilish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL 5: COURSE EDIT / CREATE ==================== */}
      {showCourseModal && (
        <CourseEditorModal
          isOpen={showCourseModal}
          onClose={() => setShowCourseModal(false)}
          initialCourse={editingCourse}
          onSave={handleSaveCourseModal}
          authorName={currentUser.name}
        />
      )}

      {/* ==================== MODAL 6: APPLIANCE SPEC MODAL ==================== */}
      {showSpecModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Tv className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  {editingSpecId ? "Taqqoslashni Tahrirlash" : "Yangi Texnika Taqqoslash Qo'shish"}
                </h3>
              </div>
              <button onClick={() => setShowSpecModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSpec} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kategoriya</label>
                <select
                  value={specCategory}
                  onChange={(e) => setSpecCategory(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="tv">Televizorlar (TV)</option>
                  <option value="fridge">Muzlatgichlar (Fridge)</option>
                  <option value="washer">Kir Yuvish Mashinalari (Washer)</option>
                  <option value="ac">Konditsionerlar (AC)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">1-Model (A)</label>
                  <input
                    type="text"
                    required
                    placeholder="Samsung 55Q60C"
                    value={specModelA}
                    onChange={(e) => setSpecModelA(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">2-Model (B)</label>
                  <input
                    type="text"
                    required
                    placeholder="LG 55NANO77"
                    value={specModelB}
                    onChange={(e) => setSpecModelB(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Asosiy Farqi & Afzalligi</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Samsung QLED yorqinroq, LG NanoCell burchakdan yaxshiroq ko'rsatadi..."
                  value={specKeyDifference}
                  onChange={(e) => setSpecKeyDifference(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tez-Tez Uchraydigan Mijoz E'tirozi</label>
                <input
                  type="text"
                  required
                  placeholder="LG qimmatroq emasmi?"
                  value={specCustomerObjection}
                  onChange={(e) => setSpecCustomerObjection(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Sotuvchi uchun Tayyor Argument (Sales Pitch)</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Xaridorga bunday javob bering: LG NanoCell WebOS va Magic Remote pultiga ega..."
                  value={specSalesPitch}
                  onChange={(e) => setSpecSalesPitch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowSpecModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Bekor Qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL 8: AUDIT CRITERION MODAL ==================== */}
      {showAuditModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  {editingAuditId ? "Audit Mezonini Tahrirlash" : "Yangi Audit Mezon Qo'shish"}
                </h3>
              </div>
              <button onClick={() => setShowAuditModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAudit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Toifa / Kategoriya</label>
                <input
                  type="text"
                  required
                  placeholder="Tsennik va Narxnomalar (Price Tags)"
                  value={auditCategory}
                  onChange={(e) => setAuditCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mezon Savoli / Sarlovha</label>
                <input
                  type="text"
                  required
                  placeholder="Barcha maishiy texnikada rasmiy tsennik joyidami?"
                  value={auditTitle}
                  onChange={(e) => setAuditTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tafsilotlar va Talab</label>
                <textarea
                  rows={2}
                  required
                  placeholder="TV, muzlatgich, kir yuvish mashinasida narxi va oylik nasiya to'lovi bo'lishi shart..."
                  value={auditDesc}
                  onChange={(e) => setAuditDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Maksimal Ball (Weight)</label>
                <input
                  type="number"
                  required
                  value={auditWeight}
                  onChange={(e) => setAuditWeight(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAuditModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Bekor Qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL 9: DAILY QUIZ MODAL ==================== */}
      {showQuizModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  {editingQuizId ? "Viktorina Savolini Tahrirlash" : "Yangi Viktorina Savoli Qo'shish"}
                </h3>
              </div>
              <button onClick={() => setShowQuizModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveQuiz} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Savol Matni</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Samsung QLED va LG NanoCell..."
                  value={quizQuestion}
                  onChange={(e) => setQuizQuestion(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">Javob Variantlari (4 ta)</label>
                <input
                  type="text"
                  required
                  placeholder="1-variant"
                  value={quizOpt0}
                  onChange={(e) => setQuizOpt0(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs text-slate-900"
                />
                <input
                  type="text"
                  required
                  placeholder="2-variant"
                  value={quizOpt1}
                  onChange={(e) => setQuizOpt1(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs text-slate-900"
                />
                <input
                  type="text"
                  placeholder="3-variant"
                  value={quizOpt2}
                  onChange={(e) => setQuizOpt2(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs text-slate-900"
                />
                <input
                  type="text"
                  placeholder="4-variant"
                  value={quizOpt3}
                  onChange={(e) => setQuizOpt3(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">To'g'ri Javob Indeksi (0, 1, 2, 3)</label>
                <select
                  value={quizCorrectIdx}
                  onChange={(e) => setQuizCorrectIdx(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                >
                  <option value={0}>1-Variant To'g'ri</option>
                  <option value={1}>2-Variant To'g'ri</option>
                  <option value={2}>3-Variant To'g'ri</option>
                  <option value={3}>4-Variant To'g'ri</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tushuntirish / Izoh (Tushuntiruvchi metatest)</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Nega aynan ushbu javob to'g'ri ekanligini izohlang..."
                  value={quizExplanation}
                  onChange={(e) => setQuizExplanation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowQuizModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Bekor Qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL 10: REWARD STORE ITEM MODAL ==================== */}
      {showRewardModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  {editingRewardId ? "Sovg'ani Tahrirlash" : "Yangi Sovg'a Qo'shish"}
                </h3>
              </div>
              <button onClick={() => setShowRewardModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveReward} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Sovg'a Nomi</label>
                <input
                  type="text"
                  required
                  placeholder="Brend Polo Futbolka / Termos"
                  value={rewardTitle}
                  onChange={(e) => setRewardTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tanga Narxi (Coins)</label>
                  <input
                    type="number"
                    required
                    value={rewardCost}
                    onChange={(e) => setRewardCost(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mavjud Zaxira (Stock)</label>
                  <input
                    type="number"
                    required
                    value={rewardStock}
                    onChange={(e) => setRewardStock(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Rasm URL Manzili</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={rewardImage}
                  onChange={(e) => setRewardImage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tavsif</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Sovg'a xususiyatlari..."
                  value={rewardDesc}
                  onChange={(e) => setRewardDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowRewardModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Bekor Qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL 11: CUSTOMER PERSONA MODAL ==================== */}
      {showPersonaModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  {editingPersonaId ? "Mijoz Personani Tahrirlash" : "Yangi AI Mijoz Persona Qo'shish"}
                </h3>
              </div>
              <button onClick={() => setShowPersonaModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePersona} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mijoz Ismi</label>
                  <input
                    type="text"
                    required
                    placeholder="Masalan: Dilshod Aka"
                    value={personaName}
                    onChange={(e) => setPersonaName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Qiyinchilik Darajasi</label>
                  <select
                    value={personaDiff}
                    onChange={(e) => setPersonaDiff(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Oson">Oson</option>
                    <option value="O'rta">O'rta</option>
                    <option value="Qiyin">Qiyin</option>
                    <option value="Ekspert">Ekspert</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Qiziqayotgan Mahsuloti</label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Kir yuvish mashinasi LG AI DD"
                  value={personaProduct}
                  onChange={(e) => setPersonaProduct(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Xarakteri & Psixotipi</label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Shoshqaloq, sifatga va kafolatga talabchan"
                  value={personaPersonality}
                  onChange={(e) => setPersonaPersonality(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Dastlabki E'tirozi (Speech)</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Masalan: 'Bozorda bundan ancha arzonini ko'rdim...'"
                  value={personaInitialObjection}
                  onChange={(e) => setPersonaInitialObjection(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Avatar Rasm URL</label>
                <input
                  type="text"
                  value={personaAvatar}
                  onChange={(e) => setPersonaAvatar(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowPersonaModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Bekor Qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL 12: SMART PDP MILESTONE MODAL ==================== */}
      {showPdpModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  {editingPdpId ? "PDP Maqsadni Tahrirlash" : "Yangi PDP Maqsad Qo'shish"}
                </h3>
              </div>
              <button onClick={() => setShowPdpModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePdp} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Vazifa Sarlavhasi</label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: 3 ta Inverter konditsioner taqqoslashini topshirish"
                  value={pdpTitle}
                  onChange={(e) => setPdpTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kategoriya</label>
                  <input
                    type="text"
                    required
                    placeholder="Texnika Bilimi / E'tirozlar"
                    value={pdpCat}
                    onChange={(e) => setPdpCat(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Davomiyligi</label>
                  <input
                    type="text"
                    required
                    placeholder="15 daqiqa"
                    value={pdpDuration}
                    onChange={(e) => setPdpDuration(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Bog'langan Bo'lim (Action Tab ID)</label>
                <select
                  value={pdpActionTab}
                  onChange={(e) => setPdpActionTab(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="sales_sim">AI Sotuv Trenajyori (sales_sim)</option>
                  <option value="cheat_sheet">Texnika Taqqoslagich (cheat_sheet)</option>
                  <option value="academy">O'quv Akademiyasi (academy)</option>
                  <option value="daily_quiz">Kunlik Viktorina (daily_quiz)</option>
                  <option value="store_audit">Do'kon Auditi (store_audit)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ko'rsatma va Tavsiyalar (Tips)</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Xodim uchun tavsiya va amaliyot..."
                  value={pdpTips}
                  onChange={(e) => setPdpTips(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowPdpModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Bekor Qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL 13: ONBOARDING DAY PLAN MODAL ==================== */}
      {showOnboardingModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-teal-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  {editingDayNum !== null ? `${editingDayNum}-Kun Rejasini Tahrirlash` : "Yangi Onboarding Kuni Qo'shish"}
                </h3>
              </div>
              <button onClick={() => setShowOnboardingModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveOnboarding} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kun Tartib Raqami</label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={30}
                    value={onbDayNumber}
                    disabled={editingDayNum !== null}
                    onChange={(e) => setOnbDayNumber(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-teal-500 disabled:opacity-60"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Bosqich (Stage)</label>
                  <select
                    value={onbStage}
                    onChange={(e) => setOnbStage(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="madaniyat">Madaniyat & Qoidalar</option>
                    <option value="texnika">Texnika & Mahsulot</option>
                    <option value="savdo_mijoz">Savdo & Mijoz Psixologiyasi</option>
                    <option value="imtihon">Imtihon & Himoya</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kun Sarlavhasi</label>
                <input
                  type="text"
                  required
                  placeholder="1-Kun: Do'kon Tartib-Qoidalari va Kirish"
                  value={onbTitle}
                  onChange={(e) => setOnbTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kun Tavsifi</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Kunning asosiy maqsadi va vazifalari..."
                  value={onbDesc}
                  onChange={(e) => setOnbDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <label className="block text-[11px] font-bold text-slate-700">Kunlik Birlamchi Vazifalar (Checklist):</label>
                <input
                  type="text"
                  placeholder="1-Vazifa: Ichki qoidalar bilan tanishish"
                  value={onbTaskTitle1}
                  onChange={(e) => setOnbTaskTitle1(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900"
                />
                <input
                  type="text"
                  placeholder="2-Vazifa: Murabbiy bilan suhbatdan o'tish"
                  value={onbTaskTitle2}
                  onChange={(e) => setOnbTaskTitle2(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowOnboardingModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Bekor Qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL 14: OBJECTION SCRIPT MODAL ==================== */}
      {showObjectionModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <MessageSquareQuote className="w-5 h-5 text-rose-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  {editingObjectionId ? "E'tiroz Skriptini Tahrirlash" : "Yangi E'tiroz Skripti Qo'shish"}
                </h3>
              </div>
              <button onClick={() => setShowObjectionModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveObjection} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">E'tiroz Kategoriyasi</label>
                  <select
                    value={objCategory}
                    onChange={(e) => setObjCategory(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-rose-500"
                  >
                    <option value="price">Narx / Qimmatlik</option>
                    <option value="warranty">Kafolat & Servis</option>
                    <option value="brand">Brend Shubhasi</option>
                    <option value="credit">Nasiya & To'lov</option>
                    <option value="hesitation">Ikkilanish & O'ylash</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Qiyinlik Darajasi</label>
                  <select
                    value={objDifficulty}
                    onChange={(e) => setObjDifficulty(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-rose-500"
                  >
                    <option value="Oson">Oson</option>
                    <option value="O'rta">O'rta</option>
                    <option value="Qiyin">Qiyin</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mijoz E'tirozi (Savoli / Gap)</label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: 'Bozorda bundan ancha arzonini ko'rdim...'"
                  value={objObjection}
                  onChange={(e) => setObjObjection(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">3-Soniya Tezkor Javob (Instant Response)</label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: 'To'g'ri, narx muhim omil. Lekin keling, nima sababdan narx farqi borligini ko'rib chiqamiz...'"
                  value={objQuickAnswer}
                  onChange={(e) => setObjQuickAnswer(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">To'liq Muzokara & Yechim Skripti</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Sotuvchi mijozga keltiradigan batafsil dalillar va savollar..."
                  value={objScript}
                  onChange={(e) => setObjScript(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Psixologik Maslahat / Layfxak</label>
                <input
                  type="text"
                  placeholder="Masalan: 'Mijoz bilan bahslashmang, avval uning fikrini tasdiqlang va keyin qiymat bering.'"
                  value={objTip}
                  onChange={(e) => setObjTip(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Teglar (Vergul bilan ajrating)</label>
                <input
                  type="text"
                  placeholder="narx, kafolat, chegirma"
                  value={objTags}
                  onChange={(e) => setObjTags(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowObjectionModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Bekor Qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL 15: PRODUCT MATCHER MODAL ==================== */}
      {showMatcherModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-cyan-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  {editingMatcherId ? "Texnika Modelini Tahrirlash" : "Yangi Texnika Modeli Qo'shish"}
                </h3>
              </div>
              <button onClick={() => setShowMatcherModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMatcher} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kategoriya</label>
                  <select
                    value={pmCategory}
                    onChange={(e) => setPmCategory(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="tv">Televizor</option>
                    <option value="fridge">Muzlatgich</option>
                    <option value="washer">Kir yuvish mashinasi</option>
                    <option value="ac">Konditsioner</option>
                    <option value="kitchen">Oshxona texnikasi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Byudjet Segmenti</label>
                  <select
                    value={pmBudgetTier}
                    onChange={(e) => setPmBudgetTier(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="budget">Byudjet / Hamyonbop</option>
                    <option value="mid">O'rta Segment</option>
                    <option value="premium">Premium / Flagman</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Brend</label>
                  <input
                    type="text"
                    required
                    placeholder="Samsung, Artel, LG, Shivaki..."
                    value={pmBrand}
                    onChange={(e) => setPmBrand(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Narxi (so'mda)</label>
                  <input
                    type="number"
                    required
                    value={pmPrice}
                    onChange={(e) => setPmPrice(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mahsulot To'liq Nomi & Modeli</label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Samsung 55' Crystal UHD 4K Smart TV"
                  value={pmName}
                  onChange={(e) => setPmName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mos Xona Maydoni</label>
                  <input
                    type="text"
                    placeholder="20-30 kv.m / Katta zal"
                    value={pmRoomSize}
                    onChange={(e) => setPmRoomSize(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Oila A'zolari Soni</label>
                  <input
                    type="text"
                    placeholder="4-6 kishi"
                    value={pmFamilySize}
                    onChange={(e) => setPmFamilySize(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Asosiy Texnik Afzalligi</label>
                <input
                  type="text"
                  required
                  placeholder="Inverter motor, No Frost, 10 yil kompressor kafolati"
                  value={pmKeyFeature}
                  onChange={(e) => setPmKeyFeature(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nima Uchun Aynan Shu Model Tavsiya Qilinadi?</label>
                <input
                  type="text"
                  required
                  placeholder="Eng kam elektr sarfi va o'rta oilalar uchun ideal hajm"
                  value={pmWhy}
                  onChange={(e) => setPmWhy(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mijozga Tayyor Sotuv Argumenti (Sales Pitch)</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Hurmatli mijoz, aynan shu model sizning oilangiz uchun..."
                  value={pmPitch}
                  onChange={(e) => setPmPitch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mahsulot Rasmi (URL)</label>
                <input
                  type="text"
                  value={pmImage}
                  onChange={(e) => setPmImage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowMatcherModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Bekor Qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL 16: SKILL HEATMAP MODAL ==================== */}
      {showHeatmapModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-purple-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  {editingHeatmapStoreId ? "Filial Kompetensiyasini Tahrirlash" : "Yangi Filial Heatmap Qo'shish"}
                </h3>
              </div>
              <button onClick={() => setShowHeatmapModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveHeatmap} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Filial Nomi</label>
                  <input
                    type="text"
                    required
                    placeholder="Masalan: Samarqand Filiali"
                    value={hmStoreName}
                    onChange={(e) => setHmStoreName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Shahar / Viloyat</label>
                  <input
                    type="text"
                    required
                    placeholder="Samarqand"
                    value={hmCity}
                    onChange={(e) => setHmCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Menejer Ismi</label>
                  <input
                    type="text"
                    required
                    placeholder="Aziz Rahimov"
                    value={hmManagerName}
                    onChange={(e) => setHmManagerName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Xodimlar Soni</label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    required
                    value={hmEmployeeCount}
                    onChange={(e) => setHmEmployeeCount(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="space-y-2.5 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200">
                <div className="text-xs font-extrabold text-slate-900">5 Asosiy Savdo Kompetensiyalari (0 - 100 ball):</div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-0.5">📺 Texnika Bilimi (%)</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      required
                      value={hmTechKnowledge}
                      onChange={(e) => setHmTechKnowledge(Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs text-slate-900 focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-0.5">🗣️ Savdo Psixologiyasi (%)</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      required
                      value={hmSalesPsychology}
                      onChange={(e) => setHmSalesPsychology(Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs text-slate-900 focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-0.5">🤝 Servis & Kafolat (%)</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      required
                      value={hmServiceAndWarranty}
                      onChange={(e) => setHmServiceAndWarranty(Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs text-slate-900 focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-0.5">🎯 Kassa Standarti (%)</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      required
                      value={hmCashAndStandards}
                      onChange={(e) => setHmCashAndStandards(Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs text-slate-900 focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-0.5">💳 Nasiya & To'lov (%)</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      required
                      value={hmCreditAndNasiya}
                      onChange={(e) => setHmCreditAndNasiya(Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs text-slate-900 focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Aniqlangan Kamchiliklar (Vergul bilan ajrating)</label>
                <input
                  type="text"
                  required
                  placeholder="Inverter konditsionerlar maydon hisobi, Nasiya shartlari"
                  value={hmCriticalGaps}
                  onChange={(e) => setHmCriticalGaps(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Biriktiriladigan Remedial O'quv Kursi</label>
                <select
                  value={hmRecommendedCourseId}
                  onChange={(e) => setHmRecommendedCourseId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-purple-500"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.level})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowHeatmapModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Bekor Qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL 17: STORE COMPETITION MODAL ==================== */}
      {showCompetitionModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  {editingCompetitionId ? "Musobaqani Tahrirlash" : "Yangi Filiallar Musobaqasi Yaratish"}
                </h3>
              </div>
              <button onClick={() => setShowCompetitionModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCompetition} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Musobaqa Sarlavhasi</label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Bahorgi Sotuv Chempionati 2026"
                  value={cmpTitle}
                  onChange={(e) => setCmpTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kategoriya</label>
                  <input
                    type="text"
                    required
                    placeholder="Mavsumiy Savdo"
                    value={cmpCategory}
                    onChange={(e) => setCmpCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mukofot Jamg'armasi</label>
                  <input
                    type="text"
                    required
                    placeholder="25,000,000 so'm"
                    value={cmpPrizePool}
                    onChange={(e) => setCmpPrizePool(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Bonus Tangalar (Coins)</label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={cmpBonusCoins}
                    onChange={(e) => setCmpBonusCoins(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Holati (Status)</label>
                  <select
                    value={cmpStatus}
                    onChange={(e) => setCmpStatus(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="active">Faol Musobaqa</option>
                    <option value="upcoming">Kutilmoqda</option>
                    <option value="finished">Yakunlangan</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Boshlanish Sanasi</label>
                  <input
                    type="date"
                    required
                    value={cmpStartDate}
                    onChange={(e) => setCmpStartDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tugash Sanasi</label>
                  <input
                    type="date"
                    required
                    value={cmpEndDate}
                    onChange={(e) => setCmpEndDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Maqsadli KPI Mezoni</label>
                <input
                  type="text"
                  required
                  placeholder="O'quv kursi o'zlashtirish 90%+ va savdo tushumi"
                  value={cmpTargetMetric}
                  onChange={(e) => setCmpTargetMetric(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Banner Rasm URL</label>
                <input
                  type="url"
                  value={cmpBannerImage}
                  onChange={(e) => setCmpBannerImage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tavsif va Bellashuv Qoidalari</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Filiallar o'rtasida motivatsion bellashuv qoidalari..."
                  value={cmpDescription}
                  onChange={(e) => setCmpDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCompetitionModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Bekor Qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL 18: ROI & IMPACT ANALYTICS MODAL ==================== */}
      {showRoiModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  {editingRoiStoreName ? "Filial ROI Ko'rsatkichini Tahrirlash" : "Yangi Filial ROI Ma'lumotini Qo'shish"}
                </h3>
              </div>
              <button onClick={() => setShowRoiModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRoi} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Filial Nomi</label>
                  <input
                    type="text"
                    required
                    placeholder="Chilonzor Flagman Filiali"
                    value={roiStoreName}
                    onChange={(e) => setRoiStoreName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Shahar</label>
                  <input
                    type="text"
                    required
                    placeholder="Toshkent"
                    value={roiCity}
                    onChange={(e) => setRoiCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Ta'lim Qamrovi (%)</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    required
                    value={roiTrainingRate}
                    onChange={(e) => setRoiTrainingRate(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Savdo Tushumi O'sishi (%)</label>
                  <input
                    type="number"
                    required
                    value={roiRevenueGrowth}
                    onChange={(e) => setRoiRevenueGrowth(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">CSAT Bahosi (1.0 - 5.0)</label>
                  <input
                    type="number"
                    step="0.1"
                    min={1}
                    max={5}
                    required
                    value={roiCsat}
                    onChange={(e) => setRoiCsat(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Xatolik/Shikoyat Kamayishi (%)</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    required
                    value={roiComplaintsReduced}
                    onChange={(e) => setRoiComplaintsReduced(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Samaradorlik Holati</label>
                <select
                  value={roiPerfStatus}
                  onChange={(e) => setRoiPerfStatus(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="high_performer">Top Lider (Yuqori Natija)</option>
                  <option value="growing">O'sayotgan Filial</option>
                  <option value="needs_attention">Diqqat Talab (Zaif)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowRoiModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Bekor Qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
