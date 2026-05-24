export default function LoadingSpinner() {
  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>

      <p>Memuat data...</p>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },

  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #ddd',
    borderTop: '4px solid #3498db',
    borderRadius: '50%',
  },
};