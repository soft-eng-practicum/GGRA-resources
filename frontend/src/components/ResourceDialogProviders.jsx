import React, { useEffect, useState } from 'react'
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

const formSchema = z.object({
  catId: z.coerce.number({ invalid_type_error: 'Category is required' }),
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
          {description && (
            <div className="text-sm text-gray-500">{description}</div>
          )}
          <FormMessage className="text-red-600" />
        </FormItem>
      )}
    />
  )
}

export default function ResourceDialogProviders() {
  const [categories, setCategories] = useState([])
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

  useEffect(() => {
    fetch('http://localhost:3000/api/getCategories', { credentials: 'include' })
      .then((response) => {
        if (!response.ok) throw new Error(`Error ${response.status}`)
        return response.json()
      })
      .then((data) => {
        // data.content is the raw JSON string from backend
        const raw =
          typeof data.content === 'string'
            ? data.content
            : JSON.stringify(data.content)
        let parsed
        try {
          parsed = JSON.parse(raw)
        } catch {
          parsed = []
        }
        const cats = Array.isArray(parsed)
          ? parsed
          : parsed.content
            ? parsed.content
            : []
        setCategories(cats)
      })
      .catch((err) => console.error('fetch categories failed:', err))
  }, [])

  async function onSubmit(values) {
    const payload = {
      id: null,
      ...values,
      photo: null,
      uploadedPhoto: null,
      cat: null,
    }

    await fetch('http://localhost:3000/api/postProvider', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    // TODO: handle success, conflict, error
  }

  return (
    <Sheet>
      <SheetTrigger className="m-4 absolute bottom-0 left-0 right-0 rounded-lg bg-gray-200 text-green-300 text-3xl shadow-lg font-bold border border-gray-300 hover:bg-gray-300">
        +
      </SheetTrigger>
      <SheetContent className="bg-gray-50">
        <SheetHeader>
          <SheetTitle>Add new resource</SheetTitle>
          <SheetDescription>Enter the information below.</SheetDescription>
        </SheetHeader>

        <div className="overflow-y-scroll px-5">
          <Form {...form}>
            <form id="resourceForm" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="catId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Category<span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        defaultValue={
                          field.value != null ? String(field.value) : ''
                        }
                        onValueChange={(value) => field.onChange(Number(value))}
                      >
                        <SelectTrigger className="w-56">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-50">
                          {categories.map((cat) => (
                            <SelectItem
                              className="hover:bg-gray-100"
                              key={cat.catId}
                              value={String(cat.catId)}
                            >
                              {cat.type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <GGRAFormField
                form={form.control}
                name="name"
                labelName="Name"
                isRequired
                placeholder="Example Resource"
              />
              <GGRAFormField
                form={form.control}
                name="description"
                textarea
                labelName="Description"
                placeholder="Enter description"
              />
              <GGRAFormField
                form={form.control}
                name="street"
                labelName="Street Address"
                placeholder="1234 Nonesuch Road"
              />
              <GGRAFormField
                form={form.control}
                name="city"
                labelName="City"
                placeholder="Anytown"
              />
              <GGRAFormField
                form={form.control}
                name="state"
                labelName="State"
                placeholder="GA"
              />
              <GGRAFormField
                form={form.control}
                name="zip"
                labelName="Zip Code"
                placeholder="12345"
              />
              <GGRAFormField
                form={form.control}
                name="phone"
                labelName="Phone Number"
                placeholder="(123) 123-1234"
              />
              <GGRAFormField
                form={form.control}
                name="website"
                labelName="Website"
                placeholder="https://example.com"
              />
              <GGRAFormField
                form={form.control}
                name="email"
                labelName="E-Mail"
                placeholder="you@example.com"
              />
              <GGRAFormField
                form={form.control}
                name="lng"
                labelName="Longitude"
                isRequired
                placeholder="-12.1234"
              />
              <GGRAFormField
                form={form.control}
                name="lat"
                labelName="Latitude"
                isRequired
                placeholder="43.4321"
              />
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
