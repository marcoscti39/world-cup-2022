import React, { useState } from "react";
import "../styles/key1.css";
import { data, TeamTypes } from "../data";
import { useFinalistsStore } from "../zustand/store";

export interface SemiFinalsType {
  group1?: QuarterFinalTeamType;
  group2?: QuarterFinalTeamType;
}

export interface QuarterFinalsType {
  group1?: QuarterFinalTeamType;
  group2?: QuarterFinalTeamType;
  group3?: QuarterFinalTeamType;
  group4?: QuarterFinalTeamType;
}

export type QuarterFinalTeamType = {
  team: string;
  championshipState: string;
  teamFlag: string;
  group: number;
  quarterFinalsGroup: string;
};

export interface QuarterFinalsGroupType {
  group1: {
    quarterFinalsGroup: string;
  };
  group2: {
    quarterFinalsGroup: string;
  };
  group3: {
    quarterFinalsGroup: string;
  };
  group4: {
    quarterFinalsGroup: string;
  };
}

const Key1 = () => {
  const [quarterFinals, setQuarterFinals] = useState<QuarterFinalsType>({});
  const [semiFinals, setSemiFinals] = useState<SemiFinalsType>({});
  const finalistFromKey1 = useFinalistsStore((state) => state.finalistFromKey1);
  const finalistFromKey2 = useFinalistsStore((state) => state.finalistFromKey2);
  const winner = useFinalistsStore((state) => state.winner);
  const setWinner = useFinalistsStore((state) => state.setWinner);
  const setFinalistFromKey1 = useFinalistsStore(
    (state) => state.setFinalistFromKey1
  );

  const handleWinner = (team: QuarterFinalTeamType) => {
    if (winner?.team) return;
    if (!finalistFromKey2?.team) return;
    setWinner(team);
  };

  const semiFinalsWinner = (team: QuarterFinalTeamType) => {
    if (finalistFromKey1?.team) return;
    if (Object.keys(semiFinals).length !== 2) return;
    setFinalistFromKey1(team);
  };

  const quartersWinner = (teamData: QuarterFinalTeamType) => {
    if (
      semiFinals[`group${teamData.quarterFinalsGroup}` as keyof SemiFinalsType]
        ?.team
    )
      return;

    if (Object.keys(quarterFinals).length !== 4) return;
    setSemiFinals((prev) => ({
      ...prev,
      [`group${teamData.quarterFinalsGroup}`]: teamData,
    }));
  };

  const octivesWinner = (teamData: TeamTypes) => {
    if (
      quarterFinals[`group${teamData.group}` as keyof QuarterFinalsGroupType]
        ?.team
    )
      return;

    const quarterFinalsGroup: QuarterFinalsGroupType = {
      group1: { quarterFinalsGroup: "1" },
      group2: { quarterFinalsGroup: "1" },
      group3: { quarterFinalsGroup: "2" },
      group4: { quarterFinalsGroup: "2" },
    };

    const teamQuarterFinalGroup =
      quarterFinalsGroup[
        `group${teamData.group}` as keyof QuarterFinalsGroupType
      ].quarterFinalsGroup;

    const quarterFinalTeamData = {
      ...teamData,
      quarterFinalsGroup: teamQuarterFinalGroup,
    };

    setQuarterFinals((prev) => ({
      ...prev,
      [`group${teamData.group}`]: quarterFinalTeamData,
    }));
  };
  return (
    <div className="key-1">
      {finalistFromKey1?.team && (
        <div
          className="team finalist"
          onClick={() => handleWinner(finalistFromKey1)}
        >
          <img className="team-flag" src={finalistFromKey1.teamFlag} />
          <span className="team-name">{finalistFromKey1.team}</span>
        </div>
      )}

      <div className="finals">
        {semiFinals?.group1 && (
          <div
            className="team team-semi-final team-top"
            onClick={() => semiFinalsWinner(semiFinals.group1!)}
          >
            <img className="team-flag" src={semiFinals.group1?.teamFlag} />
            <span className="team-name">{semiFinals.group1?.team}</span>
          </div>
        )}

        {semiFinals?.group2 && (
          <div
            className="team team-semi-final team-bottom"
            onClick={() => semiFinalsWinner(semiFinals.group2!)}
          >
            <img className="team-flag" src={semiFinals.group2?.teamFlag} />
            <span className="team-name">{semiFinals.group2?.team}</span>
          </div>
        )}

        <div className="semi-finals semi-final-top">
          {quarterFinals?.group1 && (
            <div
              className="team team-semi-final team-top"
              onClick={() => quartersWinner(quarterFinals?.group1!)}
            >
              <img className="team-flag" src={quarterFinals.group1?.teamFlag} />
              <span className="team-name">{quarterFinals.group1?.team}</span>
            </div>
          )}
          {quarterFinals?.group2 && (
            <div
              className="team team-semi-final team-bottom"
              onClick={() => quartersWinner(quarterFinals?.group2!)}
            >
              <img className="team-flag" src={quarterFinals.group2?.teamFlag} />
              <span className="team-name">{quarterFinals.group2?.team}</span>
            </div>
          )}

          <div className="octaves octaves-top">
            {data.slice(0, 2).map((team, index) => (
              <div
                onClick={() => octivesWinner(team)}
                className={`team ${
                  (index + 1) % 2 !== 0 ? "team-top" : "team-bottom"
                }`}
              >
                <img className="team-flag" src={team.teamFlag} />
                <span className="team-name">{team.team}</span>
              </div>
            ))}
          </div>
          <div className="octaves octaves-bottom">
            {data.slice(2, 4).map((team, index) => (
              <div
                onClick={() => octivesWinner(team)}
                className={`team ${
                  (index + 1) % 2 !== 0 ? "team-top" : "team-bottom"
                }`}
              >
                <img className="team-flag" src={team.teamFlag} />
                <span className="team-name">{team.team}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="semi-finals semi-final-bottom">
          {quarterFinals?.group3 && (
            <div
              className="team team-semi-final team-top"
              onClick={() => quartersWinner(quarterFinals?.group3!)}
            >
              <img className="team-flag" src={quarterFinals.group3?.teamFlag} />
              <span className="team-name">{quarterFinals.group3?.team}</span>
            </div>
          )}
          {quarterFinals?.group4 && (
            <div
              className="team team-semi-final team-bottom"
              onClick={() => quartersWinner(quarterFinals?.group4!)}
            >
              <img className="team-flag" src={quarterFinals.group4?.teamFlag} />
              <span className="team-name">{quarterFinals.group4?.team}</span>
            </div>
          )}

          <div className="octaves octaves-top">
            {data.slice(4, 6).map((team, index) => (
              <div
                onClick={() => octivesWinner(team)}
                className={`team ${
                  (index + 1) % 2 !== 0 ? "team-top" : "team-bottom"
                }`}
              >
                <img className="team-flag" src={team.teamFlag} />
                <span className="team-name">{team.team}</span>
              </div>
            ))}
          </div>
          <div className="octaves octaves-bottom">
            {data.slice(6, 8).map((team, index) => (
              <div
                onClick={() => octivesWinner(team)}
                className={`team ${
                  (index + 1) % 2 !== 0 ? "team-top" : "team-bottom"
                }`}
              >
                <img className="team-flag" src={team.teamFlag} />
                <span className="team-name">{team.team}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Key1;
