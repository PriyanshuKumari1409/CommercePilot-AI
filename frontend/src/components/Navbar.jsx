function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-5 shadow-sm bg-white">

      <h1 className="text-2xl font-bold text-blue-600">
        CommercePilot AI
      </h1>

      <div className="flex gap-8 text-gray-700 font-medium">

        <a href="#">Features</a>

        <a href="#">How It Works</a>

        <a href="#">GitHub</a>

      </div>

    </nav>
  );
}

export default Navbar;