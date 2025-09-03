import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { School } from '@/types/school';

// GET - Fetch all schools
export async function GET() {
  try {
    const [rows] = await db.execute<School[]>(
      'SELECT * FROM schools ORDER BY id DESC'
    );
    
    return NextResponse.json({ schools: rows });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch schools' },
      { status: 500 }
    );
  }
}

// POST - Add new school
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const address = formData.get('address') as string;
    const city = formData.get('city') as string;
    const state = formData.get('state') as string;
    const contact = formData.get('contact') as string;
    const email_id = formData.get('email_id') as string;
    const imageFile = formData.get('image') as File;
    
    // Validate required fields
    if (!name || !address || !city || !state || !contact || !email_id || !imageFile) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email_id)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Validate contact number
    const contactNumber = parseInt(contact);
    if (isNaN(contactNumber) || contactNumber.toString().length < 10) {
      return NextResponse.json(
        { error: 'Invalid contact number' },
        { status: 400 }
      );
    }
    
    // Handle image upload
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Generate unique filename
    const timestamp = Date.now();
    const fileExtension = imageFile.name.split('.').pop();
    const fileName = `school_${timestamp}.${fileExtension}`;
    
    // Save image to public/schoolImages folder
    const fs = require('fs');
    const path = require('path');
    const uploadDir = path.join(process.cwd(), 'public', 'schoolImages');
    
    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, buffer);
    
    // Insert school data into database
    const [result] = await db.execute(
      'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, contactNumber, fileName, email_id]
    );
    
    return NextResponse.json(
      { message: 'School added successfully', id: (result as any).insertId },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to add school' },
      { status: 500 }
    );
  }
}
