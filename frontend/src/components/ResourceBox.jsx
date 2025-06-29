import { Button } from '@/components/ui/button'

function ResourceBox({
  id,
  name,
  description,
  street,
  city,
  state,
  zip,
  phone,
  email,
  website,
  latitude,
  longitude,
  catId,
  onRemove,
  onEdit,
  categoriesList,
}) {
  return (
    <div className="bg-white relative flex flex-col sm:flex-row md:w-full h-fit border rounded-sm p-5">
      <div className="p-4 w-full md:w-61/64">
        {id ? (
          <>
            <p className="font-bold text-lg">{name}<br /></p>
            <hr /><br />
            <p className="text-sm text-gray-500">{description}<br /><br /></p>
            <p className="text-sm text-gray-500">
              <span className="font-bold">
                {street}, {city}, {state} {zip}
              </span><br /><br />
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-bold">Phone:</span> {phone} | Email: {email}
              <br /><br />
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-bold">Website:</span> {website}
              <br /><br />
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-bold">Coordinates:</span> {latitude}, {longitude}
            </p><br />
          </>
        ) : (
          <>
            <p className="font-bold text-lg">{name}<br /></p>
            <hr /><br />
            <p className="font-bold text-md text-gray-500">
              Category {
                categoriesList?.find((cat) => cat.catId === catId)?.type || `ID: ${catId}`
              }
            </p>
          </>
        )}
      </div>
      <div className="flex flex-row sm:flex-col w-full md:w-3/64 items-center ml-2 justify-between sm:justify-center h-auto">
        <Button className="w-[40px] h-[40px] bg-gray-300 hover:bg-gray-400 m-2" onClick={onEdit}>
          <span className="icon icon-compose-2" />
        </Button>
        <Button className="w-[40px] h-[40px] bg-gray-300 hover:bg-gray-400 m-2" onClick={onRemove}>
          <span className="icon icon-trash-2 text-red-500" />
        </Button>
      </div>
    </div>
  )
}

export default ResourceBox
