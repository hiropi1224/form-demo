"use client";

import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { Button, TextInput } from "@mantine/core";
import { useActionState } from "react";
import { formAction } from "~/app/actions";
import { formSchema } from "~/app/schema";

export function ConformForm() {
  const [state, action, isPending] = useActionState(formAction, undefined);

  const [form, fields] = useForm({
    constraint: getZodConstraint(formSchema),
    lastResult: state,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: formSchema });
    },
    shouldValidate: "onBlur",
  });

  return (
    <form {...getFormProps(form)} action={action}>
      <TextInput
        required
        withAsterisk
        label="Email"
        placeholder="your@email.com"
        {...getInputProps(fields.email, { type: "email" })}
        error={fields.email.errors}
      />
      <TextInput
        required
        withAsterisk
        label="Message"
        placeholder="message"
        {...getInputProps(fields.message, { type: "text" })}
        error={fields.message.errors}
      />
      <Button loading={isPending} type="submit">
        ログイン
      </Button>
    </form>
  );
}
