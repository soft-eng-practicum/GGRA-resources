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
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const formSchema = z.object({
  catId: z.number(),
  type: z
    .string()
    .min(2, 'Name should be at least 2 characters')
    .max(50, 'Name should be under 50 characters'),
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
      const resp = await fetch(
        'https://ggra-resources-5f06c5a981f6.herokuapp.com/api/editCategory',
        {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        },
      )
      if (resp.ok) {
        alert('Category updated successfully')
        onSave(values.type)
        onClose()
      } else if (resp.status === 409) {
        alert('Category ID conflict: that ID already exists')
      } else {
        const errorMsg = await resp.text()
        console.error('Edit failed', errorMsg)
        alert(`Update failed: ${resp.status}`)
      }
    } catch (e) {
      console.error('Network error', e)
      alert('Network error during update')
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
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <SheetFooter>
          <Button
            className="bg-gray-200 border border-gray-300 hover:bg-gray-300 shadow-lg py-5"
            type="submit"
            form="editCategoryForm"
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
