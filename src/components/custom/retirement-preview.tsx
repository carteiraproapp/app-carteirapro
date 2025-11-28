'use client';

import { useState } from 'react';
import { TrendingUp, Target, Calendar, DollarSign } from 'lucide-react';
import { formatCurrency } from '@/lib/financial-calculations';

interface RetirementPreviewProps {
  currentAge: number;
  monthlyIncome: number;
  currentInvestments: number;
}

export default function RetirementPreview({
  currentAge,
  monthlyIncome,
  currentInvestments,
}: RetirementPreviewProps) {
  const [retirementGoal, setRetirementGoal] = useState(10000);
  const [retirementAge, setRetirementAge] = useState(65);

  // Cálculos simplificados de aposentadoria
  const yearsUntilRetirement = retirementAge - currentAge;
  const monthsUntilRetirement = yearsUntilRetirement * 12;
  
  // Assumindo 8% de retorno anual (0.64% ao mês)
  const monthlyReturn = 0.0064;
  
  // Quanto precisa acumular para ter a renda desejada (regra dos 4%)
  const targetAmount = retirementGoal * 12 * 25;
  
  // Quanto precisa investir por mês
  const futureValue = (monthlyPayment: number) => {
    return monthlyPayment * ((Math.pow(1 + monthlyReturn, monthsUntilRetirement) - 1) / monthlyReturn) + 
           currentInvestments * Math.pow(1 + monthlyReturn, monthsUntilRetirement);
  };
  
  // Busca binária para encontrar o investimento mensal necessário
  let low = 0;
  let high = monthlyIncome;
  let requiredMonthlyInvestment = 0;
  
  for (let i = 0; i < 50; i++) {
    const mid = (low + high) / 2;
    const fv = futureValue(mid);
    
    if (Math.abs(fv - targetAmount) < 1000) {
      requiredMonthlyInvestment = mid;
      break;
    }
    
    if (fv < targetAmount) {
      low = mid;
    } else {
      high = mid;
    }
  }
  
  const projectedAmount = futureValue(requiredMonthlyInvestment);
  const isAchievable = requiredMonthlyInvestment <= monthlyIncome * 0.5;

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
        <Target className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
        Previsibilidade de Aposentadoria
      </h2>

      {/* Inputs de Meta */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Renda Mensal Desejada
          </label>
          <input
            type="number"
            value={retirementGoal}
            onChange={(e) => setRetirementGoal(Number(e.target.value))}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: 10000"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Idade de Aposentadoria
          </label>
          <input
            type="number"
            value={retirementAge}
            onChange={(e) => setRetirementAge(Number(e.target.value))}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: 65"
          />
        </div>
      </div>

      {/* Cards de Resultado */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
        <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <p className="text-xs sm:text-sm text-blue-700 mb-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
            Investimento Mensal Necessário
          </p>
          <p className="text-lg sm:text-2xl font-bold text-blue-800 break-words">
            {formatCurrency(requiredMonthlyInvestment)}
          </p>
          <p className="text-xs text-blue-600 mt-1">
            {((requiredMonthlyInvestment / monthlyIncome) * 100).toFixed(1)}% da sua renda
          </p>
        </div>

        <div className="p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
          <p className="text-xs sm:text-sm text-green-700 mb-1 flex items-center gap-1">
            <Target className="w-3 h-3 sm:w-4 sm:h-4" />
            Patrimônio Projetado
          </p>
          <p className="text-lg sm:text-2xl font-bold text-green-800 break-words">
            {formatCurrency(projectedAmount)}
          </p>
          <p className="text-xs text-green-600 mt-1">
            Em {yearsUntilRetirement} anos
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-6 p-3 sm:p-4 bg-gray-50 rounded-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="text-center flex-1">
            <p className="text-xs sm:text-sm text-gray-600">Idade Atual</p>
            <p className="text-base sm:text-xl font-bold text-gray-900">{currentAge}</p>
          </div>
          <div className="flex-1 h-2 bg-gradient-to-r from-blue-200 to-green-200 rounded-full mx-2 sm:mx-4" />
          <div className="text-center flex-1">
            <p className="text-xs sm:text-sm text-gray-600">Aposentadoria</p>
            <p className="text-base sm:text-xl font-bold text-gray-900">{retirementAge}</p>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-center text-gray-600">
          Faltam <strong>{yearsUntilRetirement} anos</strong> para sua aposentadoria
        </p>
      </div>

      {/* Status e Recomendações */}
      <div className={`p-3 sm:p-4 rounded-xl border ${
        isAchievable 
          ? 'bg-green-50 border-green-200' 
          : 'bg-orange-50 border-orange-200'
      }`}>
        <p className="text-xs sm:text-sm font-medium mb-2 ${
          isAchievable ? 'text-green-800' : 'text-orange-800'
        }">
          {isAchievable ? '✅ Meta Alcançável!' : '⚠️ Meta Desafiadora'}
        </p>
        <p className="text-xs sm:text-sm ${
          isAchievable ? 'text-green-700' : 'text-orange-700'
        }">
          {isAchievable 
            ? `Investindo ${formatCurrency(requiredMonthlyInvestment)} por mês, você alcançará sua meta de aposentadoria com uma renda mensal de ${formatCurrency(retirementGoal)}.`
            : `Para alcançar sua meta, você precisaria investir ${((requiredMonthlyInvestment / monthlyIncome) * 100).toFixed(1)}% da sua renda. Considere ajustar sua meta ou idade de aposentadoria.`
          }
        </p>
      </div>

      {/* Premissas */}
      <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
        <p className="text-xs text-blue-800">
          <strong>📊 Premissas:</strong> Retorno anual de 8%, regra dos 4% para renda passiva, 
          sem considerar inflação. Consulte um planejador financeiro para análise personalizada.
        </p>
      </div>
    </div>
  );
}
