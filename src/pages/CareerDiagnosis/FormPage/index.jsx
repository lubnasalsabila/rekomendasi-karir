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
import back from "../../../assets/back.png"


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
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-xl w-full p-6 border border-gray-100 rounded-lg mx-4 sm:mx-0 shadow-md">
        <h1 className="text-xl font-bold mb-6 text-center">
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

            <Button type="submit" className="w-full bg-[#206FB7] hover:bg-blue-600">
              Submit
            </Button>
          </form>
        </Form> 
        <a href="/" className="text-sm text-blue-600 flex items-center mt-4 gap-1"><img src={back} alt=""/> Home</a>
      </div>
    </div>
  );
};

export default FormPage;
