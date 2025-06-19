import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  catId: z.coerce.number().min(1, 'Must be at least 1'),
  type: z.string().min(2).max(50),
})

export default function ResourceDialogCategories() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { catId: '', type: '' },
  })

  async function onSubmit(values) {
    const payload = { catId: values.catId, type: values.type }
    try {
      const res = await fetch(
        'https://ggra-resources-5f06c5a981f6.herokuapp.com/api/postCategory',
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
      )

      if (res.ok) {
        alert('Category created successfully')
        form.reset()
      } else if (res.status === 409) {
        alert('Category ID already exists')
      } else {
        alert(`Error creating category: ${res.status}`)
      }
    } catch (err) {
      console.error('submit category failed:', err)
      alert('Submission failed')
    }
  }

  return (
    <Sheet>
      <SheetTrigger className="absolute left-0 right-0 bottom-0 m-4 rounded-lg bg-gray-200 text-green-300 text-3xl shadow-lg font-bold border border-gray-300 hover:bg-gray-300">
        +
      </SheetTrigger>
      <SheetContent className="bg-gray-50">
        <SheetHeader>
          <SheetTitle>Add new category</SheetTitle>
          <SheetDescription>
            Enter the information for the new category. Press Submit once you
            are done.
          </SheetDescription>
        </SheetHeader>

        <div className="overflow-y-scroll px-5">
          <Form {...form}>
            <form id="categoryForm" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="catId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Category ID<span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="9" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
              <br />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name<span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Name" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <SheetFooter>
          <Button
            type="submit"
            form="categoryForm"
            className="bg-gray-200 border border-gray-300 hover:bg-gray-300 shadow-lg py-5"
          >
            Submit
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
