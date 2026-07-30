import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const ToastLayout = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.toastMessage) {
      toast.success(location.state.toastMessage, { duration: 5000 });

      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return <Outlet />;
};

export default ToastLayout;