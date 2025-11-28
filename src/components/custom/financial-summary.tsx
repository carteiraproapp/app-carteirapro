'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, DollarSign, PieChart as PieChartIcon } from 'lucide-react';
import { formatCurrency } from '@/lib/financial-calculations';

interface FinancialSummaryProps {
  monthlyIncome: number;
  fixedExpenses: number;
  variableExpenses: number;
  investments: number;
}

export default function FinancialSummary({
  monthlyIncome,
  fixedExpenses,
  variableExpenses,
  investments,
}: FinancialSummaryProps) {
  const totalExpenses = fixedExpenses + variableExpenses;
  const availableIncome = monthlyIncome - totalExpenses - investments;
  const savingsRate = ((monthlyIncome - totalExpenses) / monthlyIncome) * 100;

  const data = [
    {
      name: 'Renda',
      value: monthlyIncome,
    },
    {
      name: 'Despesas Fixas',
      value: fixedExpenses,
    },
    {
      name: 'Despesas Variáveis',
      value: variableExpenses,
    },
    {
      name: 'Investimentos',
      value: investments,
    },
    {
      name: 'Disponível',
      value: availableIncome,
    },
  ];

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
        <PieChartIcon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
        <span className="truncate">Resumo Financeiro</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <SummaryCard
          icon={<DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />}
          label="Renda Mensal"
          value={formatCurrency(monthlyIncome)}
          color="bg-blue-500"
        />
        <SummaryCard
          icon={<TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />}
          label="Taxa de Poupança"
          value={`${savingsRate.toFixed(1)}%`}
          color="bg-green-500"
        />
        <SummaryCard
          icon={<DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />}
          label="Disponível"
          value={formatCurrency(availableIncome)}
          color="bg-purple-500"
        />
      </div>

      <div className="h-64 sm:h-80 mt-4 sm:mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 10 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{ fontSize: '12px' }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Bar dataKey="value" fill="#3B82F6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
          <p className="text-xs sm:text-sm text-green-700 mb-1">💰 Fluxo de Caixa Positivo</p>
          <p className="text-lg sm:text-2xl font-bold text-green-800 break-words">
            {formatCurrency(monthlyIncome - totalExpenses)}
          </p>
          <p className="text-xs text-green-600 mt-1">
            {((monthlyIncome - totalExpenses) / monthlyIncome * 100).toFixed(1)}% da renda
          </p>
        </div>

        <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <p className="text-xs sm:text-sm text-blue-700 mb-1">📊 Total de Despesas</p>
          <p className="text-lg sm:text-2xl font-bold text-blue-800 break-words">
            {formatCurrency(totalExpenses)}
          </p>
          <p className="text-xs text-blue-600 mt-1">
            {(totalExpenses / monthlyIncome * 100).toFixed(1)}% da renda
          </p>
        </div>
      </div>
    </div>
  );
}

interface SummaryCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}

function SummaryCard({ icon, label, value, color }: SummaryCardProps) {
  return (
    <div className="p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
      <div className={`${color} w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-white mb-2 sm:mb-3`}>
        {icon}
      </div>
      <p className="text-xs sm:text-sm text-gray-600 mb-1 truncate">{label}</p>
      <p className="text-lg sm:text-2xl font-bold text-gray-900 break-words">{value}</p>
    </div>
  );
}
