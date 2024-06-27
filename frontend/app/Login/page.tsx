"use client";
import InputLabelPair from "@/components/InputLabelPair";
import Card from "@/components/lib/Card";
import { InputBox } from "@/components/lib/Typographies";
import { login } from "@/lib/requests";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter()
  const pairToObject = (formData: any) => {
    const formDataKeyValuePair: Record<string,string> = {};
    for(const iterator of formData){
      formDataKeyValuePair[iterator[0]] = iterator[1];
    }
    return formDataKeyValuePair;
  }
  const onSubmitHandler =async (event:React.MouseEvent<HTMLElement>) => {
    const BACKEND_URL = "http://127.0.0.1:8080/api/v1/";
    event.preventDefault();
    const newRegisteration = new FormData(document.getElementById("login") as HTMLFormElement);
    const credentials = pairToObject(newRegisteration)
    
      const loggedInUser = await fetch(`${BACKEND_URL}users/existingUserLogin`,{
          method: "POST",
          mode: "cors",
          headers: {
              "Content-Type": "application/json",
              
            },
            body: JSON.stringify(credentials)
      }).then((res) => {
          if(res.status === 200){
            router.replace("/")
          }
          return res;
      }).catch((error) => {
          console.log(error)
          
          return error
      })
      return loggedInUser;
      
      
  };
  
  return (
    <div className="flex flex-col items-center justify-center h-full mt-[10%] bg-white ">
      <h1>Log in</h1>
      <Card>
        <form id="login">
          
            
          <InputLabelPair>
            <InputBox type="email" name="email" id="email" />
            <label htmlFor="email">Email</label>
          </InputLabelPair>
          <InputLabelPair>
            <InputBox type="password" name="password" id="password" />
            <label htmlFor="password">Enter Password</label>
          </InputLabelPair>
          <button className="border-[1px] border-black p-2" type="submit" onClick={onSubmitHandler}>Submit</button>
          <div>Not a user? <Link href={"/Register"}>Register</Link></div>
        </form>
      </Card>
    </div>
  );
}
