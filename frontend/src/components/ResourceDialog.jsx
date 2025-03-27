import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'

function ResourceDialog(props) {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", description: "", street: "", city: "", state: "", zip: "", phone: "", email: "", website: "", longitude: "", latitude: "" });

  const addItem = () => {
    if (newItem.name.trim()) {
      setItems([...items, newItem])
      setNewItem({
        name: '',
        description: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
        email: '',
        website: '',
        longitude: '',
        latitude: '',
      })
      setIsDialogOpen(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Resource Location</CardTitle>
      </CardHeader>
      <CardContent
        className="transition-all duration-300 ease-out opacity-0 translate-y-10 bg-white shadow-lg border rounded-lg p-6 animate-fade-slide"
      >
        {Object.keys(newItem).map((key) => (
          <Input
            key={key}
            type="text"
            value={newItem[key]}
            onChange={(e) =>
              setNewItem({ ...newItem, [key]: e.target.value })
            }
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            className="mt-2 w-full"
          />
        ))}
        <Button onClick={addItem} className="mt-2 w-full">
          Add
        </Button>
        <Button
          onClick={() => setIsDialogOpen(false)}
          className="mt-2 w-full"
        >
          Cancel
        </Button>
      </CardContent>
    </Card>
  )
}

export default ResourceDialog
