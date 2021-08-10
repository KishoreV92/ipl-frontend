import React, { useEffect, useState } from 'react';
import './TeamPage.scss';
import { TeamTile } from '../components/TeamTile';
import './HomePage.scss';

export const HomePage = () => {
  const initialData = {
    id: null,
    teamName: null,
    totalMatches: null,
    totalWins: null,
    matches: [{}]
  };

  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchAllTeams = async () => {
      const data = await fetch(`http://localhost:8080/team`).then(res => {
        return res.json();
      });
      setTeam(data);
    };
    fetchAllTeams();
  }, []);

  return (
    <div className="HomePage">
      <div className="header-section">
        <h1 className="app-name">Kishore's IPL Dashboard</h1>
      </div>
      <div className="team-grid">
        {team.map(team => (
          <TeamTile teamName={team.teamName} />
        ))}
      </div>
    </div>
  );
};
