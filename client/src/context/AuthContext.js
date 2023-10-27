import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user:JSON.parse(localStorage.getItem("user")) || null, // Mendapatkan data pengguna dari localStorage jika ada, atau set null jika tidak ada
  isFetching: false, // Inisialisasi status pemrosesan yang sedang berjalan
  error: false, // Inisialisasi status error
};


export const AuthContext = createContext(INITIAL_STATE);  // Membuat konteks AuthContext dengan nilai awal INITIAL_STATE

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE); // Menggunakan useReducer untuk mengelola state dan dispatch
  
  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user)) // Menyimpan data pengguna ke localStorage ketika state.user berubah
  },[state.user])
  
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
