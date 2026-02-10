export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Bookify. All rights reserved.
        </p>
        <p className="text-sm mt-2">Made with ❤️ by Bookify Team.</p>
      </div>
    </footer>
  );
}
