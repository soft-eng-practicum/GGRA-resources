// json[] of organizations and their details
var data;

// json[] of categories into which organizations are distributed
var dataCategories;

// google map
var map;

/*
 * makers, an array of map markers
 * index of markers exactly matches indexes of data
 */
var markers = [];

/*
 * infoWindowsArray, an array of infoWindows
 * index of infoWindowsArray exactly matches indexes of data
 * infowindow.close() will close it
 */
var infoWindowsArray = [];

/*
 * catTracker is a two dimensional array.
 * each index of catTracker exactly maps to index of dataCategories
 * each index of catTracker will contain an array of integers
 * the array of integers are the indexs of data which belong to that category id's index
 * this associattes a category index to an organization index so that I can show map markers
 */
var catTracker;

// categoryOpen, an array of category IDs which are currently expanded.
var categoryOpen = [];

// point, purely for testing and may be changed at will
var point = 0;

// ggra, the starting center location for the map
const ggra = { lat: 33.983135, lng: -83.978008 };

(async function fetchJson() {
    // get Data from API
    const response = await fetch("https://ggra.azurewebsites.net/api/providers");
    data = await response.json();

    const responseCategories = await fetch("https://ggra.azurewebsites.net/api/categories");
    dataCategories = await responseCategories.json();

    // associates the index of a category with an index of an organization
    catTracker = new Array(dataCategories.length);
    for (let i = 0; i < dataCategories.length; i++) {
        catTracker[i] = [];
    }

    // add Testing buttons
    // testButton0.addEventListener("click", function () { showHideID("masterDiv") });
    // testButton1.addEventListener("click", function () { showHideClass("classOrganizationDetails") });

    // add Categories to Category div
    //newPopulateCategoryDiv();

    // deal with each json object
    newCreateOrganizationAndDetailsDivs(document.getElementById("categories"), data);

    // hide all Organization Details
    for (let el of document.querySelectorAll(".classOrganizationDetails")) el.style.display = "none";
}())


function getCategoryIndexFromCategoryID(ID) {
    let index;
    for (let i = 0; i < dataCategories.length; i++) {
        if (dataCategories[i].catId == ID) {
            index = i;
            break;
        }
    }
    return index;
}

// adds an item to a list
function addItemToList(list, content) {
    const textNode = document.createTextNode(content);
    const listItem = document.createElement("li");
    listItem.appendChild(textNode);
    list.appendChild(listItem);
}

// adds an item to a list
function addItemsToListWithSpan(list, spanContent, content) {
    const listItem = document.createElement("li");

    const span = document.createElement("SPAN");
    span.setAttribute("class", "partnerInfo");

    span.appendChild(document.createTextNode(spanContent));

    listItem.appendChild(span);
    listItem.appendChild(document.createTextNode(content));

    list.appendChild(listItem);
}

// adds an item to a list
function addAddressAsList(list, phone, website, email, street, city, state, zip, description) {
    if (phone == null) { phone = ""; }
    if (website == null) { website = ""; }
    if (email == null) { email = ""; }
    if (street == null) { street = ""; }
    if (city == null) { city = ""; }
    if (state == null) { state = ""; }
    if (zip == null) { zip = ""; }
    if (description == null) { description = ""; }

    let listItem, span, link;

    // add PhoneNumber
    addItemsToListWithSpan(list, "Phone Number: ", phone);

    // add Website
    listItem = document.createElement("li");

    span = document.createElement("SPAN");
    span.setAttribute("class", "partnerInfo");
    span.appendChild(document.createTextNode("Website: "));
    listItem.appendChild(span);

    link = document.createElement("a");
    link.setAttribute("class", "partnerWebsite");
    link.setAttribute("href", website);
    link.setAttribute("target", "_blank");
    link.appendChild(document.createTextNode(website));
    listItem.appendChild(link);

    list.appendChild(listItem);

    // add eMail
    listItem = document.createElement("li");

    span = document.createElement("SPAN");
    span.setAttribute("class", "partnerInfo");
    span.appendChild(document.createTextNode("email: "));
    listItem.appendChild(span);

    link = document.createElement("a");
    link.setAttribute("class", "partnerEmail");
    link.setAttribute("href", "mailto:" + email);
    link.setAttribute("target", "_blank");
    link.appendChild(document.createTextNode(email));
    listItem.appendChild(link);

    list.appendChild(listItem);

    // add address info
    listItem = document.createElement("li");

    span = document.createElement("SPAN");
    span.setAttribute("class", "partnerInfo");
    span.appendChild(document.createTextNode("Address: "));
    listItem.appendChild(span);

    link = document.createElement("a");
    link.setAttribute("class", "partnerAddress");
    link.setAttribute("href", "https://www.google.com/maps/dir//" + street + " " + city + " " + state + " " + zip);
    link.setAttribute("target", "_blank");
    link.appendChild(document.createTextNode(street));
    listItem.appendChild(link);


    //listItem.appendChild(document.createTextNode(street));
    listItem.appendChild(document.createElement("br"));
    listItem.appendChild(document.createTextNode(city + ", " + state + " " + zip));

    list.appendChild(listItem);

    // add description
    listItem = document.createElement("li");

    span = document.createElement("SPAN");
    span.setAttribute("class", "partnerInfo");

    span.appendChild(document.createTextNode("Description: "));

    listItem.appendChild(span);
    listItem.appendChild(document.createElement("br"));
    listItem.appendChild(document.createTextNode(description));

    list.appendChild(listItem);
}

