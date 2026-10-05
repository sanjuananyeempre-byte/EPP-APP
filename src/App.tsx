import React, { useState, useEffect } from 'react';
import { WorkerItem, EppCategory, CartItem, DeliveryRecord } from './types';
import { Header } from './components/Header';
import { StepWorkerSelect } from './components/StepWorkerSelect';
import { StepCategoryMenu } from './components/StepCategoryMenu';
import { StepVariantConfig } from './components/StepVariantConfig';
import { StepSummary } from './components/StepSummary';
import { StepSuccess } from './components/StepSuccess';
import { AdminHistoryModal } from './components/AdminHistoryModal';
import { fetchDeliveries, saveDeliveriesBatch, clearLocalRecords } from './services/deliveryService';

export default function App() {
  const [currentStep, setCurrentStep] = useState<'worker' | 'category' | 'configure' | 'summary' | 'success'>('worker');
  const [selectedWorker, setSelectedWorker] = useState<WorkerItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<EppCategory | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastBatchResult, setLastBatchResult] = useState<{ records: DeliveryRecord[]; batchId: string } | null>(null);

  // Administrative / Central history state
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [allDeliveries, setAllDeliveries] = useState<DeliveryRecord[]>([]);

  // Load deliveries on start
  useEffect(() => {
    loadDeliveries();
  }, []);

  const loadDeliveries = async () => {
    const list = await fetchDeliveries();
    setAllDeliveries(list);
  };

  // Step 1: Worker chosen
  const handleSelectWorker = (worker: WorkerItem) => {
    setSelectedWorker(worker);
    setCartItems([]);
    setCurrentStep('category');
  };

  // Step 2: EPP Category chosen
  const handleSelectCategory = (category: EppCategory) => {
    setSelectedCategory(category);
    setCurrentStep('configure');
  };

  // Step 3: Item configured and added to cart
  const handleAddItem = (item: CartItem) => {
    setCartItems(prev => [...prev, item]);
    setSelectedCategory(null);
    // After adding, go directly to summary so worker can review or add another
    setCurrentStep('summary');
  };

  // From summary, choose to add another EPP
  const handleAddAnother = () => {
    setSelectedCategory(null);
    setCurrentStep('category');
  };

  // Remove single item from cart in summary
  const handleRemoveItem = (itemId: string) => {
    setCartItems(prev => prev.filter(i => i.id !== itemId));
  };

  // Update item quantity directly in summary
  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    if (newQty < 1) return;
    setCartItems(prev =>
      prev.map(item => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  // Step 4: Confirm delivery (saves automatically to backend & local persistent registry)
  const handleConfirmDelivery = async () => {
    if (!selectedWorker || cartItems.length === 0 || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const result = await saveDeliveriesBatch(selectedWorker.name, cartItems);
      setLastBatchResult({
        records: result.records,
        batchId: result.batchId
      });
      // Refresh cumulative list
      await loadDeliveries();
      // Move to success step
      setCurrentStep('success');
    } catch (err) {
      console.error('Error saving delivery batch:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Restart to Step 1: "¿Quién eres?"
  const handleNewRegistration = () => {
    setSelectedWorker(null);
    setSelectedCategory(null);
    setCartItems([]);
    setLastBatchResult(null);
    setCurrentStep('worker');
  };

  // Header Back Navigation handler
  const handleHeaderBack = () => {
    if (currentStep === 'configure') {
      setSelectedCategory(null);
      setCurrentStep(cartItems.length > 0 ? 'summary' : 'category');
    } else if (currentStep === 'summary') {
      setCurrentStep('category');
    } else if (currentStep === 'category') {
      if (cartItems.length > 0) {
        if (window.confirm('¿Deseas cambiar de trabajador? Los elementos seleccionados se descartarán.')) {
          handleNewRegistration();
        }
      } else {
        handleNewRegistration();
      }
    }
  };

  const handleHeaderHome = () => {
    if (cartItems.length > 0) {
      if (window.confirm('¿Volver al inicio? Se perderá la selección actual no confirmada.')) {
        handleNewRegistration();
      }
    } else {
      handleNewRegistration();
    }
  };

  const handleClearAllHistory = async () => {
    await clearLocalRecords();
    await loadDeliveries();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 selection:bg-amber-200">
      {/* Top Header */}
      <Header
        currentStep={currentStep}
        workerName={selectedWorker ? selectedWorker.name : null}
        itemCount={cartItems.length}
        onBack={handleHeaderBack}
        onHome={handleHeaderHome}
        onOpenHistory={() => setShowAdminModal(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-start">
        {currentStep === 'worker' && (
          <StepWorkerSelect onSelectWorker={handleSelectWorker} />
        )}

        {currentStep === 'category' && selectedWorker && (
          <StepCategoryMenu
            workerName={selectedWorker.name}
            cartItems={cartItems}
            onSelectCategory={handleSelectCategory}
            onGoToSummary={() => setCurrentStep('summary')}
          />
        )}

        {currentStep === 'configure' && selectedCategory && selectedWorker && (
          <StepVariantConfig
            category={selectedCategory}
            workerName={selectedWorker.name}
            onAddItem={handleAddItem}
            onCancel={() => setCurrentStep(cartItems.length > 0 ? 'summary' : 'category')}
          />
        )}

        {currentStep === 'summary' && selectedWorker && (
          <StepSummary
            workerName={selectedWorker.name}
            items={cartItems}
            isSubmitting={isSubmitting}
            onAddAnother={handleAddAnother}
            onRemoveItem={handleRemoveItem}
            onUpdateQuantity={handleUpdateQuantity}
            onConfirm={handleConfirmDelivery}
            onCancel={handleNewRegistration}
          />
        )}

        {currentStep === 'success' && lastBatchResult && selectedWorker && (
          <StepSuccess
            records={lastBatchResult.records}
            batchId={lastBatchResult.batchId}
            workerName={selectedWorker.name}
            onNewRegistration={handleNewRegistration}
          />
        )}
      </main>

      {/* Admin / History & Excel Export Modal */}
      <AdminHistoryModal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        deliveries={allDeliveries}
        onClearAll={handleClearAllHistory}
      />

      {/* Discreet bottom footer */}
      <footer className="py-3 px-4 text-center text-xs text-slate-500 border-t border-slate-200 bg-white">
        <span>Sistema de Registro Digital de EPP · Acumulación Centralizada de Datos para Excel</span>
      </footer>
    </div>
  );
}
