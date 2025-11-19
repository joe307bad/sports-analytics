import React from 'react';
import styles from './styles.module.css';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InfoModal({ isOpen, onClose }: InfoModalProps): React.ReactElement | null {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
          ×
        </button>
        <h2>What is this?</h2>
        <div className={styles.modalBody}>
          <p>
            <strong>Sports Analytics Resources</strong> is a curated collection of tools, apps, websites and more for sports data analysis,
            visualization, and insights.
          </p>
          <p>
            This site provides a comprehensive directory of:
          </p>
          <ul>
            <li><strong>R Packages</strong> - Statistical computing tools for sports analytics</li>
            <li><strong>Python Libraries</strong> - Data analysis and machine learning tools</li>
            <li><strong>Websites</strong> - Online resources, APIs, and data sources</li>
            <li><strong>Tools</strong> - Visualization and analysis platforms</li>
            <li><strong>And much more!</strong></li>
          </ul>
          <p>
            Use the filters to find resources by sport (e.g., Basketball, Football, Soccer) or category.
            Click on any resource to learn more or visit their website.
          </p>
          <p>
            Join our <a href="https://discord.gg/KtqmASc6jn" target="_blank" rel="noopener noreferrer">Discord community</a> or
            contribute on <a href="https://github.com/joe307bad/sports-analytics" target="_blank" rel="noopener noreferrer">GitHub</a>!
          </p>
        </div>
      </div>
    </div>
  );
}
