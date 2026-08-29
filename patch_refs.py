import re

with open('src/context/AppContext.tsx', 'r') as f:
    content = f.read()

# Add useRef to AppContext
import_re = r"import React, \{ useState, useEffect \} from 'react';"
new_import = "import React, { useState, useEffect, useRef } from 'react';"
content = re.sub(import_re, new_import, content)

# Add usersRef
state_decl = r"const \[users, setUsers\] = useState<User\[\]>\(\[\]\);"
new_state_decl = """const [users, setUsers] = useState<User[]>([]);
  const usersRef = useRef<User[]>([]);
  useEffect(() => { usersRef.current = users; }, [users]);"""
content = re.sub(state_decl, new_state_decl, content)

# Fix messages realtime
realtime_sub_code = r"return \[\.\.\.prev, \{\n\s+id: m\.id,\n\s+channelId: m\.channel_id,\n\s+senderId: m\.sender_id,\n\s+senderName: 'New Message',\s+\n\s+senderAvatar: '',\n\s+senderRole: 'employee',\n\s+text: m\.text,\n\s+timestamp: m\.created_at\n\s+\} as ChatMessage\];"

new_realtime_sub = """
          const sender = usersRef.current.find(u => u.id === m.sender_id) || {} as any;
          return [...prev, {
            id: m.id,
            channelId: m.channel_id,
            senderId: m.sender_id,
            senderName: sender.name || 'Foydalanuvchi', 
            senderAvatar: sender.avatar || '',
            senderRole: sender.role || 'employee',
            text: m.text,
            timestamp: m.created_at
          } as ChatMessage];"""
content = re.sub(realtime_sub_code, new_realtime_sub, content)

with open('src/context/AppContext.tsx', 'w') as f:
    f.write(content)
print("Refs Patched")
