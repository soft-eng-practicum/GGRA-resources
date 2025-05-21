import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { ResourceBox, ResourceEditCategoryDialog } from '@/components'

function ResourceCardCategories({ items, setItems }) {
  const [editingItem, setEditingItem] = useState(null)

  const removeItem = async (rawCatId, index) => {
    const catId = Number(rawCatId)
    try {
      const resp = await fetch('http://localhost:3000/api/deleteCategory', {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ catId }),
      })
      if (!resp.ok) {
        const err = await resp.json()
        console.error('Failed to delete:', err.error || resp.statusText)
        return
      }
      setItems((prev) => prev.filter((_, i) => i !== index))
    } catch (e) {
      console.error('Network error deleting category:', e)
    }
  }

  const onEdit = (item, index) => {
    setEditingItem({ ...item, index })
  }

  const onSave = (newType, index) => {
    setItems((prev) =>
      prev.map((it, i) => (i === index ? { ...it, type: newType } : it)),
    )
  }

  return (
    <>
      <Card className="overflow-y-auto border-none px-6 shadow-none">
        <CardContent className="mb-20">
          <ul className="space-y-4">
            {items.map((item, index) => (
              <li key={item.catId}>
                <ResourceBox
                  catId={item.catId}
                  name={item.type}
                  onRemove={() => removeItem(item.catId, index)}
                  onEdit={() => onEdit(item, index)}
                />
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <ResourceEditCategoryDialog
        item={editingItem}
        onSave={(newType) => {
          onSave(newType, editingItem.index)
          setEditingItem(null)
        }}
        onClose={() => setEditingItem(null)}
      />
    </>
  )
}

export default ResourceCardCategories
