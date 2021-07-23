import { GetStaticProps } from 'next';
import Head from 'next/head';
import { FiCalendar, FiUser } from 'react-icons/fi';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Home | spacetraveling</title>
      </Head>
      <main className={`${commonStyles.container}`}>
        <img className={styles.logo} src="/images/logo.svg" alt="logo" />
        <div className={`${commonStyles.content} ${styles.posts}`}>
          <a href="#">
            <strong>Como utilizar hooks</strong>
            <p>Pensando em sincronização em vez de ciclos de vida.</p>
            <div>
              <time>
                <FiCalendar /> 15 Mar 2021
              </time>
              <span>
                <FiUser /> Joseph Oliveira
              </span>
            </div>
          </a>
          <a href="#">
            <strong>Criando um app CRA do zero</strong>
            <p>
              Tudo sobre como criar a sua primeira aplicação utilizando Create
              React App.
            </p>
            <div>
              <time>
                <FiCalendar /> 15 Mar 2021
              </time>
              <span>
                <FiUser /> Joseph Oliveira
              </span>
            </div>
          </a>
          <a href="#">
            <strong>Como utilizar hooks</strong>
            <p>Pensando em sincronização em vez de ciclos de vida.</p>
            <div>
              <time>
                <FiCalendar /> 15 Mar 2021
              </time>
              <span>
                <FiUser /> Joseph Oliveira
              </span>
            </div>
          </a>
          <a href="#">
            <strong>Como utilizar hooks</strong>
            <p>Pensando em sincronização em vez de ciclos de vida.</p>
            <div>
              <time>
                <FiCalendar /> 15 Mar 2021
              </time>
              <span>
                <FiUser /> Joseph Oliveira
              </span>
            </div>
          </a>
          <a href="#">
            <strong>Como utilizar hooks</strong>
            <p>Pensando em sincronização em vez de ciclos de vida.</p>
            <div>
              <time>
                <FiCalendar /> 15 Mar 2021
              </time>
              <span>
                <FiUser /> Joseph Oliveira
              </span>
            </div>
          </a>
        </div>
      </main>
    </>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
