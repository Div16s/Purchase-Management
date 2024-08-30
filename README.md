# Purchase Management Portal

## Overview
Welcome to the Purchase Management project! This project is designed to streamline the purchase approval process within an organization, replacing traditional paper-based methods with a fully online system. It uses a modern technology stack to ensure a robust and scalable solution.

## Technology Stack
- **Frontend**: React.js, Tailwind CSS, Chakra UI
- **Backend**: Node.js, Express.js
- **Database**: Prisma, PostgreSQL

## Getting Started
To run the application locally, follow these steps:

### Client Setup
1. Navigate to the `client` folder.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the client-side development server.

### Server Setup
1. Navigate to the `server` folder.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the server-side development server.

With both the client and server running, you can access the application through a web browser at the specified URL or port.

Apart from running the web app locally, you can also follow the link http://172.30.8.218:5173 to view the deployed version of our portal.

## Features
The Purchase Management System includes the following features:

- **Authentication & Authorization**:
  - Secure login with email and OTP using JWT for token-based authorization.

- **Stakeholder Dashboards**:
  - Personalized dashboards for each role (Faculty, HOD, Accounts Section, Purchase Section, Registrar), with access to role-specific features and information.

- **Purchase Form Submission**:
  - Faculty can submit purchase forms through the dashboard, initiating the approval process.
  - Stakeholders can track and manage forms through the following options in the navbar:
    - **Approved Forms**: Displays forms that have been fully approved.
    - **Pending Forms**: Shows forms that are awaiting approval at different stages.
    - **Rejected Forms**: Lists forms that have been rejected during the approval process.
  - Each form contains details about the purchase request, and users can view its status as it moves through the workflow.

- **Form Approval Workflow**:
  - The purchase form goes through a multi-step approval process involving HOD, Accounts Section, Purchase Section, and Registrar.
  - Stakeholders can approve or reject forms with comments or reasons for rejection.

- **Status Tracking & Notifications**:
  - Real-time status tracking for submitted forms, with notifications to stakeholders when action is required.

- **Digital Signatures & PDF Generation**:
  - Stakeholders provide digital signatures during the approval process.
  - Forms can be viewed and downloaded as PDF documents, providing a digital record of the approval process.

## Contributing
Contributions are welcome! If you'd like to contribute, please follow the standard GitHub workflow:
1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Make your changes and commit them.
4. Submit a pull request with a description of your changes.
