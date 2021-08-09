import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';

export const MatchPage = () => {
  const [matches, setMatches] = useState([{}]);
  const { teamName, year } = useParams();

  useEffect(() => {
    const fetchMatches = async () => {
      const data = await fetch(
        `http://localhost:8080/team/${teamName}/matches?year=${year}`
      ).then(res => {
        return res.json();
      });
      setMatches(data);
    };
    fetchMatches();
  }, []);

  if (!matches) return null;
  return (
    <div className="MatchPage">
      {matches.map(match => (
        <MatchDetailCard teamName={teamName} match={match} />
      ))}
    </div>
  );
};
