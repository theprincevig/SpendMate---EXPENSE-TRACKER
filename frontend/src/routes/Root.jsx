import { LoaderCircle } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Navigate } from "react-router-dom";

export const Root = () => {
  const { authUser, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <LoaderCircle size={30} className='animate-spin' />
      </div>
    );
  }

  // Redirect to dashboard if authenticated, otherwise to login
  return authUser ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  )
}
