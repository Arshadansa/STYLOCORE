// pages/returns.js
'use client'

import Head from 'next/head';
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Returns() {
  return (
    <section className='border-primary border-t border-b'>
      <Head>
        <title>Returns, Exchanges & Refunds</title>
        <meta name="description" content="Information on returns, exchanges, and refunds" />
      </Head>
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl text-secondary text-center font-bold mb-6">Returns, Exchanges & Refunds</h1>

        <section className="mb-8">
          <h2 className="text-2xl text-secondary font-semibold mb-4">Returns</h2>
          <p className="text-lg mb-4">
            Returns will only be accepted if the customer received the incorrect size or product(s), or if the received product(s) were damaged in any way. If this is due to no fault of the customer, Stylacor will pay for the return shipping cost once the item has been received by one of our agents.
          </p>
          <p className="text-lg mb-4">
            Once the product(s) have been returned, we will ship the correct product(s) at no additional charge.
          </p>
          <p className="text-lg mb-4">
            This agreement becomes void if the product is damaged during transportation.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl text-secondary font-semibold mb-4">Exchanges</h2>
          <p className="text-lg mb-4">
            We do not offer exchanges on customized orders.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl text-secondary font-semibold mb-4">Refunds</h2>
          <p className="text-lg">
            We do not provide refunds.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl text-secondary font-semibold mb-4">Contact Us</h2>
          <p className="text-lg mb-4">
            Any communication must be done through our customer support email:
          </p>
          <div className="flex items-center space-x-4 mb-4">
            <EnvelopeIcon className="h-6 w-6 text-gray-500" />
            <p className="text-lg">
              <a href="mailto:stylacor.com@gmail.com" className="text-blue-500 hover:underline">stylacor.com@gmail.com</a>
            </p>
          </div>
          <p className="text-lg mb-4">
            Support phone #:
          </p>
          <div className="flex items-center space-x-4 mb-4">
            <PhoneIcon className="h-6 w-6 text-gray-500" />
            <p className="text-lg">
              <Link href="tel:+919800476217" className="text-blue-500 hover:underline">+91 9800476217</Link>
            </p>
          </div>
        </section>
      </main>
    </section>
  );
}
