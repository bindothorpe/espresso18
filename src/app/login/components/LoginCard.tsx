"use client";

import { playfair } from "@/app/fonts";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@nextui-org/react";
import { useMemo, useState } from "react";

export default function LoginCard() {
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const validateEmail = (value: string) =>
    value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (value === "") return false;

    return validateEmail(value) ? false : true;
  }, [value]);

  return (
    <Card className=" w-[100%] md:w-[400px] m-12">
      <CardHeader>
        <h2 className={`text-2xl font-bold ${playfair.className}`}>Login</h2>
      </CardHeader>
      <CardBody>
        <Input
          value={value}
          type="email"
          label="Email"
          variant="bordered"
          isInvalid={isInvalid}
          color={isInvalid ? "danger" : "default"}
          errorMessage={isInvalid && "Please enter a valid email"}
          onValueChange={setValue}
        />
      </CardBody>
      <CardFooter>
        {!isInvalid && value !== "" ? (
          <LoginLink
            onClick={() => setLoading(true)}
            className="w-[100%]"
            authUrlParams={{
              connection_id:
                process.env.NEXT_PUBLIC_KINDE_CONNECTION_EMAIL_PASSWORDLESS ||
                "",
              login_hint: value,
            }}
          >
            <Button
              className="w-[100%]"
              color="primary"
              isDisabled={isInvalid || value === "" || loading}
            >
              {loading ? "Loading..." : "Login"}
            </Button>
          </LoginLink>
        ) : (
          <Button className="w-[100%]" color="primary" isDisabled={true}>
            Login
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
