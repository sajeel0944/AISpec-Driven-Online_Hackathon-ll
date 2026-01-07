// components/HeroSection.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FiCheckCircle,
  FiArrowRight,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 mb-6"
          >
            <FiTrendingUp className="mr-2 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">
              Trusted by 10,000+ productive teams
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Organize Your Work,{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Master Your Time
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
          >
            TaskFlow is the intelligent todo app that helps teams and
            individuals organize, prioritize, and execute tasks with
            unprecedented efficiency.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link href={"/dashboard"}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl flex items-center group cursor-pointer"
              >
                Start Free Trial
                <FiArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </motion.button>
            </Link>
            <Link href={"#how-it-works"}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-gray-800 border border-gray-200 rounded-full font-semibold text-lg shadow hover:shadow-lg cursor-pointer"
              >
                Watch Demo
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            {[
              { icon: <FiUsers />, value: "50K+", label: "Active Users" },
              {
                icon: <FiCheckCircle />,
                value: "98%",
                label: "Task Completion Rate",
              },
              {
                icon: <FiTrendingUp />,
                value: "40%",
                label: "Productivity Increase",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-sm"
              >
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 bg-blue-50 rounded-full text-blue-600">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-20 relative"
        >
          <div className="relative max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
            <div className="relative bg-white p-1">
              {/* Mock Dashboard UI */}
              <div className="bg-gray-800 h-8 rounded-t-2xl flex items-center px-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Todo List Mock */}
                <div className="md:col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-6 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
                    <div className="h-8 w-8 bg-blue-100 rounded-full"></div>
                  </div>
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="flex items-center mb-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50"
                    >
                      <div className="h-5 w-5 border-2 border-gray-300 rounded-full mr-3"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                      </div>
                      <div className="h-6 w-6 bg-blue-100 rounded"></div>
                    </div>
                  ))}
                </div>

                {/* Progress Chart Mock */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
                  <div className="h-6 w-40 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-6"></div>
                  <div className="h-40 flex items-end justify-between">
                    {[40, 70, 90, 60, 85, 95].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 1 + i * 0.1, duration: 0.8 }}
                        className="w-8 bg-gradient-to-t from-blue-500 to-indigo-500 rounded-t-lg"
                      ></motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-lg border border-gray-100"
          >
            <div className="flex items-center">
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <FiCheckCircle className="text-green-600" />
              </div>
              <div>
                <div className="font-semibold">12 tasks done!</div>
                <div className="text-sm text-gray-500">Today</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
            className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg border border-gray-100"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">85%</div>
              <div className="text-sm text-gray-500">Weekly progress</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
