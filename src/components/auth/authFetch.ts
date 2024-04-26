import { baseUrl } from "@/lib/helper";
import { FromType } from "./StepThree";
import {toast} from 'sonner'
import { LoginType } from "./StepFour";
import { LoginUserType } from "./StepFive";

export async function createOrganizationProfile(fromData: FromType) {
  try {
    const response = await fetch(`${baseUrl}/organisation/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: fromData.Name,
        Email: fromData.Email,
        Password: fromData.Password,
        Domain_Name: fromData.Domain_Name,
        Number_Of_Employees: Number(fromData.Number_Of_Employees),
      }),
    });
    const data = await response.json();
    console.log(data);
    if(data?.error) {
      toast.error(data.error);
      return null;
    }
    return data ; 
  } catch (error) {
    console.log(error);
    toast.error("error occured while creating organization profile");
    return null;
  }
}


export async function loginOrganizationProfile(fromData: LoginType) {
  try {
    const response = await fetch(`${baseUrl}/organisation/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: fromData.Email,
        Password: fromData.Password,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data?.error) {
      toast.error(data.error);
      return null;
    }
    return data;
  } catch (error) {
    console.log(error);
    toast.error("error occured while logining to organization profile");
    return null;
  }
}





export async function loginUserProfile(fromData: LoginUserType) {
  try {
    const response = await fetch(`${baseUrl}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: fromData.Username,
        Password: fromData.Password,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data?.error) {
      toast.error(data.error);
      return null;
    }
    return data;
  } catch (error) {
    console.log(error);
    toast.error("error occured while logining to organization profile");
    return null;
  }
}
