import { useState, useEffect } from "react";

const [darkMode, setDarkMode] = useState(false);

useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}, [darkMode]);

// Then in your component:
<button onClick={() => setDarkMode(!darkMode)}>
  {darkMode ? 'Light Mode' : 'Dark Mode'}
</button>