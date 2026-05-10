import { Bell, Calendar1, BarChart3, Zap, Clock, Shield } from "lucide-react";
import { motion } from "framer-motion";

export function Features() {
  const features = [
    {
      icon: Calendar1,
      title: "Easy Scheduling",
      description: "Clients book appointments in seconds with our intuitive step-by-step flow",
      color: "purple"
    },
    {
      icon: Zap,
      title: "Instant Confirmations",
      description: "Automatic confirmations via WhatsApp keep clients informed immediately",
      color: "blue"
    },
    {
      icon: Bell,
      title: "Smart Reminders",
      description: "Reduce no-shows with timely notifications for upcoming appointments",
      color: "pink"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track bookings, revenue, and performance with real-time insights",
      color: "green"
    },
    {
      icon: Clock,
      title: "Time Management",
      description: "Manage your availability and prevent double bookings effortlessly",
      color: "orange"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime guarantee",
      color: "red"
    }
  ];

  const getColorClass = (color) => {
    const colors = {
      purple: "from-purple-500 to-purple-600",
      blue: "from-blue-500 to-blue-600",
      pink: "from-pink-500 to-pink-600",
      green: "from-green-500 to-green-600",
      orange: "from-orange-500 to-orange-600",
      red: "from-red-500 to-red-600"
    };
    return colors[color];
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9 }}
      id="features"
      className="py-20 md:py-28 px-4 md:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-purple-600 font-bold text-sm tracking-widest mb-4">
            POWERFUL FEATURES
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A complete suite of tools designed to streamline your booking process and delight your clients.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-xl border border-gray-200 hover:border-purple-300 transition duration-300"
              >
                <motion.div
                  className={`bg-gradient-to-br ${getColorClass(feature.color)} w-16 h-16 rounded-lg flex items-center justify-center mb-6 text-white`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Icon size={32} />
                </motion.div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
