// Dashboard.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, Legend } from 'recharts';

const salesData = [
  { name: 'Acme Plus', value: 24780, change: 49 },
  { name: 'Acme Advanced', value: 17489, change: -14 },
  { name: 'Acme Professional', value: 9962, change: 29 },
];

const barData = [
  { month: 'DEC 20', direct: 1700, indirect: 2400 },
  { month: 'JAN 21', direct: 2300, indirect: 2000 },
  { month: 'FEB 21', direct: 2800, indirect: 2700 },
  { month: 'MAR 21', direct: 2500, indirect: 2900 },
  { month: 'APR 21', direct: 3100, indirect: 2600 },
  { month: 'MAY 21', direct: 2700, indirect: 2500 },
];

const lineData = [
  { name: 'WED 20', current: 20, previous: 10 },
  { name: 'THU 21', current: 40, previous: 30 },
  { name: 'FRI 22', current: 60, previous: 50 },
  { name: 'SAT 23', current: 50, previous: 70 },
  { name: 'SUN 24', current: 90, previous: 60 },
  { name: 'MON 25', current: 70, previous: 90 },
  { name: 'TODAY', current: 30, previous: 40 },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {salesData.map((item) => (
          <Card key={item.name}>
            <CardContent className="p-4">
              <p className="text-gray-500">{item.name}</p>
              <h2 className="text-2xl font-bold">
                ${item.value.toLocaleString()} <span className={`text-sm ml-2 ${item.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>{item.change >= 0 ? `+${item.change}%` : `${item.change}%`}</span>
              </h2>
              <LineChart width={250} height={60} data={lineData}>
                <Line type="monotone" dataKey="current" stroke="#6366f1" strokeWidth={2} dot={false} />
              </LineChart>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Direct VS Indirect</h3>
            <BarChart width={500} height={250} data={barData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="direct" fill="#8b5cf6" />
              <Bar dataKey="indirect" fill="#60a5fa" />
            </BarChart>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">AVG Order Value</h3>
            <h2 className="text-xl font-bold">$72 <span className="text-green-500 text-sm ml-1">+34%</span></h2>
            <LineChart width={500} height={250} data={lineData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="current" stroke="#6366f1" strokeWidth={2} />
              <Line type="monotone" dataKey="previous" stroke="#a1a1aa" strokeDasharray="5 5" />
            </LineChart>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}