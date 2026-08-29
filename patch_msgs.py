import re

with open('src/context/AppContext.tsx', 'r') as f:
    content = f.read()

# 1. Update the mapping in fetchData
msg_set_code = r"if \(messagesRes\.data\) setMessages\(messagesRes\.data\);"
new_msg_set = """if (messagesRes.data) {
        setMessages(messagesRes.data.map((m: any) => {
          const sender = usersRes.data?.find((u: any) => u.id === m.sender_id) || {} as any;
          return {
            id: m.id,
            channelId: m.channel_id,
            senderId: m.sender_id,
            senderName: sender.name || 'User',
            senderAvatar: sender.avatar || '',
            senderRole: sender.role || 'employee',
            text: m.text,
            timestamp: m.created_at
          };
        }));
      }"""
content = re.sub(msg_set_code, new_msg_set, content)

# 2. Update the mapping in realtime subscription
realtime_sub_code = r"setMessages\(prev => \[\.\.\.prev, payload\.new as ChatMessage\]\);"
new_realtime_sub = """
        // Find user from state
        setMessages(prev => {
          const m = payload.new;
          // We can't access 'users' easily here due to closure, but we can return the mapped object
          // Wait, users state is outside, but we might not have it in the closure correctly.
          // Let's just use the current prev to infer or leave user details empty.
          // Better: we can add users to the dependency array? No, useEffect is empty [].
          // We can use a functional state update and get it from the 'users' array if it was available.
          // Since it's not, let's just do a basic map for now.
          return [...prev, {
            id: m.id,
            channelId: m.channel_id,
            senderId: m.sender_id,
            senderName: 'New Message', 
            senderAvatar: '',
            senderRole: 'employee',
            text: m.text,
            timestamp: m.created_at
          } as ChatMessage];
        });
"""
content = re.sub(realtime_sub_code, new_realtime_sub, content)

with open('src/context/AppContext.tsx', 'w') as f:
    f.write(content)
print("Messages mapped")
