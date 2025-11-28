'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { InvestorProfile } from '@/lib/types';
import { ArrowRight, TrendingUp, Target, Shield } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    profession: '',
    monthlyIncome: '',
    fixedExpenses: '',
    variableExpenses: '',
    investorProfile: 'moderate' as InvestorProfile,
    assets: '',
    liabilities: '',
  });

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      router.push('/login');
      return;
    }

    setUserId(session.user.id);

    // Verificar se já tem perfil
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', session.user.id)
      .single();

    if (profile) {
      router.push('/');
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  async function handleSubmit() {
    if (!userId) return;

    setLoading(true);
    try {
      const { error } = await supabase.from('profiles').insert({
        user_id: userId,
        name: formData.name,
        age: parseInt(formData.age),
        profession: formData.profession,
        monthly_income: parseFloat(formData.monthlyIncome),
        fixed_expenses: parseFloat(formData.fixedExpenses),
        variable_expenses: parseFloat(formData.variableExpenses),
        investor_profile: formData.investorProfile,
        assets: parseFloat(formData.assets) || 0,
        liabilities: parseFloat(formData.liabilities) || 0,
      });

      if (error) throw error;

      // Criar metas iniciais
      await supabase.from('goals').insert([
        {
          user_id: userId,
          title: 'Fundo de Emergência',
          target_amount: parseFloat(formData.fixedExpenses) * 6,
          current_amount: 0,
          deadline: new Date(new Date().setMonth(new Date().getMonth() + 12)).toISOString(),
          category: 'emergency',
          priority: 'high',
        },
        {
          user_id: userId,
          title: 'Caminho do Milhão',
          target_amount: 1000000,
          current_amount: parseFloat(formData.assets) || 0,
          deadline: new Date(new Date().setFullYear(new Date().getFullYear() + 10)).toISOString(),
          category: 'investment',
          priority: 'high',
        },
      ]);

      router.push('/');
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
      alert('Erro ao salvar perfil. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  const canProceed = () => {
    if (step === 1) {
      return formData.name && formData.age && formData.profession;
    }
    if (step === 2) {
      return formData.monthlyIncome && formData.fixedExpenses && formData.variableExpenses;
    }
    if (step === 3) {
      return formData.investorProfile;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl mb-4">
            <span className="text-white font-bold text-2xl">CP</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Bem-vindo ao CarteiraPro</h1>
          <p className="text-gray-400">Vamos configurar seu perfil financeiro</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex-1 h-2 rounded-full mx-1 transition-all ${
                  s <= step ? 'bg-blue-600' : 'bg-slate-700'
                }`}
              />
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm">
            Etapa {step} de 3
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600/20 rounded-xl mb-3">
                  <Target className="w-6 h-6 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Informações Pessoais</h2>
                <p className="text-gray-400">Conte-nos um pouco sobre você</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Seu nome"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Idade
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="32"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Profissão
                  </label>
                  <input
                    type="text"
                    name="profession"
                    value={formData.profession}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Desenvolvedor"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600/20 rounded-xl mb-3">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Situação Financeira</h2>
                <p className="text-gray-400">Informe sua renda e despesas mensais</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Renda Mensal (R$)
                </label>
                <input
                  type="number"
                  name="monthlyIncome"
                  value={formData.monthlyIncome}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="8000"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Despesas Fixas (R$)
                  </label>
                  <input
                    type="number"
                    name="fixedExpenses"
                    value={formData.fixedExpenses}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="3200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Despesas Variáveis (R$)
                  </label>
                  <input
                    type="number"
                    name="variableExpenses"
                    value={formData.variableExpenses}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="1500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Patrimônio (R$)
                  </label>
                  <input
                    type="number"
                    name="assets"
                    value={formData.assets}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="150000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Dívidas (R$)
                  </label>
                  <input
                    type="number"
                    name="liabilities"
                    value={formData.liabilities}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="50000"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600/20 rounded-xl mb-3">
                  <Shield className="w-6 h-6 text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Perfil de Investidor</h2>
                <p className="text-gray-400">Como você se relaciona com investimentos?</p>
              </div>

              <div className="space-y-3">
                <ProfileOption
                  value="conservative"
                  selected={formData.investorProfile === 'conservative'}
                  onClick={() => setFormData(prev => ({ ...prev, investorProfile: 'conservative' }))}
                  title="Conservador"
                  description="Prefiro segurança e baixo risco"
                  color="blue"
                />

                <ProfileOption
                  value="moderate"
                  selected={formData.investorProfile === 'moderate'}
                  onClick={() => setFormData(prev => ({ ...prev, investorProfile: 'moderate' }))}
                  title="Moderado"
                  description="Busco equilíbrio entre risco e retorno"
                  color="green"
                />

                <ProfileOption
                  value="aggressive"
                  selected={formData.investorProfile === 'aggressive'}
                  onClick={() => setFormData(prev => ({ ...prev, investorProfile: 'aggressive' }))}
                  title="Arrojado"
                  description="Aceito mais risco por maiores retornos"
                  color="red"
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-colors"
              >
                Voltar
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!canProceed() || loading}
              className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                canProceed() && !loading
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:shadow-lg hover:scale-105'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              {loading ? (
                'Salvando...'
              ) : step === 3 ? (
                'Finalizar'
              ) : (
                <>
                  Próximo
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProfileOptionProps {
  value: string;
  selected: boolean;
  onClick: () => void;
  title: string;
  description: string;
  color: 'blue' | 'green' | 'red';
}

function ProfileOption({ selected, onClick, title, description, color }: ProfileOptionProps) {
  const colorClasses = {
    blue: 'border-blue-500 bg-blue-500/10',
    green: 'border-green-500 bg-green-500/10',
    red: 'border-red-500 bg-red-500/10',
  };

  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
        selected
          ? colorClasses[color]
          : 'border-white/10 bg-white/5 hover:bg-white/10'
      }`}
    >
      <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </button>
  );
}
