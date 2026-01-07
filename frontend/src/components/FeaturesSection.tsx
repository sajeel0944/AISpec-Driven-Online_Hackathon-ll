// components/FeaturesSection.tsx
"use client";

import { motion } from "framer-motion";
import {
  FiLayers,
  FiBell,
  FiShare2,
  FiBarChart2,
  FiLock,
  FiSmartphone,
  FiCheckCircle,
} from "react-icons/fi";

const FeaturesSection = () => {
  const features = [
    {
      icon: <FiLayers />,
      title: "Smart Task Management",
      description:
        "Organize tasks with drag-and-drop boards, custom labels, and priority levels.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FiBell />,
      title: "Smart Reminders",
      description:
        "Never miss a deadline with intelligent notifications and scheduling.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <FiShare2 />,
      title: "Team Collaboration",
      description:
        "Share tasks, assign responsibilities, and track team progress in real-time.",
      color: "from-green-500 to-teal-500",
    },
    {
      icon: <FiBarChart2 />,
      title: "Analytics Dashboard",
      description:
        "Visualize your productivity with detailed reports and insights.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <FiLock />,
      title: "Bank-Level Security",
      description:
        "Your data is protected with end-to-end encryption and secure backups.",
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: <FiSmartphone />,
      title: "Cross-Platform Sync",
      description:
        "Access your tasks anywhere, on any device, with real-time synchronization.",
      color: "from-yellow-500 to-amber-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section
      id="features"
      className="py-20 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Maximum Productivity
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to organize, track, and complete your tasks
            efficiently.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div
                className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <div className="text-white text-2xl">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 border border-blue-100"
        >
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                AI-Powered Task Prioritization
              </h3>
              <p className="text-gray-700 mb-6">
                Our intelligent algorithm analyzes your tasks and automatically
                suggests the optimal order based on deadlines, importance, and
                your work patterns.
              </p>
              <ul className="space-y-3">
                {[
                  "Automatic priority scoring",
                  "Smart deadline alerts",
                  "Time estimation",
                  "Workload balancing",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center"
                  >
                    <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <FiCheckCircle className="text-blue-600" size={14} />
                    </div>
                    <span className="text-gray-900">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="space-y-4">
                  {[
                    {
                      title: "Prepare quarterly report",
                      priority: "High",
                      time: "2h",
                    },
                    {
                      title: "Team meeting agenda",
                      priority: "Medium",
                      time: "30m",
                    },
                    {
                      title: "Update project documentation",
                      priority: "Low",
                      time: "1h",
                    },
                  ].map((task, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.5 }}
                      className="flex items-center p-4 rounded-xl border border-gray-100 hover:bg-gray-50"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {task.title}
                        </div>
                        <div className="flex items-center mt-1">
                          <div
                            className={`px-2 py-1 rounded text-xs font-medium mr-3 ${
                              task.priority === "High"
                                ? "bg-red-100 text-red-800"
                                : task.priority === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {task.priority}
                          </div>
                          <div className="text-sm text-gray-500">
                            {task.time}
                          </div>
                        </div>
                      </div>
                      <div className="h-5 w-5 border-2 border-gray-300 rounded"></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
