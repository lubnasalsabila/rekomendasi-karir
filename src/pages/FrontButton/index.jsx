import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const FrontButton = ({ token }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/portal?token=${token}`);
  };

  return (
    <Button
      onClick={handleClick}
      className="w-full mt-6 text-white max-w-lg sm:max-w-xl bg-[#206FB7] hover:bg-blue-500"
    >
      Career Recommendation
    </Button>
  );
};
