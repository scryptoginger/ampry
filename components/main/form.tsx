"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const FormSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address")
    .min(5, { message: "Email must be at least 5 characters" }), //redundant??
  //we could add .refine here to further validate the email, perhaps add a 2nd email input field to ensure they match?

  comments: z.string().optional(),
});

export function InputForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      comments: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      debugger;
      // Send data to the API endpoint
      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        form.reset();
        setFormSubmitted(true);
        toast.success(
          <div>
            <div>You submitted the following values:</div>
            <pre className="mt-2 w-full rounded-md p-2 bg-foreground text-background">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        );
        console.log({ data });
      } else {
        // Handle API errors
        toast.error("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("An unexpected error has occurred. Please try again.");
    }
  } //TODO: improve error handling and logging

  return (
    <>
      {formSubmitted ? (
        <div className="text-center p-6">
          <h2 className="text-2xl font-semibold mb-4">Thank You!</h2>
          <p>Your message has been successfully sent.</p>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Trogdor Dragon" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="trogdor@burninatingthecountryside.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comments</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Trogdor was a man..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      )}
    </>
  );
}
