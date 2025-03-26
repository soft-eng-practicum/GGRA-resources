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
          <AccordionItem
            key={category.catId}
            value={`item-${category.catId}`}
            className="border-1 rounded-md m-2 "
          >
            <AccordionTrigger className="px-2 rounded-md hover:bg-gray-100">
              {category.type}
            </AccordionTrigger>
            <AccordionContent>
              <Accordion type="single" collapsible>
                {providers.map(
                  (provider) =>
                    provider.catId === category.catId && (
                      <AccordionItem
                        key={provider.id}
                        value={`subitem-${provider.id}`}
                        className="rounded-md mb-2 mx-3 bg-[#f8f8ff] border-1"
                      >
                        <AccordionTrigger className="px-3 rounded-md hover:bg-gray-100">
                          {provider.name}
                        </AccordionTrigger>
                        <AccordionContent className="pt-3 px-4 pb-0">
                          <ul>
                            <li>
                              <h3 className="font-bold">Description</h3>
                              {provider.description}
                            </li>
                            <br />
                            <li>
                              <h3 className="font-bold">Street Address</h3>{' '}
                              {provider.street}
                            </li>
                            <br />
                            <li>
                              <h3 className="font-bold">City</h3>{' '}
                              {provider.city}
                            </li>
                            <br />
                            <li>
                              <h3 className="font-bold">State</h3>{' '}
                              {provider.state}
                            </li>
                            <br />
                            <li>
                              <h3 className="font-bold">Zip</h3> {provider.zip}
                            </li>
                            <br />
                            <li>
                              <h3 className="font-bold">Phone</h3>{' '}
                              {provider.phone}
                            </li>
                            <br />
                            <li>
                              <h3 className="font-bold">Website</h3>{' '}
                              <a href={provider.website}>{provider.website}</a>
                            </li>
                            <br />
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
