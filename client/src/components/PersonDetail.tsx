import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { ArrowLeft, Edit, Mail, Phone, MapPin, Calendar, Briefcase, FileText } from 'lucide-react';

const PersonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: person, isLoading, error } = useQuery(
    ['person', id],
    async () => {
      const response = await axios.get(`/api/people/${id}`);
      return response.data;
    }
  );

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
        <p className="mt-2 text-sm text-gray-500">Loading person details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">Failed to load person details</div>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          Back to People
        </button>
      </div>
    );
  }

  if (!person) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-600 mb-4">Person not found</div>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          Back to People
        </button>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to People
        </button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {person.first_name} {person.last_name}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Added on {formatDate(person.created_at)}
              {person.updated_at !== person.created_at && (
                <span> • Updated on {formatDate(person.updated_at)}</span>
              )}
            </p>
          </div>
          
          <Link
            to={`/edit/${person.id}`}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Person
          </Link>
        </div>
      </div>

      {/* Person Information */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                Contact Information
              </h2>
              
              <div className="space-y-4">
                {person.email && (
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Email</p>
                      <a
                        href={`mailto:${person.email}`}
                        className="text-sm text-primary-600 hover:text-primary-500"
                      >
                        {person.email}
                      </a>
                    </div>
                  </div>
                )}

                {person.phone && (
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Phone</p>
                      <a
                        href={`tel:${person.phone}`}
                        className="text-sm text-primary-600 hover:text-primary-500"
                      >
                        {person.phone}
                      </a>
                    </div>
                  </div>
                )}

                {person.address && (
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Address</p>
                      <p className="text-sm text-gray-600 whitespace-pre-line">
                        {person.address}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                Personal Information
              </h2>
              
              <div className="space-y-4">
                {person.date_of_birth && (
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Date of Birth</p>
                      <p className="text-sm text-gray-600">
                        {formatDate(person.date_of_birth)}
                      </p>
                    </div>
                  </div>
                )}

                {person.occupation && (
                  <div className="flex items-start">
                    <Briefcase className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Occupation</p>
                      <p className="text-sm text-gray-600">{person.occupation}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Notes */}
          {person.notes && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-start">
                <FileText className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                <div className="flex-1">
                  <h2 className="text-lg font-medium text-gray-900 mb-2">Notes</h2>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700 whitespace-pre-line">
                      {person.notes}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 flex justify-center space-x-4">
        <Link
          to={`/edit/${person.id}`}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Person
        </Link>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Back to People
        </button>
      </div>
    </div>
  );
};

export default PersonDetail;
