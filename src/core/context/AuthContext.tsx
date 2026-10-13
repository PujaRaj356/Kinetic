import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../models/user.model';
import { PendingVerification } from '../models/auth.model';
import { getApiBase } from '../services/apiConfig';

interface AuthContextType {
  currentUser: User | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  isClient: boolean;
  users: User[];
  pendingVerification: PendingVerification | null;
  setPendingVerification: React.Dispatch<React.SetStateAction<PendingVerification | null>>;
  login: (email: string, password: string, rememberMe?: boolean) => { ok: boolean; message?: string; user?: User };
  loginAs: (role: UserRole) => void;
  register: (name: string, email: string, password: string, role?: UserRole) => { ok: boolean; message?: string; user?: User };
  verify: (code: string) => Promise<{ ok: boolean; message?: string }>;
  resendCode: () => Promise<{ ok: boolean; message?: string; devOtp?: string; sent?: boolean; devMode?: boolean }>;
  sendOtp: (email: string) => Promise<{ ok: boolean; message?: string; devOtp?: string; sent?: boolean; devMode?: boolean }>;
  logout: () => void;
  updateUserRole: (userId: string, newRole: UserRole) => void;
  deleteUser: (userId: string) => void;
  updateProfile: (updates: Partial<User>) => void;
}

const USERS_KEY = 'kinetic-users';
const CURRENT_KEY = 'kinetic-current-user';

const defaultUsers: User[] = [
  {
    id: 'usr-admin-1',
    name: 'Kinetic Administrator',
    email: 'admin@kinetic.com',
    password: 'Admin@123',
    role: 'admin'
  },
  {
    id: 'usr-client-1',
    name: 'Alex Shopper',
    email: 'client@kinetic.com',
    password: 'Client@123',
    role: 'client'
  }
];

function loadUsers(): User[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) {
      localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
      return defaultUsers;
    }
    const parsed = JSON.parse(raw) as User[];
    // Ensure all existing stored users have a valid role
    let modified = false;
    const normalized = parsed.map(u => {
      if (!u.role) {
        modified = true;
        return { ...u, role: (u.email.toLowerCase().includes('admin') ? 'admin' : 'client') as UserRole };
      }
      return u;
    });
    // Ensure admin user exists
    if (!normalized.some(u => u.role === 'admin')) {
      normalized.unshift(defaultUsers[0]);
      modified = true;
    }
    if (modified) {
      localStorage.setItem(USERS_KEY, JSON.stringify(normalized));
    }
    return normalized;
  } catch {
    return defaultUsers;
  }
}

