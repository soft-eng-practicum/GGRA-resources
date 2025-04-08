import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
  }

  return (
    <Card className="ml-3 w-1/3 h-[90vh] overflow-y-auto bg-gray-50">
      <CardHeader>
        <CardTitle>Add Resource Location</CardTitle>
        <CardDescription>Placeholder</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form id="resourceForm" onSubmit={form.handleSubmit(onSubmit)}>
            <GGRAFormField
              form={form.control}
              name="name"
              labelName="Name"
              placeholder="test"
            />
            <br />
            <GGRAFormField
              form={form.control}
              name="description"
              textarea={true}
              labelName="Description"
              placeholder="Test"
            />
            <br />
            <GGRAFormField
              form={form.control}
              name="street"
              labelName="Street Address"
              placeholder="Test"
            />
            <br />
            <GGRAFormField
              form={form.control}
              name="city"
              labelName="City"
              placeholder="Test"
            />
            <br />
            <GGRAFormField
              form={form.control}
              name="state"
              labelName="State"
              placeholder="Test"
            />
            <br />
            <GGRAFormField
              form={form.control}
              name="zip"
              labelName="Zip Code"
              placeholder="Test"
            />
            <br />
            <GGRAFormField
              form={form.control}
              name="phone"
              labelName="Phone Number"
              placeholder="Test"
            />
            <br />
            <GGRAFormField
              form={form.control}
              name="website"
              labelName="Website"
              placeholder="Test"
            />
            <br />
            <GGRAFormField
              form={form.control}
              name="email"
              labelName="E-Mail"
              placeholder="test@example.com"
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
      </CardContent>
      <CardFooter>
        <Button type="submit" form="resourceForm" className="bg-gray-200 border border-gray-300 hover:bg-gray-300 shadow-lg">
          Submit
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ResourceDialog
