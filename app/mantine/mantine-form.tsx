"use client";

import { Button, Loader, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useTransition } from "react";
import { toast } from "sonner";
import type { z } from "zod";
import { action } from "~/app/actions";
import { formSchema } from "~/app/schema";

export function MantineForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      message: "",
    },

    validate: zodResolver(formSchema),
    validateInputOnBlur: true,
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      try {
        await action(values);
        toast.success("success!");
      } catch {
        toast.error("error!");
      }
    });
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <TextInput
        required
        withAsterisk
        label="Email"
        placeholder="your@email.com"
        name="email"
        type="email"
        key={form.key("email")}
        {...form.getInputProps("email")}
      />
      <TextInput
        required
        withAsterisk
        label="Message"
        placeholder="message"
        name="message"
        type="text"
        key={form.key("message")}
        {...form.getInputProps("message")}
      />
      <Button disabled={isPending} type="submit">
        {isPending && <Loader size="sm" mr="md" />}
        送信
      </Button>
    </form>
  );
}
