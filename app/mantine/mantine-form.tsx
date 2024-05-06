"use client";

import { Button, Text, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useActionState } from "react";
import { formAction } from "~/app/actions";
import { formSchema } from "~/app/schema";

export function MantineForm() {
  const [state, action, isPending] = useActionState(formAction, undefined);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      message: "",
    },

    validate: zodResolver(formSchema),
    // validateInputOnChange: true,
    validateInputOnBlur: true,
  });

  return (
    <form
      action={action}
      onSubmit={(e) => {
        try {
          const data = new FormData(e.currentTarget);
          const formData = Object.fromEntries(data);
          const validatedField = formSchema.safeParse(formData);
          if (!validatedField.success) {
            throw new Error("invalidated");
          }
        } catch (error) {
          e.preventDefault();
        }
      }}
    >
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
      <Button loading={isPending} type="submit">
        送信
      </Button>
    </form>
  );
}
