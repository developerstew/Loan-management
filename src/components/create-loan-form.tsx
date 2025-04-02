"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const loanFormSchema = z.object({
  borrowerName: z.string().min(2, {
    message: "Borrower name must be at least 2 characters.",
  }),
  borrowerEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Please enter a valid amount (e.g., 1000.00)",
  }),
  interestRate: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Please enter a valid interest rate (e.g., 5.00)",
  }),
  term: z.string().regex(/^\d+$/, {
    message: "Please enter a valid term in months.",
  }),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Please enter a valid date (YYYY-MM-DD)",
  }),
  description: z.string().optional(),
})

export type LoanFormValues = z.infer<typeof loanFormSchema>

export function CreateLoanForm() {
  const form = useForm<LoanFormValues>({
    resolver: zodResolver(loanFormSchema),
    defaultValues: {
      borrowerName: "",
      borrowerEmail: "",
      amount: "",
      interestRate: "",
      term: "",
      startDate: "",
      description: "",
    },
  })

  async function onSubmit(values: LoanFormValues) {
    // We'll implement this later with the API
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="borrowerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Borrower Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="borrowerEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Borrower Email</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@example.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loan Amount</FormLabel>
                <FormControl>
                  <Input placeholder="10000.00" {...field} />
                </FormControl>
                <FormDescription>Enter the amount in dollars</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="interestRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interest Rate (%)</FormLabel>
                <FormControl>
                  <Input placeholder="5.00" {...field} />
                </FormControl>
                <FormDescription>Enter the annual interest rate</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="term"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Term (Months)</FormLabel>
                <FormControl>
                  <Input placeholder="12" {...field} />
                </FormControl>
                <FormDescription>Enter the loan term in months</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Description (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Add any additional notes about the loan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end space-x-4">
          <Button type="submit">Create Loan</Button>
        </div>
      </form>
    </Form>
  )
}
