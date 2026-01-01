import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const FrontButton = ({ token }) => {
  const navigate = useNavigate();

  const handleClickFoodPath = () => {
    navigate(`/quiz`);
  };
  const handleClick = () => {
    navigate(`/portal?token=${token}`);
  };

  return (
    <>
      <div className="flex flex-col gap-3 p-6">
        <h1 className="font-bold text-2xl">Food Path & Career Diagnosis</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <div className="flex gap-2">
          <Button
            onClick={handleClickFoodPath}
            className="px-5 text-white max-w-xs bg-[#206FB7] hover:bg-blue-600"
          >
            Food Path
          </Button>
          <Button
            onClick={handleClick}
            className="px-5 text-white max-w-xs bg-[#206FB7] hover:bg-blue-600"
          >
            Career Diagnosis
          </Button>
        </div>
      </div>
    </>
  );
};
