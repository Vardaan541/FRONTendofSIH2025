import { getTableData } from '@/lib/utils';
import { Columns } from 'lucide-react';

type Player = {
  id: number;
  name: string;
  points: number;
};


export default async function Leaderboard() {
    const players: Player[] = await getTableData("test", (q) => q.select());
//   const players: Player[] = [
//     { id: 1, name: "Rohan", points: 980 },
//     { id: 2, name: "Aman", points: 910 },
//     { id: 3, name: "Priya", points: 870 },
//     { id: 4, name: "Neha", points: 820 },
//     { id: 5, name: "Arjun", points: 790 },
//   ];

  return (
    <div className="bg-gradient-to-br from-yellow-100 via-white to-blue-100 shadow-2xl rounded-3xl w-full max-w-md p-8 border border-gray-200">
      <h2 className="text-3xl font-extrabold text-center mb-6 text-black tracking-wide">
        🏆 Leaderboard
      </h2>
      <ul className="space-y-3">
        {players.map((player, index) => (
          <li
            key={player.id}
            className="flex justify-between items-center px-4 py-3 bg-white rounded-xl shadow-md hover:scale-105 transform transition duration-200 border border-gray-100"
          >
            <span className="font-semibold text-lg text-black">
              {index + 1}. {player.name}
            </span>
            <span className="text-indigo-700 font-bold text-lg">
              {player.points} pts
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}