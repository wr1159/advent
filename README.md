# Advent - Milestone 3 README

README to be submitted for Milestone 3.

Website is deployed to [https://advent-beta.vercel.app](https://advent-beta.vercel.app)

Major Updated sections since Milestone 2:

- [User Stories](#user-stories)
- [User Research](#user-research)
- [Testing](#testing)
- [Timeline](#timeline)
- [Improvements](#improvements)

# Table of Contents

1. [Team Information](#team-information)
2. [Problem Definition](#problem-definition)
3. [Aim](#aim)
4. [User Stories](#user-stories)
5. [User Research](#user-research)
6. [Planned Features](#planned-features)
7. [Application](#application)
   - [Installation](#installation)
   - [File Structure](#file-structure)
   - [How it works](#how-it-works)
     - [Technology Stack](#technology-stack)
     - [Authentication](#authentication)
     - [Database](#database)
     - [Testing](#testing)
   - [UI Design](#ui-design)
   - [Software Engineering Practice](#software-engineering-practice)
     - [Sprint and Story Points](#sprint-and-story-points)
     - [Github Projects](#github-projects)
     - [Version Control](#version-control)
     - [CI/CD](#cicd)
     - [Backward Compatibility Highlight](#backward-compatibility-highlight)
8. [Timeline](#timeline)
9. [Improvements](#improvements)

# Team Information

Team Name: Advent
Team ID: 5877
Proposed Level: Artemis
Team Members: Chu Wei Rong & Pham Quang Nhat

# Problem Definition

Many event websites would redirect users to a third party website for registration. This includes popular events like the Blackpink concert where users are redirected to a third party website (Ticketmaster) for registration. To use Ticketmaster, users have to sign up for an account under the Ticketmaster website before being able to register for the event itself, which is time-consuming, inconvenient and exposes their personal data to more organizations.

The usage of a third party website for registration also corresponds to allocating a part of the organisers’ expense to use the service of the party providing the sign up form and storing data. The sign up form provided by this middleman website often does not fit the event’s theme and aesthetic.

To avoid such unwanted scenarios, the sign up form should be available on the event's own website for the convenience of interested users. Tracking of registration data (number of participants, age group, popular time slots) would also be easier and the event organisers will not have to pay a % of revenue as service fee or worry about a potential failure in the third party registration website.

With the aim of creating a customisable registration framework that can be integrated into each event’s website. We came up with the idea for Advent to create a frictionless solution to solve the 3 problems:

1.  Eliminate sign ups on 3rd party websites
2.  Reduce introduction of new points of failures
3.  Have the event sign up form fit the design theme

# Aim

To provide a Software-as-a-service (SaaS) where users (event organisers) can create events and integrate a customisable registration framework - integrate a custom event landing page and a custom registration form to their own website. Therefore, adhering to a consistent styling and look. The user should be able to view registrants’ data on our dashboard with charts to help visualise the data.

# User Stories

1. As an event organiser, I want to be able to easily integrate a customisable event landing page and a register form in my website through iframe or by copying the source code onto my website so users won't have to navigate to a third party website.
2. As an event organiser, I want to be able to allow interested individuals to register without going to a third party website to reduce friction of registration.
3. As an event organiser, I want to be able to view data of registrants on a dashboard to know what was the audience demographic.
4. As an event organiser, I do not want concerns related to a potential failure in the sign up service provider website to reduce friction of registration.
5. As an event participant, I want to be able to easily sign up for an event without leaving the original event webpage to save my time.
6. As an event participant, I do not want to go through additional signing up procedures in the third party website before getting to actual registration part for the event to save my time.

# User Research

We conducted 2 focus group on event organisers from Eunoia Junior College Alumni Association and Raffles Hall Culture Committee who has hosted Combined Hall Ensemble Concert. By asking the event organisers questions like "What is required for a successful event?", "What tools do they use to help host their events?", "What do they want to see in an event tool" and more, we were able to better understand the needs of the event organisers. We then showed them our application and asked them to paly around with it, giving us feedback afterwards.

The feedback was mostly positive but does include comments like being confusing to them at the start and they did require some guidance from us to use the app correctly. We were also able to discover some bugs with the help of this user research and has been listed under User Testing. With these feedback combined with the peer evaluations from Milestone 2, we have replaced our feature to include mapBox integration with a tutorial powered by React Joyride instead.

When we told them about our planned features including the drag&drop feature to be implemented, they mentioned that while the drag&drop feature was great and would be much better for the app, it also had certain tradeoffs as they prefer non moving parts sometimes and do not want to drag certain text from the bottom to the top of the page. They recommended it as like an additional feature that would be a nice to have but the current implementationw as deemed passable for them.

With that feedback in mind, we decided to treat drag and drop as a reach goal. We tried to implement it with React DnD but faced difficulties between integration of react DnD and Quill the WYSIWYG Editor we used. Therefore, we decided to leave the feature for future updates as it had taken far too much of our time and we were going to have a lack of time to implement the other features.

# Planned Features

## Authorisation using email, password and Google login

We will require the user to be authenticated before they are able to access the features such as creating the landing page and registration page or viewing their data. This will be done with [Firebase Authentication](https://firebase.google.com/docs/auth) which is well integrated with google log in. The other alternative we considered was [NextAuth.js](https://next-auth.js.org/) but we decided to go with Firebase due to it's versatility.

## Customise landing page and registration page

We plan for this to be editing a template where users can edit the title, description, location and other information to suit their website. As we follow an iterative approach of development, we will start with text styling and move on to other features such as colour, images.

![example userflow](https://github.com/wr1159/advent/assets/56021409/88194b4b-cafe-475c-8a11-3046568d1b8b)

### Allow adding of images

We plan for users to be able to upload their own hero images into the website or pick from our preselected images into the event page.

### Integration of colour picker with colour library

We plan to allow users to change the colours of the background, text and this will require a colour library where users can view the change visually.

## Integration to user's website with Iframe tag

We plan to allow event organisers to import the iframe tag for their specific event and it will be well integrated into their website without any other coding. Users will be able to embed the landing page once they copy the iframe tag into their code or share to others using our link as well.

## Event registration page for sharing

As not every event organisers might have their own website, they will be able to use the event registration page by itself through a link to a specific advent page made for their event.

## Data Dashboard to view data with charts

To make sense of their collected data, we plan to use [ChartJS](https://www.chartjs.org/) and allow users to view their data at a glance using various charts like bar chart, line chart, pie chart and more.

## Payment system with Stripe

As events could require a payment to enter, we plan to integrate Stripe API where users can checkout and pay.

# Application

## Installation

First, install by running:

```
yarn
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Run the mock production server:

```
yarn build && yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## File Structure

### Folders

- `.github` folder contains our github actions pipeline and pull request template
- `app` folder contains the pages with [routing](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts) done as per [NextJS 13](https://nextjs.org/blog/next-13).
- `components` folder contains all our reusable react components like `Button.tsx`
- `utils` folder contains reusable utility functions such as `signin.ts`
- `types` folder contains reusable types such as `AttendeeInformation`
- `__tests__` folder contains tests for certain files inside the parent folder. For example `components/__tests__` will test for components.

### Files

- `.env` contains the relevant Firebase configuration
- `.eslintrc.json` contains the configuration for eslint
- `.gitignore` contains files and folders to be ignored when pushing to remote
- `.prettierignore` and `.prettierc.js` are config files for prettier, our code formatter tool
- `.firebaseconfig.js` contains configuration for Firebase.
- `jest.config.js` contains configuration for Jest, set up for NextJS applications.
- `next.config.js` contains configuration for NextJS application
- `package.json` contains configuration for the project using Node.js
- `postcss.config.js` and `tailwind.config.js` are configuration files for TailwindCSS
- `tsconfig.json` contains configuration for TypeScript.
- `yarn.lock` contains the dependencies and the versions needed to be installed.

## How it works

### Technology Stack

Frontend:

- [NextJS 13](https://nextjs.org/)
- [React 18](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Figma](https://figma.com/)
- [Opengraph](https://ogp.me/)

Backend:

- [NextJS 13](https://nextjs.org/)
- [Firebase 9](https://firebase.google.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Vercel](https://vercel.com/)

Tools we use include:

- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [GitHub](https://github.com)
- [Prettier](https://prettier.io/)
- [Selenium](https://www.selenim.dev/)

### Authentication

Authentication is done with Firebase authentication and much of the heavy lifting is done by the library. We currently offer email sign ups and Google login but we are open to enabling other forms of sign ups upon feedback in Milestone 1.

### Database

Database used is Firestore from Firebase. Here is our database design. Firestore is a noSQL database that allows us to have better data structure instead of several nested objects in normal SQL databases.
![new database](https://github.com/wr1159/advent/assets/56021409/4c39ca3b-d7d5-4bff-8e85-5338d539d973)

### User Activity Diagram

To plan for users testing and usage, we have created a User Navigation Diagram. We did not include a UML Class Diagram due to the lack of usage of OOP in the project.
![new activity diagram](https://github.com/wr1159/advent/assets/56021409/83d75813-11c0-49b6-a273-006f0d8c8206)

### Component Diagram

As we used react components, we have created a component tree diagram.
![tree](https://github.com/wr1159/advent/assets/56021409/7af2ce23-be40-43e1-92a4-d4b445c8b088)

### Testing

#### User Testing

We asked 2 other users to test our application as a whole and we were notified of bugs such as:

- Delay of usage with iframe as the event page might take a few minutes to be generated upon creation
- Signups per day line chart displays as a dot when sign ups are only from a day.
- Login with google sometimes saves previous login information, which can prevent you from switching accounts on the same device.
- If the image size is too large, the image can overload the html content and cause the event page to not appear.

#### Automated Testing

We have unit testing for certain components but plan to integrate integration tests using cypress in the future. The reason behind this is we are going for swift development and there can be many changes between updates. Therefore, the integration tests will have to change to fit the new feature / design.

Our current test coverage is **71%** which is on the low end on accepted test coverage but we decided to end with this as most of the uncovered tests are functions from the libraries such as Firebase, Quill.js, ChartJS. Not to mention that the 71% does not include the integration testing.

In this project, we used Selenium for bare bones integration testing to ensure that the entire application functions correctly and seamlessly. The integration tests automated and verified the smooth integration of all components and features.

Our unit tests were conducted with the intention of ensuring that the components were rendered properly when passed in correct props. For our utility functions, we tested mainly for 3 main cases, correct values, empty values (in case of errors) and edge cases (applicable to certain functions like an already capitalized letter for capitalizeLetter function).

Here are our test tables:

Components
| Test Case | Expected Output | Actual Output | Pass/Fail |
|--------------------------------|---------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|-----------|
| Attendant Table Component | Renders table with correct headers and data when provided data | Renders table with correct headers and data when provided data | Pass |
| Button Component | Renders button with text parameter, classname, and triggers onClick event | Renders button with provided text, className and onClick functionality | Pass |
| Card Component | Renders card with provided text and icon | Renders card with provided text and icon | Pass |
| Chart Component | Renders chart correctly when provided data, chart type and labels required | Renders chart correctly when provided data, chart type and labels required | Pass |
| Create Event Form Component | Renders create event form correctly and fires createEvent function upon click | Renders create event form correctly and fires createEvent function upon click | Pass |
| Dropdown Component | Renders dropdown correctly with provided data | Renders dropdown correctly with provided data | Pass |
| Event Item Component | Renders event title, creation date and link when provided | Renders event title, creation date and link when provided | Pass |
| Event Operation Component | Renders Menu Button with options | Renders Menu Button with options | Pass |
| Features Section Component | Renders 4 features card | Renders 4 features card | Pass |
| Footer Component | Renders links correctly | Renders links correctly | Pass |
| Hero Component | Renders text and children correctly | Renders text and children correctly | Pass |
| Hero Child Component | Renders the “Get Started” and “Github” button correctly | Renders the “Get Started” and “Github” button correctly | Pass |
| Link Card Component | Renders title, icon, links correctly when provided | Renders title, icon, links correctly when provided | Pass |
| Login Form Component | Renders login form correctly and checks for user input and button click to be fired | Renders login form correctly and checks for user input and button click to be fired | Pass |
| Mobile Navigation Component | Renders texts and links, correct redirection when clicked | Renders texts and links, correct redirection when clicked | Pass |
| Navigation Bar Component | Renders text, links and buttons, correct redirection when clicked | Renders text, links and buttons, correct redirection when clicked | Pass |
| Orbital Row of Cards Component | Renders Text, links and buttons correctly, successful redirects when clicked | Renders Text, links and buttons correctly, successful redirects when clicked | Pass |
| Sign Up Form Component | Renders sign up form correctly and checks for user input and button click to be fired | Renders sign up form correctly and checks for user input and button click to be fired | Pass |

Utility Functions
| Test Case | Expected Output | Actual Output | Pass/Fail |
|----------------------------------------------------------------------------------------|-------------------------------------------------------------------|-------------------------------------------------------------------|-----------|
| capitalizeLetter capitalizes the first letter of a string | “hello” -> “Hello” | “Hello” | Pass |
| capitalizeLetter does not change the string if the first string is already capitalized | “Hello” -> “Hello” | “Hello” | Pass |
| capitalizeLetter works with an empty string | “ “ -> “ “ | “ “ | Pass |
| eventQuery > queryForEvents returns undefined when user is not authenticated | undefined | undefined | Pass |
| eventQuery > queryEvents returns undefined when there are no events | undefined | undefined | Pass |
| getUser > getUserId returns userId if a user is authenticated | ‘mock user-Id’ | ‘mock user-Id’ | Pass |
| getUser > getUserId returns undefined if no user is authenticated | undefined | undefined | Pass |
| queryTemplate > queryForTemplate returns undefined if no user is authenticated | undefined | undefined | Pass |
| retrieveImage retrieves and sets image URLs | expect call to the storage expect download url to be created | expect call to the storage expect download url to be created | Pass |
| retrieveImage handles empty response | expect no errors | expect no errors | Pass |
| saveTemplate saves template when given proper data | expect call to firebase with proper path and different IDs | expect call to firebase with proper path and different IDs | Pass |
| uploadImage uploads image and set the image URL | expect upload to the storage expect correct bucket to be selected | expect upload to the storage expect correct bucket to be selected | Pass |
| uploadImage does not upload an image when given empty response | expect no errors | expect no errors | Pass |

## UI Design

We planned for a simple minimalistic look using #6C6C6C (Dark Grey), #E4E4E4 (Light Gray), #00264B (Dark Blue) as our main colour scheme and using several colours like tailwind red-500 to denote destructive actions. This colour scheme was picked as a recommended [colour scheme (Winter Overture) ](https://www.canva.com/colors/color-palettes/winter-overture/) by Canva.

We provide responsive design using TailwindCSS so mobile users will be able to enjoy the app as much as desktop users.

## Software Engineering Practice

### Sprint and Story Points

The team operates on 2 week sprints which is kickstarted by a sprint planning where tasks are delegated. To delegate tasks, we assign each task a story point using fibonacci story points to help us decide on the points due to the increasing scale - it is much easier to decide whether a task is worth 5 points or 8 points instead of deciding whether a task is worth 6 or 7 points.

At the end of each sprint, we will come to review our tasks and reflect on our sprint. We will then adjust our workload accordingly for the next sprint - If I assigned myself 40 points and only managed to do 25, that means I have overestimated myself and should not attempt to assign myself 40 points worth of tasks but closer to 30 points.

### Github Projects

We use GitHub Projects and Issues to place the tasks and mark them in progress. We use the milestone feature to track our progress towards certain milestones.

We also include incident reports to allow us to learn from previous mistakes as seen in Pull Request #27.

### Version Control

We use the GitHub Flow style of version control where users open a feature branch and open a pull request to be merged. Instead of merge and commit, we use squash and merge to maintain a linear git history in the main branch. This will allow us to know where to revert to in case of bugs and is much cleaner to look at instead of 1000 commits.

### CI/CD

We have a workflow to build, test and deploy the app upon every pull request and merge to the main branch. This will deploy a preview app using Vercel where the reviewer can then view and give comments on.

### Backward Compatibility Highlight

The team would like to highlight our efforts at backward compatibility. By mistake, we have stored the timestamp of even creation as a string which is fine but what is not fine is our use of `.toLocaleString()`. While our timestamp can still be viewed properly, we face a problem when sorting the events by descending order of creation date. As it is stored as a string, `15/06/20...` appears later than `29/05/20...` despite the fact it should come earlier. One might suggest to convert the string back to date then sort but we will get to that later.

We had 3 options:

1. Wipe the database and right our wrong by storing the event creation date as an ISO timestamp which is an industry standard
2. Convert the string back to date and then sort (but we need every date to be the same formatting so we can sort it)
3. Leave it as it is

We chose option 2, we migrated the users data to follow the `en-GB` locale date style and then now standardise the storage of timestamp with `en-GB`. We chose this option due to backward compatibility, most events are currently created with `en-GB` locale date style and this means that the existing events will continue to function under the new sorting function.

Long live backward compatibility!

# Timeline

We have currently completed the following features:

- Authentication
  <img width="1465" alt="image" src="https://github.com/wr1159/advent/assets/56021409/2f4d5839-32b3-49a3-b686-b757845d7e6d">

- Creating Events
  <img width="1440" alt="image" src="https://github.com/wr1159/advent/assets/56021409/df60d560-3a6c-4b80-93a3-1722fdca6546">

- Event Landing Page
  <img width="1460" alt="image" src="https://github.com/wr1159/advent/assets/56021409/fad23439-6acc-4ba8-ad4e-fec29fd678f0">
  <img width="1451" alt="image" src="https://github.com/wr1159/advent/assets/56021409/71216934-7dcb-4c9b-a7ba-0de369ac14c3">

- Public pages such as /orbital, /documentation and root page.
  <img width="1453" alt="image" src="https://github.com/wr1159/advent/assets/56021409/42683c68-ffad-49e1-b160-7a93a2f74d26">
  <img width="1467" alt="image" src="https://github.com/wr1159/advent/assets/56021409/cbf291c0-003f-4560-9409-f843b4d122d9">

- Attendee Registration Form
  <img width="1471" alt="image" src="https://github.com/wr1159/advent/assets/56021409/a971d77d-ebd3-41bb-9522-05b4ee5d5aec">
  <img width="742" alt="image" src="https://github.com/wr1159/advent/assets/56021409/1429cac0-bd8a-403a-b52e-aab470620398">

- Generating iframe tag
  <img width="301" alt="image" src="https://github.com/wr1159/advent/assets/56021409/cdb4348f-239c-4edf-a508-024b7894e90b">

- Data Dashboard (Table)
  <img width="1402" alt="image" src="https://github.com/wr1159/advent/assets/56021409/146246fa-5c17-49a5-a97b-a404b2937c1b">
  <img width="1473" alt="image" src="https://github.com/wr1159/advent/assets/56021409/a6446cf5-4723-4a44-9b79-db5cd6bd1213">

Milestone 3

- Data Dashboard (Charts)
  <img width="1450" alt="image" src="https://github.com/wr1159/advent/assets/56021409/3ff00c03-9db4-4bd8-aa61-3684d0a01118">
  <img width="1467" alt="image" src="https://github.com/wr1159/advent/assets/56021409/f25a424f-525a-4d02-aaa6-e6f23386312e">

- Opengraph
  <img width="533" alt="image" src="https://github.com/wr1159/advent/assets/56021409/50207c29-4ce3-464d-908c-a832ed3b9965">
  <img width="594" alt="image" src="https://github.com/wr1159/advent/assets/56021409/e7e90383-2927-40e1-9281-0d6f40a306d9">

- Improved Login Page
  <img width="649" alt="image" src="https://github.com/wr1159/advent/assets/56021409/cf7676ef-36cc-43cc-b678-2c7e3d37c654">

- Improved Sign Up Page
  <img width="1412" alt="image" src="https://github.com/wr1159/advent/assets/56021409/1ba706ae-c395-4978-a8e6-41765ed8ae03">

- Guide for users
  <img width="1450" alt="image" src="https://github.com/wr1159/advent/assets/56021409/65f65505-c29a-43cf-9ac7-6ec8a400a23b">
  <img width="1171" alt="image" src="https://github.com/wr1159/advent/assets/56021409/f691244d-b70e-4ef7-80c4-bc14862781d6">
  <img width="728" alt="image" src="https://github.com/wr1159/advent/assets/56021409/06657fbe-2d3c-4bae-97fa-ffa1bbd99443">
  <img width="689" alt="image" src="https://github.com/wr1159/advent/assets/56021409/4c1be8d6-78da-4821-81a2-c284c9d07903">
  <img width="416" alt="image" src="https://github.com/wr1159/advent/assets/56021409/bc30201f-e37f-4802-be11-304fa62c73e4">
  <img width="687" alt="image" src="https://github.com/wr1159/advent/assets/56021409/1c75c0de-8021-4ef2-a1e1-3710ab0da2dc">
  <img width="684" alt="image" src="https://github.com/wr1159/advent/assets/56021409/6c2ff6e6-fd87-4b6e-a73c-f4307a9b4498">
  <img width="729" alt="image" src="https://github.com/wr1159/advent/assets/56021409/f9fb1455-d409-4085-aaab-c64cc6e0e942">

- Stripe Integration
  <img width="298" alt="image" src="https://github.com/wr1159/advent/assets/56021409/a391ada4-fe76-454e-aaab-0d94334e8151">
  <img width="1065" alt="image" src="https://github.com/wr1159/advent/assets/56021409/64b6039a-f2ba-49d2-b2d0-388010b0b6bd">
  <img width="1255" alt="image" src="https://github.com/wr1159/advent/assets/56021409/e64ed2da-dad1-44af-a907-57fe2d7599b8">

### Improvements

It is very regrettable that we were unable to push out the **drag and drop feature** that we were excited for. However, with more experience and more time, we could work towards our own editing library instead of using QuillJS which proved many problems when combined with React DnD.

Other improvements include

- UI Improvements
- Better testing
- Support of higher quality pictures
- Other bug fixes
- A "simple" mode that trades customisability for simplicity of editing
- Map integration with Mapbox
