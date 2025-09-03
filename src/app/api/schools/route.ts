import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { School } from '@/types/school';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import cloudinary from '@/lib/cloudinary';

// GET - Fetch all schools
export async function GET() {
  try {
    const [rows] = await db.execute<(School & RowDataPacket)[]>(
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

    // Extract form data using casting to bypass TypeScript FormData issues
    const name = (formData as any).get('name') as string | null;
    const address = (formData as any).get('address') as string | null;
    const city = (formData as any).get('city') as string | null;
    const state = (formData as any).get('state') as string | null;
    const contact = (formData as any).get('contact') as string | null;
    const email_id = (formData as any).get('email_id') as string | null;
    const imageFile = (formData as any).get('image') as File | null;


    // Type guards
    if (typeof name !== 'string' || typeof address !== 'string' ||
      typeof city !== 'string' || typeof state !== 'string' ||
      typeof contact !== 'string' || typeof email_id !== 'string' ||
      !imageFile || !(imageFile instanceof File)) {
      return NextResponse.json(
        { error: 'Invalid form data types' },
        { status: 400 }
      );
    }

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

    // Handle image upload to Cloudinary
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
        },
        (error: any, result: any) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    if (!uploadResult || typeof (uploadResult as any).secure_url !== 'string') {
      return NextResponse.json(
        { error: 'Image upload to Cloudinary failed' },
        { status: 500 }
      );
    }

    const imageUrl = (uploadResult as any).secure_url;

    // Insert school data into database
    const [result] = await db.execute<ResultSetHeader>(
      'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, contactNumber, imageUrl, email_id]
    );

    return NextResponse.json(
      { message: 'School added successfully', id: result.insertId },
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
