import React, { useEffect, useState } from 'react';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';

export const TeamPage = () => {
  const initialData = {
    id: null,
    teamName: null,
    totalMatches: null,
    totalWins: null,
    matches: [{}]
  };
  const [team, setTeam] = useState(initialData);

  useEffect(() => {
    const fetchMatches = async () => {
      const data = await fetch(
        'http://localhost:8080/team/Rajasthan Royals'
      ).then(res => {
        return res.json();
      });
      setTeam(data);
    };
    fetchMatches();
  }, []);

  return (
    <div className="TeamPage">
      <h1>{team.teamName}</h1>
      <MatchDetailCard match={team.matches[0]} />
      {team.matches.slice(1).map(match => (
        <MatchSmallCard match={match} />
      ))}
    </div>
  );
};
