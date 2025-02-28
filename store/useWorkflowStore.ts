import { create } from 'zustand';

interface WorkflowState {
  currentStep: number;
  
  setCurrentStep: (step: number) => void;
  resetWorkflow: () => void;
}

export const useWorkflowStore = create<WorkflowState>((set) => ({
  currentStep: 1,
  
  setCurrentStep: (step) => set({ currentStep: step }),
  resetWorkflow: () => set({ currentStep: 1 }),
})); 