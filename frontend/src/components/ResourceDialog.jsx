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
  name: z.string().min(2).max(50),
  description: z.string(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  phone: z.string(),
  website: z.string(),
  email: z.string(),
  lng: z.string(),
  lat: z.string(),
})

function GGRAFormField(props) {
  return (
    <FormField
      control={props.form}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-md">{props.labelName}</FormLabel>
          <FormControl>
            {!props.textarea ? (
              <Input placeholder={props.placeholder} {...field} />
            ) : (
              <Textarea placeholder={props.placeholder} {...field} />
            )}
          </FormControl>
          {props.description && (
            <FormDescription>{props.description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

function ResourceDialog() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      phone: '',
      website: '',
      email: '',
      lng: '',
      lat: '',
    },
  })

  function onSubmit(values) {
    console.log(values)
    closeRef.current?.click()
  }

  return (
    <Sheet>
      <SheetTrigger className="m-4 rounded-lg bg-gray-200 text-green-300 text-3xl shadow-lg font-bold border border-gray-300 hover:bg-gray-300">
        +
      </SheetTrigger>
      <SheetContent className="bg-gray-50 overflow-y-scroll px-5">
        <SheetHeader className="px-0">
          <SheetTitle>Add new resource</SheetTitle>
          <SheetDescription>
            Enter the information for the new resource. Press Submit once you
            are done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form id="resourceForm" onSubmit={form.handleSubmit(onSubmit)}>
            <GGRAFormField
              form={form.control}
              name="name"
              labelName="Name"
              placeholder="Example Resource"
            />
            <br />
            <GGRAFormField
              form={form.control}
              name="description"
              textarea={true}
              labelName="Description"
              placeholder="Enter description"
            />
            <br />
            <GGRAFormField
              form={form.control}
              name="street"
              labelName="Street Address"
              placeholder="1234 Nonesuch Road"
            />
            <br />
            <GGRAFormField
              form={form.control}
              name="city"
              labelName="City"
              placeholder="Anytown"
            />
            <br />
            <GGRAFormField
              form={form.control}
              name="state"
              labelName="State"
              placeholder="GA"
            />
            <br />
            <GGRAFormField
              form={form.control}
              name="zip"
              labelName="Zip Code"
              placeholder="12345"
            />
            <br />
            <GGRAFormField
              form={form.control}
              name="phone"
              labelName="Phone Number"
              placeholder="(123) 123-1234"
            />
            <br />
            <GGRAFormField
              form={form.control}
              name="website"
              labelName="Website"
              placeholder="https://example.com"
            />
            <br />
            <GGRAFormField
              form={form.control}
              name="email"
              labelName="E-Mail"
              placeholder="placeholder@example.com"
            />
            <br />
            <GGRAFormField
              form={form.control}
              name="lng"
              labelName="Longitude"
              placeholder="-12.1234"
            />
            <br />
            <GGRAFormField
              form={form.control}
              name="lat"
              labelName="Latitude"
              placeholder="43.4321"
            />
            <br />
          </form>
        </Form>
        <SheetFooter>
          <Button
            type="submit"
            form="resourceForm"
            className="bg-gray-200 border border-gray-300 hover:bg-gray-300 shadow-lg py-5"
          >
            Submit
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default ResourceDialog
