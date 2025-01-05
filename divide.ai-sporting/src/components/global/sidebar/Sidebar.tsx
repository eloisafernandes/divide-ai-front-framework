import { PanelsTopLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu } from "@/components/global/sidebar/Menu";
import { useSidebarToggle } from "@/hooks/UseSidebarToggle";
import { SidebarToggle } from "@/components/global/sidebar/SidebarToggle";
import { Link } from "react-router-dom";

export function Sidebar() {
  // Obtém o estado e a função de toggle do hook useSidebarToggle
  const { isOpen, setIsOpen } = useSidebarToggle();

  // Checa se o estado está disponível
  if (isOpen === undefined) return null;

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        isOpen === false ? "w-[90px]" : "w-72"
      )}
    >
      {/* Passa o estado isOpen e a função setIsOpen corretamente */}
      <SidebarToggle isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            isOpen === false ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <Link className="flex items-center gap-2" to="/">
            <PanelsTopLeft className="w-6 h-6 mr-1" />
            <h1
              className={cn(
                "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
                isOpen === false
                  ? "-translate-x-96 opacity-0 hidden"
                  : "translate-x-0 opacity-100"
              )}
            >
              Divide.ai
            </h1>
          </Link>
        </Button>
        <Menu isOpen={isOpen} />
      </div>
    </aside>
  );
}
