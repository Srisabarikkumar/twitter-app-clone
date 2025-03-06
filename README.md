# X Clone Application

## Overview

This is a clone of the popular social media platform X (twitter), built using modern web development technologies. The project aims to replicate core features of X, allowing users to tweet, follow others, like tweets, and more.

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Technologies Used](#technologies-used)
- [Installation](#installation-and-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

### Features:

- **User Authentication**:Sign up, log in, and log out functionality.
- **Tweet Creation**: Users can create and post tweets.
- **Follow System**: Users can follow or unfollow other users.
- **Like Tweets**: Users can like or unlike tweets.
- **Profile Page**: Each user has a profile page displaying their tweets and followers.
- **Responsive Design**: The application is optimized for desktop and mobile devices.

## Screenshots:

1. **Signin/Login Page**

   ![](https://res.cloudinary.com/dfzlizgq1/image/upload/v1741265000/f3xcfihrebhbubsdn5pk.png)

   ![](https://res.cloudinary.com/dfzlizgq1/image/upload/v1741267042/wn7lxx0suojwkhbmqjnn.png)

2. **Home Feed**

   ![](https://res.cloudinary.com/dfzlizgq1/image/upload/v1741267241/che0jpwwjpueq8fdmjgp.png)
   
   ![](https://res.cloudinary.com/dfzlizgq1/image/upload/v1741267358/xayr1m9pn7l6o7mdwp8s.png)

## Technologies Used:

- **Frontend**: React.js, react-router-dom, React Query, Tailwind css.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB.
- **Authentication**: JWT (JSON Web Tokens).
- **Tools and ORM**: Mongoose, Vite, npm.


## Installation and setup:

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd twitter-app-clone
    ```
    
2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up your environment variables. Create a `.env` file in the root directory with the following information:
    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

5. Start the development server:
    ```bash
    npm start
    ```

6. Access the application:
    ```
    http://localhost:3000
    ```

### Usage

1. **Sign Up**: Create a new account using the sign-up page.
2. **Log In**: Log in with your credentials.
3. **Create a Tweet**: Post a new tweet from the home page.
4. **Follow Users**: Search for and follow other users.
5. **Like Tweets**: Like or unlike tweets by clicking the heart icon.
6. **View Profiles**: Click on a user's name to view their profile and tweets.

## API Endpoints:

- **Authentication**
  - `POST /api/auth/login`: Logs in a user.
  - `POST /api/auth/signup`: Registers a new user.

- **Posts**
  - `GET /api/posts`: Fetches posts from the database.
  - `POST /api/posts/create`: Allows an authenticated user to create a new post.

- **User**
  - `GET /api/user/:username`: Fetches user data for a specific profile.
  - `POST /api/user/follow`: Allows an authenticated user to follow another user.

## Contributing:

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch ```(git checkout -b feature/YourFeatureName)```.
3. Commit your changes ```(git commit -m 'Add some feature')```.
4. Push to the branch ```(git push origin feature/YourFeatureName)```.
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE)