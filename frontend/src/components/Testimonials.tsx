// components/Testimonials.tsx
'use client';

import { motion } from 'framer-motion';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useState } from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Alex Johnson',
      role: 'Product Manager',
      company: 'TechCorp Inc.',
      content: 'TaskFlow transformed how our team operates. We\'ve seen a 40% increase in productivity since implementation.',
      avatar: 'AJ',
      rating: 5,
    },
    {
      name: 'Sarah Chen',
      role: 'Software Developer',
      company: 'StartUpXYZ',
      content: 'The intuitive interface and powerful features make this the best task management tool I\'ve ever used.',
      avatar: 'SC',
      rating: 5,
    },
    {
      name: 'Marcus Rivera',
      role: 'Marketing Director',
      company: 'GrowthMasters',
      content: 'From campaign planning to execution, TaskFlow keeps everything organized and on track.',
      avatar: 'MR',
      rating: 4,
    },
    {
      name: 'Priya Sharma',
      role: 'Freelance Designer',
      company: 'CreativeStudio',
      content: 'As a solo entrepreneur, TaskFlow helps me manage multiple clients and projects seamlessly.',
      avatar: 'PS',
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Loved by Teams Worldwide
          </h2>
          <p className="text-xl text-gray-600">
            Join thousands of productive teams who trust TaskFlow to manage their work.
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Testimonial Cards */}
          <div className="overflow-hidden">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100"
            >
              <div className="flex flex-col lg:flex-row items-center">
                <div className="lg:w-1/3 mb-8 lg:mb-0 lg:pr-12">
                  <div className="flex flex-col items-center">
                    <div className="h-24 w-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                      {testimonials[currentIndex].avatar}
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">{testimonials[currentIndex].name}</h4>
                    <p className="text-gray-600">{testimonials[currentIndex].role}</p>
                    <p className="text-blue-600 font-medium">{testimonials[currentIndex].company}</p>
                    <div className="flex items-center mt-3">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`${
                            i < testimonials[currentIndex].rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="lg:w-2/3">
                  <div className="relative">
                    <svg className="absolute -top-4 -left-4 h-8 w-8 text-blue-100" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M10 8v18l12-9-12-9zm2 2.4l7.2 5.4-7.2 5.4v-10.8z" />
                    </svg>
                    <p className="text-2xl md:text-3xl text-gray-800 italic mb-8">
                      {testimonials[currentIndex].content}
                    </p>
                    <svg className="absolute -bottom-4 -right-4 h-8 w-8 text-blue-100" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M22 24v-18l-12 9 12 9zm-2-2.4l-7.2-5.4 7.2-5.4v10.8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="h-12 w-12 bg-white rounded-full border border-gray-200 shadow-md flex items-center justify-center cursor-pointer"
            >
              <FiChevronLeft className="text-gray-700" />
            </motion.button>
            
            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-3 w-3 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-blue-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="h-12 w-12 bg-white rounded-full border border-gray-200 shadow-md flex items-center justify-center cursor-pointer"
            >
              <FiChevronRight className="text-gray-700" />
            </motion.button>
          </div>
        </div>

        {/* Company Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20"
        >
          <p className="text-center text-gray-500 mb-8">Trusted by forward-thinking companies</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {['TechCorp', 'StartUpXYZ', 'GrowthMasters', 'InnovateCo', 'DigitalFirst', 'FutureLabs'].map((company, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="h-16 bg-gradient-to-r from-gray-50 to-white border border-gray-100 rounded-xl flex items-center justify-center text-gray-700 font-bold"
              >
                {company}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;