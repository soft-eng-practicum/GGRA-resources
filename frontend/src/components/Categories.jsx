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
      <h1 className="font-lato text-xl text-center uppercase text-[#024985]">
        Categories
      </h1>
      <hr />
      <Accordion type="single" collapsible>
        {categories.map((category) => (
          <AccordionItem key={category.catId} value={`item-${category.catId}`}>
            <AccordionTrigger>{category.type}</AccordionTrigger>
            <AccordionContent>
              <Accordion type="single" collapsible>
                {providers.map((provider) => (
                  <AccordionItem
                    key={provider.id}
                    value={`subitem-${provider.id}`}
                  >
                    <AccordionTrigger>{provider.name}</AccordionTrigger>
                    <AccordionContent>Test</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  )
}

export default Categories
