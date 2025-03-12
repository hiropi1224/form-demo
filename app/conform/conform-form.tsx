"use client";

import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { Button, Loader, TextInput } from "@mantine/core";
import { useActionState } from "react";
import { formAction } from "~/app/actions";
import { formSchema } from "~/app/schema";
import { createToastCallbacks, withCallbacks } from "~/utils/form";

export function ConformForm() {
  const [lastResult, action, isPending] = useActionState(
    withCallbacks(
      formAction,
      createToastCallbacks({ loadingMessage: "Loading ..." }),
    ),
    undefined,
  );

  const [form, fields] = useForm({
    constraint: getZodConstraint(formSchema),
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
      <Button disabled={isPending} type="submit">
        {isPending && <Loader size="sm" mr={4} />}
        送信
      </Button>
    </form>
  );
}
