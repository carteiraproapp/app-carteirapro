'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import DashboardHeader from '@/components/custom/dashboard-header';
import FinancialSummary from '@/components/custom/financial-summary';
import BudgetAllocationChart from '@/components/custom/budget-allocation';
import GoalsTracker from '@/components/custom/goals-tracker';
import RetirementPreview from '@/components/custom/retirement-preview';
import { 
  calculateBudgetAllocation, 
  calculateFinancialIndependenceScore,
  calculateNetWorth 
} from '@/lib/financial-calculations';
import { FinancialGoal } from '@/lib/types';
import { BookOpen, Target, Settings, LogOut, Mail, Lock, Shield, ShieldCheck } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'retirement'>('dashboard');
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [goals, setGoals] = useState<FinancialGoal[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // Redirecionar para landing page se não estiver logado
        router.push('/landing');
        return;
      }

      setIsAuthenticated(true);
      loadUserData(session);
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      router.push('/landing');
    }
  }

  async function loadUserData(session: any) {
    try {
      // Buscar perfil do usuário
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      if (profileError) {
        console.error('Erro ao carregar perfil:', profileError);
        // Se não tem perfil, redirecionar para onboarding
        router.push('/onboarding');
        return;
      }

      setUserData({
        name: profile.name,
        age: profile.age,
        profession: profile.profession,
        monthlyIncome: profile.monthly_income,
        fixedExpenses: profile.fixed_expenses,
        variableExpenses: profile.variable_expenses,
        investorProfile: profile.investor_profile,
        assets: profile.assets || 0,
        liabilities: profile.liabilities || 0,
      });

      // Buscar metas do usuário
      const { data: goalsData, error: goalsError } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (!goalsError && goalsData) {
        setGoals(goalsData.map(goal => ({
          id: goal.id,
          title: goal.title,
          targetAmount: parseFloat(goal.target_amount),
          currentAmount: parseFloat(goal.current_amount),
          deadline: new Date(goal.deadline),
          category: goal.category,
          priority: goal.priority,
        })));
      }

      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setLoading(false);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/landing');
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white">Carregando seus dados...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !userData) {
    return null;
  }

  const budgetAllocation = calculateBudgetAllocation(
    userData.monthlyIncome,
    userData.fixedExpenses,
    userData.variableExpenses
  );

  const netWorth = calculateNetWorth(userData.assets, userData.liabilities);
  
  const financialScore = calculateFinancialIndependenceScore(
    userData.monthlyIncome,
    userData.fixedExpenses + userData.variableExpenses,
    netWorth,
    userData.age
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-16 sm:w-20 bg-slate-800/50 backdrop-blur-lg shadow-lg z-50 flex flex-col items-center py-4 sm:py-6 gap-4 sm:gap-6 border-r border-white/10">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-bold text-lg sm:text-xl">
          CP
        </div>
        
        <nav className="flex-1 flex flex-col gap-3 sm:gap-4">
          <NavButton 
            icon={<BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />} 
            active={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
          />
          <NavButton 
            icon={<Target className="w-5 h-5 sm:w-6 sm:h-6" />}
            active={activeTab === 'retirement'}
            onClick={() => setActiveTab('retirement')}
          />
          <NavButton icon={<Settings className="w-5 h-5 sm:w-6 sm:h-6" />} />
        </nav>

        <button 
          onClick={handleLogout}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl hover:bg-red-500/20 flex items-center justify-center text-red-400 hover:text-red-300 transition-colors"
        >
          <LogOut className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-16 sm:ml-20 p-3 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
          {/* Header */}
          <DashboardHeader
            userName={userData.name}
            netWorth={netWorth}
            monthlyIncome={userData.monthlyIncome}
            financialScore={financialScore}
          />

          {activeTab === 'dashboard' ? (
            <>
              {/* Grid de Componentes */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <FinancialSummary
                  monthlyIncome={userData.monthlyIncome}
                  fixedExpenses={userData.fixedExpenses}
                  variableExpenses={userData.variableExpenses}
                  investments={budgetAllocation.investments}
                />

                <BudgetAllocationChart
                  allocation={budgetAllocation}
                  monthlyIncome={userData.monthlyIncome}
                />
              </div>

              {/* Metas */}
              <GoalsTracker goals={goals} />

              {/* Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                <QuickActionCard
                  title="Educação Financeira"
                  description="Aprenda sobre investimentos"
                  icon="📚"
                  color="from-blue-500 to-indigo-600"
                />
                <QuickActionCard
                  title="Análise de Mercado"
                  description="Veja as melhores oportunidades"
                  icon="📈"
                  color="from-green-500 to-emerald-600"
                />
                <QuickActionCard
                  title="Planejamento"
                  description="Organize suas finanças"
                  icon="📊"
                  color="from-purple-500 to-pink-600"
                />
              </div>
            </>
          ) : (
            <RetirementPreview
              currentAge={userData.age}
              monthlyIncome={userData.monthlyIncome}
              currentInvestments={userData.assets}
            />
          )}
        </div>
      </main>

      {/* Footer Profissional - Dashboard */}
      <footer className="ml-16 sm:ml-20 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-slate-900/50 mt-8">
        <div className="max-w-7xl mx-auto">
          {/* Grid Principal do Footer */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
            {/* Coluna 1 - Marca e Descrição */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">CP</span>
                </div>
                <span className="text-white font-bold text-lg">Capital Prime</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                A plataforma mais completa e segura para gestão financeira inteligente.
              </p>
              <div className="flex items-center gap-2 text-emerald-400 text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-semibold">Site 100% Seguro</span>
              </div>
            </div>

            {/* Coluna 2 - Links Rápidos */}
            <div>
              <h3 className="text-white font-bold text-base mb-3">Empresa</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Sobre Nós</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Como Funciona</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Recursos</a>
                </li>
              </ul>
            </div>

            {/* Coluna 3 - Suporte */}
            <div>
              <h3 className="text-white font-bold text-base mb-3">Suporte</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Central de Ajuda</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Segurança</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacidade</a>
                </li>
              </ul>
            </div>

            {/* Coluna 4 - Contato */}
            <div>
              <h3 className="text-white font-bold text-base mb-3">Contato</h3>
              <a 
                href="mailto:carteiraproapp@gmail.com"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group mb-4"
              >
                <div className="w-9 h-9 bg-blue-600/20 rounded-lg flex items-center justify-center group-hover:bg-blue-600/30 transition-colors">
                  <Mail className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium">carteiraproapp@gmail.com</p>
                </div>
              </a>
              
              <div>
                <p className="text-gray-400 text-sm mb-2">Redes Sociais</p>
                <div className="flex gap-2">
                  <a href="#" className="w-9 h-9 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                    <span className="text-white text-xs font-bold">f</span>
                  </a>
                  <a href="#" className="w-9 h-9 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                    <span className="text-white text-xs font-bold">in</span>
                  </a>
                  <a href="#" className="w-9 h-9 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                    <span className="text-white text-xs font-bold">𝕏</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Separador */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6"></div>

          {/* Linha Final - Copyright e Selos */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © 2024 <span className="text-white font-semibold">Capital Prime</span>. Todos os direitos reservados.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Plataforma regulamentada e em conformidade com as normas de segurança financeira.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg border border-white/10">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span className="text-gray-400 text-xs font-medium">SSL Seguro</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg border border-white/10">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-gray-400 text-xs font-medium">Dados Protegidos</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface NavButtonProps {
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

function NavButton({ icon, active, onClick }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all ${
        active
          ? 'bg-blue-600 text-white shadow-lg'
          : 'text-gray-400 hover:bg-white/10 hover:text-white'
      }`}
    >
      {icon}
    </button>
  );
}

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
}

function QuickActionCard({ title, description, icon, color }: QuickActionCardProps) {
  return (
    <button className={`bg-gradient-to-r ${color} text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 text-left hover:scale-105 transition-transform shadow-lg`}>
      <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{icon}</div>
      <h3 className="text-base sm:text-xl font-bold mb-1 sm:mb-2">{title}</h3>
      <p className="text-white/90 text-xs sm:text-sm">{description}</p>
    </button>
  );
}
