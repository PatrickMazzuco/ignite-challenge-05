/* eslint react/no-danger: 0 */
import { GetStaticPaths, GetStaticProps } from 'next';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Head from 'next/head';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';

import { RichText } from 'prismic-dom';
import { getPrismicClient } from '../../services/prismic';
import Header from '../../components/Header';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      };
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  return (
    <>
      <Head>
        <title>{post.data.title} | spacetraveling</title>
      </Head>
      <Header />
      <img
        className={styles.banner}
        src={post.data.banner.url}
        alt={post.data.title}
      />
      <main className={`${commonStyles.container}`}>
        <article className={`${commonStyles.content} ${styles.post}`}>
          <h1>{post.data.title}</h1>
          <div>
            <time>
              <FiCalendar /> {post.first_publication_date}
            </time>
            <span>
              <FiUser /> {post.data.author}
            </span>
            <span>
              <FiClock /> 4 min
            </span>
          </div>
          <div className={styles.postContent}>
            {post.data.content.map(content => (
              <section key={content.heading}>
                <h2>{content.heading}</h2>
                <div dangerouslySetInnerHTML={{ __html: content.body.text }} />
              </section>
            ))}
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(slug), {});

  const formattedDate = format(
    new Date(response.first_publication_date),
    'd MMM yyyy',
    {
      locale: ptBR,
    }
  );

  const parsedContent = response.data.content.map(content => ({
    heading: content.heading,
    body: {
      text: RichText.asHtml(content.body),
    },
  }));

  const parsedPost = {
    ...response,
    first_publication_date: formattedDate,
    data: {
      ...response.data,
      content: parsedContent,
    },
  };

  return {
    props: {
      post: parsedPost,
    },
  };
};
