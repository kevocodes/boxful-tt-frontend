"use client";
import { Button } from "antd";
import { signOut, useSession } from "next-auth/react";
import { ROUTES } from "@/constants/routes";

function MainPage() {
  const session = useSession();

  return (
    <>
      <div>
        <h1>Main Page</h1>
        <p>{session.data?.user?.email}</p>
        <p>{session.data?.user?.isVerified?.toString()}</p>
        <p>{session.data?.user?.lastname}</p>
        <p>{session.data?.user?.name}</p>
        <p>{session.data?.user?.role}</p>
      </div>
      <Button onClick={() => signOut({ callbackUrl: ROUTES.LOGIN })}>
        Sign out
      </Button>
    </>
  );
}

export default MainPage;
