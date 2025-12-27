import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getResultAnswerById } from "@/lib/result";

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

  if (loading) return <p>Loading result...</p>;
  if (!result) return <p>Result not found</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Hasil Kuisioner
      </h1>

      {/* SCORE */}
      <div className="text-center mb-6">
        <p className="text-sm text-gray-500">Total Score</p>
        <p className="text-4xl font-bold">{result.score}</p>
      </div>

      {/* LEVEL */}
      <div className="mb-4">
        <p className="font-semibold">Level</p>
        <p className="text-lg">{result.level}</p>
      </div>

      {/* INTERPRETATION */}
      <div className="mb-4">
        <p className="font-semibold">Interpretasi</p>
        <p className="text-gray-600">
          {result.interpretation}
        </p>
      </div>

      {/* RECOMMENDATION */}
      <div className="mb-6">
        <p className="font-semibold">Rekomendasi Produk</p>
        <p className="mt-2 bg-gray-100 p-4 rounded">
          {result.recommendationProduct}
        </p>
      </div>

      <button
        onClick={() => navigate("/")}
        className="w-full mt-6 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
        Kembali ke Home
      </button>


      {/* EXTRA INFO (OPSIONAL) */}
      <div className="text-sm text-gray-400">
        Status Jawaban: {result.answerUser.status}
      </div>


    </div>
  );
};

export default ResultPage;
