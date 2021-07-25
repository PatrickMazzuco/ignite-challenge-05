/* eslint react/no-danger: 0 */
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';
import { useRouter } from 'next/router';
import Prismic from '@prismicio/client';

import { formatDate } from '../../utils/formatDate';
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
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Carregando...</div>;
  }

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
              <FiCalendar /> {formatDate(post.first_publication_date)}
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
                {content.body.map(body => (
                  <p key={body.text}>{body.text}</p>
                ))}
              </section>
            ))}
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.Predicates.at('document.type', 'posts')],
    {
      fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
      pageSize: 2,
    }
  );

  const paths = postsResponse.results.map(post => ({
    params: {
      slug: post.uid,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(slug), {});

  const parsedPost: Post = {
    ...response,
  };

  return {
    props: {
      post: parsedPost,
    },
  };
};
