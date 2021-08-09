import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';
import './TeamPage.scss';

export const TeamPage = () => {
  const initialData = {
    id: null,
    teamName: null,
    totalMatches: null,
    totalWins: null,
    matches: [{}]
  };

  const [team, setTeam] = useState(initialData);
  const { teamName } = useParams();

  useEffect(() => {
    const fetchMatches = async () => {
      const data = await fetch(`http://localhost:8080/team/${teamName}`).then(
        res => {
          return res.json();
        }
      );
      setTeam(data);
    };
    fetchMatches();
  }, [teamName]);

  if (!team || !team.teamName) return <h1>Team Not Found</h1>;
  return (
    <div className="TeamPage">
      <div className="team-name-section">
        <h1>{team.teamName}</h1>
      </div>
      <div className="win-loss-section">Wins/ Losses</div>
      <div>
        <MatchDetailCard teamName={team.teamName} match={team.matches[0]} />
      </div>
      {team.matches.slice(1).map(match => (
        <MatchSmallCard teamName={team.teamName} match={match} />
      ))}
    </div>
  );
};
