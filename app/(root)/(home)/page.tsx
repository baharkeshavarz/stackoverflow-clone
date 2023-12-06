import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <div className="h2-bold">
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
}
