
function About() {
  return (
    <main className="about-page" aria-labelledby="about-heading">
      <section className="about-hero">
        <p className="eyebrow">GET TO KNOW US</p>
        <h2 id="about-heading">About EZTechMovie</h2>
        <p>
          Making your next movie night easier, one watchlist at a time.
        </p>
      </section>

      <section className="about-section">
        <h3>Our Mission</h3>
        <p>
          EZTechMovie's mission is to make discovering, organizing, and
          keeping track of movies and television shows simple and convenient.
          We want to provide users with an easy-to-use platform that helps
          them spend less time deciding what to watch and more time enjoying
          their favorite entertainment.
        </p>
      </section>

      <section className="about-section">
        <h3>What Is StreamList?</h3>
        <p>
          StreamList is a personal movie and television watchlist application
          designed to help users organize the titles they want to watch.
          Users can add and remove titles from their personal list, view
          movie and television posters, and access additional information
          through The Movie Database.
        </p>
        <p>
          Our goal is to make managing your entertainment interests easier
          while creating a convenient experience that users can return to
          whenever they are looking for something to watch.
        </p>
      </section>

      <section className="about-section feedback-section">
        <h3>Contact & Feedback</h3>
        <p>
          Your feedback helps us improve! We welcome suggestions, questions,
          and reports of issues you encounter while using StreamList.
          User feedback will help guide future updates and improvements
          to the application.
        </p>
        <p>
          Have an idea for a new feature? Want to share your experience?
          We'd love to hear from you.
        </p>
        <p>
          <strong>Contact Email:</strong> [Insert Company Email]
        </p>
      </section>
    </main>
  )
}

export default About
