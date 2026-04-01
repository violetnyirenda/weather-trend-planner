export default function Insight({ data }) {
  if (!data || data.length === 0) return null;

  const validDays = data.filter((day) => typeof day.temp === "number");
  if (validDays.length === 0) return null;

  const bestDay = validDays.reduce((min, day) => (day.temp < min.temp ? day : min));
  const rainyDay = validDays.find((day) => day.rainProbability > 60);
  const hotDay = validDays.find((day) => day.temp > 35);
  const coldDay = validDays.find((day) => day.temp < 5);

  const insights = [
    `Best day to go out: ${bestDay.day} (${bestDay.temp} C)`,
  ];

  if (rainyDay) {
    insights.push(`Rain expected on ${rainyDay.day} (${rainyDay.rainProbability}% chance)`);
  }

  if (hotDay) {
    insights.push(`Heat warning on ${hotDay.day} (${hotDay.temp} C)`);
  }

  if (coldDay) {
    insights.push(`Cold warning on ${coldDay.day} (${coldDay.temp} C)`);
  }

  return (
    <div className="insight">
      <h3>Insights</h3>
      <ul>
        {insights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}