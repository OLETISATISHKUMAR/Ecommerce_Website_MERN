const testimonials = [
  { name: "Jane Doe", review: "Great service and fantastic products!" },
  { name: "John Smith", review: "Highly recommend this store for quality items." },
  { name: "Emily Johnson", review: "The best online shopping experience I’ve ever had!" },
];

const Testimonials = () => {
  return (
    <section className="py-8 bg-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6">What Our Customers Say</h2>
      <div className="flex overflow-x-scroll space-x-4 p-4">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded shadow-md w-80 text-center flex-shrink-0"
          >
            <p className="text-lg italic">{testimonial.review}</p>
            <p className="mt-4 font-semibold">- {testimonial.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
