import { Navbar } from "../Navbar/Navbar";
export function Services() {
  const services = [
    {
      id: 1,
      name: "Wig Installation",
      duration: "2hrs",
      price: "#25k",
    },
    {
      id: 2,
      name: "Braids",
      duration: "3hrs",
      price: "#30k",
    },
    {
      id: "3",
      name: "Pedicure & Manicure",
      duration: "1hr",
      price: "#15k",
    },
    {
      id: 4,
      name: "Tooth Gem Service",
      duration: "2hrs",
      price: "#20k"
    }
  ];
  return (
    <section className="min-h-screen mx-auto py-10 pt-28">
      <Navbar />
      <h1 className="text-2xl text-center font-bold mb-6">Choose A Service</h1>
      <div className="grid grid-cols-2 gap-10 px-4">
        {services.map((service) => (
          <div key={service.id} 
          className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
            <p className="text-gray-600 mb-1">Duration: {service.duration}</p>
            <p className="text-gray-800 font-bold">Price: {service.price}</p>
          </div>

        ))}
      </div>
    </section>
  );
}
