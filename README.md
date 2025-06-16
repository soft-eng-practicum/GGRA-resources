# GGRA-resources

This is the new version for the GGRA's Resource Map, fully written in React.js and Express.js.

# Getting Started

## Administrator/Contributor
### Generic Usage
Head to https://soft-eng-practicum.github.io/GGRA-resources/
You will see an interactable map on which you can click the markers to show information about them. You can also click on various categories on the sidebar to then see what providers offer said category of services.

### Editing the Category/Provider List
In the bottom left of the sidebar you should see a blue button with a GitHub logo on it. Clicking this button will take you to the admin portal and will authenticate you through GitHub. Once logged in and authenticated you should be redirected to the admin portal. You can do plenty of things to edit your list of Categories and Providers here.
All available features:
- Creating new Category/Provider (Green Plus Button)
- Editing existing Category/Provider (Pencil Button)
- Deleting Category/Provider (Red Trashcan Button)
- Refresh Category/Provider (Circle Arrow button)

Be aware that due to cost restraints you should not spam click any buttons in the Admin Portal, doing so can make the site fail to load due to GitHub and Heroku (the hosting solution) restricting communication between servers.
**A single click is enough, the website will work**

### Information about Longitude, Latitude and Markers
In order to create a functioning marker on the map, your provider will need a longitude and latitude value. This value can be found by going on google maps (www.google.com/maps), typing in the provider's address and right clicking on the red marker. A little submenu should pop up and the uppermost option is the longitude/latitude. Left click the value to copy it, and then paste each value into it's respective field.

**Providers without a longitude/latitude value will NOT show up on the map**

## Developer
Starting development is very easy:
1. Git pull this repository
2. Open 2 terminals, navigate one to the backend folder and one to the frontend.
3. Execute ```npm run dev``` in both.
4. Website should be hosted on localhost:5173.
