import React from "react";
import { LinearProgress } from "@mui/material";

const journeyStatsDataByYear = {
  2023: {
    January: { starting: 45, managingDayToDay: 60, mentorReady: 80 },
    February: { starting: 50, managingDayToDay: 65, mentorReady: 85 },
    March: { starting: 55, managingDayToDay: 70, mentorReady: 90 },
    April: { starting: 60, managingDayToDay: 75, mentorReady: 95 },
    May: { starting: 65, managingDayToDay: 80, mentorReady: 100 },
    June: { starting: 70, managingDayToDay: 85, mentorReady: 105 },
    July: { starting: 75, managingDayToDay: 90, mentorReady: 110 },
    August: { starting: 80, managingDayToDay: 95, mentorReady: 115 },
    September: { starting: 85, managingDayToDay: 100, mentorReady: 120 },
    October: { starting: 90, managingDayToDay: 105, mentorReady: 125 },
    November: { starting: 95, managingDayToDay: 110, mentorReady: 130 },
    December: { starting: 100, managingDayToDay: 115, mentorReady: 135 },
  },
  2024: {
    January: { starting: 50, managingDayToDay: 70, mentorReady: 85 },
    February: { starting: 60, managingDayToDay: 75, mentorReady: 90 },
    March: { starting: 65, managingDayToDay: 80, mentorReady: 95 },
    April: { starting: 70, managingDayToDay: 85, mentorReady: 100 },
    May: { starting: 75, managingDayToDay: 90, mentorReady: 105 },
    June: { starting: 80, managingDayToDay: 95, mentorReady: 110 },
    July: { starting: 85, managingDayToDay: 100, mentorReady: 115 },
    August: { starting: 90, managingDayToDay: 105, mentorReady: 120 },
    September: { starting: 95, managingDayToDay: 110, mentorReady: 125 },
    October: { starting: 100, managingDayToDay: 115, mentorReady: 130 },
    November: { starting: 105, managingDayToDay: 120, mentorReady: 135 },
    December: { starting: 110, managingDayToDay: 125, mentorReady: 140 },
  },
  2025: {
    January: { starting: 55, managingDayToDay: 75, mentorReady: 90 },
    February: { starting: 60, managingDayToDay: 80, mentorReady: 95 },
    March: { starting: 70, managingDayToDay: 85, mentorReady: 100 },
    April: { starting: 75, managingDayToDay: 90, mentorReady: 105 },
    May: { starting: 80, managingDayToDay: 95, mentorReady: 110 },
    June: { starting: 85, managingDayToDay: 100, mentorReady: 115 },
    July: { starting: 90, managingDayToDay: 105, mentorReady: 120 },
    August: { starting: 95, managingDayToDay: 110, mentorReady: 125 },
    September: { starting: 100, managingDayToDay: 115, mentorReady: 130 },
    October: { starting: 105, managingDayToDay: 120, mentorReady: 135 },
    November: { starting: 110, managingDayToDay: 125, mentorReady: 140 },
    December: { starting: 115, managingDayToDay: 130, mentorReady: 145 },
  },
};

function JourneyProgress({ label, value }) {
  const getProgressBarColor = (value) => {
    if (value) return "#CD8085";
    return "#E9E9E9";
  };

  const color = getProgressBarColor(value);

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <p className="font-semibold">{label}</p>
        <p className="font-medium">{value}%</p>
      </div>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          flex: 1,
          height: 10,
          borderRadius: 5,
          "& .MuiLinearProgress-bar": {
            backgroundColor: color,
          },
        }}
      />
    </div>
  );
}

export default function JourneyStats({ selectedYear, selectedMonth }) {
  const stats = journeyStatsDataByYear[selectedYear]?.[selectedMonth] || {
    starting: 0,
    managingDayToDay: 0,
    mentorReady: 0,
  };

  return (
    <div className="flex flex-col gap-3 w-full space-y-4 mt-5">
      <JourneyProgress label="Just Starting" value={stats.starting} />
      <JourneyProgress
        label="Managing Day-to-Day"
        value={stats.managingDayToDay}
      />
      <JourneyProgress label="Mentor Ready" value={stats.mentorReady} />
    </div>
  );
}
