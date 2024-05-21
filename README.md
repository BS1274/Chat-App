# 🚀 A Real-time Chat Application 

Welcome to our real-time chat application! Experience seamless communication with friends, family, and colleagues with our feature-rich platform.

## 💻 Technologies Used

- React and TailwindCSS for the frontend
- Firebase for authentication
- Node/Express for creating API endpoints
- MongoDB for storing chat room members and their messages
- Socket.io for making the app real-time

## 🎥 Demo

Before diving in, check out our YouTube demo to see the app in action. 

[YouTube Demo](https://youtu.be/PJn2cUT3H-k)

## 🌐 Live Demo

Ready to experience the app firsthand? Access our live demo to explore its functionalities.

[Live Demo](https://chat-app-frontend-amber.vercel.app)

## ✨ Basic Features

- Users can register/login via email and password.
- Profile page where users can update their avatar and display name.
- Generate random avatars using [robohash API](https://robohash.org)
- Users can create a room to chat with others.
- Search functionality.
- Chatting is real-time.
- Emoji picker is also integrated.
- Dark mode can be enabled.
- Date fns for last sent message time to view.

## 🛠️ Getting Started

To run this project locally, follow these steps:

1. Clone the repository.
2. Install the dependencies:
   - Navigate to the `frontend` directory and run `npm install`.
   - To run in the `build` environment in the `frontend` go to that directory and run `npm run build`
   - Navigate to the `server` directory and run `npm install`.
3. Set up Firebase:
   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Create a new project or select an existing one.
   - Go to the project settings or service accounts section.
   - Click on "Generate new private key" in the settings.
   - Save the downloaded JSON file as `serviceAccountKey.json`.
   - Place the downloaded `serviceAccountKey.json` file in the `env` directory.
4. Set up Environment Variables:
   - In the `frontend` directory, create a new file named `.env` based on the `Frontend.env.example` file.
   - Update the values of the environment variables in the `.env` file with your Firebase configuration details.
   - In the root directory, create a new file named `.env` based on the `Backend.env.example` file.
   - Update the values of the environment variables in the `.env` file according to your preferences.
   - For example, set the `PORT` variable to specify the 3001 port for the server and set `MONGODB_URI` to your MongoDB connection URI.
5. Run the server:
   - Navigate to the `server` directory and run `npm run start`.
6. Run the client:
   - Navigate to the `frontend` directory and run `npm start` to start server on development.
   -  Navigate to the `frontend` directory and run `-s build` to start server on production.
7. The application will be accessible at `http://localhost:3001`.
