'use client'

import Head from 'next/head';

export default function PrivacyPolicy() {
  return (
    <div className="border-primary border min-h-screen py-16 px-8 md:px-16">
      <Head>
        <title>Privacy Policy | Stylacor</title>
        <meta name="description" content="Privacy Policy for Stylacor customers and site visitors." />
      </Head>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-secondary">Privacy Policy</h1>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-secondary mb-4">Privacy Commitment</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            At Stylacor, we work diligently to safeguard our customers' privacy. It is one of our top priorities.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-secondary mb-4">Who Does Our Privacy Policy Apply To?</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            This Privacy Policy applies to anyone who makes a transaction on Stylacor.com. If you have any specific questions or queries, feel free to reach out to us via email or customer support.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            <strong>Support Email:</strong> stylacor.com@gmail.com<br />
            <strong>Support Phone/WhatsApp:</strong> +919800476217
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-secondary mb-4">How & When Do We Process Your Personal Data?</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Your personal data is processed any time you interact with Stylacor, including reaching out to us on social media (Facebook, Instagram, Messenger, etc.), filling out forms, making purchases, or communicating with our support team.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            We use your personal data to improve your shopping experience, show personalized offers, and ensure that we fulfill and deliver your orders. If you do not provide this data, you cannot shop with Stylacor.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-secondary mb-4">What Do We Mean by "Personal Data"?</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Personal data includes, but is not limited to:
          </p>
          <ul className="list-disc list-inside text-gray-600 text-lg">
            <li>Name</li>
            <li>Phone number</li>
            <li>Email address</li>
            <li>Physical address</li>
            <li>IP address (used for captcha verification)</li>
            <li>Social media information if/when you contact us via those platforms</li>
            <li>Any additional information you voluntarily provide</li>
          </ul>
          <p className="text-gray-600 text-lg leading-relaxed">
            We never keep your data longer than necessary. Data from live chat is erased when the chat ends. For emails and contact forms, we delete your data 6 months after the last communication. Social media interactions (comments, likes, shares) remain until you remove them.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-secondary mb-4">How We Use Your Personal Data</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Your personal data helps us optimize our website, improve our services, and tailor our promotions to your interests. We also use encrypted data from partners like Google, Facebook, and Instagram to analyze site performance and visitor behavior.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            When you make a purchase, we use your data to:
          </p>
          <ul className="list-disc list-inside text-gray-600 text-lg">
            <li>Receive and process your order</li>
            <li>Send a confirmation email with order details</li>
            <li>Ensure secure payment</li>
            <li>Deliver your order</li>
          </ul>
          <p className="text-gray-600 text-lg leading-relaxed">
            Your data is essential for these steps. Without it, you cannot make a purchase at Stylacor.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-secondary mb-4">Survey Participation</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Occasionally, we use customer data for surveys to improve our services. Information collected includes:
          </p>
          <ul className="list-disc list-inside text-gray-600 text-lg">
            <li>Name</li>
            <li>Email address</li>
            <li>Purchase history</li>
            <li>Promotions used</li>
            <li>Additional survey information</li>
          </ul>
          <p className="text-gray-600 text-lg leading-relaxed">
            This data is used for statistical analysis to help us improve customer experiences.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-secondary mb-4">Revoking Consent</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            You have the right to revoke your consent for data processing. If you wish to do so, contact our support team at <strong>stylacor.com@gmail.com</strong> and we will remove all your data from our database. Please note that revoking consent means you cannot shop with us and will stop receiving any promotional material.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-secondary mb-4">Use of Cookies and IP Data</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            By using our website, you agree to allow third parties to process your IP address to determine your location for currency conversion purposes. This information is stored in a session cookie, which is removed when you close your browser. This allows the currency to remain consistent during your browsing experience.
          </p>
        </section>
      </div>
    </div>
  );
}
