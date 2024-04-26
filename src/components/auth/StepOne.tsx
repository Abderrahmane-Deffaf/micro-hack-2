import { useContext } from "react";
import AuthChoiceCard from "../reusable/AuthChoiceCard";
import { authContent } from "./AuthPage";

export default function StepOne() {
  const { setStep } = useContext(authContent);
  return (
    <>
      <h1>You Are Joining Us As</h1>
      <div className=" flex gap-4">
        <button onClick={() => setStep(2)}>
          <AuthChoiceCard
            description="Improve your organization digital effeciency with SOLUTION"
            title="Organization"
            color="orange"
          />
        </button>
        <button onClick={() => setStep(5)}>
          <AuthChoiceCard
            description="We make your day full of productivity and your tasks much easier ."
            title="Employee"
            color="green"
          />
        </button>
      </div>
    </>
  );
}
