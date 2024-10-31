# WeWaterApp
WeWater is a mobile application designed to provide real-time information about water quality, promote awareness of sanitation practices, and offer solutions for water purification in rural Malaysia. The app addresses the challenges of accessing clean water and proper sanitation, particularly in underserved communities.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Deployment](#deployment)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features
- Real-time water quality tracking and feedback system
- User education cards on water purification and sanitation
- Community engagement through reporting water quality issues (feedback form)
- Integration with IBM Watson for data prediction

## Technologies Used
- **Frontend**: React Native
- **Backend**: Node.js, Express
- **Machine Learning**: IBM Watson
- **Deployment**: Render.com for the backend
- **Dataset**: https://data.gov.my/data-catalogue/water_pollution_basin

## Setup Instructions

### Prerequisites
- Node.js installed on your machine
- IBM Watson & Cloud account for machine learning model

### Clone the Repository
```bash
git clone https://github.com/cherrycho/WeWaterApp.git
cd OurWatertest
```

### Install Dependencies
For the frontend:
```bash
npm install
```

For the backend:
```bash
cd backend
npm install
```

### Running the Application Locally
To start the backend server:
```bash
cd backend
node server.js
```

To start the frontend:
```bash
cd WeWaterApp
npm start
```

## Deployment
### Backend Deployment on Render.com
1. Create a new account or log in to Render.com.
2. Click on "New" and select "Web Service."
3. Connect your GitHub account and select the repository containing your backend code.
4. Set the environment variables (if any) required for your application.
5. Choose the correct branch and specify the build command:
   ```bash
   npm install
   ```
6. Set the start command to:
   ```bash
   node server.js
   ```
7. Click "Create Web Service" to deploy your backend.

### Frontend Deployment
For deploying the frontend, use services like Expo (what I use) for hosting the mobile app.

## Usage
Once both the frontend and backend are running, you can access the app on your mobile device or emulator. The app allows users to input water quality data and receive predictions and recommendations based on the results. Users are also able to submit a feedback of real-time local water data.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request if you would like to contribute to the project.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
