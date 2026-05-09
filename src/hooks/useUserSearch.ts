import { useState, useEffect } from "react";

// APIから返ってくるデータの型定義 → 共通化できるものはTypes管理？
type User = {
  id: number;
  name: string;
  email: string;
};

export const useUserSearch = () => {
  const [users, setUsers] = useState<User[]>([]); // 全データ
  const [query, setQuery] = useState("");         // 検索窓の入力値
  const [loading, setLoading] = useState(true);   // ローディング状態

  // コンポーネントのマウント時に1回だけ実行
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  // 以下のような処理ロジックをHookに逃がすことで、コンポーネント側はデータの表示に専念
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(query.toLowerCase())
  );

  return {
    query,
    setQuery,
    filteredUsers,
    loading,
  };
};
