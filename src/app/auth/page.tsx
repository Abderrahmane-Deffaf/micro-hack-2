"use client";
import StepFive from "@/components/auth/StepFive";
import StepFour from "@/components/auth/StepFour";
import StepOne from "@/components/auth/StepOne";
import StepThree from "@/components/auth/StepThree";
import StepTwo from "@/components/auth/StepTwo";
import { createContext, useState } from "react";

type AuthContextType = {
  step: number;
  setStep: (step: number) => void;
};

export const authContent = createContext<AuthContextType>({
  step: 1,
  setStep: () => {},
});
export default function AuthPage() {
  const [step, setStep] = useState(1);
  // we gonna define steps
  // 1 you are joining
  // 2 have or not account
  // 3 have account organization
  // 3 have account employee
  //
  return (
    <authContent.Provider value={{ step, setStep }}>
      <div className=" wrapper flex flex-col gap-6 text-white justify-center h-screen">
        {step === 1 && <StepOne />}
        {step === 2 && <StepTwo />}
        {step === 3 && <StepThree />}
        {step === 4 && <StepFour />}
        {step === 5 && <StepFive />}
      </div>
    </authContent.Provider>
  );
}
