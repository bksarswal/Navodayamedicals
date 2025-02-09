import React from "react"

function About() {
  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">About Navodaya Medicals </h2>
        <p className="mb-4">
          Navodaya Medicals  has been serving the community for over 1 years. We pride ourselves on providing
          high-quality medicines and excellent customer service.
        </p>
        <p className="mb-4">
          Our experienced pharmacists are always available to answer your questions and provide expert advice on
          medications and health-related issues.
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Wide range of medicines and healthcare products</li>
          <li>Competitive prices</li>
          {/* <li>Fast and reliable home delivery service</li>
          <li>24/7 emergency service</li> */}
        </ul>
        <p>Visit us today and experience the Navodaya Medicals  difference!</p>
      </div>
    </div>
  )
}

export default About

