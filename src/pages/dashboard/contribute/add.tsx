import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";

import { ChevronLeftIcon, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const softwareStackOptions = [
  {
    value: "1",
    label: "PostgreSQL",
  },
  {
    value: "2",
    label: "MySQL",
  },
  {
    value: "3",
    label: "MongoDB",
  },
  {
    value: "4",
    label: "Debian",
  },
  {
    value: "5",
    label: "Ubuntu",
  },
  {
    value: "6",
    lable: "Milvus",
  },
];

const contributionSchema = z.object({
  infra: z.string(),
  machine_configuration: z.string().optional(),
  software_stack: z.string(),
  version: z.string(),
  cpu: z.string(),
  disk_size: z.string(),
  ram: z.string(),
  region: z.string(),
});

type contributionForm = z.infer<typeof contributionSchema>;

export const AddContributionFormPage = () => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(contributionSchema),
    defaultValues: {
      infra: "",
      machine_configuration: "",
      software_stack: "",
      version: "",
      cpu: "",
      disk_size: "",
      ram: "",
      region: "",
    },
  });
  const { control, formState, handleSubmit } = form;

  const onSubmit = (data: contributionForm) => {
    fetch("https://api.example.com/contributions", {
      method: "POST",
      body: JSON.stringify(data),
    });
  };
  return (
    <>
      <Button size="icon" onClick={() => navigate("/dashboard/main")}>
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
                name="infra"
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
                name="machine_configuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Machine configuration(Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Configuration"
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
                name="software_stack"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Software Stack</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {softwareStackOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
                name="disk_size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Disk Size</FormLabel>
                    <FormControl>
                      <Input placeholder="Disk Size" {...field} />
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
                      <Input placeholder="RAM" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Region</FormLabel>
                    <FormControl>
                      <Input placeholder="Region" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={formState.isSubmitting}>
                {formState.isSubmitting ? (
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
