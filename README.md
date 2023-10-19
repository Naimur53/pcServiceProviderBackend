# Easy PC Backend

## Project Description

Easy PC Backend is a powerful backend system designed to support a multi-role service management platform with three distinct user types: Customer, Admin, and Super-Admin. This system offers essential functionalities to enhance the user experience, streamline service booking, and empower administrators with efficient management tools.

## Features and Functionalities

### User Roles

- **Customer**: Standard users who can explore services, add them to their cart, and book services.
- **Admin**: Administrators responsible for overseeing service orders, user accounts, blog content, FAQs, and feedback.
- **Super-Admin**: Administrators with elevated privileges who can perform all admin functions and manage other admin accounts.

### Customer Features

- Browse a catalog of available services.
- Add services to the cart for future booking.
- Book services, with an option for order confirmation by admins.
- Leave reviews for services to share their experiences.
- Update the status of their bookings if they are not yet completed.
- Access location-based services for added convenience.
- View their booking history and cart from a personalized dashboard.
- Update their user profile through profile settings.

### Admin Features

- View and manage all service orders to ensure efficient order processing.
- Change the status of orders to reflect their progress.
- Add messages to orders to facilitate communication with customers.
- Reschedule orders as necessary to accommodate changes.
- Manage user accounts by blocking or deleting them as needed.
- Create, update, and delete blog content to keep users informed and engaged.
- Manage FAQs, including adding, removing, and updating frequently asked questions.
- Handle feedback provided by users, allowing for improved service quality.
- Create and manage PC services, with the ability to add, update, or delete them.

### Super-Admin Features

- All functionalities available to admins for service and user management.
- Ability to create and remove admin accounts, providing control over administrative access.

## Tech Stack

- **Node.js**: The runtime environment for running server-side JavaScript.
- **Prisma**: A modern database toolkit that simplifies database access.
- **PostgreSQL**: A powerful open-source relational database management system.
- **TypeScript**: A statically typed superset of JavaScript for improved code quality.

## Installation and Setup

1. Clone the repository to your local machine.
2. Install the required dependencies using `npm install`:
   ```bash
   npm install
