import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

import styles from '../styles/pages/Home.module.css'
import Header from '../src/components/Header';
import Filters from '../src/components/Filters';
import Card from '../src/components/Card';


export default function Home({ jobs }) {
  const [filters, setFilters] = useState({
    Estado: [],
    Modalidade: [],
    Nivel: [],
    Regime: [],
    Categoria: []
  });

  const [jobList, setJobList] = useState(jobs);

  const [activeFilters, setActiveFilters] = useState({});

  const handleSearch = async (title, city) => {
    if (!title && city) {
      setJobList(jobs);
    }

    if (title) {
      setJobList(jobs.filter(job => job.title.toUpperCase().includes(title.toUpperCase())))
    }

    if (city) {
      setJobList(jobs.filter(job => job.city.toUpperCase().includes(city.toUpperCase())))
    }
  }

  const handleToggleFilter = (key, checked, value) => {
    let field;
    switch (key) {
      case 'Estado':
        field = 'state';
        break;
      case 'Nivel':
        field = 'level';
        break;
      case 'Modalidade':
        field = 'model';
        break;
      case 'Regime':
        field = 'type';
        break;
      case 'Categoria':
        field = 'category';
        break;
    }
    setActiveFilters(prevState => ({ ...prevState, [value]: { field, checked } }));
  }

  useEffect(() => {
    jobs.forEach(job => {
      setFilters(prevState => {
        let object = prevState;
        if (prevState.Estado.indexOf(job.state) < 0) {
          object.Estado = [...object.Estado, job.state]
        }
        if (prevState.Nivel.indexOf(job.level) < 0) {
          object.Nivel = [...object.Nivel, job.level]
        }
        if (prevState.Modalidade.indexOf(job.model) < 0) {
          object.Modalidade = [...object.Modalidade, job.model]
        }
        if (prevState.Regime.indexOf(job.type) < 0) {
          object.Regime = [...object.Regime, job.type]
        }
        if (prevState.Categoria.indexOf(job.category) < 0) {
          object.Categoria = [...object.Categoria, job.category]
        }

        return { ...object };
      });
    });
  }, [jobs]);

  useEffect(() => {
    let _jobs = [];
    Object.keys(activeFilters).map(key => {
      let found = false;
      if (activeFilters[key].checked) {
        found = true;
        _jobs = [..._jobs, ...jobs.filter(job => job[activeFilters[key].field] == key)];
      }

      if (!found) {
        setJobList(jobs);
      } else {
        setJobList(_jobs);
      }
    });

  }, [activeFilters]);

  return (
    <div className={styles.structure}>
      <Header onClick={handleSearch} />
      <div className={styles.cardContainer}>
        <div className={styles.filter}>
          <h4>Definir busca</h4>
          <div className={styles.filter_list}>
            {
              Object.keys(filters).map((key, index) => (
                <Filters
                  key={index}
                  filters={filters[key]}
                  onChange={handleToggleFilter}
                  category={key}
                />
              ))
            }
          </div>
        </div>
        <div className={styles.cards}>
          {
            jobList && jobList.map((job, index) => (
              <Link
                href={`/description/${job.id}`}
                passRef
                key={index}
              >
                <a>
                  <Card
                    title={job.title}
                    description={job.description}
                    enterprise={job.enterprise}
                    day={job.day}
                    local={`${job.city} - ${job.state}`}
                  />
                </a>
              </Link>
            ))
          }
        </div>

      </div>
    </div>
  )
}

export async function getStaticProps() {

  const { data: { error, jobs = [] } } = await axios.get('http://localhost:3000/api/jobs?secret=over')

  return {
    props: {
      jobs: jobs
    },
    revalidate: 5000
  }
}
