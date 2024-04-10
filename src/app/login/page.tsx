"use client";

import { signIn, useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

// credentials schema
const formSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export default function Login() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     router.replace("/");
  //   }
  // }, [session, status, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    // Attempt to sign in with the provided credentials
    const result = await signIn("credentials", {
      redirect: false, // Prevents redirecting to the callback URL automatically
      username: values.username,
      password: values.password,
    });

    setIsLoading(false);

    if (result?.error) {
      // Handle errors here. For example, show an error message.
      // This error message is generic. You might want to set state and display it in the UI.
      console.error(result.error);
    } else {
      // Handle success. For example, redirect the user or fetch session data.
      // Redirect to the homepage or user dashboard if login was successful
      router.replace("/");
      router.refresh();
    }
  }

  if (status == "unauthenticated") {
    return (
      <div className="flex justify-center items-center h-full pt-20">
        <div className="w-72 space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* password field */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lietotājvārds</FormLabel>
                    <FormControl>
                      <Input placeholder="Lietotājvārds" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* password field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parole</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Parole" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-8 flex justify-center">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Ielādē...
                    </>
                  ) : (
                    "Ienākt"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    );
  }
}
