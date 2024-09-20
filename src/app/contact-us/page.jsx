// pages/contact.js
'use client'

import Head from 'next/head';
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function Contact() {
  return (
    <section className='border-primary border-t border-b'>
      <Head>
        <title>Contact Us</title>
        <meta name="description" content="Contact us for any questions or queries." />
      </Head>
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl text-center text-secondary font-bold mb-6">Contact Us</h1>

        <section className="mb-8">
          <h2 className="text-2xl  text-secondaryfont-semibold mb-4">Get in Touch</h2>
          <p className="text-lg mb-4">
            For any questions or queries, whether you're already a customer or a potential customer, feel free to reach out to our friendly and knowledgeable customer support team.
          </p>
          <p className="text-lg mb-4">
            Please note that during public holidays, our response may take longer than usual. We will always respond as soon as possible.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl text-secondary font-semibold mb-4">Opening Hours</h2>
          <p className="text-lg mb-4">
            Monday - Friday: <strong>10:00 am - 6:00 pm</strong>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl text-secondary font-semibold mb-4">Our Location</h2>
          <div className="flex items-center space-x-4 mb-4">
            <MapPinIcon className="h-6 w-6 text-gray-500" />
            <p className="text-lg">ADRA, PURULIA, WEST BENGAL 723121</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl text-secondary font-semibold mb-4">Call/WhatsApp Us</h2>
          <div className="flex items-center space-x-4 mb-4">
            <PhoneIcon className="h-6 w-6 text-gray-500" />
            <p className="text-lg">
              <a href="tel:+919800476217" className="text-blue-500 hover:underline">+91 9800476217</a>
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl text-secondary font-semibold mb-4">Email</h2>
          <div className="flex items-center space-x-4 mb-4">
            <EnvelopeIcon className="h-6 w-6 text-gray-500" />
            <p className="text-lg">
              <a href="mailto:stylacor.com@gmail.com" className="text-blue-500 hover:underline">stylacor.com@gmail.com</a>
            </p>
          </div>
        </section>
      </main>
    </section>
  );
}
