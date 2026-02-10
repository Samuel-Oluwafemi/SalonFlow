import { Bell, Calendar1, NotebookTabsIcon } from "lucide-react";
export function Features() {
  return (
    <section
      id="features"
      className="bg-gray-100 font-inter md:mt-5 mt-7 py-19 px-4 md:px-10 text-center mx-auto"
    >
      <h2 className="text-3xl md:text-4xl font-bold md:mb-4 mb-5">
        Features that Make Booking Easy
      </h2>
      <p className="hidden md:block md:mb-12 mb-6 px-6 text-gray-500 text-md md:text-lg">
        From easy scheduling to automated reminders, <br /> our platform has
        everything you need to manage your appointments effortlessly.
      </p>
      {/* features cards */}
      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Calendar1 className="mx-auto mb-4 text-purple-500" size={50} />
          <h3 className="text-xl font-semibold mb-4">Easy Scheduling</h3>
          <p className="text-gray-600">
            Our intuitive interface allows clients to book appointments in just
            a few clicks, saving time and reducing no-shows.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">
            <NotebookTabsIcon
              className="mx-auto mb-4 text-purple-500"
              size={50}
            />
            Customizable Booking Pages
          </h3>
          <p className="text-gray-600">
            Create personalized booking pages that reflect your brand and
            provide a seamless experience for your clients.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <Bell className="mx-auto mb-4 text-purple-500" size={50} />
          <h3 className="text-xl font-semibold mb-4">Automated Reminders</h3>
          <p className="text-gray-600">
            Reduce no-shows with automated email and SMS reminders that keep
            your clients informed about their upcoming appointments.
          </p>
        </div>
      </div>
    </section>
  );
}
