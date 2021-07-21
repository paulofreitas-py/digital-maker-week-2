import Link from 'next/link';
import Image from 'next/image';
import styles from '../../../styles/components/Header.module.css';
import { useState } from 'react';

function Header({ showSearch = true, onClick }) {
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link
          href="/"
          passHref
        >
          <a>
            <Image
              src="/images/overjob.svg"
              width="200"
              height="40"
              alt="Logo do Overjog"
            />
          </a>
        </Link>
        <Link
          href="/description/1"
          passHref
        >
          <a>
            <button
              className={styles.publishedbutton}
            >Cadastrar Vaga</button>
          </a>
        </Link>
      </div>
      {
        showSearch &&
        <div className={styles.search}>
          <div className={styles.searchFields}>
            <input
              type="text"
              placeholder="Procure pelo nome de uma vaga"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <input
              type="text"
              placeholder="Procure pela cidade"
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
            <button
              onClick={() => onClick(title, city)}
            >
              <Image
                src="/images/lupa.svg"
                width="30"
                height="30"
                alt="Icone de pesquisa"
              />
            </button>
          </div>
        </div>
      }
    </div>
  )
}

export default Header;