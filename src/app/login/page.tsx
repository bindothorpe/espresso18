import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@nextui-org/react";
import LoginCard from "./components/LoginCard";

export default async function Login() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <LoginCard />
    </div>
  );
}