// adds a div as child of element
function addDivToElement(element, content, idName, className) {

    const div = document.createElement("div");
    const textNode = document.createTextNode(content);

    div.setAttribute("id", idName);
    div.setAttribute("class", className);

    div.appendChild(textNode);
    element.appendChild(div);

    return div;
}

// adds a div as child of element
function addDivToElement1(element, content, idName, className0, className1) {

    const div = document.createElement("div");
    const textNode = document.createTextNode(content);

    div.setAttribute("id", idName);
    div.setAttribute("class", className0 + " " + className1);

    div.appendChild(textNode);
    element.appendChild(div);

    return div;
}

// adds a div as child of element
function addOrganizationDetailsDivToElement(element, content, idName, className0) {
    const div = document.createElement("div");
    const header2 = document.createElement("h2");
    const textNode = document.createTextNode(content);

    div.setAttribute("id", idName);
    div.setAttribute("class", className0);

    header2.appendChild(textNode);
    div.appendChild(header2);
    element.appendChild(div);

    return div;
}

// puts Categories into Category div
function newAddCategoryDiv(catId) {
    let target = 0;
    for (let index = 0; index < dataCategories.length; index++) {
        if (dataCategories[index].catId == catId) { target = index; }
    }

    // add a categories to the categories div
    //const newDiv = addDivToElement(categories, dataCategories[target].type, "catId" + dataCategories[target].catId, "classCategory");
    const newDiv = addDivToElement(categories, "", "catId" + dataCategories[target].catId, "classCategory");
    const buttonDiv = addDivToElement(newDiv, dataCategories[target].type, "name" + dataCategories[target].catId, "classCategoryName");

    const imageExpand = document.createElement("IMG");
    imageExpand.src = "img/Larks/arrow-collapse-downB.png";
    imageExpand.setAttribute("id", "button" + dataCategories[target].catId);
    imageExpand.setAttribute("class", "classCategoryImage");
    newDiv.prepend(imageExpand);

    //Added the click listener to the entire div instead of the the button to make it easier to click
    imageExpand.addEventListener("click", function () { showHideCategory("class" + this.id.substring(6, this.id.length)) });
    buttonDiv.addEventListener("click", function () { showHideCategory("class" + this.id.substring(4, this.id.length)) });

    // add breaks for html readability
    categories.appendChild(document.createElement("br"));
}

// puts Orgnizations into Categories
// needs to be split into smaller methods
function newCreateOrganizationAndDetailsDivs(element, data) {
    let elementCategory;
    let elementCategoryID;
    let divOrganization;
    let divOrganizationDetails
    for (let index = 0; index < data.length; index++) {

        // determine Category div id an Organization belongs in
        //elementCategoryID = determineCategoryID(data[index].category);
        elementCategoryID = data[index].catId;

        //relate a category index with a organization index
        let catIndex = getCategoryIndexFromCategoryID(elementCategoryID);
        catTracker[catIndex].push(index);

        // get the Category div by element id
        elementCategory = document.getElementById("catId" + elementCategoryID);
        if (elementCategory == null) {
            newAddCategoryDiv(elementCategoryID);
            elementCategory = document.getElementById("catId" + elementCategoryID);
        }

        // add the Organization div to the Category div
        //divOrganization = addDivToElement(elementCategory, data[index].name, data[index].name + index, "class" + elementCategoryID);
        //divOrganization = addDivToElement1(elementCategory, data[index].name, data[index].name, "class" + elementCategoryID, "partners");
        divOrganization = addDivToElement1(elementCategory, data[index].name, "index" + index, "class" + elementCategoryID, "partners");
        divOrganization.style.display = "none";

        // add listener to Organization show its details when clicked
        divOrganization.addEventListener("click", function () { showOrganizationDetails(this.id) });

        // add the Organization details divs to the master div
        //divOrganizationDetails = addDivToElement(masterDiv, data[index].name, data[index].name + index + "Details", "classOrganizationDetails");
        divOrganizationDetails = addOrganizationDetailsDivToElement(masterDiv, data[index].name, "index" + index + "Details", "classOrganizationDetails");

        // populate the Organization details divs
        newPopulateOrganizationDetailsElement(divOrganizationDetails, data, index);
    }
}

/* populateOrganizationDetailsElement
 * adds an unordered list of Details of an Organization to given element from (json) data[index]
 */
