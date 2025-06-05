import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { ResourceBox, ResourceEditProviderDialog } from '@/components'

function ResourceCardProviders({ items, setItems }) {
  const [editingItem, setEditingItem] = useState(null)
  const removeItem = async (rawId, index) => {
    const id = Number(rawId)
    try {
      const resp = await fetch('http://localhost:3000/api/deleteProvider', {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      if (!resp.ok) {
        const err = await resp.json()
        console.error('Failed to delete:', err.error || resp.statusText)
        return
      }
      setItems((prev) => prev.filter((_, i) => i !== index))
    } catch (e) {
      console.error('Network error deleting provider:', e)
    }
  }

  const onEdit = (item, index) => {
    setEditingItem({ ...item, index })
  }

  const onSave = (updated) => {
    const { index, ...rest } = updated
    setItems((prev) => prev.map((it, i) => (i === index ? rest : it)))
  }

  const onClose = () => setEditingItem(null)

  return (
    <>
      <Card className="overflow-y-auto border-none px-6 shadow-none mx-auto">
        <CardContent className="mb-20">
          <ul className="space-y-4">
            {items.map((item, index) => (
              <ResourceBox
                key={item.id}
                id={item.id}
                catId={item.catId}
                name={item.name}
                description={item.description}
                street={item.street}
                city={item.city}
                state={item.state}
                zip={item.zip}
                phone={item.phone}
                email={item.email}
                website={item.website}
                latitude={item.latitude}
                longitude={item.longitude}
                onRemove={() => removeItem(item.id, index)}
                onEdit={() => onEdit(item, index)}
              />
            ))}
          </ul>
        </CardContent>
      </Card>

      <ResourceEditProviderDialog
        item={editingItem}
        onSave={(values) => {
          onSave({ ...values, index: editingItem.index })
          onClose()
        }}
        onClose={onClose}
      />
    </>
  )
}

export default ResourceCardProviders
