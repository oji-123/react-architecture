export type UserType = "ADMIN" | "GENERAL";

// 型定義とは別に定義を行う。
// API実行前のundfinedの状態を安全に初期化する目的で利用する。

export class User {
  // Tips:constructor(public readonly id: number)などのように記載もできるが、
  // 最近のビルドツールではTS独自の記述変換をパフォーマンスの観点から嫌う傾向があるらしい。
  // 以下のように素直に記載。
  public readonly id: number;
  public readonly name: string;
  public readonly type: UserType;

  constructor(id: number, name: string, type: UserType) {
    this.id = id;
    this.name = name;
    this.type = type;
  }

  // 1. 日本語変換のロジック（UIコンポーネントに書かない）
  get typeLabel(): string {
    return this.type === "ADMIN" ? "管理者" : "一般ユーザー";
  }

  // 2. 「空の状態」を定義（UIを undefined の呪いから救う）
  static empty(): User { // 現状では利用していない。仮にUser[]型で受け取る場合は、空配列([users, setUsers] = useState<User[]>([]);)を指定する。
    return new User(0, "読み込み中...", "GENERAL");
  }

  // 3. APIレスポンスからのファクトリ（マッピングと消毒）
  // 以下のように受け取ったany型のオブジェクトからUserクラスのインスタンスを生成する。
  static fromApi(data: any): User { // anyをどのように扱うか？unknownなどでも回避することは可能？
    return new User(
      data.id ?? 0,
      data.name ?? "名前なし",
      data.type ?? "GENERAL"
    );
  }
}
