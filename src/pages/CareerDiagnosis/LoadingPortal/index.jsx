import { Spinner } from "@/components/ui/spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  generateToken,
  portal,
} from "../../../lib/auth";

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
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="p-4 rounded-lg bg-[#206FB7] mb-4">
        <Spinner className="size-12 text-white" />
      </div>
      <h3 className="text-xl">Getting everything ready...</h3>
    </div>
  );
};

export default LoadingPortal;
