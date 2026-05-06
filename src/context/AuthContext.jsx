import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('azhariya_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('azhariya_user', JSON.stringify(user));
      
      // Update/Add student in the mock database
      const studentsStr = localStorage.getItem('azhariya_students_db');
      let students = studentsStr ? JSON.parse(studentsStr) : [];
      
      const existingIndex = students.findIndex(s => s.email === user.email);
      if (existingIndex > -1) {
        students[existingIndex] = { ...students[existingIndex], name: user.name, lastLogin: new Date().toISOString() };
      } else if (user.email !== 'admin@azhariya.com') { // Don't add admin to students list
        students.push({
          id: Date.now(),
          name: user.name,
          email: user.email,
          joinedAt: user.joinedAt || new Date().toISOString(),
          progress: 0
        });
      }
      localStorage.setItem('azhariya_students_db', JSON.stringify(students));
    } else {
      localStorage.removeItem('azhariya_user');
    }
  }, [user]);

  const login = (name, email) => {
    setUser({ name, email, joinedAt: new Date().toISOString() });
  };

  const register = (name, email) => {
    setUser({ name, email, joinedAt: new Date().toISOString() });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('azhariya_progress');
    localStorage.removeItem('azhariya_wallet');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