function newPopulateOrganizationDetailsElement(element, data, index) {
    // adds a new line between the button and unordered list
    element.prepend(document.createElement("br"));

    // create 'Back to Categories' button
    const backButton = document.createElement("button");
    backButton.append(document.createTextNode("Back to Categories"));
    backButton.addEventListener("click", showCategories);
    element.prepend(backButton);

    // add lit of details to the given element
    const unorderedList = document.createElement("ul");
    addAddressAsList(unorderedList, data[index].phone, data[index].website, data[index].email, data[index].street, data[index].city, data[index].state, data[index].zip, data[index].description);
    var latitude = data[index].lat;
    var longitude = data[index].lng;
    //var pos = { lat: latitude, lng: longitude };
    var pos = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
    //var marker = new google.maps.Marker({ position: pos, map: map, title: name });
    markers.push(new google.maps.Marker({ position: pos, map: map, title: name }));
    element.appendChild(unorderedList);
}

// shows a specifical Organization Details div, hides Categories div
function showOrganizationDetails(organizationDetailsID) {
    //document.getElementById("categories").style.display = "none";
    categories.style.display = "none";
    var organizationDetails = document.getElementById(organizationDetailsID + "Details");
    //document.getElementById(organizationDetailsID + "Details").style.display = "block";
    organizationDetails.style.display = "block"

    setMapOnAll(null);
    let index = organizationDetailsID.substring(5, organizationDetailsID.length);
    let latitude = data[index].lat;
    let longitude = data[index].lng;
    //var pos = { lat: latitude, lng: longitude };
    let pos = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
    //var marker = new google.maps.Marker({ position: pos, map: map, title: name });
    markers[index].setMap(map);
    map.panTo(pos);
    map.setZoom(14);

    let contentString = data[index].name + "<br /><br />" +
        data[index].street + "<br />" + data[index].city + ", " + data[index].state + " " + data[index].zip + "<br /><br />" +
        data[index].phone;

    let infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    infoWindowsArray.push(infowindow);

    infowindow.open(map, markers[index]);
}


// hides every Organization Detail Div, shows Categories div
function showCategories() {
    for (let el of document.querySelectorAll(".classOrganizationDetails")) el.style.display = "none";
    categories.style.display = "block";
    categoryManager();
    map.setZoom(11);
    for (let i = 0; i < infoWindowsArray.length; i++) {
        infoWindowsArray[i].close();
    }
}

// hides an element by passing reference of element
function showHideElement(element) {
    if (element.style.display === "none") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}

// hides an element by element's id
function showHideID(elementID) {
    var element = document.getElementById(elementID);
    if (element.style.display === "none") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}

// hides elements by elements' id
function showHideClass(elementClass) {
    // testing stuff
    checkpoint(elementClass);
    if (document.getElementsByClassName(elementClass)[0].style.display === "none") {
        for (let el of document.querySelectorAll("." + elementClass)) el.style.display = "block";
    } else {
        for (let el of document.querySelectorAll("." + elementClass)) el.style.display = "none";
    }
}

// hides elements by elements' id
function showHideCategory(elementClass) {
    //test.innerHTML = "elementClass[" + elementClass + "]";
    let catId = elementClass.substring(5, elementClass.length);
    //let myMap;

    if (document.getElementsByClassName(elementClass)[0].style.display === "none") {
        for (let el of document.querySelectorAll("." + elementClass)) el.style.display = "block";
        document.getElementById("button" + catId).src = "img/Larks/arrow-collapse-upB.png";
        myMap = map;

        categoryOpen.push(catId);
    } else {
        for (let el of document.querySelectorAll("." + elementClass)) el.style.display = "none";
        document.getElementById("button" + catId).src = "img/Larks/arrow-collapse-downB.png";
        myMap = null;

        for (let i = 0; i < categoryOpen.length; i++) {
            if (categoryOpen[i] == catId) {
                categoryOpen.splice(i, 1);
            }
        }
    }

    // if there are no open categories show all markers
    categoryManager();
}

// if there are no open categories show all markers
function categoryManager() {
    if (categoryOpen.length == 0) {
        setMapOnAll(map);
    } else {
        setMapOnAll(null)
        for (let i = 0; i < categoryOpen.length; i++) {
            let catIndex = getCategoryIndexFromCategoryID(categoryOpen[i]);
            //catTracker[catIndex]
            for (let j = 0; j < catTracker[catIndex].length; j++) {
                //markers[catTracker[catIndex][j]].setMap(myMap);
                markers[catTracker[catIndex][j]].setMap(map);
            }
        }
    }
}

// testing stuff
function checkpoint(content) {
    point++;
    //test.innerHTML = "Checkpoint " + point + " " + content;
}

// sets up the map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        //center: { lat: -34.397, lng: 150.644 },
        center: ggra,
        zoom: 11
    });
    //    var marker = new google.maps.Marker({ position: gwinnetShepards, map: map });
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}
