"use client";

export default function NewsletterForm({ dark = false }) {
  return (
    <form
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="ton@email.fr"
        required
        className={`flex-1 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${
          dark
            ? "bg-white/10 border border-white/20 text-white placeholder-gray-400"
            : "border border-gray-200 text-gray-900"
        }`}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors whitespace-nowrap text-sm"
      >
        Je m'inscris →
      </button>
    </form>
  );
}
