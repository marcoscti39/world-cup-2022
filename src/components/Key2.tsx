import React, { useState } from "react";
import { data, TeamTypes } from "../data";
import "../styles/key2.css";
import { useFinalistsStore } from "../zustand/store";
import { QuarterFinalTeamType, SemiFinalsType } from "./Key1";

interface QuarterFinalsType {
  group5?: QuarterFinalTeamType;
  group6?: QuarterFinalTeamType;
  group7?: QuarterFinalTeamType;
  group8?: QuarterFinalTeamType;
}

interface QuarterFinalsGroupType {
  group5: {
    quarterFinalsGroup: string;
  };
  group6: {
    quarterFinalsGroup: string;
  };
  group7: {
    quarterFinalsGroup: string;
  };
  group8: {
    quarterFinalsGroup: string;
  };
}

const Key2 = () => {
  const [quarterFinals, setQuarterFinals] = useState<QuarterFinalsType>({});
  const [semiFinals, setSemiFinals] = useState<SemiFinalsType>({});
  const finalistFromKey2 = useFinalistsStore((state) => state.finalistFromKey2);
  const finalistFromKey1 = useFinalistsStore((state) => state.finalistFromKey1);
  const winner = useFinalistsStore((state) => state.winner);
  const setWinner = useFinalistsStore((state) => state.setWinner);
  const setFinalistFromKey2 = useFinalistsStore(
    (state) => state.setFinalistFromKey2
  );

  const handleWinner = (team: QuarterFinalTeamType) => {
    if (winner?.team) return;
    if (!finalistFromKey1?.team) return;
    setWinner(team);
  };

  const semiFinalsWinner = (team: QuarterFinalTeamType) => {
    if (finalistFromKey2?.team) return;
    if (Object.keys(semiFinals).length !== 2) return;

    setFinalistFromKey2(team);
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
      group5: { quarterFinalsGroup: "1" },
      group6: { quarterFinalsGroup: "1" },
      group7: { quarterFinalsGroup: "2" },
      group8: { quarterFinalsGroup: "2" },
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
    <div className="key-2">
      {finalistFromKey2?.team && (
        <div
          className="team finalist"
          onClick={() => handleWinner(finalistFromKey2)}
        >
          <img className="team-flag" src={finalistFromKey2.teamFlag} />
          <span className="team-name">{finalistFromKey2.team}</span>
        </div>
      )}
      <div className="finals">
        {semiFinals?.group1 && (
          <>
            <div
              className="team team-semi-final team-top"
              onClick={() => semiFinalsWinner(semiFinals.group1!)}
            >
              <img className="team-flag" src={semiFinals.group1?.teamFlag} />
              <span className="team-name">{semiFinals.group1?.team}</span>
            </div>
          </>
        )}
        {semiFinals?.group2 && (
          <>
            <div
              className="team team-semi-final team-bottom"
              onClick={() => semiFinalsWinner(semiFinals.group2!)}
            >
              <img className="team-flag" src={semiFinals.group2?.teamFlag} />
              <span className="team-name">{semiFinals.group2?.team}</span>
            </div>
          </>
        )}
        <div className="semi-finals semi-final-top">
          {quarterFinals?.group5 && (
            <div
              className="team team-semi-final team-top"
              onClick={() => quartersWinner(quarterFinals?.group5!)}
            >
              <img className="team-flag" src={quarterFinals.group5?.teamFlag} />
              <span className="team-name">{quarterFinals.group5?.team}</span>
            </div>
          )}
          {quarterFinals?.group6 && (
            <div
              className="team team-semi-final team-bottom"
              onClick={() => quartersWinner(quarterFinals?.group6!)}
            >
              <img className="team-flag" src={quarterFinals.group6?.teamFlag} />
              <span className="team-name">{quarterFinals.group6?.team}</span>
            </div>
          )}

          <div className="octaves octaves-top">
            {data.slice(8, 10).map((team, index) => (
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
            {data.slice(10, 12).map((team, index) => (
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
          {quarterFinals?.group7 && (
            <div
              className="team team-semi-final team-top"
              onClick={() => quartersWinner(quarterFinals?.group7!)}
            >
              <img className="team-flag" src={quarterFinals.group7?.teamFlag} />
              <span className="team-name">{quarterFinals.group7?.team}</span>
            </div>
          )}
          {quarterFinals?.group8 && (
            <div
              className="team team-semi-final team-bottom"
              onClick={() => quartersWinner(quarterFinals?.group8!)}
            >
              <img className="team-flag" src={quarterFinals.group8?.teamFlag} />
              <span className="team-name">{quarterFinals.group8?.team}</span>
            </div>
          )}

          <div className="octaves octaves-top">
            {data.slice(12, 14).map((team, index) => (
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
            {data.slice(14, 16).map((team, index) => (
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

export default Key2;
