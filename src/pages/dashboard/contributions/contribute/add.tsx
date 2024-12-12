import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  ChevronLeftIcon,
  CloudCog,
  Cpu,
  FileStack,
  GalleryHorizontalEnd,
  HardDrive,
  KeySquare,
  Loader2,
  MapPinned,
  MemoryStick,
  MonitorCog,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../../components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Region } from "@/core/enums/Region.enum";
import { SoftwareStack } from "@/core/enums/SoftwareStack.enum";
import { contributionFormInputs, contributionSchema } from "./form/main";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useMutation } from "@tanstack/react-query";
import { addContribution, checkContribution } from "../actions/main";
import { useToast } from "@/hooks/use-toast";
import { CustomAxiosError } from "@/core/interfaces/error.interface";
import { Combobox } from "@/components/ui/combobox";
import { InfraProviderEnum } from "@/core/enums/InfraProvider.enum";
import { infrastuctureProvidersLogosMap, softwareStackLogosMap } from "@/core/maps/main";

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
  const { mutate: addContributionMutate, isPending: addContributionPending } = useMutation({
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

  const { mutate: checkContributionMutate, isPending: checkContributionPending } = useMutation({
    mutationFn: checkContribution,
    onSuccess: (data: { version?: string; cpu?: number; ram?: number; diskSizeGb?: number }) => {
      if (data?.version) {
        form.setValue("version", data.version);
      }
      if (data?.cpu) {
        form.setValue("cpu", data.cpu);
      }
      if (data?.ram) {
        form.setValue("ram", data.ram);
      }
      if (data?.diskSizeGb) {
        form.setValue("diskSizeGb", data.diskSizeGb);
      }
      toast({
        title: "Success",
        description: "Connection successful",
      });
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
    addContributionMutate(form);
  };

  const checkProductContribution = async (form: {
    softwareStack: SoftwareStack;
    credentials: { Connection_String?: string; Private_Key?: string; Host?: string; Port?: string; Username?: string };
  }) => {
    if ([SoftwareStack.Debian, SoftwareStack.Ubuntu].includes(form.softwareStack)) {
      checkContributionMutate(form);
    } else {
      checkContributionMutate(form);
    }
  };

  return (
    <>
      <Card className="max-w-screen-md">
        <div className="flex items-center p-6">
          <NavLink to="/dashboard/overview" className="flex-auto">
            <Button>
              <ChevronLeftIcon />
              Go Back
            </Button>
          </NavLink>
          <Button onClick={() => form.reset()}>Reset form</Button>
        </div>

        <CardHeader>
          <CardTitle>Add Contribution</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
              <FormField
                control={control}
                name="softwareStack"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="inline-flex items-center gap-2">
                      <FileStack />
                      Software Stack
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Software stack" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {Object.entries(SoftwareStack).map(([key, value]) => (
                            <SelectItem key={key} value={value}>
                              <div className="inline-flex items-center gap-2">
                                {key && value && (
                                  <img
                                    width="20"
                                    height="20"
                                    src={softwareStackLogosMap.get(value as keyof typeof SoftwareStack)}
                                  />
                                )}
                                {value}
                              </div>
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
                          <CardTitle className="inline-flex items-center gap-2">
                            <KeySquare />
                            Credentials for {stack}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                          {[SoftwareStack.Ubuntu, SoftwareStack.Debian].includes(
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
                                      <Input placeholder="Your Private Key" {...field} />
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
                                      <Input placeholder="Your VM  Port" {...field} />
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
                                      <Input placeholder="Your VM Host" {...field} />
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
                                      <Input placeholder="Your Username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <Button
                                type="button"
                                disabled={checkContributionPending}
                                onClick={() =>
                                  checkProductContribution({
                                    softwareStack: form.getValues("softwareStack") as SoftwareStack,
                                    credentials: {
                                      Username: form.getValues("credentials.Username"),
                                      Host: form.getValues("credentials.Host"),
                                      Port: form.getValues("credentials.Port"),
                                      Private_Key: form.getValues("credentials.Private_Key"),
                                    },
                                  })
                                }
                              >
                                {checkContributionPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Check connection
                              </Button>
                            </>
                          ) : (
                            <>
                              <FormField
                                control={control}
                                name="credentials.Connection_String"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Database Connection string</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Your connection string" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <Button
                                type="button"
                                disabled={checkContributionPending}
                                onClick={() =>
                                  checkProductContribution({
                                    softwareStack: form.getValues("softwareStack") as SoftwareStack,
                                    credentials: { Connection_String: form.getValues("credentials.Connection_String") },
                                  })
                                }
                              >
                                {checkContributionPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Check connection
                              </Button>
                            </>
                          )}
                        </CardContent>
                      </Card>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}

              <FormField
                control={form.control}
                name="infraProvider"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="inline-flex items-center gap-2">
                      <CloudCog />
                      Infrastructure Provider
                    </FormLabel>
                    <FormControl>
                      <Combobox
                        defaultValue={field.value}
                        options={Object.entries(InfraProviderEnum).map(([key, value]) => ({
                          value: value,
                          label: InfraProviderEnum[key as keyof typeof InfraProviderEnum],
                          image: infrastuctureProvidersLogosMap.get(
                            InfraProviderEnum[key as keyof typeof InfraProviderEnum],
                          ) as string,
                        }))}
                        onInputChange={field.onChange}
                        onValueChange={field.onChange}
                        selectedOptionPlaceholder="Select or type a provider"
                        selectedValuePlaceholder="Select an existing provider or create a new one by typing its name"
                        notFoundMessage={`Your provider will be used ${field.value}`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="inline-flex items-center gap-2">
                      <MonitorCog />
                      Machine Configuration Name (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Type your custom name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="region"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="inline-flex items-center gap-2">
                      <MapPinned />
                      Region
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                    <FormLabel className="inline-flex items-center gap-2">
                      <GalleryHorizontalEnd />
                      Version
                    </FormLabel>
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
                    <FormLabel className="inline-flex items-center gap-2">
                      <Cpu />
                      CPU
                    </FormLabel>
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
                    <FormLabel className="inline-flex items-center gap-2">
                      <MemoryStick />
                      RAM
                    </FormLabel>
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
                    <FormLabel className="inline-flex items-center gap-2">
                      <HardDrive />
                      Disk size
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Disk size input " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={addContributionPending}>
                {addContributionPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Contribute
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};
