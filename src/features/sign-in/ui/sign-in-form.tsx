"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "entities/user";
import { useUser } from "entities/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createElement, useState } from "react";
import { useForm } from "react-hook-form";
import { AUTH_TOKEN_COOKIE } from "shared/config/auth";
import { setClientCookie } from "shared/lib/client-cookie";
import { createSdk } from "shared/lib/sdk";
import { paths } from "shared/navigation";
import { Button } from "shared/ui/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "shared/ui/field";
import { Icons } from "shared/ui/icons";
import { Input } from "shared/ui/input";
import { toast } from "sonner";
import { type SignInValues, signInSchema } from "../model/schema";

export function SignInForm() {
  const router = useRouter();
  const { setUser } = useUser();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: SignInValues) {
    try {
      const sdk = createSdk();
      const result = await sdk.auth.login("customer", "emailpass", values);

      if (typeof result !== "string") {
        toast.error("Требуются дополнительные шаги авторизации.");
        return;
      }

      const token = result;
      setClientCookie(AUTH_TOKEN_COOKIE, token, {
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAgeSeconds: 60 * 60 * 24 * 30,
      });

      const authed = createSdk({ token });
      const { customer } = await authed.store.customer.retrieve();
      setUser(customer as User);

      router.push(paths.home);
      router.refresh();
    } catch {
      toast.error("Неверный email или пароль.");
    }
  }

  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
  } = form;

  return (
    <div className="mx-auto w-full max-w-md px-4 py-10">
      <h2 className="text-2xl font-black">Вход</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Нет аккаунта?{" "}
        <Link className="underline underline-offset-4" href={paths.signUp}>
          Зарегистрироваться
        </Link>
      </p>

      <form className="mt-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        <FieldSet>
          <FieldGroup>
            <Field data-invalid={!!errors.email}>
              <FieldLabel className="flex flex-col w-full items-start">
                <FieldTitle>Email</FieldTitle>
                <FieldContent className="w-full">
                  <Input
                    type="email"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    placeholder="example@gmail.com"
                    {...register("email")}
                  />
                  <FieldError errors={[{ message: errors.email?.message }]} />
                </FieldContent>
              </FieldLabel>
            </Field>

            <Field data-invalid={!!errors.password}>
              <FieldLabel className="flex flex-col w-full items-start">
                <FieldTitle>Пароль</FieldTitle>
                <FieldContent className="w-full">
                  <div className="flex gap-2">
                    <Input
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      aria-invalid={!!errors.password}
                      placeholder={showPassword ? "StrongPassword" : "••••••••"}
                      {...register("password")}
                    />
                    <Button
                      onClick={() => setShowPassword((prev) => !prev)}
                      size="icon"
                      type="button"
                    >
                      {createElement(Icons[showPassword ? "eyeOff" : "eye"], {
                        className: "stroke-white",
                      })}
                    </Button>
                  </div>
                  <FieldError
                    errors={[{ message: errors.password?.message }]}
                  />
                </FieldContent>
              </FieldLabel>
            </Field>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Входим..." : "Войти"}
            </Button>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
}
