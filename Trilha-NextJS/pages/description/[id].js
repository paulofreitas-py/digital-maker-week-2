import axios from 'axios';

import Header from '../../src/components/Header'
import styles from '../../styles/pages/Description.module.css'
import CardDetails from '../../src/components/Card';

export default function Description({ job }) {
  return (
    <div className={styles.container}>
      <Header showSearch={false}/>
      <div className={styles.card}>
        {
          job && 
          <CardDetails 
            title={job.title}
            description={job.description}
            enterprise={job.enterprise}
            day={job.day}
            local={`${job.city} - ${job.state}`}
          />
        }
      </div>
    </div>  
  )
}

export async function getStaticPaths() {

  return {
    paths: [], fallback: true
  }
}

export async function getStaticProps({ params: { id }}){

  const { data } = await axios.get(`http://localhost:3000/api/jobs?id=${id}&secret=over`)

  return {
    props: {
      job: data.jobs
    }
  }
} 