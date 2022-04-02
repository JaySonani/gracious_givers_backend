# Assigment 3

* Author: [Viraj Jigar Shah](viraj.shah@dal.ca)

### Members of Group 8:
- Akanksha Singh  
- Jay Nimeshkumar Patel  
- Jay Bhagvanbhai Sonani  
- Arjun Naravula Loganathan
- Venkata Saikiran Kattekola
- Viraj Jigar Shah

# Assigment 3

* Author: [Viraj Jigar Shah](viraj.shah@dal.ca) - (Maintainer)

* Date Created: 26 03 2022
* Last Modification Date: 01 04 2022

* Git URL for main Branch (Backend): https://git.cs.dal.ca/sonani/gracious_givers_backend/-/tree/main
* Git URL for main Branch (Frontend): https://git.cs.dal.ca/akankshas/group8_csci5709
* Git URL for indivual Repo (Backend): https://git.cs.dal.ca/sonani/gracious_givers_backend/-/tree/viraj_shah
* Git URL for indivual Repo (Frontend): https://git.cs.dal.ca/akankshas/group8_csci5709/-/tree/viraj_shah
* Link of Deployed Application(Frontend): https://gracious-givers-frontend-web.herokuapp.com/
* Link of Deployed Application(Backend): https://gracious-givers-backend-web.herokuapp.com/
* Link of My Feature : https://gracious-givers-frontend-web.herokuapp.com/addImage

* To access my Feature you need to follow below steps:
 * Visit website : https://gracious-givers-frontend-web.herokuapp.com/addImage
 * Add description and upload image for fundraiser event
 * then click upload button to add new story in our application
 * when you are done after submitting this story and content click on submit button
 * it will redirect to show image page where you can see all the added image and content related to fundraiser event
 * after that I have given permission to ngo user to delete any story which they have uploaded. So, if the user is NGO then they can delete uploaded story after clicking delete button in editImage page.

   1) To add story and content:
      In Add Image Page, you need to add content and image regarding your fundraiser event.
      And in Image Upload, first select the file and then Click on Upload otherwise image will not be Uploaded.
      After Uploading the Image and adding description, click on upload. if you forget to click on the upload it will not add into the database.
      you can upload story with content and image anytime you want, if you are done then you can select submit button to show the content and image on the next showImage page.
   2) after selecting submit button, you can see different stories uploaded by the ngo. ngo and normal user both can see this page. if you are login as a ngo then you can see ngoActivity button from where you can delete uploded stories. 
   3) To delete story you need to click on the ngoActivity button of showImage page and you will be redirected to the editImagePage where you can see delete button with all the stories. if you want to delete any story then you just need to click on the delete button beside of story you need to delete.

*[Folder Structure]* 

We have two different repo for frontend and backend. the url for different frontend and backend is written in starting of this file.
In the Frontend directory all our components are in components folder while all the pages are kept in pages folder which helps in differentiate the files from eachother.
in the backend repo, we have kept database connection in server.js file. for schema, we have created schema folder where we have added all our schema. we have also used routes folder where all the same routes are stored in defferent files.
In addition, controller folder contains logic for the crud operations.

*[Hosting]*

we have used Heroku for Hosting our application. we have hosted frontend and backend individually.

## Feature for Assigment 3
Photo Gallery for NGO

## Task of feature
Includes Add Story(content and images), Show Stories, Delete Stories 

## List of Files of the feature Photo Gallery for NGO
*[Description]* 
Product Directory Contains addImage.js,showImage.js, EditImage.js file in Frontend Part.

* Author: [Viraj Jigar Shah](viraj.shah@dal.ca) - (Maintainer)

* Directory for Frontend csci8_csci5709\src\pages\photo_gallery

* [AddStoryPage.js] (csci8_csci5709\src\pages\photo_gallery\AddStoryPage.js) - Used for adding header, footer and addImage component
* [ShowStoryPage.js] (csci8_csci5709\src\pages\photo_gallery\ShowStoryPage.js) - Used for adding header, footer and showImage component
* [EditStoryPage.js] (csci8_csci5709\src\pages\photo_gallery\EditStoryPage.js) - Used for adding header, footer and editImage component

* Directory for Frontend csci8_csci5709\src\components\photo_gallery
* [AddStoryComponent.js] (csci8_csci5709\src\components\photo_gallery\AddStoryComponent.js) - used for adding grid and card for adding stories
* [AddStoryElement.js] (csci8_csci5709\src\components\photo_gallery\AddStoryElement.js) - used for add stories and send to backend model
* [EditStoryComponent.js] (csci8_csci5709\src\components\photo_gallery\EditStoryComponent.js) - used for call delete api of backend 
* [ShowStoryComponent.js] (csci8_csci5709\src\components\photo_gallery\ShowStoryComponent.js) - used for call get api of backend to fetch all stories  

* Directory for Backend
* [PhotoGallery.js] - GRACIOUSGIVERS_BACKEND\controller\PhotoGallery.js
* [PhotoGallery.js] - GRACIOUSGIVERS_BACKEND\routes\PhotoGallery.js
* [PhotoGallery.js] - GRACIOUSGIVERS_BACKEND\models\PhotoGallery.js
* [multer.js] - GRACIOUSGIVERS_BACKEND\middleware\multer.js
* [config.js] - GRACIOUSGIVERS_BACKEND\middleware\config.js

## Getting Started

to run react application, i have installed react basic application via npx create-react-app in my vs code.

### Prerequisites

1) [NodeJS](https://nodejs.org/en/)
2) [ReactJS](https://reactjs.org/)
3) [Visual Studio Code](https://code.visualstudio.com/)

### Installing

1) First install Node Js from the official website and run the .exe file provided with the donwloaded package and set path for it.
2) Install Git bash for the official website according to your computer setup which could be 64 bit or 32 bit and set the path according to the need 
3) Install Visual Studio Code and form the website click to various setting according to the need afterwhich it will you can access it form the desktop screen.
4) To check whether node is properly installed you can type (node --version) command in your command-line  for chechking the node version.


## Deployment

We have deployed our application via heroku. We have deployed frontend and backend individually as mentioned before.

## References 
Material UI
React BootStrap

### File Name
* [AddStoryComponent.js]
* [AddStoryElement.js] 
* [EditStoryComponent.js]
* [ShowStoryComponent.js]

### References:

I have used this references for my frontend work.
(https://mui.com/components/grid/)
(https://mui.com/system/styled/) 
(https://mui.com/components/cards/)
(https://mui.com/api/card-content/)
(https://mui.com/api/typography/)
(https://mui.com/components/text-fields/)
(https://mui.com/components/buttons/)
(https://mui.com/api/card-actions/)
(https://mui.com/api/card-action-area/)

I have used the below referencew for my multer.js file
(https://github.com/Mohammed-Abdelhady/MERN-Uload-Image)











