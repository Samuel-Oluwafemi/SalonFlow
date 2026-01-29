import { Navbar } from "../Navbar/Navbar";
export function Services() {
  const services = [
    {
      id: 1,
      name: "Wig Installation",
      duration: "2hrs",
      price: "#25k",
      image: "/images/elless wigs.jpeg"
    },
    {
      id: 2,
      name: "Braiding",
      duration: "3hrs",
      price: "#30k",
      image: "/images/elless braiding2.jpeg"
    },
    {
      id: "3",
      name: "Pedicure & Manicure",
      duration: "1hr",
      price: "#15k",
      image: "/images/elless pedicure.jpeg"
    },
    {
      id: 4,
      name: "Tooth Gem Application",
      duration: "2hrs",
      price: "#20k",
      image: "/images/elless Tooth Gem.jpeg"
    }
  ];
  return (
    <section className="min-h-screen mx-auto py-10 pt-28">
      <Navbar />
      <h1 className="text-2xl md:text-3xl text-center font-bold mb-6">Categories</h1>
      <div className="grid grid-cols-2 gap-4 md:gap-10 px-2 md:px-10">
        {/* Loop through service categories */}
        {services.map((service) => (
          // service id as key
          <div key={service.id} 
          className="p-1 md:p-2 rounded-3xl hover:shadow-lg 
          md:hover:shadow-md hover:shadow-purple-400 transition-shadow duration-300 text-center">
            {/* service image */}
            <div className="w-full">
              <img src={service.image} alt={service.title} 
              className="w-full h-50 md:h-70 relative transition-transform duration-300 
              rounded-3xl object-cover p-2"/>
            </div>
            {/* service title */}
            <div className="p-2">
            <h2 className="text-lg font-semibold mb-2">{service.name}</h2>
          </div>
          </div>

        ))}
      </div>
    </section>
  );
}
