import { motion } from "framer-motion";
import { TrendingUp, Users, Calendar, Zap } from "lucide-react";

export function Stats() {
  const stats = [
    {
      icon: Users,
      number: "500+",
      label: "Active Users",
      description: "Beauty professionals trust us daily"
    },
    {
      icon: Calendar,
      number: "50K+",
      label: "Bookings Processed",
      description: "Successfully managed appointments"
    },
    {
      icon: TrendingUp,
      number: "95%",
      label: "Client Satisfaction",
      description: "Average satisfaction rate"
    },
    {
      icon: Zap,
      number: "99.9%",
      label: "Uptime",
      description: "Reliable service guaranteed"
    }
  ];

  return (
    <section className="py-16 md:py-20 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.15 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="bg-gradient-to-br from-purple-100 to-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600"
                >
                  <Icon size={28} />
                </motion.div>
                <p className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</p>
                <p className="text-lg font-semibold text-gray-800 mb-2">{stat.label}</p>
                <p className="text-gray-600 text-sm">{stat.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
