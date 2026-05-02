import { motion } from "framer-motion";
function HeadlineSection({
  heading,
  paragraph,
}: {
  heading: string;
  paragraph: string;
}) {
  return (
    <div className=" text-secondary flex flex-col  items-center justify-center py-4 mb-12 text-center">
      <motion.h2
        initial={{ opacity: 0, x: 120 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-2xl md:text-4xl lg:text-5xl font-black text-secondary mb-1"
      >
        {heading}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, x: -120 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-[#334155] text-shadow-md font-medium max-w-60 leading-4"
      >
        {paragraph}
      </motion.p>
    </div>
  );
}

export default HeadlineSection;
