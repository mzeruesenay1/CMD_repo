import { useState } from 'react'
import { databases } from './appwrite'
import { ID } from 'appwrite'

const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const COL_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f4f6f9',
    fontFamily: "'Segoe UI', sans-serif",
    padding: '24px',
    boxSizing: 'border-box',
  },
  card: {
    background: '#fff',
    borderRadius: '12px',
    padding: '40px 36px',
    width: '100%',
    maxWidth: '480px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    boxSizing: 'border-box',
  },
  title: { margin: '0 0 6px', fontSize: '24px', fontWeight: 700, color: '#1a1a2e' },
  subtitle: { margin: '0 0 28px', fontSize: '14px', color: '#6b7280' },
  row: { display: 'flex', gap: '16px' },
  field: { display: 'flex', flexDirection: 'column', marginBottom: '18px', flex: 1 },
  label: { fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' },
  input: {
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1.5px solid #e5e7eb',
    fontSize: '14px',
    outline: 'none',
    color: '#111',
    width: '100%',
    boxSizing: 'border-box',
  },
  btn: {
    width: '100%',
    padding: '12px',
    background: '#4f46e5',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: '8px',
  },
  error: { color: '#ef4444', fontSize: '13px', marginBottom: '10px' },
  successIcon: {
    width: '56px', height: '56px', borderRadius: '50%',
    background: '#ecfdf5', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: '26px', color: '#10b981',
    margin: '0 auto 16px',
  },
  successTitle: { textAlign: 'center', fontSize: '22px', fontWeight: 700, color: '#1a1a2e', margin: '0 0 8px' },
  successText: { textAlign: 'center', fontSize: '14px', color: '#6b7280', margin: '0 0 24px' },
}

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
      console.error(err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setSubmitted(false)
    setForm({ firstName: '', lastName: '', email: '', phone: '' })
  }

  if (submitted) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <div style={styles.successIcon}>✓</div>
          <h2 style={styles.successTitle}>Thank you!</h2>
          <p style={styles.successText}>We've received your info and will be in touch soon.</p>
          <button style={styles.btn} onClick={reset}>Submit another</button>
        </div>
      </div>
    )
  }

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
```

---

**`.gitignore`**
```
node_modules
dist
.env
```

---

That's **6 files total** — nothing extra. Here's what to do in Appwrite Sites:

1. Push these files to your GitHub repo
2. In Appwrite Sites, set:
   - **Framework:** Vite
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
3. Add these **environment variables** in the Sites dashboard:
```
   VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   VITE_APPWRITE_PROJECT_ID=xxxx
   VITE_APPWRITE_DATABASE_ID=xxxx
   VITE_APPWRITE_COLLECTION_ID=xxxx
