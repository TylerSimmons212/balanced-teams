# Team Generator

A Next.js web app for creating balanced teams based on user-inputted individuals. The app considers sex, height, and skill level when generating teams.

## Features

- User authentication with Firebase
- Add, edit, and delete players
- Generate balanced teams based on sex, height, and skill level
- Regenerate teams
- Material UI design

## Getting Started

1. Clone this repository and navigate to the project folder.

2. Install dependencies: 

npm install

3. Create a `.env.local` file in the root of the project with your Firebase project credentials:

NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id


4. Run the development server:

npm run dev


5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

## Build and Deploy

To create a production build, run:

npm run build


To start the production server, run:

npm run start


For deploying the app, follow the [Next.js deployment documentation](https://nextjs.org/docs/deployment).