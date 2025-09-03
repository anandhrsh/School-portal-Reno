'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { School } from '@/types/school';

export default function ShowSchools() {
    const [schools, setSchools] = useState<School[]>([]);
    const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchSchools();
    }, []);

    const fetchSchools = async () => {
        try {
            const response = await fetch('/api/schools');
            const data = await response.json();

            if (response.ok) {
                setSchools(data.schools);
                setFilteredSchools(data.schools);
            } else {
                setError(data.error || 'Failed to fetch schools');
            }
        } catch {
            setError('An error occurred while fetching schools');
        } finally {
            setLoading(false);
        }
    };

    // Search functionality
    useEffect(() => {
        if (searchTerm === '') {
            setFilteredSchools(schools);
        } else {
            const filtered = schools.filter(school =>
                school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                school.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
                school.address.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredSchools(filtered);
        }
    }, [searchTerm, schools]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center bg-gray-900 rounded-2xl p-8 shadow-2xl animate-float">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-600 border-t-transparent mx-auto"></div>
                    <p className="mt-6 text-white text-lg font-medium">Loading schools...</p>
                    <div className="mt-4 flex justify-center space-x-2">
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center bg-gray-900 rounded-2xl p-8 shadow-2xl animate-float">
                    <div className="text-red-500 text-6xl mb-6 animate-bounce">⚠️</div>
                    <p className="text-white text-lg mb-6 font-medium">{error}</p>
                    <button
                        onClick={fetchSchools}
                        className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gray-900 border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-4xl font-bold text-white">🏫 Schools Directory</h1>
                            <p className="mt-3 text-gray-300 text-lg">
                                Discover amazing schools in your area
                            </p>
                        </div>
                        <div className="mt-6 sm:mt-0">
                            <Link
                                href="/addSchool"
                                className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add New School
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="max-w-md mx-auto">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search schools by name, city, state, or address..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 shadow-sm"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Schools Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
                {filteredSchools.length === 0 && schools.length > 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                        <div className="text-gray-400 text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No schools found</h3>
                        <p className="text-gray-600 mb-4">Try searching with different keywords</p>
                        <button
                            onClick={() => setSearchTerm('')}
                            className="text-red-600 hover:text-red-700 font-semibold"
                        >
                            Clear search
                        </button>
                    </div>
                ) : schools.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                        <div className="text-gray-400 text-8xl mb-6">🏫</div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">No schools found</h3>
                        <p className="text-gray-600 text-lg mb-8">Be the first to add a school to our directory!</p>
                        <Link
                            href="/addSchool"
                            className="inline-flex items-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                        >
                            Add First School
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="mb-8 text-center">
                            <p className="text-gray-700 text-lg font-medium bg-white rounded-full px-6 py-3 inline-block shadow-md">
                                {searchTerm ? (
                                    <>Showing {filteredSchools.length} of {schools.length} school{schools.length !== 1 ? 's' : ''}</>
                                ) : (
                                    <>Showing {schools.length} school{schools.length !== 1 ? 's' : ''}</>
                                )}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filteredSchools.map((school) => (
                                <div
                                    key={school.id}
                                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:scale-105"
                                >
                                    {/* School Image */}
                                    <div className="relative h-52 w-full overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                                        <Image
                                            src={school.image && school.image.trim() !== '' ?
                                                (school.image.startsWith('http') ?
                                                    school.image :
                                                    school.image.startsWith('/') ?
                                                        school.image :
                                                        `/schoolImages/${school.image}`
                                                ) :
                                                'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM2MzY2ZjEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNlYzQ4OTkiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2cpIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJJbnRlciwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7wn4+rIE5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='
                                            }
                                            alt={school.name}
                                            fill
                                            className="object-cover hover:scale-110 transition-transform duration-300"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                if (target.src !== 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM2MzY2ZjEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNlYzQ4OTkiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2cpIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJJbnRlciwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7wn4+rIE5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==') {
                                                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM2MzY2ZjEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNlYzQ4OTkiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2cpIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJJbnRlciwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7wn4+rIE5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                                                }
                                            }}
                                        />
                                    </div>

                                    {/* School Info */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                            {school.name}
                                        </h3>

                                        <div className="space-y-3 text-sm text-gray-600">
                                            <div className="flex items-start bg-gray-50 rounded-lg p-3">
                                                <span className="text-red-600 mr-2">📍</span>
                                                <span className="line-clamp-2 font-medium">{school.address}</span>
                                            </div>

                                            <div className="flex items-center bg-gray-50 rounded-lg p-3">
                                                <span className="text-yellow-600 mr-2">🏙️</span>
                                                <span className="font-medium">{school.city}, {school.state}</span>
                                            </div>
                                        </div>

                                        {/* Contact Info */}
                                        <div className="mt-4 pt-4 border-t border-gray-200">
                                            <div className="flex items-center text-sm text-gray-700 bg-red-50 rounded-lg p-3">
                                                <span className="text-red-600 mr-2">📞</span>
                                                <span className="font-semibold">{school.contact}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
