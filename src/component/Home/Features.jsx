import { motion } from "framer-motion";
import f1 from "../../assets/images/feature1.png";
import f2 from "../../assets/images/feature2.png";
import f3 from "../../assets/images/feature3.png";

const Features = () => {
    const features = [
        {
            image:f1,
            title : "Clean Design",
            description : "Beautiful, modern interfaces that make your experience seamless and enjoyable. Every pixel crafted with care.",
        },
        {
            image:f2,
            title : "Responsive Layout",
            description : "Perfect experience across all devices. From mobile to desktop, your work looks stunning everywhere.",
        },
        {
            image:f3,
            title : "Great Support",
            description : "24/7 dedicated support team ready to help. We're here whenever you need us, ensuring your success.",
        },
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <section className='px-8 py-24 bg-[#F8FAFC]'>
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <h1 className="font-extrabold text-4xl md:text-5xl bg-gradient-to-r from-[#6D28D9] via-[#3B82F6] to-[#0EA5E9] bg-clip-text text-transparent mb-4">
                    Why Choose Us
                </h1>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Discover what makes us the perfect choice for your freelance needs
                </p>
            </motion.div>
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
            >
                {features.map((feature,index) => (
                    <motion.div 
                        key={index} 
                        variants={itemVariants}
                        whileHover={{ y: -8, transition: { duration: 0.3 } }}
                        className='flex flex-col items-center text-center bg-white rounded-3xl p-10 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(109,40,217,0.15)] transition-all duration-500 border border-gray-100/50'
                    >
                        <div className="relative mb-8">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#6D28D9]/20 to-[#3B82F6]/20 rounded-full blur-2xl"></div>
                            <div className="relative bg-gradient-to-br from-[#6D28D9]/10 to-[#3B82F6]/10 rounded-3xl p-6">
                                <img className='w-24 h-24 object-contain transform transition-transform duration-300 hover:scale-110' src={feature.image} alt={feature.title} />
                            </div>
                        </div>
                        <h3 className='text-2xl font-bold mb-4 text-[#0F172A]'>{feature.title}</h3>
                        <p className='text-gray-600 text-base leading-relaxed'>{feature.description}</p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Features;