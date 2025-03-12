"use server";

import { parseWithZod } from "@conform-to/zod";
import type { z } from "zod";
import { formSchema } from "~/app/schema";
import type { ActionState } from "~/utils/form";

export async function formAction(
  prevState: unknown,
  formData: FormData,
): Promise<ActionState> {
  console.log("server!!!");
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const submission = parseWithZod(formData, { schema: formSchema });

  if (submission.status !== "success") {
    return {
      status: "ERROR",
      error: "error",
      data: submission.reply(),
      message: "Error",
    };
  }

  return {
    status: "SUCCESS",
    data: submission.reply(),
    message: "Success",
    error: null,
  };
}

export async function action(values: z.infer<typeof formSchema>) {
  console.log("server!!!");
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // throw new Error("error");
  return { message: "" };
}
