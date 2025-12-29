import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getResultAnswerById } from "@/lib/result";
import CircularProgress from "./CircularProgress";
import { Spinner } from "@/components/ui/spinner";

const ResultPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await getResultAnswerById(id);
        setResult(res.data);
      } catch (err) {
        console.error(
          "FAILED FETCH RESULT:",
          err.response?.data || err
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [id]);

  const levelStyles = {
    "Ready to Lead": "bg-green-100 text-green-600",
    "Emerging Talent": "bg-yellow-100 text-yellow-600",
    "Need Boost": "bg-red-100 text-red-600",
  }


  if (loading) return 
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="p-4 rounded-lg bg-[#206FB7] mb-4">
        <Spinner className="size-12 text-white" />
      </div>
      <h3 className="text-xl">Getting everything ready...</h3>
    </div>;
  if (!result) return <p>Result not found</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-xl p-6 shadow-md rounded-lg border border-gray-100 mx-4 md:mx-0">
        <h1 className="text-2xl font-bold mb-2 text-center">
          Hasil Kuisioner
        </h1>
        <hr className="mb-4"/>

        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="score">
            <CircularProgress value={result.score} />
          <div className="text-center">
            <p className="font-semibold mb-1">Level</p>
              <p
                className={`inline-block px-4 py-1 rounded-xl text-base font-semibold ${levelStyles[result.level]}`} >
                {result.level}
              </p>
          </div>
          </div>

          <div className="information">
            <div className="mb-2">
              <p className="font-semibold">Interpretasi</p>    
              <p className="text-gray-600 leading-5 mt-1">
                {result.interpretation}
              </p>
            </div>

            <div className="mb-4">
              <p className="font-semibold">Rekomendasi Produk</p>
              <p className="mt-2 bg-gray-100 p-2 rounded">
                {result.recommendationProduct}
              </p>
            </div>

            <button
              onClick={() => navigate("/")}
              className="w-full bg-[#206FB7] text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
              >
              Kembali ke Home
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ResultPage;
