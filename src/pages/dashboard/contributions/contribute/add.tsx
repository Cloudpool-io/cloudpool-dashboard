import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";

import { ChevronLeftIcon, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Region } from "@/core/enums/Region.enum";
import { SoftwareStack } from "@/core/enums/SoftwareStack.enum";
import { contributionFormInputs, contributionSchema } from "./form/main";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useMutation } from "@tanstack/react-query";
import { addContribution } from "../actions/main";
import { useToast } from "@/hooks/use-toast";
import { CustomAxiosError } from "@/core/interfaces/error.interface";

const DEFAULT_CONTRIBUTION_FORM_VALUES = {
  name: "",
  infraProvider: "",
  softwareStack: "",
  region: "",
  version: "",
  credentials: {
    Private_Key: "",
    Host: "",
    Port: "",
    Username: "",
    Connection_String: "",
  },
  cpu: 0,
  ram: 0,
  diskSizeGb: 0,
};

export const AddContributionFormPage = () => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(contributionSchema),
    defaultValues: DEFAULT_CONTRIBUTION_FORM_VALUES,
  });

  const { control, handleSubmit } = form;

  const stack = form.watch("softwareStack");
  const { toast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: addContribution,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "You have created a contribution successfully",
      });
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

  const onSubmit = async (form: contributionFormInputs) => {
    mutate(form);
  };

  return (
    <>
      <Button size="icon" onClick={() => navigate("/dashboard")}>
        <ChevronLeftIcon />
      </Button>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add Contribution</CardTitle>
        </CardHeader>
        <CardContent className="mt-4">
          <Form {...form}>
            <form
              className="grid grid-cols-auto gap-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Type provider here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="infraProvider"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Infrastructure provider</FormLabel>
                    <FormControl>
                      <Input placeholder="Type provider here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="softwareStack"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Software Stack</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Software stack" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {Object.entries(SoftwareStack).map(([key, value]) => (
                            <SelectItem key={key} value={value}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {stack !== "" && (
                <Accordion type="single" defaultValue="credentials" collapsible>
                  <AccordionItem value="credentials">
                    <AccordionTrigger>Credentials </AccordionTrigger>
                    <AccordionContent>
                      <Card>
                        <CardHeader>
                          <CardTitle>Credentials for {stack}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                          {[
                            SoftwareStack.Ubuntu,
                            SoftwareStack.Debian,
                          ].includes(
                            SoftwareStack[stack as keyof typeof SoftwareStack],
                          ) ? (
                            <>
                              <FormField
                                control={control}
                                name="credentials.Private_Key"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>VM Private Key</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Your Private Key"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={control}
                                name="credentials.Port"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Port</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Your VM  Port"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={control}
                                name="credentials.Host"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Database Host</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Your VM Host"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={control}
                                name="credentials.Username"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Your Username</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Your Username"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </>
                          ) : (
                            <>
                              <FormField
                                control={control}
                                name="credentials.Connection_String"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>
                                      Database Connection string
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Your connection string"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </>
                          )}
                        </CardContent>
                      </Card>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}

              <FormField
                control={control}
                name="region"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Region</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {Object.entries(Region).map(([key, value]) => (
                            <SelectItem key={key} value={value}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="version"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Version</FormLabel>
                    <FormControl>
                      <Input placeholder="Version" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="cpu"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPU</FormLabel>
                    <FormControl>
                      <Input placeholder="CPU" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="ram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RAM</FormLabel>
                    <FormControl>
                      <Input placeholder="Disk Size" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="diskSizeGb"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Disk size</FormLabel>
                    <FormControl>
                      <Input placeholder="Disk size input " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isPending}>
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Contribute
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};