function loadCurrentUser(): User | null {
  try {
    const raw = localStorage.getItem(CURRENT_KEY);
    if (!raw) return null;
    const user = JSON.parse(raw) as User;
    if (!user.role) {
      user.role = user.email.toLowerCase().includes('admin') ? 'admin' : 'client';
    }
    return user;
  } catch {
    return null;
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(loadCurrentUser);
  const [users, setUsers] = useState<User[]>(loadUsers);
  const [pendingVerification, setPendingVerification] = useState<PendingVerification | null>(null);

  useEffect(() => {
    // Keep users state synced
    const currentUsers = loadUsers();
    setUsers(currentUsers);
  }, []);

  const isLoggedIn = !!currentUser;
  const isAdmin = currentUser?.role === 'admin';
  const isClient = currentUser?.role === 'client';

  const API_BASE = getApiBase();

  const notifyLogin = async (email: string, name?: string) => {
    try {
      await fetch(`${API_BASE}/api/auth/notify-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), name: name || 'Shopper' })
      });
    } catch {
      // Non-blocking background notification
    }
  };

  const login = (
    email: string,
    password: string,
    rememberMe = true
  ): { ok: boolean; message?: string; user?: User } => {
    const allUsers = loadUsers();
    const user = allUsers.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!user || user.password !== password) {
      return { ok: false, message: 'Invalid email or password.' };
    }

    // Persist login immediately so user is remembered across page refreshes and browser restarts
    if (rememberMe) {
      localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
    } else {
      sessionStorage.setItem(CURRENT_KEY, JSON.stringify(user));
    }
    setCurrentUser(user);
    notifyLogin(user.email, user.name);
    return { ok: true, user };
  };

  const loginAs = (role: UserRole) => {
    const allUsers = loadUsers();
    const target = allUsers.find(u => u.role === role) || (role === 'admin' ? defaultUsers[0] : defaultUsers[1]);
    localStorage.setItem(CURRENT_KEY, JSON.stringify(target));
    setCurrentUser(target);
  };

  const register = (
    name: string,
    email: string,
    password: string,
    role: UserRole = 'client'
  ): { ok: boolean; message?: string; user?: User } => {
    const allUsers = loadUsers();
    if (allUsers.some(u => u.email.toLowerCase() === email.trim().toLowerCase())) {
      return { ok: false, message: 'An account with this email already exists.' };
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      role
    };

    const updated = [...allUsers, newUser];
    localStorage.setItem(USERS_KEY, JSON.stringify(updated));
    setUsers(updated);

    // Auto-login registered user and remember them
    localStorage.setItem(CURRENT_KEY, JSON.stringify(newUser));
    setCurrentUser(newUser);
    notifyLogin(newUser.email, newUser.name);

    return { ok: true, user: newUser };
  };

  const sendOtp = async (
    email: string
  ): Promise<{ ok: boolean; message?: string; devOtp?: string; sent?: boolean; devMode?: boolean }> => {
    try {
      const resp = await fetch(`${API_BASE}/api/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() })
      });
      const data = await resp.json();
      return data;
    } catch (err: any) {
      return { ok: false, message: 'Could not connect to authentication server: ' + err.message };
    }
  };

  const resendCode = async (): Promise<{
    ok: boolean;
    message?: string;
    devOtp?: string;
    sent?: boolean;
    devMode?: boolean;
  }> => {
    if (!pendingVerification?.email) {
      return { ok: false, message: 'No target email specified for verification.' };
    }
    return await sendOtp(pendingVerification.email);
  };

  const verify = async (code: string): Promise<{ ok: boolean; message?: string }> => {
    if (!pendingVerification) {
      return { ok: false, message: 'No verification in progress.' };
    }

    try {
      const resp = await fetch(`${API_BASE}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: pendingVerification.email, code: code.trim() })
      });
      const data = await resp.json();
      if (!resp.ok || !data.ok) {
        return { ok: false, message: data.message || 'Incorrect verification code.' };
      }

      // Successful verification
      const allUsers = loadUsers();
      const user = allUsers.find(u => u.email.toLowerCase() === pendingVerification.email.toLowerCase());
      if (user) {
        localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
        setCurrentUser(user);
        notifyLogin(user.email, user.name);
      }
      setPendingVerification(null);
      return { ok: true, message: data.message };
    } catch (err: any) {
      return { ok: false, message: 'Could not reach server: ' + err.message };
    }
  };

  const logout = () => {
    localStorage.removeItem(CURRENT_KEY);
    sessionStorage.removeItem(CURRENT_KEY);
    setCurrentUser(null);
  };

  const updateUserRole = (userId: string, newRole: UserRole) => {
    const allUsers = loadUsers();
    const updated = allUsers.map(u => (u.id === userId ? { ...u, role: newRole } : u));
    localStorage.setItem(USERS_KEY, JSON.stringify(updated));
    setUsers(updated);

    // If updating current user's role, update state
    if (currentUser && currentUser.id === userId) {
      const updatedUser = { ...currentUser, role: newRole };
      localStorage.setItem(CURRENT_KEY, JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
    }
  };

  const deleteUser = (userId: string) => {
    const allUsers = loadUsers();
    const updated = allUsers.filter(u => u.id !== userId);
    localStorage.setItem(USERS_KEY, JSON.stringify(updated));
    setUsers(updated);

    if (currentUser?.id === userId) {
      logout();
    }
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!currentUser) return;
    const updatedUser: User = { ...currentUser, ...updates };
    localStorage.setItem(CURRENT_KEY, JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);

    const allUsers = loadUsers();
    const updatedList = allUsers.map(u => (u.id === updatedUser.id ? updatedUser : u));
    localStorage.setItem(USERS_KEY, JSON.stringify(updatedList));
    setUsers(updatedList);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoggedIn,
        isAdmin,
        isClient,
        users,
        pendingVerification,
        setPendingVerification,
        login,
        loginAs,
        register,
        verify,
        resendCode,
        sendOtp,
        logout,
        updateUserRole,
        deleteUser,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
