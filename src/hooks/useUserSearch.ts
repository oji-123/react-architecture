import { useState, useEffect } from "react";
import { User } from "../domain/User";
import { fetchUsers } from "../infrastructure/UserFetcher";

export const useUserSearch = () => {
  // ここで返ってきているUserはすでに初期化のロジックを通っているため、undefinedのチェックが完了した状態。
  // usersをusers.name?のようにundefinedチェックする必要がなくなる。
  const [users, setUsers] = useState<User[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers().then(data => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  // 以下は、このHook内のstateの状態が変わった場合、毎回再計算されている。
  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(query.toLowerCase())
  );

  return { query, setQuery, filteredUsers, loading };
};
