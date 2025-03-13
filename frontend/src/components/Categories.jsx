import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

function Categories({ categories, providers }) {
  return (
    <>
      <h1 className="font-lato text-4xl py-4 text-center uppercase text-[#024985]">
        Categories
      </h1>
      <hr />
      <Accordion type="single" collapsible>
        {categories.map((category) => (
          <AccordionItem key={category.catId} value={`item-${category.catId}`}>
            <AccordionTrigger>{category.type}</AccordionTrigger>
            <AccordionContent>
              <Accordion type="single" collapsible>
                {providers.map(
                  (provider) =>
                    provider.catId === category.catId && (
                      <AccordionItem
                        key={provider.id}
                        value={`subitem-${provider.id}`}
                      >
                        <AccordionTrigger>{provider.name}</AccordionTrigger>
                        <AccordionContent>
                          <ul>
                            <li>{provider.description}</li>
                            <li>Street Address: {provider.street}</li>
                            <li>City: {provider.city}</li>
                            <li>State: {provider.state}</li>
                            <li>Zip: {provider.zip}</li>
                            <li>Phone: {provider.phone}</li>
                            <li>Website: {provider.website}</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ),
                )}
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  )
}

export default Categories
