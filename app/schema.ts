import { z } from "zod";

export const formSchema = z.object({
  email: z
    .string({ required_error: "メールアドレスは必須です" })
    .email("メールアドレスを正しく入力してください"),
  message: z
    .string({ required_error: "メッセージは必須です" })
    .min(4, "メッセージが短すぎます")
    .max(20, "メッセージが長すぎます"),
});
