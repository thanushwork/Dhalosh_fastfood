import React from 'react';
import { Star, Quote } from 'lucide-react';

const ReviewsSection: React.FC = () => {
  const reviews = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      rating: 5,
      comment: 'Amazing chicken rice! The flavors are authentic and the online ordering system is so convenient. No more waiting in queues!',
      date: '2 days ago',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      rating: 5,
      comment: 'Best chicken 65 in the area! Quick pickup and the food is always fresh. Highly recommended for busy professionals.',
      date: '1 week ago',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 3,
      name: 'Mohammed Ali',
      rating: 4,
      comment: 'Great beef curry and excellent service. The online payment system works perfectly. Will definitely order again!',
      date: '2 weeks ago',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 4,
      name: 'Anitha Reddy',
      rating: 5,
      comment: 'Love the chicken lollipops! The spice level is perfect and the pickup process is super smooth. Great job!',
      date: '3 weeks ago',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 5,
      name: 'Vikram Singh',
      rating: 5,
      comment: 'Fantastic food quality and the online ordering saves so much time. The beef rice is my favorite!',
      date: '1 month ago',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 6,
      name: 'Lakshmi Nair',
      rating: 4,
      comment: 'Delicious food and great value for money. The chicken gravy is amazing. Keep up the good work!',
      date: '1 month ago',
      avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=100'
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
    <section id="reviews" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Customer <span className="text-orange-600">Reviews</span>
          </h2>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="flex space-x-1">
              {renderStars(Math.round(averageRating))}
            </div>
            <span className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</span>
            <span className="text-gray-600">({reviews.length} reviews)</span>
          </div>
          <p className="text-xl text-gray-600">
            See what our customers are saying about us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start space-x-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{review.name}</h3>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex space-x-1 mb-3">
                    {renderStars(review.rating)}
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <Quote className="absolute top-0 left-0 h-6 w-6 text-orange-200 -mt-2 -ml-1" />
                <p className="text-gray-600 italic pl-6">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://maps.app.goo.gl/3CRUtZD1EHv8yQd36"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-semibold"
          >
            <Star className="h-5 w-5" />
            <span>View All Reviews on Google</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;