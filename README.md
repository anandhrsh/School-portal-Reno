# School Portal - Web Development Assignment

A Next.js application for managing school data with MySQL database integration and Cloudinary image uploads. This project allows users to add school information and view schools in an e-commerce style grid layout.

## Features

- **Add School Form**: Responsive form with validation using `react-hook-form`.
- **School Directory**: E-commerce style grid display of schools with search functionality.
- **Cloud Image Upload**: School images are uploaded to Cloudinary for robust and scalable storage.
- **Database Integration**: MySQL database with a well-defined schema and indexes.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MySQL
- **Image Handling**: Cloudinary
- **Form Handling**: `react-hook-form`

## Prerequisites

- Node.js 18+ 
- MySQL Server
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd school-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MySQL database**
   ```sql
   CREATE DATABASE school_portal;
   USE school_portal;
   
   -- Run the script to create the 'schools' table and indexes
   -- You can use a MySQL client (like MySQL Workbench, DBeaver, or the command line) to execute the file.
   SOURCE path/to/your/project/database/init.sql;
   ```

4. **Environment Configuration**
   Create a `.env.local` file in the root directory and add the following variables:
   ```env
   # Database Configuration
   DB_HOST=your_mysql_host
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=school_portal
   DB_PORT=3306

   # Cloudinary Configuration
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_preset
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
school-portal/
├── src/
│   ├── app/
│   │   ├── addSchool/
│   │   │   └── page.tsx          # Add school form page
│   │   ├── showSchools/
│   │   │   └── page.tsx          # Schools directory page
│   │   ├── api/
│   │   │   └── schools/
│   │   │       └── route.ts      # API endpoints for schools
│   │   └── page.tsx              # Home page (redirects to showSchools)
│   ├── lib/
│   │   ├── cloudinary.ts         # Cloudinary configuration
│   │   └── db.ts                 # Database connection
│   └── types/
│       └── school.ts             # TypeScript interfaces
├── public/                     # Static assets
├── database/
│   └── init.sql                # Database schema initialization script
└── README.md
```

## API Endpoints

### GET /api/schools
Fetches all schools from the database.

**Response:**
```json
{
  "schools": [
    {
      "id": 1,
      "name": "Example School",
      "address": "123 Main St",
      "city": "New York",
      "state": "NY",
      "contact": 1234567890,
      "image": "https://res.cloudinary.com/.../image/upload/v123/school.jpg",
      "email_id": "contact@example.com"
    }
  ]
}
```

### POST /api/schools
Adds a new school to the database.

**Request:** FormData with fields:
- `name` (string, required)
- `address` (string, required)
- `city` (string, required)
- `state` (string, required)
- `contact` (string, required, 10+ digits)
- `email_id` (string, required, valid email)
- `image` (File, required, image file)

**Response:**
```json
{
  "message": "School added successfully",
  "id": 1
}
```

## Form Validation

The add school form includes comprehensive validation:

- **Required Fields**: All fields are mandatory
- **Email Validation**: Proper email format validation
- **Contact Validation**: Minimum 10 digits required
- **Image Upload**: Only image files accepted
- **Real-time Feedback**: Immediate validation feedback

## Responsive Design

The application is fully responsive and optimized for:

- **Desktop**: Full grid layout with hover effects
- **Tablet**: 2-3 column grid layout
- **Mobile**: Single column layout with touch-friendly interface

## Deployment

### Vercel Deployment

1. **Push to GitHub**
   Ensure your project is in a public GitHub repository.

2. **Deploy on Vercel**
   - Sign up or log in to [Vercel](https://vercel.com).
   - Click "Add New..." > "Project".
   - Import your GitHub repository.
   - During the setup, expand the "Environment Variables" section.
   - Add all the variables from your `.env.local` file (both Database and Cloudinary variables).
   - Click "Deploy". Vercel will automatically build and host your application.

### Environment Variables for Production

Set these in your hosting platform's dashboard (e.g., Vercel):

```
# Database Configuration
DB_HOST=your_production_db_host
DB_USER=your_production_db_user
DB_PASSWORD=your_production_db_password
DB_NAME=your_production_db_name
DB_PORT=3306

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_preset
```

## Database Schema

The full database schema is defined in the `database/init.sql` file. It includes the table structure, data types, and indexes for performance.

```sql
-- Create schools table for the school portal application
CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  contact BIGINT NOT NULL,
  image VARCHAR(255) NOT NULL,
  email_id VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is created for educational purposes as part of a web development assignment.

## Support

For any issues or questions, please create an issue in the GitHub repository.