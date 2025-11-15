import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import ResourcesTable from '@site/src/components/ResourcesTable';

import styles from './index.module.css';

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Sports Analytics Resources">
      <div className={styles.fullPageContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>Resources</h1>
        </div>
        <div className={styles.tableWrapper}>
          <ResourcesTable />
        </div>
      </div>
    </Layout>
  );
}
