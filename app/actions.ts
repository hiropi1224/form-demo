"use server";

import { parseWithZod } from "@conform-to/zod";
import type { z } from "zod";
import { formSchema } from "~/app/schema";

export async function formAction(prevState: unknown, formData: FormData) {
  console.log("server!!!");
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const submission = parseWithZod(formData, { schema: formSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  return submission.reply();
}

export async function action(values: z.infer<typeof formSchema>) {
  console.log("server!!!");
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // throw new Error("error");
  return { message: "" };
}
