import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const GallerySection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    {
      src: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Chicken Rice Special',
      title: 'Chicken Rice'
    },
    {
      src: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Chicken 65',
      title: 'Chicken 65'
    },
    {
      src: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Beef Curry',
      title: 'Beef Curry'
    },
    {
      src: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Chicken Lollipop',
      title: 'Chicken Lollipop'
    },
    {
      src: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Restaurant Kitchen',
      title: 'Our Kitchen'
    },
    {
      src: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Food Preparation',
      title: 'Fresh Preparation'
    },
    {
      src: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Spicy Chicken',
      title: 'Spicy Chicken'
    },
    {
      src: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Mixed Platter',
      title: 'Mixed Platter'
    }
  ];

  const openModal = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    }
  };

  return (
    <section id="gallery" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Food <span className="text-orange-600">Gallery</span>
          </h2>
          <p className="text-xl text-gray-600">
            Take a look at our delicious dishes and restaurant atmosphere
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
              onClick={() => openModal(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <p className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {image.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
              >
                <X className="h-8 w-8" />
              </button>
              
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
              >
                <ChevronRight className="h-8 w-8" />
              </button>

              <img
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              
              <div className="text-center mt-4">
                <h3 className="text-white text-xl font-semibold">
                  {galleryImages[selectedImage].title}
                </h3>
                <p className="text-gray-300 text-sm mt-1">
                  {selectedImage + 1} of {galleryImages.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;