const TermsOfService = () => {
  return (
    <section className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-4 text-base-content/80">
        By using GAIF, you agree to use the platform responsibly and follow applicable laws.
        These terms govern account use, orders, and interactions between buyers and sellers.
      </p>
      <ul className="list-disc list-inside space-y-2 text-base-content/80">
        <li>Users must provide accurate account and order details.</li>
        <li>Sellers are responsible for product quality and fulfillment.</li>
        <li>Buyers must use legitimate payment and shipping information.</li>
        <li>We may suspend accounts that violate platform policies.</li>
      </ul>
    </section>
  );
};

export default TermsOfService;
