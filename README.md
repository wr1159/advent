# Advent - Milestone 1 README

README to be submitted for Milestone 1.

Website is deployed to [https://advent-beta.vercel.app](https://advent-beta.vercel.app)

# Table of Contents

1. [Team Information](#team-information)
2. [Problem Definition](#problem-definition)
3. [Aim](#aim)
4. [Planned Features](#planned-features)
5. [Application](#application)
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
6. [Timeline](#timeline)

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

# Planned Features

## Authorisation using email, password and Google login

We will require the user to be authenticated before they are able to access the features such as creating the landing page and registration page or viewing their data. This will be done with [Firebase Authentication](https://firebase.google.com/docs/auth) which is well integrated with google log in. The other alternative we considered was [NextAuth.js](https://next-auth.js.org/) but we decided to go with Firebase due to it's versatility.

## Customise landing page and registration page

We plan for this to be editing a template where users can edit the title, description, location and other information to suit their website. As we follow an iterative approach of development, we will start with text styling and move on to other features such as colour, images and maps.

### Allow adding of images

We plan for users to be able to upload their own hero images into the website or pick from our preselected images into the event page.

### Integration of google maps with a maps library like [Mapbox.js](https://docs.mapbox.com/mapbox.js/api/v3.3.1/)

As the location is currently a string, we plan for the users to select a google maps location to display on the event landing page to allow event registrations to not be confused with certain locations.

### Integration of colour picker with colour library

We plan to allow users to change the colours of the background, text and this will require a colour library where users can view the change visually.

## Integration to user's website with Iframe tag

We plan to allow event organisers to import the iframe tag for their specific event and it will be well integrated into their website without any other coding.

## Event registration page for sharing

As not every event organisers might have their own website, they will be able to use the event registration page by itself through a link to a specific advent page made for their event.

## Data Dashboard to view data with charts

To make sense of their collected data, we plan to use [ChartJS](https://www.chartjs.org/) and allow users to view their data at a glance using various charts like bar chart, line chart, pie chart and more.

## API to fetch collected data

We plan to allow power users to download the collected data via an API for their further analysis.

## Payment system with Stripe

As events could require a payment to enter, we plan to integrate Stripe API where users can checkout and pay.

## Drag and Drop Feature to customise event page

This drag and drop feature will be the final iteration of the event page customisation feature. We will allow users to drag elements to reorder them similar to [Canva](https://www.canva.com) and other website builders. This will be very user intuitive and allow better customisation for them instead of simply following a template.

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

### Authentication

Authentication is done with Firebase authentication and much of the heavy lifting is done by the library. We currently offer email sign ups and Google login but we are open to enabling other forms of sign ups upon feedback in Milestone 1.

### Database

Database used is Firestore from Firebase. Here is our database design. Firestore is a noSQL database that allows us to have better data structure instead of several nested objects in normal SQL databases.
![database](https://github.com/wr1159/advent/assets/56021409/ec1e767e-5b7c-44d5-a35f-95ae0e7bb743)

### User Activity Diagram

To plan for users testing and usage, we have created a User Navigation Diagram.
![activity diagram drawio](https://github.com/wr1159/advent/assets/56021409/611fc126-d5c7-4ebc-b410-42b62981452e)

### Testing

We currently only have unit testing for certain components but plan to integrate integration tests using cypress in the future. Our current test coverage is 22% which is far from optimal but we believe that creating a minimum viable product was more important than using a continuous testing process which would have slowed down our development.

Including testing will also create bloat which is not what we want in it's current state - a proof of concept.

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

# Timeline

We have currently completed the following features:

- Authentication (To be tested via login with google or sign up)
- Creating new events
- Displaying produced event landing page
- Public pages such as /orbital, /documentation and root page.
- Data Dashboard (Frontend)

### These are our planned tasks for the following sprints:

Sprint 2:

- Implementing formatting of text
- Implementing WYSIWYG toolbar to edit text
- Images Integration
- Colour Library

Sprint 3 (Milestone 2)

- Data Dashboard
- Map Integration
- Stripe Integration
- Testing

Sprint 4

- Drag and Drop feature
- API to fetch data
- Testing

Sprint 5 (Milestone 3)

- Complete Drag and Drop Feature
- Complete API to fetch data
- Testing

Sprint 6

- Refinement for Splashdown
