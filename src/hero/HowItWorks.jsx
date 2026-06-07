import { motion } from "framer-motion";
import { Clock, CheckCircle, MessageCircle } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: Clock,
      title: "Select Service & Time",
      description: "Browse our services, pick your preferred date and time slot that works best for you.",
      color: "from-purple-500 to-blue-600",
    },
    {
      icon: CheckCircle,
      title: "Book & Confirm",
      description: "Enter your details and confirm your booking instantly. You'll get a WhatsApp confirmation.",
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: MessageCircle,
      title: "Get Reminder & Enjoy",
      description: "Receive booking details via WhatsApp. Show up on time and enjoy your service!",
      color: "from-cyan-500 to-teal-600",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-outfit">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Three simple steps to book your perfect appointment
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {index + 1}
                </div>

                {/* Card */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 h-full border-2 border-gray-200 hover:border-purple-300 transition duration-300">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${step.color} rounded-xl mb-6`}>
                    <Icon size={32} className="text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 font-sora">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 transform -translate-y-1/2"></div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-gray-600 mb-6">
            Ready to streamline your bookings?
          </p>
          <a href="/services" className="inline-block">
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-4 rounded-lg text-lg font-bold hover:shadow-lg hover:scale-105 transition duration-300">
              Start Booking Now
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
