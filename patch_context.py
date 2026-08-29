import re

with open('src/context/AppContext.tsx', 'r') as f:
    content = f.read()

# 1. Add state for notifications
state_decl = r"const \[toastMessage, setToastMessage\] = useState<string \| null>\(null\);"
new_state_decl = """const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);"""
content = re.sub(state_decl, new_state_decl, content)

# 2. Add notifications to fetchData
fetch_decl = r"messagesRes, mistakesRes, certsRes, progressRes\n      \] = await Promise.all\(\["
new_fetch_decl = """messagesRes, mistakesRes, certsRes, progressRes, notificationsRes
      ] = await Promise.all(["""
content = re.sub(fetch_decl, new_fetch_decl, content)

fetch_queries = r"supabase.from\('progress'\).select\('\*'\)\n      \]\);"
new_fetch_queries = """supabase.from('progress').select('*'),
        supabase.from('notifications').select('*').order('created_at', { ascending: false })
      ]);"""
content = re.sub(fetch_queries, new_fetch_queries, content)

fetch_assign = r"if \(progressRes.data\) {"
new_fetch_assign = """if (notificationsRes && notificationsRes.data) {
        // Map db format to AppNotification
        const mapped = notificationsRes.data.map((n: any) => ({
          id: n.id,
          type: n.type,
          title: n.title,
          message: n.message,
          date: n.created_at,
          urgency: n.urgency,
          isRead: n.is_read,
          userId: n.user_id
        }));
        setNotifications(mapped);
      }
      
      if (progressRes.data) {"""
content = re.sub(fetch_assign, new_fetch_assign, content)


# 3. Change chat_messages subscription to be efficient
old_msg_sub = r"const messagesSub = supabase.channel\('public:chat_messages'\).on\('postgres_changes', \{ event: '\*', schema: 'public', table: 'chat_messages' \}, \(payload\) => \{\n      fetchData\(\); // Simplistic refresh\n    \}\).subscribe\(\);"
new_msg_sub = """const messagesSub = supabase.channel('public:chat_messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages' }, (payload) => {
        setMessages(prev => [...prev, payload.new as ChatMessage]);
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'chat_messages' }, (payload) => {
        setMessages(prev => prev.map(msg => msg.id === payload.new.id ? payload.new as ChatMessage : msg));
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'chat_messages' }, (payload) => {
        setMessages(prev => prev.filter(msg => msg.id !== payload.old.id));
      })
      .subscribe();"""
content = re.sub(old_msg_sub, new_msg_sub, content)


# 4. Remove dummy notifications and create real functions + computed property
dummy_notif = r"const notifications: AppNotification\[\] = \[\];\n  const unreadNotificationsCount = 0;\n  const markNotificationAsRead = \(i: string\) => \{\};\n  const markNotificationAsUnread = \(i: string\) => \{\};\n  const markAllNotificationsAsRead = \(\) => \{\};"

new_real_notif = """const unreadNotificationsCount = notifications.filter(n => !n.isRead && n.userId === currentUser?.id).length;
  const markNotificationAsRead = async (i: string) => {
    setNotifications(prev => prev.map(n => n.id === i ? { ...n, isRead: true } : n));
    await supabase.from('notifications').update({ is_read: true }).eq('id', i);
  };
  const markNotificationAsUnread = async (i: string) => {
    setNotifications(prev => prev.map(n => n.id === i ? { ...n, isRead: false } : n));
    await supabase.from('notifications').update({ is_read: false }).eq('id', i);
  };
  const markAllNotificationsAsRead = async () => {
    if (!currentUser) return;
    setNotifications(prev => prev.map(n => n.userId === currentUser.id ? { ...n, isRead: true } : n));
    await supabase.from('notifications').update({ is_read: true }).eq('user_id', currentUser.id);
  };"""
content = re.sub(dummy_notif, new_real_notif, content)


# 5. Fix chat message insertion (content -> text)
# old: await supabase.from('chat_messages').insert({ content: text, channel_id: activeChannelId, sender_id: currentUser.id });
chat_insert = r"await supabase.from\('chat_messages'\).insert\(\{ content: text, channel_id: activeChannelId, sender_id: currentUser.id \}\);"
new_chat_insert = "await supabase.from('chat_messages').insert({ text: text, channel_id: activeChannelId, sender_id: currentUser.id });"
content = re.sub(chat_insert, new_chat_insert, content)


with open('src/context/AppContext.tsx', 'w') as f:
    f.write(content)
print("Context Patched")
