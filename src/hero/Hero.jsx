import { Navbar } from "../Navbar/Navbar";
export default function Hero() {
    return (
        <section>
            <Navbar />
            <div className="bg-white pt-24 pb-12 px-4 text-center md:px-8">
                <h1 className="text-4xl font-bold text-purple-600 mb-4 md:text-5xl">
                    Welcome to SalonFlow    
                </h1>
                <p className="text-lg text-gray-700 mb-6 md:text-xl">
                    Your Ultimate Salon Booking Experience
                </p>
                <a
                    href="#services"
                    className="inline-block bg-purple-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-purple-700 transition-colors duration-300"
                >
                    Explore Our Services
                </a>
            </div>
        </section>
    )
} 