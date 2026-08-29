const fs = require('fs');

let content = fs.readFileSync('src/context/AppContext.tsx', 'utf-8');

// The issue is that the AppContext is trying to read currentUser properties but Supabase returns an object that doesn't match our TypeScript User interface perfectly if we don't map it.
// Let's ensure the user object has default values for properties like points, avatar, etc., so the UI doesn't crash.

content = content.replace(`if (data) setCurrentUser(data as User);`, `if (data) {
          const userObj = data as any;
          setCurrentUser({
            ...userObj,
            points: userObj.points || 0,
            level: userObj.level || 1,
            avatar: userObj.avatar_url || 'https://ui-avatars.com/api/?name=' + (userObj.name || 'U'),
            badges: userObj.badges || [],
          } as User);
        }`);
        
content = content.replace(`const { data } = await supabase.from('users').select('*').limit(1).single();
        if (data) setCurrentUser(data as User);`, `const { data } = await supabase.from('users').select('*').limit(1).single();
        if (data) {
          const userObj = data as any;
          setCurrentUser({
            ...userObj,
            points: userObj.points || 0,
            level: userObj.level || 1,
            avatar: userObj.avatar_url || 'https://ui-avatars.com/api/?name=' + (userObj.name || 'U'),
            badges: userObj.badges || [],
          } as User);
        }`);

fs.writeFileSync('src/context/AppContext.tsx', content, 'utf-8');
console.log('Fixed AppContext to map user data correctly.');
