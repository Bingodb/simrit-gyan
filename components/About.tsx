import styles from './About.module.css'

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <h2 className={styles.title}>About Simrit Gyan Pvt Ltd</h2>
        
        <div className={styles.content}>
          <div className={styles.text}>
            <p>
              Simrit Gyan Pvt Ltd is a leading home tuition company dedicated to providing 
              quality education at the comfort of your home. We understand that every 
              student is unique and requires personalized attention to excel academically.
            </p>
            <p>
              Our team of experienced and qualified tutors are passionate about teaching 
              and committed to helping students achieve their full potential. We serve 
              students across multiple cities in India, offering flexible scheduling and 
              customized lesson plans tailored to each student's learning style and pace.
            </p>
            
            <div className={styles.features}>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✓</span>
                <span>Experienced & Qualified Tutors</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✓</span>
                <span>Personalized Learning Plans</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✓</span>
                <span>Flexible Scheduling</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✓</span>
                <span>Affordable Pricing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
