"use client";

import { useUser } from "entities/user";
import Link from "next/link";
import { paths } from "shared/navigation";
import { Button } from "shared/ui/button";
import { Icons } from "shared/ui/icons";

export const Header = () => {
  const { user } = useUser();

  return (
    <header className="py-4">
      <div className="wrapper flex items-center justify-between">
        <h1 className="text-primary font-black text-3xl">Сад Для Вас</h1>
        <nav>
          <ul className="flex gap-8">
            <li>
              <Link href={paths.home}>Главная</Link>
            </li>
            <li>
              <Link href={paths.home}>О нас</Link>
            </li>
            <li>
              <Link href={paths.home}>Оплата и доставка</Link>
            </li>
            <li>
              <Link href={paths.home}>Отзывы</Link>
            </li>
            <li>
              <Link href={paths.home}>Блог</Link>
            </li>
          </ul>
        </nav>
        <div className="flex gap-1 items-center">
          <Button variant="ghost" size="icon">
            <Icons.search />
          </Button>
          <Button variant="ghost" size="icon">
            <Icons.cart />
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link
              href={user ? paths.home : paths.signIn}
              aria-label={user ? "Профиль" : "Войти"}
            >
              <Icons.user />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
