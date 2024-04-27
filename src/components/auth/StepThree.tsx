"use client";

import clsx from "clsx";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createOrganizationProfile } from "./authFetch";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  Name: z.string().min(5, {
    message: "Organizaiotn name must be at least 5 characters.",
  }),
  Email: z.string().email({ message: "Invalid email address." }),
  Phone_Number: z
    .string()
    .min(10, { message: "phone should be at least 10 characters" })
    .max(10, { message: "phone should be at max 10 characters" })
    .regex(/^(07|06|05)/, {
      message: "Phone number should start with 07, 06, or 05",
    }),
  Password: z.string().min(3, {
    message: "Password must be at least 3 characters.",
  }),
  Domain_Name: z.string().min(5, {
    message: "Field of specialization must be at least 5 characters.",
  }),
  Number_Of_Employees: z.string({
    message: "Size of Your Organization must be at least 1 member.",
  }),
});

export type FromType = z.infer<typeof formSchema>;

export default function StepThree() {
  const [section, setSection] = useState(1);

  const router = useRouter();

  const form = useForm<FromType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: "",
      Email: "",
      Password: "",
      Domain_Name: "",
      Phone_Number: "",
      Number_Of_Employees: "1",
    },
  });
  async function onSubmit(values: FromType) {
    console.log(values);
    const response = await createOrganizationProfile(values);
    if (response?.Token) {
      document.cookie = `auth=${response?.Token}; expires=Thu, 18 March 2025 12:00:00 UTC; path=/`;
      router.push("/home");
    }
  }

  return (
    <>
      <h1>
        Create An <span className=" text-orange-500">Organization</span> Account
      </h1>
      <div className=" flex  gap-1">
        <span
          className={clsx(" font-bold text-lg ", {
            "text-orange-500": section === 1,
            "text-gray-700": section !== 1,
          })}
        >
          Organization Informations
        </span>
        -----
        <span
          className={clsx(" font-bold text-lg ", {
            "text-orange-500": section === 2,
            "text-gray-700": section !== 2,
          })}
        >
          Account Informations
        </span>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex flex-col "
        >
          {section === 1 && (
            <div className=" space-y-8 w-[50%] ">
              <div className=" flex flex-col gap-1">
                <FormField
                  control={form.control}
                  name="Name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Organization Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {form.formState.errors.Name?.message && (
                  <span className=" text-red-600">
                    {form.formState.errors.Name.message}
                  </span>
                )}
              </div>
              <div className=" flex flex-col gap-1">
                <FormField
                  control={form.control}
                  name="Domain_Name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Field of specialization</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {form.formState.errors.Domain_Name?.message && (
                  <span className=" text-red-600">
                    {form.formState.errors.Domain_Name.message}
                  </span>
                )}
              </div>
              <div className=" flex flex-col gap-1">
                <FormField
                  control={form.control}
                  name="Number_Of_Employees"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Size of Your Organization</FormLabel>
                      <FormControl>
                        <Input min={1} type="number" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {form.formState.errors.Number_Of_Employees?.message && (
                  <span className=" text-red-600">
                    {form.formState.errors.Number_Of_Employees.message}
                  </span>
                )}
              </div>
              <Button variant="destructive" onClick={() => setSection(2)}>
                Next
              </Button>
            </div>
          )}
          {section === 2 && (
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
                  name="Phone_Number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone number</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {form.formState.errors.Phone_Number?.message && (
                  <span className=" text-red-600">
                    {form.formState.errors.Phone_Number.message}
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
              <div className=" space-x-4">
                <Button
                  className=" bg-white rounded-3xl font-bold text-gray-600"
                  onClick={() => setSection(1)}
                >
                  back
                </Button>

                <Button
                  disabled={form.formState.isSubmitting}
                  variant="destructive"
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </div>
          )}
        </form>
      </Form>
    </>
  );
}
