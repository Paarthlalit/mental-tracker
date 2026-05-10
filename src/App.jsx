import React from "react"

export default function MentalHealthTracker() {
  const [dailyData, setDailyData] = React.useState([
    { day: 'Monday', stress: 1, trauma: 1, sleep: 1 },
    { day: 'Tuesday', stress: 1, trauma: 1, sleep: 1 },
    { day: 'Wednesday', stress: 1, trauma: 1, sleep: 1 },
    { day: 'Thursday', stress: 1, trauma: 1, sleep: 1 },
    { day: 'Friday', stress: 1, trauma: 1, sleep: 1 },
    { day: 'Saturday', stress: 1, trauma: 1, sleep: 1 },
    { day: 'Sunday', stress: 1, trauma: 1, sleep: 1 },
  ]);

  const [weight, setWeight] = React.useState('');
  const [baths, setBaths] = React.useState('');

  const updateValue = (index, field, value) => {
    const updated = [...dailyData];
    updated[index][field] = Number(value);
    setDailyData(updated);
  };

  const avgStress = (
    dailyData.reduce((a, b) => a + b.stress, 0) / 7
  ).toFixed(1);

  const avgTrauma = (
    dailyData.reduce((a, b) => a + b.trauma, 0) / 7
  ).toFixed(1);

  const avgSleep = (
    dailyData.reduce((a, b) => a + b.sleep, 0) / 7
  ).toFixed(1);

  const getSuggestion = () => {
    let suggestions = [];

    if (avgStress >= 4)
      suggestions.push('High stress detected. Try breathing exercises, journaling, and reducing mental overload.');

    if (avgTrauma >= 4)
      suggestions.push('Emotional distress appears elevated. Consider talking to someone trusted and practicing grounding techniques.');

    if (avgSleep >= 4)
      suggestions.push('Sleep disturbances are high. Reduce screen time before bed and maintain a fixed sleep routine.');

    if (Number(baths) <= 2)
      suggestions.push('Low self-care activity detected. Try maintaining a gentle daily hygiene routine.');

    if (Number(weight) > 0)
      suggestions.push(`Your recorded body weight is ${weight} kg. Focus on regular meals, hydration, and rest.`);

    if (suggestions.length === 0)
      return 'You seem to be managing relatively well this week. Keep prioritizing rest, hydration, and emotional balance.';

    return suggestions.join(' ');
  };

  const chartHeight = (value) => `${value * 20}px`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-200 p-6 font-sans">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-2">
          Mental Wellness Tracker 💜
        </h1>

        <p className="text-center text-gray-600 mb-8 text-lg">
          A safe little place to track your emotions, healing, and self-care each week.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-purple-600 mb-4">
              Daily Tracking
            </h2>

            <div className="space-y-4">
              {dailyData.map((item, index) => (
                <div
                  key={item.day}
                  className="bg-purple-50 rounded-2xl p-4 shadow"
                >
                  <h3 className="font-semibold text-lg text-purple-700 mb-3">
                    {item.day}
                  </h3>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">
                        Stress
                      </label>
                      <select
                        value={item.stress}
                        onChange={(e) =>
                          updateValue(index, 'stress', e.target.value)
                        }
                        className="w-full rounded-lg border p-2"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num}>{num}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-sm text-gray-600 block mb-1">
                        Trauma
                      </label>
                      <select
                        value={item.trauma}
                        onChange={(e) =>
                          updateValue(index, 'trauma', e.target.value)
                        }
                        className="w-full rounded-lg border p-2"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num}>{num}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-sm text-gray-600 block mb-1">
                        Sleep Issues
                      </label>
                      <select
                        value={item.sleep}
                        onChange={(e) =>
                          updateValue(index, 'sleep', e.target.value)
                        }
                        className="w-full rounded-lg border p-2"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num}>{num}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-purple-600 mb-4">
              Weekly Reflection
            </h2>

            <div className="bg-purple-50 rounded-2xl p-5 shadow mb-6">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Body Weight (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full rounded-lg border p-3"
                  placeholder="Enter weight"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Number of Baths This Week
                </label>
                <input
                  type="number"
                  value={baths}
                  onChange={(e) => setBaths(e.target.value)}
                  className="w-full rounded-lg border p-3"
                  placeholder="Enter count"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl border p-5 shadow mb-6">
              <h3 className="text-xl font-semibold text-purple-700 mb-4">
                Weekly Wellness Chart
              </h3>

              <div className="flex items-end justify-around h-48 gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className="w-14 bg-pink-400 rounded-t-xl"
                    style={{ height: chartHeight(avgStress) }}
                  ></div>
                  <p className="mt-2 text-sm">Stress</p>
                  <span className="font-bold">{avgStress}</span>
                </div>

                <div className="flex flex-col items-center">
                  <div
                    className="w-14 bg-purple-400 rounded-t-xl"
                    style={{ height: chartHeight(avgTrauma) }}
                  ></div>
                  <p className="mt-2 text-sm">Trauma</p>
                  <span className="font-bold">{avgTrauma}</span>
                </div>

                <div className="flex flex-col items-center">
                  <div
                    className="w-14 bg-blue-400 rounded-t-xl"
                    style={{ height: chartHeight(avgSleep) }}
                  ></div>
                  <p className="mt-2 text-sm">Sleep</p>
                  <span className="font-bold">{avgSleep}</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-pink-200 to-purple-200 rounded-2xl p-5 shadow-lg">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">
                Weekly Suggestions 🌸
              </h3>

              <p className="text-gray-700 leading-relaxed">
                {getSuggestion()}
              </p>
            </div>

            <div className="mt-6 bg-white border rounded-2xl p-5 shadow">
              <h3 className="text-lg font-semibold text-purple-700 mb-2">
                A Small Message 💌
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Healing is not linear. Some days are heavy, some days are softer,
                and both are valid. You do not have to fight every battle alone Your Pubu is always here for you.
                This space exists to remind you that how strong you are and your feelings matter and your
                progress counts, even when it feels small, Because you mere jaaan belongs to your Parathaa and this Paratha is always with you on your side and in your journey. So take a deep breath, be kind to yourself and love yourself, and remember that you are doing the best you can.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
