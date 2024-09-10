import Head from 'next/head'

export default function About() {
  return (
    <div className=" border-primary border-t border-b min-h-screen py-16 px-8 md:px-16">
      <Head>
        <title>About Us | Stylacor</title>
        <meta name="description" content="About Stylacor, Our Legacy, Philosophy, Vision, and Promise" />
      </Head>

      <div className="max-w-4xl  mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">About us</h1>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">Welcome to Stylacor</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Welcome to Stylacor, where timeless elegance meets contemporary flair. At Stylacor, we are dedicated to crafting exceptional fashion that transcends trends and speaks to the essence of individuality.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">Our Legacy</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Founded with a vision to redefine style, Stylacor marries classic sophistication with modern innovation. We believe that true fashion is both enduring and ever-evolving, seamlessly blending heritage with the latest trends. Our collections are meticulously designed to celebrate beauty in its most authentic form, offering pieces that are as unique as our clientele.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">Our Philosophy</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            At the heart of Stylacor is our commitment to quality and craftsmanship. We source the finest materials and work with skilled artisans who share our passion for excellence. Each garment and accessory is a testament to our dedication to detail, ensuring that every piece not only meets but exceeds our standards.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">Our Vision</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Stylacor is more than just a brand; it is a statement of style and grace. Our mission is to empower individuals to express their true selves through fashion that is both timeless and contemporary. We strive to create an experience that is as memorable as the pieces we offer, blending classic elegance with a modern sensibility.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">Our Promise</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            We are devoted to providing our clients with unparalleled service and an exquisite shopping experience. From personalized recommendations to attentive customer care, we are here to ensure that your journey with Stylacor is nothing short of exceptional.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mt-4">
            Thank you for choosing Stylacor. We invite you to explore our collections and discover the perfect expression of your personal style.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mt-4 italic">
            With warm regards,<br />The Stylacor Team
          </p>
        </section>
      </div>
    </div>
  )
}
