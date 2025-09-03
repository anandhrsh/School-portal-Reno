'use client';

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
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
    const [showPopup, setShowPopup] = useState(false);
    const [popupType, setPopupType] = useState<'success' | 'error'>('success');
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
                setPopupType('success');
                setShowPopup(true);
                reset();
                setTimeout(() => {
                    setShowPopup(false);
                    router.push('/showSchools');
                }, 3000);
            } else {
                setSubmitMessage(result.error || 'Failed to add school');
                setPopupType('error');
                setShowPopup(true);
                setTimeout(() => setShowPopup(false), 4000);
            }
        } catch {
            setSubmitMessage('An error occurred while adding the school');
            setPopupType('error');
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 4000);
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

                    {/* Success/Error Popup Modal */}
                    {showPopup && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
                            <div 
                                className={`relative transform transition-all duration-300 ease-out scale-100 ${
                                    popupType === 'success' 
                                        ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200' 
                                        : 'bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200'
                                } rounded-2xl shadow-2xl max-w-md w-full mx-4`}
                                style={{
                                    fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)',
                                    padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                                    minHeight: 'clamp(200px, 25vh, 300px)',
                                    maxWidth: 'min(90vw, 28rem)'
                                }}
                            >
                                {/* Close button */}
                                <button
                                    onClick={() => setShowPopup(false)}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                                    style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)' }}
                                >
                                    ✕
                                </button>

                                {/* Icon */}
                                <div className="flex justify-center mb-4">
                                    <div 
                                        className={`rounded-full p-3 ${
                                            popupType === 'success' 
                                                ? 'bg-green-100 text-green-600' 
                                                : 'bg-red-100 text-red-600'
                                        }`}
                                        style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
                                    >
                                        {popupType === 'success' ? '✅' : '❌'}
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 
                                    className={`text-center font-bold mb-3 ${
                                        popupType === 'success' ? 'text-green-800' : 'text-red-800'
                                    }`}
                                    style={{ fontSize: 'clamp(1.25rem, 3.5vw, 1.75rem)' }}
                                >
                                    {popupType === 'success' ? 'Success!' : 'Error!'}
                                </h3>

                                {/* Message */}
                                <p 
                                    className={`text-center font-medium leading-relaxed ${
                                        popupType === 'success' ? 'text-green-700' : 'text-red-700'
                                    }`}
                                    style={{ fontSize: 'clamp(1rem, 2.75vw, 1.125rem)' }}
                                >
                                    {submitMessage}
                                </p>

                                {/* Progress indicator for success */}
                                {popupType === 'success' && (
                                    <div className="mt-6">
                                        <div className="text-center text-green-600 text-sm mb-2">
                                            Redirecting to schools list...
                                        </div>
                                        <div className="w-full bg-green-200 rounded-full h-2">
                                            <div 
                                                className="bg-green-500 h-2 rounded-full animate-pulse"
                                                style={{ 
                                                    width: '100%',
                                                    animation: 'progress 3s linear forwards'
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <style jsx>{`
                        @keyframes progress {
                            from { width: 0%; }
                            to { width: 100%; }
                        }
                    `}</style>

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
