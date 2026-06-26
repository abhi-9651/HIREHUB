import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { MotionConfig, motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Mail, Lock, User, GraduationCap, ArrowRight, AlertCircle } from 'lucide-react'
import { Button, Card, Input } from '../../components'
import { getProfile, saveProfile, DEFAULT_PROFILE } from '../../utils/profileStorage'
import api from '../../utils/api'

export default function Login() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  
  // Decide starting mode (login or signup)
  const [isSignUp, setIsSignUp] = useState(false)

  // Inputs
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [college, setCollege] = useState('')
  const [degree, setDegree] = useState('')

  // Validation / Loading states
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Read URL query parameter for starting mode
    const mode = searchParams.get('mode')
    if (mode === 'signup') {
      setIsSignUp(true)
    } else {
      setIsSignUp(false)
    }
  }, [searchParams])

  const validateForm = () => {
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all required fields.')
      return false
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.')
      return false
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return false
    }
    if (isSignUp && !name.trim()) {
      setError('Please enter your full name.')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!validateForm()) return

    setIsLoading(true)
    
    try {
      if (isSignUp) {
        const response = await api.post('/auth/signup', {
          name: name.trim(),
          email: email.trim(),
          password: password,
          college: college.trim(),
          degree: degree.trim()
        });
        
        const { token, user } = response.data;
        
        localStorage.setItem('hirehub_session', JSON.stringify({
          email: user.email,
          name: user.name,
          token: token
        }));
        
        const profileRes = await api.get('/profile');
        saveProfile(profileRes.data);
      } else {
        const response = await api.post('/auth/login', {
          email: email.trim(),
          password: password
        });
        
        const { token, user } = response.data;
        
        localStorage.setItem('hirehub_session', JSON.stringify({
          email: user.email,
          name: user.name,
          token: token
        }));
        
        const profileRes = await api.get('/profile');
        saveProfile(profileRes.data);
      }

      navigate('/dashboard')
    } catch (err) {
      console.error('Auth error:', err);
      const errMsg = err.response?.data?.message || 'Authentication failed. Please check your credentials and try again.';
      setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  }

  const toggleMode = () => {
    setError('')
    setIsSignUp(!isSignUp)
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative flex min-h-screen items-center justify-center bg-[#0F172A] px-4 py-12 text-slate-50 overflow-hidden">
        {/* Glow Effects */}
        <div className="pointer-events-none absolute right-[10%] top-[10%] -z-0 size-[32rem] rounded-full bg-[#8B5CF6]/[0.08] blur-[120px]" />
        <div className="pointer-events-none absolute left-[10%] bottom-[10%] -z-0 size-[32rem] rounded-full bg-[#06B6D4]/[0.08] blur-[120px]" />

        <div className="w-full max-w-md z-10 space-y-8">
          <div className="text-center">
            <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4] shadow-lg shadow-purple-950/30 mb-4">
              <Sparkles className="size-7 text-white" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {isSignUp ? 'Create your profile' : 'Welcome back'}
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              {isSignUp 
                ? 'Join thousands of students accelerating their careers' 
                : 'Sign in to access your Career Command Center'}
            </p>
          </div>

          <Card className="border-white/10 bg-[#111827]/80 shadow-2xl backdrop-blur-xl p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex items-center gap-2 rounded-xl border border-red-500/25 bg-red-500/10 p-3.5 text-sm text-red-300"
                  >
                    <AlertCircle className="size-4 shrink-0 text-red-400" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {isSignUp && (
                    <motion.div
                      key="signup-fields"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4 overflow-hidden"
                    >
                      <Input
                        label="Full Name"
                        required
                        leftIcon={User}
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <Input
                        label="College / University"
                        leftIcon={GraduationCap}
                        placeholder="e.g. MMMUT Gorakhpur"
                        value={college}
                        onChange={(e) => setCollege(e.target.value)}
                      />
                      <Input
                        label="Degree / Major"
                        leftIcon={GraduationCap}
                        placeholder="e.g. B.Tech Computer Science"
                        value={degree}
                        onChange={(e) => setDegree(e.target.value)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <Input
                  label="Email Address"
                  required
                  type="email"
                  leftIcon={Mail}
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                  label="Password"
                  required
                  type="password"
                  leftIcon={Lock}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 mt-6 font-semibold"
                rightIcon={ArrowRight}
              >
                {isLoading 
                  ? 'Authenticating...' 
                  : isSignUp ? 'Create Free Profile' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 border-t border-white/[0.07] pt-5 text-center">
              <button
                type="button"
                onClick={toggleMode}
                className="text-sm font-semibold text-[#22D3EE] transition hover:text-[#06B6D4]"
              >
                {isSignUp 
                  ? 'Already have an account? Sign In' 
                  : "Don't have an account? Get Started Free"}
              </button>
            </div>
          </Card>
        </div>
      </div>
    </MotionConfig>
  )
}
