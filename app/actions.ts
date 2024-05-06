"use server";

import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { formSchema } from "~/app/schema";

export async function formAction(prevState: unknown, formData: FormData) {
  console.log("server!!!");
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const submission = parseWithZod(formData, { schema: formSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  redirect("/success");
}
