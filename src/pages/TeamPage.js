import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';
import './TeamPage.scss';
import { PieChart } from 'react-minimal-pie-chart';

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
        <h1 className="team-name">{team.teamName}</h1>
      </div>
      <div className="win-loss-section">
        Wins/ Losses
        <PieChart
          data={[
            {
              title: 'Losses',
              value: team.totalMatches - team.totalWins,
              color: '#a34d5d'
            },
            { title: 'Wins', value: team.totalWins, color: '#4da375' }
          ]}
        />
      </div>
      <div className="match-detail-section">
        <h3>Latest Matches</h3>
        <MatchDetailCard
          key={team.matches[0].id}
          teamName={team.teamName}
          match={team.matches[0]}
        />
      </div>
      {team.matches.slice(1).map(match => (
        <MatchSmallCard key={match.id} teamName={team.teamName} match={match} />
      ))}
      <div className="more-link">
        <Link to={`/teams/${teamName}/matches/2020`}>More {'>>'}</Link>
      </div>
      <div className="home-link">
        <Link to={`/`}>Home</Link>
      </div>
    </div>
  );
};
