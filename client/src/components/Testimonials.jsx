import ReviewCard from "./ReviewCard";

function Testimonials() {

  const reviews = [
    {
      name: "Rahul Sharma",
      review: "Got my personal loan approved in 24 hours. Very easy process!",
      location: "Delhi",
    },
    {
      name: "Neha Gupta",
      review: "Very professional staff and excellent service. Highly recommended!",
      location: "Noida",
    },
    {
      name: "Amit Verma",
      review: "Best loan experience I've ever had. Thank you Pin Money!",
      location: "Ghaziabad",
    },
  ];

  return (
    <section className="bg-gray-50 py-20">

      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-4xl font-bold text-center">
          What Our Customers Say
        </h2>

        <p className="text-center text-gray-500 mt-4">
          Thousands of satisfied customers trust Pin Money.
        </p>

        <div className="grid lg:grid-cols-3 gap-8 mt-14">

          {reviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}

        </div>

      </div>
    </section>
  );
}

export default Testimonials;