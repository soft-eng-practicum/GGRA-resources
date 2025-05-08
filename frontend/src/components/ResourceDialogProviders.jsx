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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const validCategoryIDs = [1, 2, 4, 5, 6, 7, 8, 9, 11]

const formSchema = z.object({
  catId: z.coerce
    .number({
      invalid_type_error: 'Category is required',
    })
    .refine((val) => validCategoryIDs.includes(val), {
      message: 'Invalid category selected',
    }),
  name: z
    .string()
    .min(2, 'Name should be more than 2 characters long')
    .max(50, 'Name should be less than 50 characters long'),
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

function ResourceDialogProviders() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      catId: undefined,
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

  async function onSubmit(values) {

    const payload = {
      id: null,
      catId: values.catId,
      name: values.name,
      description: values.description,
      street: values.street,
      city: values.city,
      state: values.state,
      zip: values.zip,
      phone: values.phone,
      website: values.website,
      email: values.email,
      photo: null,
      lng: values.lng,
      lat: values.lat,
      uploadedPhoto: null,
      cat: null,
    }

    const res = await fetch('http://localhost:3000/api/postProvider', { //TODO: Change localhost to server URL once in prod
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

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
      <SheetTrigger className="m-4 absolute bottom-0 left-0 right-0 rounded-lg bg-gray-200 text-green-300 text-3xl shadow-lg font-bold border border-gray-300 hover:bg-gray-300">
        +
      </SheetTrigger>
      <SheetContent className="bg-gray-50">
        <SheetHeader>
          <SheetTitle>Add new resource</SheetTitle>
          <SheetDescription>
            Enter the information for the new resource. Press Submit once you
            are done.
          </SheetDescription>
        </SheetHeader>
        <div className="overflow-y-scroll px-5">
          <Form {...form}>
            <form id="resourceForm" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="catId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">
                      Category<span className="text-red-600">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="w-28"
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the category this resouce belongs to" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-50">
                        <SelectItem value="1" className="hover:bg-gray-100">
                          Mentoring Services
                        </SelectItem>
                        <SelectItem value="2" className="hover:bg-gray-100">
                          Job Development
                        </SelectItem>
                        <SelectItem value="4" className="hover:bg-gray-100">
                          Government Agencies
                        </SelectItem>
                        <SelectItem value="5" className="hover:bg-gray-100">
                          Probation / Parole
                        </SelectItem>
                        <SelectItem value="6" className="hover:bg-gray-100">
                          Housing Resources
                        </SelectItem>
                        <SelectItem value="7" className="hover:bg-gray-100">
                          Education Mentoring
                        </SelectItem>
                        <SelectItem value="8" className="hover:bg-gray-100">
                          Religious Organizations
                        </SelectItem>
                        <SelectItem value="9" className="hover:bg-gray-100">
                          Healthcare / Recovery
                        </SelectItem>
                        <SelectItem value="11" className="hover:bg-gray-100">
                          Transportation
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
              <br />
              <GGRAFormField
                form={form.control}
                name="name"
                labelName="Name"
                isRequired={true}
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
                isRequired={true}
                placeholder="-12.1234"
              />
              <br />
              <GGRAFormField
                form={form.control}
                name="lat"
                labelName="Latitude"
                isRequired={true}
                placeholder="43.4321"
              />
              <br />
            </form>
          </Form>
        </div>
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

export default ResourceDialogProviders
