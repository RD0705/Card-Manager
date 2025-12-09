import { UserProfile } from "@clerk/nextjs";

export default function Account() {
  return (
    <div className="flex justify-center items-center py-12">
      <UserProfile path="/account" />
    </div>
  );
}
