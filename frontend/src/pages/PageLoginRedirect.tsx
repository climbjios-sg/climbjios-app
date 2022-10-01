import { useEffect } from "react";
// hooks
import useAuth from "src/hooks/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
//
import LoadingScreen from "src/components/LoadingScreen";

export default function PageLoginRedirect() {
  const { isOnboarded, onRedirect } = useAuth();
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    if (!accessToken || !refreshToken) {
      // Navigate to /login
      navigate("/login");
    } else {
      // Check if onboarded, and update local state
      onRedirect(accessToken, refreshToken);
      if (!isOnboarded) {
        navigate("/onboarding");
      } else {
        navigate("/dashboard");
      }
    }
  }, []);

  return (
    <LoadingScreen />
  );
}