const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="text-center mb-8">
    <h2 className="text-3xl font-bold text-cyberaccent">{children}</h2>
    <div className="mt-2 mx-auto w-10 h-0.5 rounded-full bg-gradient-to-r from-cyberaccent to-neondanger" />
  </div>
);

export default SectionTitle;
