import React from 'react';

const styles = {
  page: {
    minHeight: 'calc(100vh - 3.5rem)'
  }
};

export default function CustomContainer({ children }) {
  return (
      <div className="d-flex" style={styles.page}>
        {children}
      </div>
  );
}
