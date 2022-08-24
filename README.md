# CountryInfo - In progress
SCHOOL: Individual assignment - Communication with Web APIs

## Description of assignment
In this assignment, you must create a website that displays information retrieved from your self-built API. Your own API must also retrieve data from an external API and then send the data on to the client. Your own API must be an Express server built in NodeJS that handles any resource. For G, there must be an endpoint to retrieve all entities from your resource (GET) and an endpoint to create a new entity (POST). For VG, the API must be expanded with endpoints to update an entity (PUT), delete an entity (DELETE) and retrieve a specific entity (GET). It must be clearly stated in your client interface that you are retrieving data from an external API of your choice. The data that is downloaded must therefore be displayed in your interface. 

You then choose for yourself if you want to use an extended development stack in the project, note that this is not a requirement. Examples of frameworks you can add to your stack are: Typescript, React, Vue, Angular, etc.

### My project

* Structure
     - Client: React.ts and mui
     - Server: Node.js using express
     - "Database": JSON-file using fs

* External API - https://restcountries.com/
     - Gets information about countries. I have used: 
          - List of all countries
          - List of all countries by region
          - specific country by country

* Own API
     - Able to see, post, change and delete comments/notes about specific country 

Below follows the assignments different requirements in Swedish.

### Krav för G

1. Skapa ett API baserat på en valfri resurs (GET & POST) ✅
2. Samtliga endpoints skall kunna nås via en REST Client fil (.rest) ✅
3. Datan som API:et hanterar sparas lokalt i serverfilen ✅
4. Ett simpelt klient-gränssnitt skall finnas för att anropa ert API olika endpoints, samt visa upp resultatet vid GET anrop ✅
5. Ert API skall hämta och data ifrån ett externt API och skicka vidare datan till klienten ✅
6. Git & GitHub har använts ✅
7. Projektmappen innehåller en README.md fil ✅
8. Uppgiften lämnas in i tid! ✅❌

### Krav för VG
1. Alla punkter för godkänt är uppfyllda ✅
2. Resursen i ert API skall även ha endpoints för PUT, DELETE och GET för en entitet ✅


Link to repo: https://github.com/totaldekadens/CountryInfo

## Installing

* Open project in your code editor

* Open terminal. Make sure you are standing in the "server" folder.
    -	Npm i
    -	Npm start

* Redirect to "client"
    -	Npm i
    -	Npm run dev


## Sneak peak

### Desktop
![front](https://user-images.githubusercontent.com/90898648/186166042-f3e3b168-d82d-4676-bdcd-835081fbcac1.JPG)
![vald region](https://user-images.githubusercontent.com/90898648/186166103-733282d5-e2f3-4290-8cfe-28628659ffea.JPG)
![valt land](https://user-images.githubusercontent.com/90898648/186166156-a4073431-47d5-4750-b6aa-5c2686561698.JPG)
![kommentarer](https://user-images.githubusercontent.com/90898648/186166196-7faf05f6-5a9d-488b-8cff-4f0972b31227.JPG)
![lägg till kommentar](https://user-images.githubusercontent.com/90898648/186166345-1f0b92ec-6a3f-4244-9591-155925b7f562.JPG)
![ändra kommentar](https://user-images.githubusercontent.com/90898648/186166357-607c6011-f79e-458e-bad0-9dd7da0f07c5.JPG)
![sökresultat](https://user-images.githubusercontent.com/90898648/186166263-280e810c-6ebe-4373-8633-7e9741504a12.JPG)
![sök not found](https://user-images.githubusercontent.com/90898648/186166288-415a0642-b003-47e0-b2eb-d0fe24fa9c7c.JPG)


### Mobile
![front](https://user-images.githubusercontent.com/90898648/186166549-3bc92d43-3dc6-4cbc-8a96-61b4c2394c8c.JPG)
![drawer](https://user-images.githubusercontent.com/90898648/186166590-5d966b26-724e-464f-8744-b73926fea16d.JPG)
![region](https://user-images.githubusercontent.com/90898648/186166703-bbb70836-7692-4107-b543-e6001337ebf3.JPG)
![land](https://user-images.githubusercontent.com/90898648/186166750-3f61f9f7-9682-4df1-8744-518fa61a726f.JPG)
![kommentar](https://user-images.githubusercontent.com/90898648/186166780-086f7af6-85c8-4f0b-b051-d006f60334d9.JPG)
![sök](https://user-images.githubusercontent.com/90898648/186166795-8240a2d3-4c06-4b38-b4e0-6ca954cc2862.JPG)





