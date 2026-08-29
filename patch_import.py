import re

with open('src/context/AppContext.tsx', 'r') as f:
    content = f.read()

import_re = r"import React, \{ createContext, useContext, useState, useEffect, useMemo \} from 'react';"
new_import = "import React, { createContext, useContext, useState, useEffect, useMemo, useRef } from 'react';"
content = re.sub(import_re, new_import, content)

with open('src/context/AppContext.tsx', 'w') as f:
    f.write(content)
print("Import Patched")
