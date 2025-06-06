"use client";

import { auth } from "@/lib/firebaseConfig";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  user: string | null;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Carregando autenticação
  const router = useRouter();

  // 🔐 Escuta mudanças de autenticação do Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser: User | null) => {
        if (firebaseUser?.email) {
          setUser(firebaseUser.email);
        } else {
          setUser(null);
        }
        setLoading(false); // Finaliza carregamento, mesmo sem usuário
      }
    );

    return () => unsubscribe();
  }, []);

  // 🔑 Função de login
  const login = async (email: string, senha: string): Promise<boolean> => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      return true;
    } catch (error) {
      console.error("Erro no login:", error);
      return false;
    }
  };

  // 🚪 Função de logout
  const logout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        router.push("/"); // Volta para a home após logout
      })
      .catch((error) => {
        console.error("Erro ao sair:", error);
      });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {/* Só renderiza filhos após loading = false */}
      {children}
    </AuthContext.Provider>
  );
};

// 🔁 Hook personalizado para usar o contexto com segurança
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
};
