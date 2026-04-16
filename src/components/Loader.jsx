export function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <div className="w-24 h-24 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-8"></div>
      <h2 className="text-2xl font-bold mb-2">Welcome to VenueFlow AI</h2>
      <p className="text-blue-200 max-w-md">
        Allow location access for live crowd data, wait times, and smart navigation.
      </p>
    </div>
  );
}
