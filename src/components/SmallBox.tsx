import React from "react";

type Props = {
  header: string;
  sunrise?: number;   // unix seconds
  sunset?: number;    // unix seconds
  now?: number;       // unix seconds (weather.dt)
  timezone?: number;  // seconds from UTC (weather.timezone)
};

const pad2 = (n: number) => String(n).padStart(2, "0");

const formatHHMM = (unixSec: number, tzSec?: number) => {
  const ms = (unixSec + (tzSec ?? 0)) * 1000;
  const d = new Date(ms);
  // UTC kullanıyoruz çünkü timezone’u biz ekledik
  return `${pad2(d.getUTCHours())}:${pad2(d.getUTCMinutes())}`;
};

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

const SmallBox = ({ header, sunrise, sunset, now, timezone }: Props) => {
  const hasData = sunrise && sunset && now;

  let progress = 0; // 0..1
  let statusText = "-";

  if (hasData) {
    const sr = sunrise!;
    const ss = sunset!;
    const t = now!;

    if (t < sr) {
      progress = 0;
      statusText = "Before sunrise";
    } else if (t > ss) {
      progress = 1;
      statusText = "After sunset";
    } else {
      progress = (t - sr) / (ss - sr);
      statusText = "Daylight";
    }
  }

  const pct = hasData ? clamp(progress * 100, 0, 100) : 0;

  return (
    <div className="bg-white/20 rounded-lg backdrop-blur-sm w-[420px] h-48 flex flex-col justify-evenly items-center custom-xs:w-[43vw]">
      {/* Header */}
      <div className="h-fit w-full text-center rounded-md text-white">
        {header}
      </div>

      <div className="w-full h-full px-3 pb-3 flex flex-col justify-center gap-3">
        {/* Times */}
        <div className="flex flex-row justify-between text-white/90 text-sm">
          <div className="flex flex-col">
            <span className="text-white/60 text-[11px]">Sunrise</span>
            <span className="font-semibold">
              {sunrise ? formatHHMM(sunrise, timezone) : "--:--"}
            </span>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-white/60 text-[11px]">Sunset</span>
            <span className="font-semibold">
              {sunset ? formatHHMM(sunset, timezone) : "--:--"}
            </span>
          </div>
        </div>

        {/* Bar */}
        <div className="relative w-full h-3 rounded-full bg-white/20 overflow-hidden">
          {/* Filled part */}
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-white/60"
            style={{ width: `${pct}%` }}
          />

          {/* Now marker */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-yellow-300 shadow"
            style={{ left: `calc(${pct}% - 6px)` }}
          />
        </div>

        {/* Status + Day length */}
        <div className="flex flex-col items-center text-white/80 text-xs gap-1">
          <div>{hasData ? statusText : "No sun data"}</div>

          {sunrise && sunset ? (
            <div className="text-white/60">
              Day length:{" "}
              {Math.floor((sunset - sunrise) / 3600)}h{" "}
              {Math.floor(((sunset - sunrise) % 3600) / 60)}m
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SmallBox;
