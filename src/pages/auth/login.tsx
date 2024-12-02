import z from "zod";
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
import { useNavigate } from "react-router";
import { Typography } from "@/components/ui/typography";

const loginSchema = z.object({
  username: z.string().email(),
  password: z.string().min(8),
});

type loginForm = z.infer<typeof loginSchema>;

export const Login = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const { control, formState, handleSubmit } = form;

  const onSubmit = (data: loginForm) => {
    const parsed = loginSchema.safeParse(data);
    if (parsed.success) {
      navigate("/dashboard");
    }
  };

  const handleGithubSignIn = async () => {
    //await onDataActionForGithubSignIn(id as string);
  };

  return (
    <Card className="min-w-[350px]">
      <CardHeader className="text-center flex items-center mb-4">
        <Typography as="h3" variant="h3" className="text-center">
          Cloudpool
        </Typography>
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
              name="username"
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
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
