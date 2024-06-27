"use client"
import InputLabelPair from "@/components/InputLabelPair";
import Card from "@/components/lib/Card";
import { InputBox } from "@/components/lib/Typographies";
import { register } from "@/lib/requests";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const pairToObject = (formData: any) => {
    const formDataKeyValuePair: Record<string,string> = {};
    for(const iterator of formData){
      formDataKeyValuePair[iterator[0]] = iterator[1];
    }
    return formDataKeyValuePair;
  }
  const BACKEND_URL = "http://127.0.0.1:8080/api/v1/";
  const handleSubmit =async (event:React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const newRegisteration = new FormData(document.getElementById("register") as HTMLFormElement);
    console.log(newRegisteration)
    const credentials = pairToObject(newRegisteration)
    const registeredUser = await fetch(`${BACKEND_URL}users/newUserSignIn`,{
      method: "POST",
      mode: "cors",
      headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify(credentials)
  }).then((res) => {
      console.log(res)
      if(res.status === 201){
        router.replace("/Login")
      }
      return res;
  }).catch((error) => {
      alert(error);
      throw new Error(error)
  })
  
  }
  return (
    <div className="flex flex-col items-center justify-center h-full mt-[10%] bg-white ">
      <h1>Register</h1>
      <Card>
        <form id="register">
          <InputLabelPair>
            <InputBox type="text" name="username" id="username" />
            <label htmlFor="username">Enter a Username</label>
          </InputLabelPair>
          <InputLabelPair>
            <InputBox type="text" name="fullname" id="fullname" />
            <label htmlFor="fullname">Enter your full name</label>
          </InputLabelPair>
          <InputLabelPair>
            <InputBox type="email" name="email" id="email" />
            <label htmlFor="email">Email</label>
          </InputLabelPair>
          <InputLabelPair>
            <InputBox type="password" name="password" id="password" />
            <label htmlFor="password">Enter Password</label>
          </InputLabelPair>
          <button className="border-[1px] p-2 bg-slate-100" type="submit" onClick={handleSubmit}>Submit</button>
          <div>Already a user? <Link href={"/Login"}>Log in</Link></div>
        </form>
      </Card>
    </div>
  );
}
