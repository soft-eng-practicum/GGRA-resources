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
  SheetClose,
} from '@/components/ui/sheet'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
  catId: z.coerce.number(),
  type: z
    .string()
    .min(2, 'Name should be more than 2 characters long')
    .max(50, 'Name should be less than 50 characters long'),
})

function GGRAFormField({
  form,
  name,
  labelName,
  textarea,
  placeholder,
  description,
  isRequired,
}) {
  return (
    <FormField
      control={form}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-md">
            {labelName}
            {isRequired && <span className="text-red-600">*</span>}
          </FormLabel>
          <FormControl>
            {!textarea ? (
              <Input placeholder={placeholder} {...field} />
            ) : (
              <Textarea placeholder={placeholder} {...field} />
            )}
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="text-red-600" />
        </FormItem>
      )}
    />
  )
}

function ResourceDialogCategories() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      catId: '',
      type: '',
    },
  })

  async function onSubmit(values) {
    const payload = {
      catId: values.catId,
      type: values.type,
    }

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
      //TODO: do something if push succeeds
    } else if (res.status === 409) {
      //TODO: do something if there's a push conflict
    } else {
      //TODO: show possible error
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
              <GGRAFormField
                form={form.control}
                name="catId"
                labelName="CategoryID"
                isRequired={true}
                placeholder="9"
              />
              <br />
              <GGRAFormField
                form={form.control}
                name="type"
                textarea={true}
                labelName="Name"
                placeholder="Enter Name"
              />
              <br />
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

export default ResourceDialogCategories
