import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogPortal,
} from '@/components/ui/dialog'

import { Input } from '@/components/ui/input'

function ResourceDialog() {
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
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} modal={false}>
      <DialogPortal>
        <DialogContent
          className="transition-all duration-300 ease-out opacity-0 translate-y-10 bg-white shadow-lg border rounded-lg p-6 animate-fade-slide"
        >
          <DialogTitle>Add Resource Location</DialogTitle>
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
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default ResourceDialog
