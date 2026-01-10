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
import Layout from "@/components/Layout";
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
    <Layout idPage="FormPage_CareerDiagnosis">
      <div className="min-h-screen flex flex-col items-center justify-start mt-8 gap-4">
        <div className="max-w-xl w-full bg-card text-card-foreground rounded-2xl px-8 py-4 shadow-soft">
          <h1 className="font-bold text-start text-foreground text-2xl">Form Pengisian Data</h1>
        </div>
        <div className="max-w-xl w-full bg-card text-card-foreground shadow-soft p-6 rounded-2xl mx-4 sm:mx-0">
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
                        <SelectTrigger className="w-full py-5 px-4">
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
                        <SelectTrigger className="w-full py-5 px-4">
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
                        <SelectTrigger className="w-full py-5 px-4">
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

              <Button type="submit" className="w-full py-5 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none transform hover:-translate-y-0.5 transition-all">
                Submit
              </Button>
            </form>
          </Form> 
          <a href="/" className="text-sm text-blue-600 flex items-center mt-4 gap-1"><img src={back} alt=""/> Home</a>
        </div>
      </div>
    </Layout>
  );
};

export default FormPage;
