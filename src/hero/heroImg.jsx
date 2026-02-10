import { motion } from "framer-motion";
export function Img() {
  return (
    <div className="">
      <motion.img 
      initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
      src="/images/iPhone-14.webp"
      className="mx-auto h-100 object-cover rounded-lg"/>
    </div>
  );
}
