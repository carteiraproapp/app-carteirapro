'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  TrendingUp, 
  Shield, 
  Target, 
  Sparkles, 
  ChevronRight,
  CheckCircle2,
  Users,
  Award,
  BarChart3,
  Zap,
  Lock,
  Globe,
  Mail,
  ShieldCheck
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleGetStarted = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header Premium */}
      <header className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl">CP</span>
              </div>
              <span className="text-white font-bold text-lg sm:text-xl hidden sm:block">Capital Prime</span>
            </div>
            
            <div className="flex items-center gap-3 sm:gap-4">
              <button 
                onClick={() => router.push('/login')}
                className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base"
              >
                Entrar
              </button>
              <button 
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all text-sm sm:text-base font-medium"
              >
                Começar Agora
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Ultra Premium */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 sm:space-y-8">
            {/* Badge Premium */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/30 rounded-full px-4 sm:px-6 py-2 sm:py-3 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              <span className="text-blue-300 text-xs sm:text-sm font-medium">Plataforma Premium de Gestão Financeira</span>
            </div>

            {/* Headline Impactante */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Transforme Seu Futuro
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Financeiro Hoje
              </span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A plataforma mais completa para quem busca <span className="text-white font-semibold">independência financeira</span> com inteligência, segurança e resultados comprovados.
            </p>

            {/* CTA Principal */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 sm:pt-8">
              <button 
                onClick={handleGetStarted}
                className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl text-base sm:text-lg font-bold hover:shadow-2xl hover:shadow-blue-500/50 transition-all hover:scale-105 flex items-center gap-3 w-full sm:w-auto justify-center"
              >
                Começar Gratuitamente
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="text-gray-300 hover:text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl text-base sm:text-lg font-medium border border-white/20 hover:border-white/40 transition-all w-full sm:w-auto">
                Ver Demonstração
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-8 sm:pt-12 text-gray-400 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                <span><span className="text-white font-bold">50.000+</span> usuários ativos</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                <span><span className="text-white font-bold">4.9/5</span> avaliação média</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                <span><span className="text-white font-bold">100%</span> seguro</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Premium - 3 Colunas */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Por Que Escolher o Capital Prime?
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
              Tecnologia de ponta aliada à expertise financeira para resultados extraordinários
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <FeatureCard
              icon={<BarChart3 className="w-8 h-8 sm:w-10 sm:h-10" />}
              title="Análise Inteligente"
              description="Algoritmos avançados analisam seu perfil e sugerem as melhores estratégias personalizadas para você."
              gradient="from-blue-600 to-cyan-600"
            />
            
            <FeatureCard
              icon={<Target className="w-8 h-8 sm:w-10 sm:h-10" />}
              title="Metas Alcançáveis"
              description="Defina objetivos claros e acompanhe seu progresso em tempo real com insights precisos."
              gradient="from-indigo-600 to-purple-600"
            />
            
            <FeatureCard
              icon={<Shield className="w-8 h-8 sm:w-10 sm:h-10" />}
              title="Segurança Máxima"
              description="Criptografia de nível bancário e conformidade total com regulamentações internacionais."
              gradient="from-purple-600 to-pink-600"
            />
          </div>
        </div>
      </section>

      {/* Stats Section - Impacto Visual */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-500/20 rounded-3xl sm:rounded-[2rem] p-8 sm:p-12 lg:p-16 backdrop-blur-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
              <StatCard number="R$ 2.5B+" label="Patrimônio Gerenciado" />
              <StatCard number="50K+" label="Usuários Ativos" />
              <StatCard number="98%" label="Taxa de Satisfação" />
              <StatCard number="24/7" label="Suporte Premium" />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Lista Premium */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Tudo que Você Precisa em Um Só Lugar
              </h2>
              
              <div className="space-y-4 sm:space-y-6">
                <BenefitItem 
                  icon={<Zap className="w-5 h-5 sm:w-6 sm:h-6" />}
                  title="Onboarding Inteligente"
                  description="Configure sua conta em menos de 3 minutos com nosso processo guiado"
                />
                <BenefitItem 
                  icon={<TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />}
                  title="Dashboard Completo"
                  description="Visualize todas as suas finanças em um painel intuitivo e poderoso"
                />
                <BenefitItem 
                  icon={<Lock className="w-5 h-5 sm:w-6 sm:h-6" />}
                  title="Privacidade Garantida"
                  description="Seus dados são criptografados e nunca compartilhados com terceiros"
                />
                <BenefitItem 
                  icon={<Globe className="w-5 h-5 sm:w-6 sm:h-6" />}
                  title="Acesso Multiplataforma"
                  description="Use em qualquer dispositivo, a qualquer hora, de qualquer lugar"
                />
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-3xl sm:rounded-[2rem] blur-3xl"></div>
              <div className="relative bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 lg:p-12 space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs sm:text-sm">Retorno Médio Anual</p>
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">+18.5%</p>
                  </div>
                </div>
                
                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                
                <div className="space-y-3 sm:space-y-4">
                  <ProgressBar label="Ações" value={35} color="from-blue-500 to-cyan-500" />
                  <ProgressBar label="Renda Fixa" value={45} color="from-indigo-500 to-purple-500" />
                  <ProgressBar label="Fundos" value={20} color="from-purple-500 to-pink-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Social Proof */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Histórias de Sucesso
            </h2>
            <p className="text-lg sm:text-xl text-gray-400">
              Veja como transformamos a vida financeira de milhares de pessoas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <TestimonialCard
              name="Maria Silva"
              role="Empresária"
              content="Em 6 meses consegui organizar minhas finanças e aumentar meus investimentos em 40%. Plataforma incrível!"
              rating={5}
            />
            <TestimonialCard
              name="João Santos"
              role="Engenheiro"
              content="A melhor decisão que tomei foi usar o Capital Prime. Hoje tenho clareza total sobre meu futuro financeiro."
              rating={5}
            />
            <TestimonialCard
              name="Ana Costa"
              role="Médica"
              content="Profissional, seguro e muito intuitivo. Recomendo para todos que querem crescer financeiramente."
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* CTA Final - Conversão Máxima */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl sm:rounded-[2rem] blur-2xl opacity-50"></div>
            <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl sm:rounded-[2rem] p-8 sm:p-12 lg:p-16 text-center space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Pronto Para Transformar Suas Finanças?
              </h2>
              <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
                Junte-se a milhares de pessoas que já estão construindo um futuro financeiro sólido e próspero.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <button 
                  onClick={handleGetStarted}
                  className="group bg-white text-blue-600 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl text-base sm:text-lg font-bold hover:shadow-2xl transition-all hover:scale-105 flex items-center gap-3 w-full sm:w-auto justify-center"
                >
                  Criar Conta Gratuita
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <p className="text-blue-200 text-xs sm:text-sm">
                ✓ Sem cartão de crédito • ✓ Configuração em 3 minutos • ✓ Suporte 24/7
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Premium - Profissional e Completo */}
      <footer className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          {/* Grid Principal do Footer */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12">
            {/* Coluna 1 - Marca e Descrição */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">CP</span>
                </div>
                <span className="text-white font-bold text-xl">Capital Prime</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                A plataforma mais completa e segura para gestão financeira inteligente. Transforme seu futuro com tecnologia de ponta.
              </p>
              <div className="flex items-center gap-2 text-emerald-400 text-sm">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-semibold">Site 100% Seguro</span>
              </div>
            </div>

            {/* Coluna 2 - Links Rápidos */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Empresa</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Sobre Nós</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Como Funciona</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Recursos</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Planos e Preços</a>
                </li>
              </ul>
            </div>

            {/* Coluna 3 - Suporte */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Suporte</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Central de Ajuda</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Segurança</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacidade</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Termos de Uso</a>
                </li>
              </ul>
            </div>

            {/* Coluna 4 - Contato */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Contato</h3>
              <div className="space-y-4">
                <a 
                  href="mailto:carteiraproapp@gmail.com"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center group-hover:bg-blue-600/30 transition-colors">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium">carteiraproapp@gmail.com</p>
                  </div>
                </a>
                
                <div className="pt-4">
                  <p className="text-gray-400 text-sm mb-3">Siga-nos nas redes sociais</p>
                  <div className="flex gap-3">
                    <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                      <span className="text-white text-sm font-bold">f</span>
                    </a>
                    <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                      <span className="text-white text-sm font-bold">in</span>
                    </a>
                    <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                      <span className="text-white text-sm font-bold">𝕏</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Separador */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>

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
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg border border-white/10">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span className="text-gray-400 text-xs font-medium">SSL Seguro</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg border border-white/10">
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

// Componentes Auxiliares
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

function FeatureCard({ icon, title, description, gradient }: FeatureCardProps) {
  return (
    <div className="group bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:border-white/20 transition-all hover:scale-105">
      <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform`}>
        <div className="text-white">{icon}</div>
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">{title}</h3>
      <p className="text-gray-400 leading-relaxed text-sm sm:text-base">{description}</p>
    </div>
  );
}

interface StatCardProps {
  number: string;
  label: string;
}

function StatCard({ number, label }: StatCardProps) {
  return (
    <div className="text-center">
      <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3">{number}</p>
      <p className="text-gray-400 text-sm sm:text-base">{label}</p>
    </div>
  );
}

interface BenefitItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function BenefitItem({ icon, title, description }: BenefitItemProps) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white">
        {icon}
      </div>
      <div>
        <h4 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">{title}</h4>
        <p className="text-gray-400 text-sm sm:text-base">{description}</p>
      </div>
    </div>
  );
}

interface ProgressBarProps {
  label: string;
  value: number;
  color: string;
}

function ProgressBar({ label, value, color }: ProgressBarProps) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-gray-400 text-xs sm:text-sm">{label}</span>
        <span className="text-white font-bold text-xs sm:text-sm">{value}%</span>
      </div>
      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  rating: number;
}

function TestimonialCard({ name, role, content, rating }: TestimonialCardProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-4">
      <div className="flex gap-1">
        {[...Array(rating)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-lg sm:text-xl">★</span>
        ))}
      </div>
      <p className="text-gray-300 leading-relaxed text-sm sm:text-base">"{content}"</p>
      <div>
        <p className="text-white font-bold text-sm sm:text-base">{name}</p>
        <p className="text-gray-500 text-xs sm:text-sm">{role}</p>
      </div>
    </div>
  );
}
