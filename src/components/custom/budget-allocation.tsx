'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { formatCurrency, formatPercentage } from '@/lib/financial-calculations';
import { BudgetAllocation } from '@/lib/types';

interface BudgetAllocationChartProps {
  allocation: BudgetAllocation;
  monthlyIncome: number;
}

const COLORS = {
  housing: '#3B82F6',
  bills: '#8B5CF6',
  leisure: '#EC4899',
  investments: '#10B981',
  savings: '#F59E0B',
  emergency: '#EF4444',
};

const LABELS = {
  housing: 'Moradia',
  bills: 'Contas',
  leisure: 'Lazer',
  investments: 'Investimentos',
  savings: 'Poupança',
  emergency: 'Emergência',
};

export default function BudgetAllocationChart({
  allocation,
  monthlyIncome,
}: BudgetAllocationChartProps) {
  const data = Object.entries(allocation).map(([key, value]) => ({
    name: LABELS[key as keyof typeof LABELS],
    value: value,
    percentage: (value / monthlyIncome) * 100,
  }));

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 truncate">
        Alocação de Orçamento
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ percentage }) => `${percentage.toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[Object.keys(allocation)[index] as keyof typeof COLORS]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2 sm:space-y-3">
          {data.map((item, index) => (
            <div
              key={item.name}
              className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div
                  className="w-3 h-3 sm:w-4 sm:h-4 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: COLORS[Object.keys(allocation)[index] as keyof typeof COLORS],
                  }}
                />
                <span className="font-medium text-gray-700 text-xs sm:text-sm truncate">{item.name}</span>
              </div>
              <div className="text-right ml-2 flex-shrink-0">
                <p className="font-bold text-gray-900 text-sm sm:text-base">
                  {formatCurrency(item.value)}
                </p>
                <p className="text-xs text-gray-500">
                  {formatPercentage(item.percentage)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-xs sm:text-sm text-blue-800">
          💡 <strong>Dica:</strong> Especialistas recomendam investir pelo menos 20% da sua renda mensal.
          Você está investindo {formatPercentage((allocation.investments / monthlyIncome) * 100)}.
        </p>
      </div>
    </div>
  );
}
