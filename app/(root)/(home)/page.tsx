import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <div>applicatin1</div>
      <div className="h1-bold">
        applicatin
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
}
