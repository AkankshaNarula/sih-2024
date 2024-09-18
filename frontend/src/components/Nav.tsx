import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";

export default function Nav() {
  return (
    <Navbar position="static" className="bg-slate-100">
      <NavbarBrand >
        <div className="flex flex-row  min-w-full justify-center">
          <p className="font-bold text-inherit text-2xl">Gail Limited</p>
        </div>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
      </NavbarContent>
    </Navbar>
  );
}
