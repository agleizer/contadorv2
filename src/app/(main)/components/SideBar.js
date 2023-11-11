"use client"

import Image from "next/image";
import ItemSideBar from "./sideBar-components/ItemSideBar";
import {CameraIcon, ListBulletIcon, Squares2X2Icon, UserIcon} from "@heroicons/react/24/outline";
import Link from 'next/link';

export default function SideBar() {

  return (
    <aside
      className="fixed z-10 pt-10 flex flex-col w-64 top-0 left-0 h-screen p-5 text-left text-sm
  bg-gradient-to-b from-blue-Atech-claro to-blue-Atech-escuro text-white z-10"
    >
      <div className="flex justify-center items-center mb-4">
        <Image
          width={50}
          height={50}
          src="/logo_atech_branco.png"
        />
        <Image width={20} height={20} src="/+.png" className="mx-4"/>
        <Image width={50} height={50} src="/MCK_horizontal_branca-012.png" />
      </div>
      <nav className="space-y-3">
        <h1 className="text-lg text-center">CONTADOR DE GENTE</h1>

        <div className="text-xs pb-2">
          <a>MENU</a>
        </div>
        <ItemSideBar
          icon={Squares2X2Icon}
          items={[
          <Link href="/porlocal">Por local</Link>,
          <Link href="/calendario">Por período</Link>,
          "Estatísticas"]}
        >
          Dashboard
        </ItemSideBar>
        <ItemSideBar
          icon={UserIcon}
          items={["Pf. Fábio"]}
        >
          Usuários
        </ItemSideBar>
        <ItemSideBar
          icon={ListBulletIcon}
          items={["Exportar XLS", "Exportar PDF", "Exportar PNG"]}
        >
          Relatórios
        </ItemSideBar>
        <ItemSideBar
          icon={CameraIcon}
          items={[
            "Prédio",
            "Primeiro andar",
            "Segundo andar",
            "Terceiro andar",
          ]}
        >
          Câmeras
        </ItemSideBar>
      </nav>
    </aside>
  );
}
