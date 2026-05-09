import { useUserSearch } from "../hooks/useUserSearch";
import { UserList } from "./UserList";

// UserSearchはHookを呼び出す → 返ってきた値を子コンポーネント(ここではUserList)に受け渡すのみ

export const UserSearch = () => {
  // ロジックを呼び出す → あくまでコンポーネント側はHookを呼び出すだけで、ロジックに関与しない
  const { query, setQuery, filteredUsers, loading } = useUserSearch();

  // 見た目（View）に流し込む
  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h1>ユーザー検索（Step 1）</h1>
      <UserList
        users={filteredUsers}
        query={query}
        onQueryChange={setQuery}
        loading={loading}
      />
    </div>
  );
};
