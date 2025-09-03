'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface FormData {
    name: string;
    address: string;
    city: string;
    state: string;
    contact: string;
    email_id: string;
    image: FileList;
}

export default function AddSchool() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setSubmitMessage('');

        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('address', data.address);
            formData.append('city', data.city);
            formData.append('state', data.state);
            formData.append('contact', data.contact);
            formData.append('email_id', data.email_id);
            formData.append('image', data.image[0]);

            const response = await fetch('/api/schools', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                setSubmitMessage('School added successfully!');
                reset();
                setTimeout(() => {
                    router.push('/showSchools');
                }, 2000);
            } else {
                setSubmitMessage(result.error || 'Failed to add school');
            }
        } catch (error) {
            setSubmitMessage('An error occurred while adding the school');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                            Add New School
                        </h1>
                        <div className="flex gap-3">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 font-semibold bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-all duration-200"
                            >
                                🏠 Home
                            </Link>
                            <Link
                                href="/showSchools"
                                className="text-gray-600 hover:text-red-600 font-semibold bg-gray-100 hover:bg-red-50 px-4 py-2 rounded-lg transition-all duration-200"
                            >
                                View Schools →
                            </Link>
                        </div>
                    </div>

                    {submitMessage && (
                        <div
                            className={`mb-8 p-4 rounded-lg font-semibold ${submitMessage.includes('successfully')
                                    ? 'bg-green-50 text-green-800 border border-green-200'
                                    : 'bg-red-50 text-red-800 border border-red-200'
                                }`}
                        >
                            {submitMessage.includes('successfully') ? '✅ ' : '❌ '}{submitMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3">
                                    School Name *
                                </label>
                                <input
                                    {...register('name', { 
                                        required: 'School name is required',
                                        pattern: {
                                            value: /^[A-Za-z\s]+$/,
                                            message: 'School name should only contain alphabetical characters and spaces'
                                        }
                                    })}
                                    type="text"
                                    id="name"
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                                    placeholder="Enter school name"
                                />
                                {errors.name && (
                                    <p className="mt-2 text-sm text-red-600 font-medium">❌ {errors.name.message}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="email_id" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    {...register('email_id', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: 'Please enter a valid email format (e.g., example@domain.com)',
                                        },
                                    })}
                                    type="email"
                                    id="email_id"
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                                    placeholder="Enter email address"
                                />
                                {errors.email_id && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email_id.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                                Address *
                            </label>
                            <textarea
                                {...register('address', { required: 'Address is required' })}
                                id="address"
                                rows={3}
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                                placeholder="Enter complete address"
                            />
                            {errors.address && (
                                <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                                    City *
                                </label>
                                <input
                                    {...register('city', { required: 'City is required' })}
                                    type="text"
                                    id="city"
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                                    placeholder="Enter city"
                                />
                                {errors.city && (
                                    <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                                    State *
                                </label>
                                <input
                                    {...register('state', { required: 'State is required' })}
                                    type="text"
                                    id="state"
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                                    placeholder="Enter state"
                                />
                                {errors.state && (
                                    <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">
                                Contact Number *
                            </label>
                            <input
                                {...register('contact', {
                                    required: 'Contact number is required',
                                    pattern: {
                                        value: /^\d{10}$/,
                                        message: 'Contact number must be exactly 10 digits (numbers only)',
                                    },
                                })}
                                type="tel"
                                id="contact"
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                                placeholder="Enter 10-digit contact number"
                            />
                            {errors.contact && (
                                <p className="mt-1 text-sm text-red-600">{errors.contact.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                                School Image *
                            </label>
                            <input
                                {...register('image', { required: 'School image is required' })}
                                type="file"
                                id="image"
                                accept="image/*"
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                            />
                            {errors.image && (
                                <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
                            )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {isSubmitting ? 'Adding School...' : 'Add School'}
                            </button>

                            <button
                                type="button"
                                onClick={() => reset()}
                                className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-md font-medium hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                            >
                                Clear Form
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
