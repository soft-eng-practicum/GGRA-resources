import React, { useEffect } from 'react'
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
} from '@/components/ui/sheet'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const formSchema = z.object({
  catId: z.number(),
  type: z.string().min(2).max(50),
})

export default function ResourceEditCategoryDialog({ item, onSave, onClose }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { catId: '', type: '' },
  })

  useEffect(() => {
    if (item) {
      form.reset({ catId: item.catId, type: item.type })
    }
  }, [item, form])

  const open = Boolean(item)

  async function onSubmit(values) {
    try {
      const resp = await fetch('http://localhost:3000/api/editCategory', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(values),
      })
      if (resp.ok) {
        onSave(values.type)
      } else {
        console.error('Edit failed', await resp.json())
      }
    } catch (e) {
      console.error('Network error', e)
    }
  }

  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent className="bg-gray-50">
        <SheetHeader>
          <SheetTitle>Edit Category</SheetTitle>
          <SheetDescription>Change the name, then Save.</SheetDescription>
        </SheetHeader>

        <div className="px-5">
          <Form {...form}>
            <form id="editCategoryForm" onSubmit={form.handleSubmit(onSubmit)}>
              <input
                type="hidden"
                {...form.register('catId', { valueAsNumber: true })}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input placeholder="New name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <SheetFooter>
          <Button type="submit" form="editCategoryForm">
            Save
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
