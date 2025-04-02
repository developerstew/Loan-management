import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CreateLoanForm } from "@/components/create-loan-form"
import Link from "next/link"

export default function CreateLoanPage() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Create New Loan</CardTitle>
              <CardDescription>Enter the loan details below</CardDescription>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/loans">Cancel</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <CreateLoanForm />
        </CardContent>
      </Card>
    </div>
  )
}
