import React, { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
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
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

const formSchema = z.object({
  id: z.number(),
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

export default function ResourceEditProviderDialog({ item, onSave, onClose }) {
  const [categories, setCategories] = useState([])
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 0,
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
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((data) => {
        const raw =
          typeof data.content === 'string'
            ? data.content
            : JSON.stringify(data.content)
        let parsed = []
        try {
          parsed = JSON.parse(raw)
        } catch (e) {
          console.error('Could not parse categories JSON', e)
        }
        setCategories(Array.isArray(parsed) ? parsed : [])
      })
      .catch((err) => console.error('fetch categories failed:', err))
  }, [])

  useEffect(() => {
    if (!item) return
    form.reset({
      id: item.id,
      catId: item.catId,
      name: item.name ?? '',
      description: item.description ?? '',
      street: item.street ?? '',
      city: item.city ?? '',
      state: item.state ?? '',
      zip: item.zip ?? '',
      phone: item.phone ?? '',
      website: item.website ?? '',
      email: item.email ?? '',
      lng: item.longitude ?? '',
      lat: item.latitude ?? '',
    })
  }, [item, form])

  const open = Boolean(item)

  async function onSubmit(values) {
    try {
      const res = await fetch('http://localhost:3000/api/editProvider', {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (res.ok) {
        onSave(values)
        onClose()
      } else {
        console.error('Edit failed', await res.json())
      }
    } catch (e) {
      console.error('Network error', e)
    }
  }

  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent className="bg-gray-50">
        <SheetHeader>
          <SheetTitle>Edit Resource</SheetTitle>
          <SheetDescription>Update fields and click Save.</SheetDescription>
        </SheetHeader>

        <div className="overflow-y-scroll px-5">
          <Form {...form}>
            <form id="editResourceForm" onSubmit={form.handleSubmit(onSubmit)}>
              <input type="hidden" {...form.register('id')} />

              <FormField
                control={form.control}
                name="catId"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>
                        Category<span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          defaultValue={
                            field.value != null ? String(field.value) : ''
                          }
                          onValueChange={(val) => field.onChange(Number(val))}
                        >
                          <SelectTrigger className="w-56">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-50">
                            {categories.length > 0 ? (
                              categories.map((cat) => (
                                <SelectItem
                                  className="hover:bg-gray-100"
                                  key={cat.catId}
                                  value={String(cat.catId)}
                                >
                                  {cat.type}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="">Loading…</SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    <br />
                  </>
                )}
              />

              {[
                { name: 'name', label: 'Name', isTextarea: false },
                { name: 'description', label: 'Description', isTextarea: true },
                { name: 'street', label: 'Street' },
                { name: 'city', label: 'City' },
                { name: 'state', label: 'State' },
                { name: 'zip', label: 'Zip' },
                { name: 'phone', label: 'Phone' },
                { name: 'website', label: 'Website' },
                { name: 'email', label: 'Email' },
                { name: 'lng', label: 'Longitude' },
                { name: 'lat', label: 'Latitude' },
              ].map(({ name, label, isTextarea }) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name}
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                          {isTextarea ? (
                            <Textarea {...field} value={field.value ?? ''} />
                          ) : (
                            <Input {...field} value={field.value ?? ''} />
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                      <br />
                    </>
                  )}
                />
              ))}
            </form>
          </Form>
        </div>

        <SheetFooter>
          <Button
            className="bg-gray-200 border border-gray-300 hover:bg-gray-300 shadow-lg py-5"
            type="submit"
            form="editResourceForm"
          >
            Save
          </Button>
          <SheetClose asChild>
            <Button
              className="bg-gray-200 border border-gray-300 hover:bg-gray-300 shadow-lg py-5"
              variant="ghost"
            >
              Cancel
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
