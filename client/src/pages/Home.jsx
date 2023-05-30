import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="landing-page">
      <header>
        <h1>Welcome to Transparent Charity System</h1>
        <h2>Empowering Positive Change Through Blockchain</h2>
      </header>
      <section className="how-it-works">
        <h3>How It Works</h3>
        <ol>
          <li>
            <strong>Transparent Donation Tracking:</strong> Our blockchain-based platform ensures complete transparency and immutability of transactions. Donors can track their contributions in real-time, ensuring that their donations are used for the intended purpose.
          </li>
          <li>
            <strong>Smart Contracts:</strong> We utilize smart contracts to automate the execution and verification of donations. This eliminates the need for intermediaries and reduces administrative costs, allowing a greater percentage of funds to reach the beneficiaries.
          </li>
          <li>
            <strong>Secure and Decentralized:</strong> Our decentralized network eliminates single points of failure and enhances the security of the system. By distributing data across multiple nodes, we ensure that information remains secure and available, even in the face of unexpected events.
          </li>
          <li>
            <strong>Efficient Global Donations:</strong> With blockchain technology, we remove barriers to international donations. Users can contribute to charitable causes anywhere in the world, with minimal transaction fees and faster processing times.
          </li>
        </ol>
      </section>
      <section className="join-community">
        <h3>Join the CharityChain Community</h3>
        <ul>
          <li>
            <strong>Support Verified Charities:</strong> Choose from a wide range of verified charitable organizations, each working towards a specific cause. Rest assured that your donations will directly benefit those in need.
          </li>
          <li>
            <strong>Stay Informed:</strong> Receive regular updates on the impact of your donations, ensuring transparency and accountability. We believe in fostering a strong connection between donors and the causes they support.
          </li>
          <li>
            <strong>Connect with Others:</strong> Collaborate with like-minded individuals and organizations who share your passion for social change. Together, we can amplify our efforts and create a lasting impact on the world.
          </li>
        </ul>
      </section>
      <section className="get-started">
        <h3>Get Started Today</h3>
        <p>Ready to make a difference? Sign up now to join the community and be a catalyst for positive change. Together, we can create a world where compassion and technology intersect to transform lives.</p>
        <button className="sign-up-btn">Sign Up Now</button>
        <button className="learn-more-btn">Sign In</button>
      </section>
    </div>
  );
}

export default Home;