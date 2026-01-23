import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export async function TopNav() {
  return (
    <nav className="flex min-h-(--topnav-h) w-full items-center justify-between bg-sidebar px-6 font-semibold text-lg text-sidebar-foreground md:px-10">
      <div>Selecciona-RRHH</div>

      <div className="flex gap-4 md:gap-6">
        <ThemeToggle />
        <div className="flex flex-row items-center gap-4">
          {/* {session ? ( */}
          {/*   <Button>Salir</Button> */}
          {/* ) : ( */}
          {/*   <Button nativeButton={false} render={<Link href={"/sign-in"} />}> */}
          {/*     Acceder */}
          {/*   </Button> */}
          {/* )} */}
        </div>
      </div>
    </nav>
  );
}
