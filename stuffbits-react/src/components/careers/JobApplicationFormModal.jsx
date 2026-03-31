import { useState } from 'react'
import { X, Send, Loader2, AlertCircle, CheckCircle2, FileText } from 'lucide-react'

const MAX_RESUME_SIZE = 5 * 1024 * 1024 // 5MB

const defaultFormState = {
  name: '',
  email: '',
  phone: '',
  resumeFile: null,
  message: '',
}

export default function JobApplicationFormModal({ job, isOpen, onClose }) {
  const [form, setForm] = useState({ ...defaultFormState })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('')

  const formEndpoint = import.meta.env.VITE_JOB_APPLICATION_FORM_URL

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0]
    if (!file) {
      setForm((prev) => ({ ...prev, resumeFile: null }))
      return
    }
    if (file.type !== 'application/pdf') {
      setStatus('error')
      setErrorMessage('Please upload a PDF file only.')
      return
    }
    if (file.size > MAX_RESUME_SIZE) {
      setStatus('error')
      setErrorMessage('Resume must be 5MB or smaller.')
      return
    }
    setStatus('idle')
    setErrorMessage('')
    setForm((prev) => ({ ...prev, resumeFile: file }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!formEndpoint) {
      setStatus('error')
      setErrorMessage('Application form is not configured. Please contact support.')
      return
    }

    if (!form.resumeFile) {
      setStatus('error')
      setErrorMessage('Please upload your resume (PDF required).')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    const resumeBase64 = await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const base64 = reader.result?.split(',')[1]
        resolve(base64 || '')
      }
      reader.onerror = reject
      reader.readAsDataURL(form.resumeFile)
    })

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      resumePdf: resumeBase64,
      resumeFileName: form.resumeFile.name,
      message: form.message.trim(),
      jobId: job?.id ?? '',
      jobTitle: job?.title ?? '',
    }

    try {
      const res = await fetch(formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
        mode: 'cors',
      })

      const text = await res.text()
      let data
      try {
        data = text ? JSON.parse(text) : {}
      } catch {
        setStatus('error')
        setErrorMessage(
          res.ok
            ? 'Invalid response from server.'
            : `Server error (${res.status}). The application script may not support POST—deploy JobApplication.gs with doPost handler.`
        )
        return
      }

      if (data.status === 'success') {
        setStatus('success')
        setForm({ ...defaultFormState })
      } else {
        setStatus('error')
        setErrorMessage(data.message || 'Failed to submit. Please try again.')
      }
    } catch (err) {
      setStatus('error')
      const msg = err?.message || ''
      setErrorMessage(
        msg.includes('fetch') || msg.includes('NetworkError')
          ? 'Cannot reach server. The Apps Script may not be deployed for POST, or there may be a network/CORS issue. Deploy JobApplication.gs as Web app (Anyone).'
          : 'Network error. Please check your connection and try again.'
      )
    }
  }

  function handleClose() {
    if (status === 'loading') return
    setStatus('idle')
    setErrorMessage('')
    setForm({ ...defaultFormState })
    onClose()
  }

  function clearResume() {
    setForm((prev) => ({ ...prev, resumeFile: null }))
    const input = document.getElementById('app-resume')
    if (input) input.value = ''
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className="absolute inset-0"
        aria-hidden="true"
        onClick={handleClose}
      />
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
          <h2 className="text-xl font-heading font-bold text-navy">
            Apply for {job?.title || 'Position'}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            disabled={status === 'loading'}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50"
            aria-label="Close"
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {status === 'success' && (
            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 flex items-start gap-3">
              <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-0.5" size={22} />
              <div>
                <p className="font-medium text-emerald-800">Application submitted!</p>
                <p className="text-emerald-700 text-sm mt-1">
                  We&apos;ve sent a confirmation to your email. Our team will review your application shortly.
                </p>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
              <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={22} />
              <div>
                <p className="font-medium text-red-800">Submission failed</p>
                <p className="text-red-700 text-sm mt-1">{errorMessage}</p>
              </div>
            </div>
          )}

          {status !== 'success' && (
            <>
              <div>
                <label htmlFor="app-name" className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name *
                </label>
                <input
                  id="app-name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="app-email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email *
                </label>
                <input
                  id="app-email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="app-phone" className="block text-sm font-medium text-slate-700 mb-2">
                  Phone *
                </label>
                <input
                  id="app-phone"
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label htmlFor="app-resume" className="block text-sm font-medium text-slate-700 mb-2">
                  <span className="flex items-center gap-2">
                    <FileText size={16} />
                    Resume (PDF) *
                  </span>
                </label>
                <input
                  id="app-resume"
                  name="resume"
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                  className="w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gold/20 file:text-navy file:font-medium file:cursor-pointer hover:file:bg-gold/30"
                />
                {form.resumeFile && (
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                    {form.resumeFile.name}
                    <button type="button" onClick={clearResume} className="text-red-500 hover:text-red-600">
                      Remove
                    </button>
                  </p>
                )}
                <p className="text-xs text-slate-500 mt-1">PDF only, max 5MB</p>
              </div>

              <div>
                <label htmlFor="app-message" className="block text-sm font-medium text-slate-700 mb-2">
                  Cover letter / Why do you want to join us? *
                </label>
                <textarea
                  id="app-message"
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none resize-none"
                  placeholder="Tell us about yourself and why you're interested in this role..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gold hover:bg-gold-light text-navy font-semibold rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Submit Application
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={status === 'loading'}
                  className="px-6 py-3.5 border border-slate-300 text-slate-600 font-medium rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </>
          )}

          {status === 'success' && (
            <button
              type="button"
              onClick={handleClose}
              className="w-full px-6 py-3.5 bg-gold hover:bg-gold-light text-navy font-semibold rounded-lg transition-colors"
            >
              Close
            </button>
          )}
        </form>
      </div>
    </div>
  )
}
