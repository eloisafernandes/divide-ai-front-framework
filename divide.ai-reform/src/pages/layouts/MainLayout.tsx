import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/global/sidebar/Sidebar";
import { useSidebarToggle } from "@/hooks/UseSidebarToggle";

export default function MainLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { isOpen } = useSidebarToggle();
  console.log(isOpen);
  return (
    <>
      <Sidebar />
      <main
        className={cn(
          /* min-h-[calc(100vh_-_56px)] */
          "min-h-screen bg-divide-light dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
          isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
        {children}
      </main>
    </>
  );
}