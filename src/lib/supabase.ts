import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos do banco de dados
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          age: number;
          profession: string;
          monthly_income: number;
          fixed_expenses: number;
          variable_expenses: number;
          investor_profile: 'conservative' | 'moderate' | 'aggressive';
          assets: number;
          liabilities: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          age: number;
          profession: string;
          monthly_income: number;
          fixed_expenses: number;
          variable_expenses: number;
          investor_profile: 'conservative' | 'moderate' | 'aggressive';
          assets?: number;
          liabilities?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          age?: number;
          profession?: string;
          monthly_income?: number;
          fixed_expenses?: number;
          variable_expenses?: number;
          investor_profile?: 'conservative' | 'moderate' | 'aggressive';
          assets?: number;
          liabilities?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      goals: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          target_amount: number;
          current_amount: number;
          deadline: string;
          category: 'retirement' | 'emergency' | 'investment' | 'purchase' | 'custom';
          priority: 'high' | 'medium' | 'low';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          target_amount: number;
          current_amount?: number;
          deadline: string;
          category: 'retirement' | 'emergency' | 'investment' | 'purchase' | 'custom';
          priority: 'high' | 'medium' | 'low';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          target_amount?: number;
          current_amount?: number;
          deadline?: string;
          category?: 'retirement' | 'emergency' | 'investment' | 'purchase' | 'custom';
          priority?: 'high' | 'medium' | 'low';
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};
