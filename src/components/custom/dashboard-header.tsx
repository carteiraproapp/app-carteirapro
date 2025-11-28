'use client';

import { TrendingUp, Wallet, Target, PiggyBank } from 'lucide-react';
import { formatCurrency } from '@/lib/financial-calculations';

interface DashboardHeaderProps {
  userName: string;
  netWorth: number;
  monthlyIncome: number;
  financialScore: number;
}

export default function DashboardHeader({
  userName,
  netWorth,
  monthlyIncome,
  financialScore,
}: DashboardHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-6 md:p-8 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Olá, {userName}! 👋
          </h1>
          <p className="text-blue-100 text-lg">
            Bem-vindo ao seu painel financeiro
          </p>
        </div>
        
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4">
          <div className="bg-white/20 p-3 rounded-lg">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-blue-100">Score Financeiro</p>
            <p className="text-3xl font-bold">{financialScore}/100</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <MetricCard
          icon={<Wallet className="w-6 h-6" />}
          label="Patrimônio Líquido"
          value={formatCurrency(netWorth)}
          trend="+12.5%"
        />
        <MetricCard
          icon={<PiggyBank className="w-6 h-6" />}
          label="Renda Mensal"
          value={formatCurrency(monthlyIncome)}
          trend="+5.2%"
        />
        <MetricCard
          icon={<Target className="w-6 h-6" />}
          label="Meta do Mês"
          value="85%"
          trend="Atingido"
        />
      </div>
    </div>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: string;
}

function MetricCard({ icon, label, value, trend }: MetricCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/15 transition-all">
      <div className="flex items-center gap-3 mb-2">
        <div className="text-blue-200">{icon}</div>
        <p className="text-sm text-blue-100">{label}</p>
      </div>
      <p className="text-2xl font-bold mb-1">{value}</p>
      <p className="text-xs text-green-300">{trend}</p>
    </div>
  );
}
