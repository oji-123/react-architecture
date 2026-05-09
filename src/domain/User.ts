import { z } from "zod";

// 1. スキーマ定義：APIが値を返さない場合のデフォルト値もここで定義
export const UserSchema = z.object({
  id: z.number(), // defaultを記載していない場合は、値必須
  name: z.string().default("名前なし"), // 空文字とかを検討
  type: z.enum(["ADMIN", "GENERAL"]).default("GENERAL"),
});

// 2. 型の抽出（スキーマ定義を元に、Zodが定義した構造から自動で型を生成）
export type User = z.infer<typeof UserSchema>; // 単一の型
export const UserListSchema = z.array(UserSchema); // 配列の型

// 3. ビジネスロジック（純粋関数）
export const getUserTypeLabel = (type: User["type"]): string => {
  return type === "ADMIN" ? "管理者" : "一般ユーザー";
};

// 4. 初期状態の定義
export const EMPTY_USER: User = {
  id: 0,
  name: "読み込み中...",
  type: "GENERAL",
};
