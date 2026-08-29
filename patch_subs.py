import re

with open('src/context/AppContext.tsx', 'r') as f:
    content = f.read()

sub_code = r"const messagesSub = supabase.channel\('public:chat_messages'\)"
new_sub_code = """const notifSub = supabase.channel('public:notifications')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications' }, (payload) => {
        setNotifications(prev => {
          // Map snake_case from DB to camelCase for AppNotification
          const n = payload.new;
          const newNotif = {
            id: n.id,
            type: n.type,
            title: n.title,
            message: n.message,
            date: n.created_at,
            urgency: n.urgency,
            isRead: n.is_read,
            userId: n.user_id
          } as any;
          return [newNotif, ...prev];
        });
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'notifications' }, (payload) => {
        setNotifications(prev => prev.map(n => n.id === payload.new.id ? { ...n, isRead: payload.new.is_read } : n));
      })
      .subscribe();

    const messagesSub = supabase.channel('public:chat_messages')"""
content = re.sub(sub_code, new_sub_code, content)

rm_code = r"supabase.removeChannel\(messagesSub\);"
new_rm_code = """supabase.removeChannel(messagesSub);
      supabase.removeChannel(notifSub);"""
content = re.sub(rm_code, new_rm_code, content)

with open('src/context/AppContext.tsx', 'w') as f:
    f.write(content)
print("Subs Patched")
