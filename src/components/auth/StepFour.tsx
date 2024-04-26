import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { loginOrganizationProfile } from "./authFetch";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  Email: z.string().email({ message: "Invalid email address." }),
  Password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export type LoginType = z.infer<typeof loginSchema>;

export default function StepFour() {
  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      Email: "",
      Password: "",
    },
  });
  const router = useRouter();

  async function onSubmit(values: LoginType) {
    console.log(values);
    const response = await loginOrganizationProfile(values);
    if (response?.Token) {
      console.log(response);

      document.cookie = `auth=${response?.Token}; expires=Thu, 18 March 2025 12:00:00 UTC; path=/`;
      router.push("/home");
    }
  }
  return (
    <>
      <h1>
        login to your <span className=" text-green-500">Employee</span> Account
      </h1>
      <p className=" text-green-500 font-bold">Account Informations</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex flex-col "
        >
          <div className=" space-y-8 w-[50%] ">
            <div className=" flex flex-col gap-1">
              <FormField
                control={form.control}
                name="Email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              {form.formState.errors.Email?.message && (
                <span className=" text-red-600">
                  {form.formState.errors.Email.message}
                </span>
              )}
            </div>
            <div className=" flex flex-col gap-1">
              <FormField
                control={form.control}
                name="Password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              {form.formState.errors.Password?.message && (
                <span className=" text-red-600">
                  {form.formState.errors.Password.message}
                </span>
              )}
            </div>

            <Button
              disabled={form.formState.isSubmitting}
              variant="destructive"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
