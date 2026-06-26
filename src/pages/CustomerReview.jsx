import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const reviews = [
  {
    id: 1,
    name: "Rahul Kumar",
    image: "https://i.pravatar.cc/150?img=12",
    rating: "★★★★★",
    review:
      "Excellent smartphone with premium design, great camera quality and smooth performance.",
  },
  {
    id: 2,
    name: "Priya Sharma",
    image: "https://i.pravatar.cc/150?img=32",
    rating: "★★★★★",
    review:
      "Battery backup is amazing. Display quality is superb. Worth every rupee.",
  },
  {
    id: 3,
    name: "Arjun Singh",
    image: "https://i.pravatar.cc/150?img=18",
    rating: "★★★★☆",
    review:
      "Fast processor and excellent gaming performance. Highly recommended.",
  },
];

function CustomerReviews() {
  return (
    <>
      <Navbar />

      <div
        style={{
          background: "#f4f7fc",
          minHeight: "80vh",
          padding: "40px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#2563eb",
            marginBottom: "40px",
          }}
        >
          Customer Reviews
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: "30px",
            maxWidth: "1100px",
            margin: "auto",
          }}
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              style={{
                background: "white",
                borderRadius: "15px",
                padding: "25px",
                textAlign:"center",
                boxShadow:"0 5px 15px rgba(0,0,0,0.15)",
              }}>
                <img
                src={review.image}
                ait={review.name}
                style={{
                    width:"90px",
                    height:"90px",
                    borderRadius:"50%",
                    objectFit:"cover",
                }}
                />

                <h3>{review.name}</h3>

                <p style={{color:"#fbbf24",
                fontsize:"20px"}}>
                    {review.rating}
                </p>
                <p>{review.review}</p>
              </div>
          ))}
          </div>
          </div>

          <Footer/>
          </>
  );
}

export default CustomerReviews;