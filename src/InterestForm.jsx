import { useState } from 'react'
import { databases } from './lib/appwrite'
import { ID } from 'appwrite'

const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const COL_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID

export default function InterestForm() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await databases.createDocument(DB_ID, COL_ID, ID.unique(), {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
      })
      setSubmitted(true)
    } catch (err) {
      setError('Something went wrong. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.successIcon}>✓</div>
        <h2 style={styles.successTitle}>Thank you!</h2>
        <p style={styles.successText}>We've received your info and will be in touch soon.</p>
        <button style={styles.btn} onClick={() => { setSubmitted(false); setForm({ firstName: '', lastName: '', email: '', phone: '' }) }}>
          Submit another
        </button>
      </div>
    </div>
  )

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Get in Touch</h1>
        <p style={styles.subtitle}>Fill out the form below and we'll reach out to you shortly.</p>
        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>First Name</label>
            <input style={styles.input} name="firstName" value={form.firstName} onChange={handleChange} placeholder="Jane" required />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Last Name</label>
            <input style={styles.input} name="lastName" value={form.lastName} onChange={handleChange} placeholder="Doe" required />
          </div>
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Email Address</label>
          <input style={styles.input} name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@example.com" required />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Phone Number</label>
          <input style={styles.input} name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" />
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <button style={{ ...styles.btn, opacity: loading ? 0.7 : 1 }} onClick={handleSubmit} disabled={loading}>
          {loading ? 'Submitting…' : 'Submit'}
        </button>
      </div>
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f6f9', fontFamily: "'Segoe UI', sans-serif" },
  card: { background: '#fff', borderRadius: 12, padding: '40px 36px', width: '100%', maxWidth: 480, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' },
  title: { margin: '0 0 6px', fontSize: 24, fontWeight: 700, color: '#1a1a2e' },
  subtitle: { margin: '0 0 28px', fontSize: 14, color: '#6b7280' },
  row: { display: 'flex', gap: 16 },
  field: { display: 'flex', flexDirection: 'column', marginBottom: 18, flex: 1 },
  label: { fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 },
  input: { padding: '10px 14px', borderRadius: 8, border: '1.5px solid #e5e7eb', fontSize: 14, outline: 'none', color: '#111' },
  btn: { width: '100%', padding: '12px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer', marginTop: 8 },
  error: { color: '#ef4444', fontSize: 13, marginBottom: 8 },
  successIcon: { width: 56, height: 56, borderRadius: '50%', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, color: '#10b981', margin: '0 auto 16px' },
  successTitle: { textAlign: 'center', fontSize: 22, fontWeight: 700, color: '#1a1a2e', margin: '0 0 8px' },
  successText: { textAlign: 'center', fontSize: 14, color: '#6b7280', margin: '0 0 24px' },
}
```

---

**`.gitignore`**
```
node_modules
dist
.env
