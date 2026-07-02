'use client';

import { useState } from 'react';
import { submitInquiry } from '@/lib/api';
import { CheckCircle, WarningCircle } from '@phosphor-icons/react';

const inquiryTypes = [
  { value: 'bulk_order', label: 'Bulk Order' },
  { value: 'distributor', label: 'Become a Distributor' },
  { value: 'partnership', label: 'Partnership / OEM' },
  { value: 'general', label: 'General Enquiry' },
];

export function ContactForm() {
  const [form, setForm] = useState({
    name: '', email: '', company: '', message: '', type: 'bulk_order',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!form.email.trim()) errs.email = 'Email is required.';
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) errs.email = 'Enter a valid email address.';
    if (!form.message.trim()) errs.message = 'Message is required.';
    else if (form.message.trim().length < 10) errs.message = 'Message must be at least 10 characters.';
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStatus('loading');
    try {
      await submitInquiry(form);
      setStatus('success');
      setForm({ name: '', email: '', company: '', message: '', type: 'bulk_order' });
    } catch {
      setStatus('error');
      setErrorMsg('Failed to send your message. Please try again or contact us via WhatsApp.');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-brand-green/10 border border-brand-green/30 rounded-2xl p-8 text-center">
        <CheckCircle size={48} weight="fill" className="text-brand-green mx-auto mb-4" />
        <h3 className="font-display font-bold text-xl text-brand-black mb-2">Message Sent!</h3>
        <p className="text-gray-600 text-sm">Thank you for reaching out. Our export team will get back to you within 1 business day.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 px-6 py-2.5 rounded-full bg-brand-yellow text-brand-black font-semibold text-sm hover:bg-brand-orange transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Inquiry type — fieldset+legend for a11y */}
      <fieldset>
        <legend className="block text-sm font-medium text-gray-700 mb-2">Inquiry Type</legend>
        <div className="flex flex-wrap gap-2" role="group">
          {inquiryTypes.map((t) => (
            <button
              key={t.value}
              type="button"
              aria-pressed={form.type === t.value}
              onClick={() => setForm({ ...form, type: t.value })}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                form.type === t.value
                  ? 'bg-brand-yellow text-brand-black border-brand-yellow'
                  : 'bg-white text-gray-600 border-earth-200 hover:border-brand-yellow'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="text-brand-red">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your full name"
            className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange ${
              errors.name ? 'border-brand-red bg-red-50' : 'border-earth-200 bg-white'
            }`}
          />
          {errors.name && <p className="text-brand-red text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-brand-red">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@company.com"
            className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange ${
              errors.email ? 'border-brand-red bg-red-50' : 'border-earth-200 bg-white'
            }`}
          />
          {errors.email && <p className="text-brand-red text-xs mt-1">{errors.email}</p>}
        </div>
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company / Organisation</label>
        <input
          id="company"
          type="text"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          placeholder="Optional"
          className="w-full border border-earth-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message <span className="text-brand-red">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell us about your requirements: product interest, target market, estimated quantity, timeline..."
          className={`w-full border rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange ${
            errors.message ? 'border-brand-red bg-red-50' : 'border-earth-200 bg-white'
          }`}
        />
        {errors.message && <p className="text-brand-red text-xs mt-1">{errors.message}</p>}
      </div>

      {status === 'error' && (
        <div className="flex items-start gap-2 bg-red-50 border border-brand-red/20 rounded-xl px-4 py-3">
          <WarningCircle size={16} weight="fill" className="text-brand-red mt-0.5 shrink-0" />
          <p className="text-brand-red text-sm">{errorMsg}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="group/btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-brand-yellow text-brand-black font-bold uppercase text-xs tracking-widest hover:bg-brand-orange hover:text-white transition-all duration-300 shadow-lg shadow-brand-yellow/10 hover:shadow-brand-orange/20 hover:scale-[1.02] transform disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <span>{status === 'loading' ? 'Sending...' : 'Send Message'}</span>
        <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </button>
    </form>
  );
}
