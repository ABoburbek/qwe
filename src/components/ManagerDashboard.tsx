import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WorkIssue, AssignedTask } from '../types';
import {
  Users,
  AlertTriangle,
  PlusCircle,
  CheckCircle2,
  Clock,
  Briefcase,
  Award,
  BookOpen,
  Send,
  Building2,
  Search,
  Filter,
  TrendingUp,
} from 'lucide-react';

export const ManagerDashboard: React.FC = () => {
  const {
    currentUser,
    users,
    stores,
    courses,
    progressMap,
    workIssues,
    addWorkIssue,
    updateWorkIssueStatus,
    tasks,
    assignTask,
    updateTaskStatus,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'staff' | 'issues' | 'tasks'>('staff');

  // New Work Issue Form
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [newIssueTitle, setNewIssueTitle] = useState('');
  const [newIssueDesc, setNewIssueDesc] = useState('');
  const [newIssueCategory, setNewIssueCategory] =
    useState<WorkIssue['category']>('Mijozlar Bilan Muloqot');

  // New Task Form
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskUserId, setTaskUserId] = useState('');
  const [taskCourseId, setTaskCourseId] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskDeadline, setTaskDeadline] = useState('');

  // Store Employees list for current manager's store (or all if admin)
  const storeEmployees = users.filter(
    (u) => currentUser.role === 'admin' || u.storeId === currentUser.storeId
  );

  const currentStore =
    stores.find((s) => s.id === currentUser.storeId) || stores[0];

  const currentStoreIssues = workIssues.filter(
    (i) => currentUser.role === 'admin' || i.storeId === currentUser.storeId
  );

  const currentStoreTasks = tasks.filter(
    (t) =>
      currentUser.role === 'admin' ||
      t.assignedByManagerId === currentUser.id ||
      storeEmployees.some((e) => e.id === t.assignedToUserId)
  );

  const handleCreateIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIssueTitle || !newIssueDesc) return;

    const issue: WorkIssue = {
      id: `iss_${Date.now()}`,
      storeId: currentUser.storeId,
      storeName: currentUser.storeName,
      reportedBy: currentUser.name,
      reportedByRole: currentUser.position,
      title: newIssueTitle,
      description: newIssueDesc,
      category: newIssueCategory,
      status: 'Yangi',
      date: new Date().toISOString().split('T')[0],
      assignedManagerId: currentUser.id,
    };

    addWorkIssue(issue);
    setNewIssueTitle('');
    setNewIssueDesc('');
    setShowIssueModal(false);
  };

  const handleAssignTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskUserId || !taskTitle || !taskDeadline) return;

    const targetUser = users.find((u) => u.id === taskUserId);
    if (!targetUser) return;

    const task: AssignedTask = {
      id: `tsk_${Date.now()}`,
      assignedByManagerId: currentUser.id,
      assignedByManagerName: `${currentUser.name} (${currentUser.position})`,
      assignedToUserId: targetUser.id,
      assignedToUserName: targetUser.name,
      courseId: taskCourseId || undefined,
      title: taskTitle,
      description: taskDesc,
      deadline: taskDeadline,
      status: 'Kutilmoqda',
      createdDate: new Date().toISOString().split('T')[0],
    };

    assignTask(task);
    setTaskUserId('');
    setTaskCourseId('');
    setTaskTitle('');
    setTaskDesc('');
    setTaskDeadline('');
    setShowTaskModal(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 text-white border border-slate-800 shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold mb-2">
              <Building2 className="w-3.5 h-3.5" />
              <span>Do'kon Rahbari Paneli</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              {currentStore.name} — Boshqaruv Markazi
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Xodimlarning o'quv yutuqlari, ish jarayonidagi muammolar paneli va topshiriqlar nazorati.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowTaskModal(true)}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Vazifa Berish</span>
            </button>

            <button
              onClick={() => setShowIssueModal(true)}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Muammo Qayd Etish</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('staff')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'staff'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Xodimlar Yutuqlari ({storeEmployees.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('issues')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'issues'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span>Ish Jarayonidagi Muammolar ({currentStoreIssues.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('tasks')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'tasks'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Briefcase className="w-4 h-4 text-emerald-500" />
          <span>Topshiriqlar ({currentStoreTasks.length})</span>
        </button>
      </div>

      {/* TAB 1: Store Employees & Achievements */}
      {activeTab === 'staff' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {storeEmployees.map((emp) => {
              const completedCoursesCount = emp.completedCourseIds?.length || 0;

              return (
                <div
                  key={emp.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 space-y-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={emp.avatar}
                      alt={emp.name}
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-100"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 text-sm truncate">
                        {emp.name}
                      </h3>
                      <p className="text-xs text-emerald-600 font-medium truncate">
                        {emp.position}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{emp.email}</p>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl text-center border border-slate-100">
                    <div>
                      <div className="text-[10px] text-slate-500 font-medium">Ballar</div>
                      <div className="text-xs font-bold text-amber-600">{emp.points}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 font-medium">Kurslar</div>
                      <div className="text-xs font-bold text-emerald-600">
                        {completedCoursesCount} ta
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 font-medium">Zanjir</div>
                      <div className="text-xs font-bold text-slate-800">
                        {emp.streakDays} kun
                      </div>
                    </div>
                  </div>

                  {/* Badges Earned */}
                  {emp.badges && emp.badges.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        Yutuq Nishonlari:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {emp.badges.map((b) => (
                          <span
                            key={b.id}
                            className="text-[10px] bg-amber-50 text-amber-800 font-semibold px-2 py-0.5 rounded-md border border-amber-200"
                            title={b.description}
                          >
                            🏅 {b.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quick Action Button to assign task */}
                  <button
                    onClick={() => {
                      setTaskUserId(emp.id);
                      setShowTaskModal(true);
                    }}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors"
                  >
                    Ushbu Xodimga Vazifa Berish
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: Work Issues (Ish jarayonidagi muammolar) */}
      {activeTab === 'issues' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => setShowIssueModal(true)}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Yangi Muammoni Qayd Etish</span>
            </button>
          </div>

          <div className="space-y-3">
            {currentStoreIssues.map((issue) => (
              <div
                key={issue.id}
                className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-3"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                      {issue.category}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm">{issue.title}</h3>
                  </div>

                  {/* Status Dropdown */}
                  <select
                    value={issue.status}
                    onChange={(e) =>
                      updateWorkIssueStatus(
                        issue.id,
                        e.target.value as WorkIssue['status']
                      )
                    }
                    className="bg-slate-50 border border-slate-200 text-xs font-bold rounded-lg px-3 py-1 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Yangi">🔴 Yangi</option>
                    <option value="Jarayonda">🟡 Jarayonda</option>
                    <option value="Hal Etildi">🟢 Hal Etildi</option>
                  </select>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {issue.description}
                </p>

                {issue.notes && (
                  <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 border border-slate-100">
                    <strong className="text-slate-900">Bajarilgan choralar:</strong> {issue.notes}
                  </div>
                )}

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                  <span>
                    Xabar beruvchi: <strong className="text-slate-700">{issue.reportedBy}</strong> ({issue.reportedByRole})
                  </span>
                  <span>{issue.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Tasks (Vazifalar) */}
      {activeTab === 'tasks' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => setShowTaskModal(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Yangi Topshiriq Biriktirish</span>
            </button>
          </div>

          <div className="space-y-3">
            {currentStoreTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-3"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-slate-900 text-sm">{task.title}</h3>
                    <p className="text-xs text-emerald-600 font-medium">
                      Biriktirilgan: {task.assignedToUserName}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      task.status === 'Bajarildi'
                        ? 'bg-emerald-100 text-emerald-800'
                        : task.status === 'Bajarilmoqda'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {task.status}
                  </span>
                </div>

                <p className="text-xs text-slate-600">{task.description}</p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                  <span>Menejer: {task.assignedByManagerName}</span>
                  <span className="text-rose-600 font-semibold">
                    Muddati: {task.deadline}
                  </span>
                </div>

                {/* Mark complete button */}
                {task.assignedToUserId === currentUser.id && task.status !== 'Bajarildi' && (
                  <button
                    onClick={() => updateTaskStatus(task.id, 'Bajarildi')}
                    className="w-full py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 transition-colors"
                  >
                    Vazifani Bajarildi Deb Belgilash
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL 1: Create Work Issue */}
      {showIssueModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900">
              Ish Jarayonidagi Muammoni Qayd Etish
            </h3>

            <form onSubmit={handleCreateIssue} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kategoriya
                </label>
                <select
                  value={newIssueCategory}
                  onChange={(e) =>
                    setNewIssueCategory(e.target.value as WorkIssue['category'])
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900"
                >
                  <option value="Kassa Tizimi">Kassa Tizimi</option>
                  <option value="Mijozlar Bilan Muloqot">Mijozlar Bilan Muloqot</option>
                  <option value="Mahsulot Boshqaruvi">Mahsulot Boshqaruvi</option>
                  <option value="Boshqa">Boshqa</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Muammo Mavzusi
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Kassa terminalida sekinlashuv"
                  value={newIssueTitle}
                  onChange={(e) => setNewIssueTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tafsilot va Qiyinchilik
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Xodim qanday muammoga duch keldi va nima yordam kerak..."
                  value={newIssueDesc}
                  onChange={(e) => setNewIssueDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowIssueModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Bekor Qilish
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Qayd Etish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Assign Task */}
      {showTaskModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900">
              Xodimga Topshiriq / Vazifa Berish
            </h3>

            <form onSubmit={handleAssignTask} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Xodimni Tanlang
                </label>
                <select
                  required
                  value={taskUserId}
                  onChange={(e) => setTaskUserId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900"
                >
                  <option value="">-- Xodimlardan birini tanlang --</option>
                  {storeEmployees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} ({emp.position})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Biriktiriladigan Kurs (Ixtiyoriy)
                </label>
                <select
                  value={taskCourseId}
                  onChange={(e) => setTaskCourseId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900"
                >
                  <option value="">-- Kurs biriktirilmasin --</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Vazifa Sarlavhasi
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Kassa modulini takroran topshirish"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Topshiriq Mazmuni
                </label>
                <textarea
                  rows={3}
                  placeholder="Vazifa bo'yicha batafsil yo'riqnomani yozing..."
                  value={taskDesc}
                  onChange={(e) => setTaskDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Bajarish Oxirgi Muddati (Deadline)
                </label>
                <input
                  type="date"
                  required
                  value={taskDeadline}
                  onChange={(e) => setTaskDeadline(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowTaskModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Bekor Qilish
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Vazifani Yuborish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
