const PrivacyPolicy = () => {
  return (
    <section className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4 text-base-content/80">
        We value your privacy and are committed to protecting your personal information.
        This policy outlines how we collect, use, and safeguard your data on the GAIF platform.
      </p>
      <ul className="list-disc list-inside space-y-2 text-base-content/80">
        <li>We collect account and order information to provide marketplace services.</li>
        <li>We use data only to improve user experience and fulfill transactions.</li>
        <li>We do not sell your personal information to third parties.</li>
        <li>You can request updates or deletion of your account data at any time.</li>
      </ul>
    </section>
  );
};

export default PrivacyPolicy;
