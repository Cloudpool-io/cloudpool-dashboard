import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Loader2 } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { Typography } from "@/components/ui/typography";
import { loginFormInputs, loginSchema } from "./form";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/context/auth";
import { CustomAxiosError } from "@/core/interfaces/error.interface";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { env } from "@/core/env";

export const Login = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { toast } = useToast();
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: "You have logged in successfully",
      });
      setToken(data.accessToken);
      navigate("/dashboard/overview");
    },
    onError: (error: CustomAxiosError) => {
      if (error.response?.data.code) {
        toast({
          title: "Failed",
          description: error.response.data.message,
          variant: "destructive",
        });
      }
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = async (data: loginFormInputs) => {
    mutate(data);
  };

  const handleGithubSignIn = async () => {
    const client_id = env.github_client_id;
    const redirect_uri = env.github_redirect_uri;
    const scope = "read:user";
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}`;

    window.location.href = authUrl;

    //await onDataActionForGithubSignIn(id as string);
  };

  return (
    <Card className="min-w-[350px] sm:min-w-[375px]">
      <CardHeader className="flex items-center text-center">
        <Typography>Cloudpool</Typography>
      </CardHeader>
      <CardContent className="grid-cols-auto grid gap-4">
        <Button className="inline-flex items-center justify-center" type="button" onClick={handleGithubSignIn}>
          <GitHubLogoIcon />
          <div className="ml-2">Continue with Github</div>
        </Button>
        <Form {...form}>
          <form className="grid-cols-auto grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="m@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Your password here" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Sign in
            </Button>
            <Button type="button" variant="link">
              <NavLink to="/auth/register">Create an account</NavLink>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
