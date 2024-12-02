import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Github, Loader2 } from "lucide-react";
import { NavLink } from "react-router";
import { Typography } from "@/components/ui/typography";
import { useAuth } from "@/context/AuthProvider";
import { loginFormInputs, loginSchema } from "./form";

export const Login = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { signIn } = useAuth();

  const { control, formState, handleSubmit } = form;

  const onSubmit = async (data: loginFormInputs) => {
    const parsed = await loginSchema.safeParseAsync(data);
    if (parsed.success) {
      await signIn(data);
    }
  };

  const handleGithubSignIn = async () => {
    //await onDataActionForGithubSignIn(id as string);
  };

  return (
    <Card className="min-w-[442px]">
      <CardHeader className="text-center flex items-center mb-4">
        <Typography>Cloudpool</Typography>
      </CardHeader>
      <CardContent className="grid grid-cols-auto gap-4">
        <Button
          className="inline-flex items-center justify-center"
          type="button"
          onClick={handleGithubSignIn}
        >
          <Github />
          <div className="ml-2">Continue with Github</div>
        </Button>

        <Form {...form}>
          <form
            className="grid grid-cols-auto gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
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
                    <Input
                      placeholder="Your password here"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={formState.isSubmitting}>
              {formState.isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
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
