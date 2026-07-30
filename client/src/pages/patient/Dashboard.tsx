import { Button } from "@/components/ui/button";
import { useAuthToken, useAuthStore } from "../../store/auth/index";

const Dashboard = () => {
  const token = useAuthToken("patient");
  const { logout } = useAuthStore()

  return (
    <div>
      <h1>Dashboard</h1>
      {token ? <Button onClick={() => {
        logout("patient")
        window.location.href = "/login"
      }}  >LOGOUT</Button> : <Button>LOGIN</Button>}
    </div>
  );
};

export default Dashboard;
