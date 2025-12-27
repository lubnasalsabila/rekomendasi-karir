import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { createUserInfo } from "@/lib/user";
import { useNavigate } from "react-router-dom";


const STATUS_OPTIONS = [
  { label: "Mahasiswa / Fresh Graduate", value: "MAHASISWA_FG" },
  { label: "Bekerja di industri pangan", value: "FOOD_INDUSTRY" },
  { label: "Switch career ke industri pangan", value: "SWITCH_CAREER" },
];

const EXPERIENCE_OPTIONS = [
  { label: "< 1 tahun", value: "LESS_THAN_1" },
  { label: "1 - 3 tahun", value: "BETWEEN_1_3" },
  { label: "> 3 tahun", value: "MORE_THAN_3" },
];

const FIELD_OPTIONS = [
  { label: "R&D", value: "RND" },
  { label: "QA", value: "QA" },
  { label: "QC", value: "QC" },
];

const FormPage = () => {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      status: "",
      foodIndustryExperience: "",
      field: "",
    },
  });
  

  const onSubmit = async (values) => {
  try {
    const res = await createUserInfo(values);

    const answerUserId = res.data.id; 

    localStorage.setItem("answerUserId", String(answerUserId));

    navigate("/question");
  } catch (err) {
    console.error("CREATE USER INFO FAILED:", err);
  }
};


  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-6">
        User Information
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          {/* STATUS */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status saat ini</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* EXPERIENCE */}
          <FormField
            control={form.control}
            name="foodIndustryExperience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pengalaman di industri pangan</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih pengalaman" />
                    </SelectTrigger>
                    <SelectContent>
                      {EXPERIENCE_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* FIELD */}
          <FormField
            control={form.control}
            name="field"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bidang yang diminati</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih bidang" />
                    </SelectTrigger>
                    <SelectContent>
                      {FIELD_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>

      <button
        onClick={() => navigate("/")}
        className="w-full mt-6 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
        Kembali ke Home
      </button>
    </div>
  );
};

export default FormPage;
