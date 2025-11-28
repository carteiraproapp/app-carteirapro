'use client';

import { Target, TrendingUp, Calendar, CheckCircle2 } from 'lucide-react';
import { FinancialGoal } from '@/lib/types';
import { formatCurrency } from '@/lib/financial-calculations';
import { Progress } from '@/components/ui/progress';

interface GoalsTrackerProps {
  goals: FinancialGoal[];
}

const PRIORITY_COLORS = {
  high: 'bg-red-100 text-red-700 border-red-300',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  low: 'bg-green-100 text-green-700 border-green-300',
};

const PRIORITY_LABELS = {
  high: 'Alta',
  medium: 'Média',
  low: 'Baixa',
};

export default function GoalsTracker({ goals }: GoalsTrackerProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Target className="w-7 h-7 text-blue-600" />
          Metas Financeiras
        </h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          + Nova Meta
        </button>
      </div>

      <div className="space-y-4">
        {goals.map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          const isCompleted = progress >= 100;
          const daysRemaining = Math.ceil(
            (goal.deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
          );

          return (
            <div
              key={goal.id}
              className={`p-5 rounded-xl border-2 transition-all hover:shadow-md ${
                isCompleted ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-lg text-gray-800">
                      {goal.title}
                    </h3>
                    {isCompleted && (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className={`px-3 py-1 rounded-full border ${PRIORITY_COLORS[goal.priority]}`}>
                      {PRIORITY_LABELS[goal.priority]}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {daysRemaining > 0 ? `${daysRemaining} dias` : 'Prazo expirado'}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(goal.currentAmount)}
                  </p>
                  <p className="text-sm text-gray-500">
                    de {formatCurrency(goal.targetAmount)}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Progress value={Math.min(progress, 100)} className="h-3" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    {progress.toFixed(1)}% concluído
                  </span>
                  <span className="font-medium text-blue-600">
                    Faltam {formatCurrency(Math.max(goal.targetAmount - goal.currentAmount, 0))}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {goals.length === 0 && (
        <div className="text-center py-12">
          <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-2">Nenhuma meta cadastrada</p>
          <p className="text-gray-400 text-sm">
            Comece definindo suas metas financeiras para acompanhar seu progresso
          </p>
        </div>
      )}
    </div>
  );
}
