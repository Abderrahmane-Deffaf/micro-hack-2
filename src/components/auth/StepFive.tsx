import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { loginUserProfile } from './authFetch';



const loginSchema = z.object({
  Username: z
    .string()
    .min(4, { message: "User Name must be at least 4 characters" }),
  Password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export type LoginUserType = z.infer<typeof loginSchema>;


export default function StepFive() {
  const form = useForm<LoginUserType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      Username: "",
      Password: "",
    },
  });
  const router = useRouter();

  async function onSubmit(values: LoginUserType) {
    console.log(values);
    const response = await loginUserProfile(values);
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
                name="Username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Name</FormLabel>
                    <FormControl>
                      <Input  {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              {form.formState.errors.Username?.message && (
                <span className=" text-red-600">
                  {form.formState.errors.Username.message}
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
