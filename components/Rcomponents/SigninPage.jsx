import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useContext } from "react";
import { AuthenticationContext } from "@/Context/AuthenticationContext";
import { useMutation } from "convex/react";
import uuid4 from "uuid4";
import { api } from "../../convex/_generated/api";



function SigninPage({ openDialog, closeDialog }) {

    const{authenticaion, setAuthentication} = useContext(AuthenticationContext);

    const CreateUser = useMutation(api.users.CreateUser);




  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: " Bearer " + tokenResponse?.access_token } }
      );

      console.log(userInfo);
      const user = userInfo?.data;


      await CreateUser({
        name: user?.name,
        email: user?.email,
        picture: user?.picture,
        uid: uuid4(), 
      })

     if(typeof Window !== "undefined"){
      localStorage.setItem("user", JSON.stringify(userInfo?.data));
     }
      setAuthentication(userInfo?.data);
     closeDialog(false);

    }, 
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription className="flex flex-col justify-center items-center">
            <div className="flex flex-col ">
              <h2 className="font-bold text-xl text-white text-center">
                Get started with Bolt.
              </h2>
              <p className="mt-2 text-center justify-center">
                Login or Create a new Account to move forward
              </p>
              <Button className="bg-blue-500 text-white hover:bg-blue-400 mt-3" onClick={googleLogin}>
                SignIn with google
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default SigninPage;
