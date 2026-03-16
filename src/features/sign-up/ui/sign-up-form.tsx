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
import { type SignUpValues, signUpSchema } from "../model/schema";

export function SignUpForm() {
  const router = useRouter();
  const { setUser } = useUser();

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  async function onSubmit(values: SignUpValues) {
    try {
      const sdk = createSdk();

      const registrationToken = await sdk.auth.register(
        "customer",
        "emailpass",
        {
          email: values.email,
          password: values.password,
        },
      );

      const regSdk = createSdk({ token: registrationToken });
      await regSdk.store.customer.create({
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        phone: values.phone,
      });

      const loginResult = await sdk.auth.login("customer", "emailpass", {
        email: values.email,
        password: values.password,
      });

      if (typeof loginResult !== "string") {
        toast.error("Требуются дополнительные шаги авторизации.");
        return;
      }

      const token = loginResult;
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
      toast.error(
        "Не удалось зарегистрироваться. Проверьте данные и попробуйте снова.",
      );
    }
  }

  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
  } = form;

  return (
    <div className="mx-auto w-full max-w-md px-4 py-10">
      <h2 className="text-2xl font-black">Регистрация</h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FieldSet>
          <FieldGroup>
            <div className="flex gap-5">
              <Field data-invalid={!!errors.first_name}>
                <FieldLabel className="flex flex-col w-full items-start">
                  <FieldTitle>Имя</FieldTitle>
                  <FieldContent className="w-full">
                    <Input
                      aria-invalid={!!errors.first_name}
                      placeholder="Иван"
                      {...register("first_name")}
                    />
                    <FieldError
                      errors={[{ message: errors.first_name?.message }]}
                    />
                  </FieldContent>
                </FieldLabel>
              </Field>

              <Field data-invalid={!!errors.last_name}>
                <FieldLabel className="flex flex-col w-full items-start">
                  <FieldTitle>Фамилия</FieldTitle>
                  <FieldContent className="w-full">
                    <Input
                      aria-invalid={!!errors.last_name}
                      placeholder="Иванов"
                      {...register("last_name")}
                    />
                    <FieldError
                      errors={[{ message: errors.last_name?.message }]}
                    />
                  </FieldContent>
                </FieldLabel>
              </Field>
            </div>
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

            <Field data-invalid={!!errors.phone}>
              <FieldLabel className="flex flex-col w-full items-start">
                <FieldTitle>Телефон</FieldTitle>
                <FieldContent className="w-full">
                  <Input
                    type="tel"
                    autoComplete="tel"
                    aria-invalid={!!errors.phone}
                    placeholder="+375291673651"
                    {...register("phone")}
                  />
                  <FieldError errors={[{ message: errors.phone?.message }]} />
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
                      autoComplete="new-password"
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

            <Field data-invalid={!!errors.repeatPassword}>
              <FieldLabel className="flex flex-col w-full items-start">
                <FieldTitle>Повторите пароль</FieldTitle>
                <FieldContent className="w-full">
                  <div className="flex gap-2">
                    <Input
                      type={showRepeatPassword ? "text" : "password"}
                      autoComplete="new-password"
                      aria-invalid={!!errors.repeatPassword}
                      placeholder={
                        showRepeatPassword ? "StrongPassword" : "••••••••"
                      }
                      {...register("repeatPassword")}
                    />
                    <Button
                      onClick={() => setShowRepeatPassword((prev) => !prev)}
                      size="icon"
                      type="button"
                    >
                      {createElement(
                        Icons[showRepeatPassword ? "eyeOff" : "eye"],
                        {
                          className: "stroke-white",
                        },
                      )}
                    </Button>
                  </div>
                  <FieldError
                    errors={[{ message: errors.repeatPassword?.message }]}
                  />
                </FieldContent>
              </FieldLabel>
            </Field>

            <p className="mt-1 text-sm text-muted-foreground">
              Уже есть аккаунт?{" "}
              <Link
                className="underline underline-offset-4"
                href={paths.signIn}
              >
                Войти
              </Link>
            </p>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Создаем..." : "Создать аккаунт"}
            </Button>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
}
