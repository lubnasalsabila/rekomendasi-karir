import { Spinner } from "@/components/ui/spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  generateToken,
  portal,
} from "../../lib/auth";

const LoadingPortal = () => {
  const navigate = useNavigate();

  const init = async () => {
    try {
      const portalToken = await generateToken(); 

      const redirectTo = await portal(portalToken);

      if (redirectTo === "PAGE_QUESTION") {
        navigate("/question");
      }

      if (redirectTo === "USER_CREATE_INFO") {
        navigate("/form");
      }
    } catch (err) {
      console.error("INIT PORTAL ERROR:", err);
    }
  };


  useEffect(() => {
    init();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner className="size-8" />
    </div>
  );
};

export default LoadingPortal;
