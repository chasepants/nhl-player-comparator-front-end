import React, { useState } from 'react';

function PlayerDraftComparer() {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!player1 || !player2) {
      setError('Both fields are required.');
      return;
    }
    setError('');
    setResults(null);

    try {
      const response = await fetch('/overlap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ player1, player2 }),
      });
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError('Error fetching results. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Player Draft Comparer</h1>
      <p style={styles.subtitle}>
        Compare two players to see their draft details and overlaps.
      </p>

      {/* Input Form */}
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label htmlFor="player1">Player 1:</label>
          <input
            type="text"
            id="player1"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
            placeholder="Enter Player 1 Name or QID"
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="player2">Player 2:</label>
          <input
            type="text"
            id="player2"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
            placeholder="Enter Player 2 Name or QID"
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Compare</button>
      </form>
      {error && <p style={styles.error}>{error}</p>}

      {/* Results Section */}
      {results && (
        <div style={styles.results}>
          <h2>Draft Details</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Property</th>
                <th>Player 1</th>
                <th>Player 2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Draft Year</td>
                <td>{results.player1.draftYear || 'N/A'}</td>
                <td>{results.player2.draftYear || 'N/A'}</td>
              </tr>
              <tr>
                <td>Draft Team</td>
                <td>{results.player1.draftTeam || 'N/A'}</td>
                <td>{results.player2.draftTeam || 'N/A'}</td>
              </tr>
              <tr>
                <td>Draft Position</td>
                <td>{results.player1.draftPosition || 'N/A'}</td>
                <td>{results.player2.draftPosition || 'N/A'}</td>
              </tr>
              <tr>
                <td>League</td>
                <td>{results.player1.league || 'N/A'}</td>
                <td>{results.player2.league || 'N/A'}</td>
              </tr>
            </tbody>
          </table>
          {results.player1.draftYear === results.player2.draftYear && (
            <p style={styles.highlight}>These players were drafted in the same year!</p>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  header: { textAlign: 'center', fontSize: '24px', marginBottom: '10px' },
  subtitle: { textAlign: 'center', color: '#666', marginBottom: '20px' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px' },
  inputGroup: { display: 'flex', flexDirection: 'column' },
  input: {
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: 'none',
    background: '#007BFF',
    color: '#fff',
    cursor: 'pointer',
  },
  error: { color: 'red', textAlign: 'center' },
  results: { marginTop: '20px' },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '10px',
  },
  highlight: {
    color: 'green',
    textAlign: 'center',
    fontWeight: 'bold',
  },
};

export default PlayerDraftComparer;
