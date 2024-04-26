import { useContext } from "react";
import AuthChoiceCard from "../reusable/AuthChoiceCard";
import { authContent } from "@/app/auth/page";

export default function StepTwo() {
  const { setStep } = useContext(authContent);
  return (
    <>
      <h1>You Are Joining Us As</h1>
      <div className=" flex gap-4">
        <button onClick={() => setStep(4)}>
          <AuthChoiceCard title="Already have an account" color="orange" />
        </button>
        <button onClick={() => setStep(3)}>
          <AuthChoiceCard title="Create new account" color="green" />
        </button>
      </div>
    </>
  );
}
