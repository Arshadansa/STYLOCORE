// pages/shipping.js
"use client";

import Head from "next/head";
import Link from "next/link";

export default function Shipping() {
  return (
    <section className="border-primary border-t border-b">
      <Head>
        <title>Shipping Information</title>
        <meta
          name="description"
          content="Shipping information and guarantee details"
        />
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-secondary mb-6">
          Shipping Information
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl text-secondary font-semibold mb-4">
            Free Shipping
          </h2>
          <p className="text-lg mb-4">
            We offer <strong>FREE SHIPPING</strong> on all orders within India.
            We mainly ship via
            <ul className="list-disc list-inside pl-6 mt-2">
              <li>Bluedart</li>
              <li>XpressBees</li>
              <li>Delhivery</li>
              <li>DTDC</li>
            </ul>
          </p>
          <p className="text-lg">
            Estimated delivery time is <strong>7-14 business days</strong>. All
            our shirts are made to order.
          </p>
        </section>

        <section>
          <h2 className="text-2xl text-secondary font-semibold mb-4">
            Our 10-Day Guarantee
          </h2>
          <p className="text-lg mb-4">
            If you’re not happy with your shirt for whatever reason, you can{" "}
            <strong>exchange for free</strong> with the same design within 10
            days of receiving it.
          </p>
          <p className="text-lg">
            We do not offer exchanges for customised orders.
          </p>
        </section>
      </main>
    </section>
  );
}
