"use client";

import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { Button, Loader, TextInput } from "@mantine/core";
import { redirect } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { formAction } from "~/app/actions";
import { formSchema } from "~/app/schema";

export function ConformForm() {
  const [lastResult, action, isPending] = useActionState(formAction, undefined);

  const [form, fields] = useForm({
    constraint: getZodConstraint(formSchema),
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: formSchema });
    },
    shouldValidate: "onBlur",
  });

  useEffect(() => {
    if (lastResult && lastResult.status === "error") {
      toast("error");
    } else if (lastResult && lastResult.status === "success") {
      toast("success");
      redirect("/success");
    }
  }, [lastResult]);

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
