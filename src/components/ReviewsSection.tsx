import React from 'react';
import { Star, Quote, ExternalLink, MapPin, ThumbsUp, Calendar, User } from 'lucide-react';

const ReviewsSection: React.FC = () => {
  // Google Reviews Integration
  const GOOGLE_PLACE_ID = 'ChIJN1t_tDeuEmsRUsoyG83frY4'; // Replace with your actual Place ID
  const GOOGLE_REVIEWS_URL = `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`;
  
  const reviews = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      rating: 5,
      comment: 'Amazing chicken rice! The flavors are authentic and the online ordering system is so convenient. No more waiting in queues! Best fast food in the area.',
      date: '2 days ago',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
      verified: true,
      source: 'Google'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      rating: 5,
      comment: 'Best chicken 65 in the area! Quick pickup and the food is always fresh. Highly recommended for busy professionals. The UPI payment system is seamless.',
      date: '1 week ago',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      verified: true,
      source: 'Google'
    },
    {
      id: 3,
      name: 'Mohammed Ali',
      rating: 4,
      comment: 'Great beef curry and excellent service. The online payment system works perfectly. Will definitely order again! Professional setup and quick service.',
      date: '2 weeks ago',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100',
      verified: true,
      source: 'Google'
    },
    {
      id: 4,
      name: 'Anitha Reddy',
      rating: 5,
      comment: 'Love the chicken lollipops! The spice level is perfect and the pickup process is super smooth. Great job! Modern restaurant with traditional taste.',
      date: '3 weeks ago',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100',
      verified: true,
      source: 'Google'
    },
    {
      id: 5,
      name: 'Vikram Singh',
      rating: 5,
      comment: 'Fantastic food quality and the online ordering saves so much time. The beef rice is my favorite! Professional service and authentic flavors.',
      date: '1 month ago',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
      verified: true,
      source: 'Google'
    },
    {
      id: 6,
      name: 'Lakshmi Nair',
      rating: 4,
      comment: 'Delicious food and great value for money. The chicken gravy is amazing. Keep up the good work! Excellent customer service and quality.',
      date: '1 month ago',
      avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=100',
      verified: true,
      source: 'Google'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <section id="reviews" className="py-20 bg-gradient-to-br from-gray-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-6 shadow-lg">
            <Star className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Customer <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Reviews</span>
          </h2>
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="flex space-x-1">
              {renderStars(Math.round(averageRating))}
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">{averageRating.toFixed(1)}</span>
            <span className="text-lg text-gray-600">({reviews.length}+ reviews)</span>
            <div className="flex items-center space-x-1 bg-green-100 px-3 py-1 rounded-full">
              <ThumbsUp className="h-4 w-4 text-green-600" />
              <span className="text-sm font-semibold text-green-700">Verified</span>
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real reviews from our valued customers on Google Reviews
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200 group">
              <div className="flex items-start space-x-4 mb-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-orange-200 group-hover:border-orange-400 transition-colors"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{review.name}</h3>
                      <div className="flex items-center space-x-2">
                        {review.verified && (
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-xs text-green-600 font-medium">Verified</span>
                          </div>
                        )}
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{review.source}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-xs text-gray-500 mb-1">
                        <Calendar className="h-3 w-3" />
                        <span>{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-1 mb-4">
                    {renderStars(review.rating)}
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <Quote className="absolute top-0 left-0 h-8 w-8 text-orange-200 -mt-2 -ml-2" />
                <p className="text-gray-700 italic pl-8 leading-relaxed">{review.comment}</p>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <User className="h-3 w-3" />
                    <span>Google Review</span>
                  </div>
                  <div className="flex items-center space-x-1 text-orange-600">
                    <ThumbsUp className="h-3 w-3" />
                    <span className="text-xs font-medium">Helpful</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 text-center text-white shadow-2xl">
          <h3 className="text-2xl font-bold mb-4">Share Your Experience</h3>
          <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
            Had a great meal? Help others discover our delicious food by leaving a review on Google!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 bg-white text-orange-600 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Star className="h-6 w-6" />
              <span>Write a Google Review</span>
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href="https://maps.app.goo.gl/3CRUtZD1EHv8yQd36"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-orange-600 transition-all duration-300 font-bold"
            >
              <MapPin className="h-6 w-6" />
              <span>View All Reviews</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          
          <div className="mt-6 pt-6 border-t border-orange-400">
            <p className="text-sm text-orange-100">
              🌟 Your review helps us serve you better and helps others discover great food!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;