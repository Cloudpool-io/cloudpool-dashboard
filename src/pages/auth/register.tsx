import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormInputs, registerSchema } from "./form";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { Typography } from "@/components/ui/typography";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { CustomAxiosError } from "@/core/interfaces/error.interface";

export const Register = () => {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { toast } = useToast();
  const { signUp } = useAuth();

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = form;
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      console.log(data);
      toast({
        title: "Success",
        description: "You have registered successfully",
      });
      navigate("/auth/login");
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

  const onSubmit = async (data: registerFormInputs) => {
    mutate(data);
  };

  return (
    <Card className="min-w-[350px] sm:min-w-[375px]">
      <CardHeader className="text-center flex items-center">
        <Typography>Cloudpool</Typography>
      </CardHeader>

      <CardContent className="grid grid-cols-auto gap-4">
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
            <FormField
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm your password"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Sign up
            </Button>
            <Button type="button" variant="link">
              <NavLink to="/auth/login">Already have an account?</NavLink>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
