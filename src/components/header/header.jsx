import Image from "next/image";
import Link from "next/link";
import logoImg from "../../../public/logo.jpg";
import { Coins } from "../coins/coins";

export async function Header() {

  return (
    <header className="w-full h-28 bg-[#DFEDD8] text-black px-24 mb-4">
      <div className="max-w-screen-xl mx-auto flex justify-center items-center h-28 sm:justify-between">
        <nav className="flex justify-center items-center gap-4">
          <Link href="/">
            <Image src={logoImg} alt="Logo do site" className="w-full" />
          </Link>

          <Link href={"/"}>Home</Link>
          <Link href={"/about"}>Sobre</Link>
          <Link href={"/privacyPolicy"}>Politica de privacidade</Link>
        </nav>
        <div className="hidden sm:flex justify-center items-center gap-3 flex-nowrap">
          <Coins />
        </div>
      </div>
    </header>
  );
}
