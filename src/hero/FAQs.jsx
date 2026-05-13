import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How do I book an appointment?",
      answer: "Navigate to our services page, select your preferred service and sub-service, pick your date and time, enter your contact details, and confirm your booking. You'll receive a WhatsApp confirmation immediately.",
    },
    {
      question: "Can I cancel or reschedule my booking?",
      answer: "Yes! You can reschedule by contacting us via WhatsApp with your booking details. Cancellations must be made at least 24 hours before your appointment for a full confirmation update.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept cash payments at the time of service. Payment is made directly when you arrive for your appointment. No advance payment is required.",
    },
    {
      question: "What if I can't make my appointment?",
      answer: "Contact us as soon as possible via the WhatsApp message you received with your booking. We'll help you reschedule for another time at no extra cost.",
    },
    {
      question: "Is my personal information safe?",
      answer: "Your information is stored securely and only used for booking confirmations and service notifications. We never share your data with third parties.",
    },
    {
      question: "How will I receive my booking confirmation?",
      answer: "You'll receive an automatic WhatsApp message with your booking details including date, time, and service information. You'll also see it on your confirmation screen.",
    },
    {
      question: "Can I book multiple services at once?",
      answer: "Each booking is for one service. If you need multiple services, you can create separate bookings for different time slots on the same day.",
    },
    {
      question: "What's your cancellation policy?",
      answer: "Cancellations made 24 hours before your appointment are free. Cancellations within 24 hours may incur a cancellation fee. No-shows will be considered a cancellation.",
    },
  ];

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about booking and our services
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-purple-300 transition duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition duration-200"
              >
                <h3 className="text-lg font-bold text-gray-900 text-left">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  <ChevronDown size={24} className="text-purple-600" />
                </motion.div>
              </button>

              {/* Answer */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-blue-50 border-t-2 border-purple-200">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center p-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl"
        >
          <h3 className="text-2xl font-bold text-white mb-2">
            Still have questions?
          </h3>
          <p className="text-purple-100 mb-6">
            Contact us via WhatsApp and our team will be happy to help!
          </p>
          <a
            href="https://wa.me/2349012345678"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:scale-105 transition duration-300"
          >
            Message on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
};
