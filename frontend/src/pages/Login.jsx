import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Eye, EyeOff, Lock, User, Shield, Briefcase, 
  ArrowRight, Loader2, Plus
} from 'lucide-react';
import loginBg from '../assets/login-bg.png';

export default function Login() {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [detectedRole, setDetectedRole] = useState(null);
  const [error, setError] = useState(null);
  const [signingIn, setSigningIn] = useState(false);
  
  const { login, mockLogin } = useAuth();
  const navigate = useNavigate();

  // Debounced role detection
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (employeeId.length >= 4) {
        // Check for known mock users first
        const mockRoles = {
          'ADMIN001': 'ADMIN',
          'EMP001': 'EMPLOYEE',
          'EMP002': 'EMPLOYEE'
        };
        
        if (mockRoles[employeeId]) {
          setDetectedRole(mockRoles[employeeId]);
        } else {
          // Try API call for non-mock users
          try {
            const res = await fetch(`/api/v1/auth/check-role?employeeId=${employeeId}`);
            if (res.ok) {
              const data = await res.json();
              setDetectedRole(data.role);
            } else {
              setDetectedRole(null);
            }
          } catch (err) {
            // Silent fail for development
            setDetectedRole(null);
          }
        }
      } else {
        setDetectedRole(null);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [employeeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSigningIn(true);
    setError(null);

    try {
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeId, password })
      });

      if (response.ok) {
        const data = await response.json();
        login(data);
        
        // Redirect based on role
        if (data.role === 'ADMIN') {
          navigate('/admin/dashboard');
        } else {
          navigate('/employee/dashboard');
        }
      } else {
        setError('Invalid Employee ID or Password');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    }
    
    setSigningIn(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 font-sans">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 scale-105 animate-pulse-slow"
        style={{ 
          backgroundImage: `url(${loginBg})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          filter: 'brightness(0.3) blur(2px)'
        }}
      />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-float opacity-50" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-[120px] animate-float-slow opacity-50" />

      <div className="w-full max-w-md p-8 relative z-10 anime-fade-in">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-emerald-500 to-blue-600 rounded-3xl shadow-2xl mb-6 relative group overflow-hidden">
             <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
             <div className="text-white font-black text-4xl relative z-10 flex items-center justify-center">
               <span className="animate-pulse">P</span>
             </div>
          </div>
          <h2 className="text-4xl font-black text-white tracking-tighter mb-2 drop-shadow-sm">
            PharmaDesk <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent italic">PRO</span>
          </h2>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.3em]">Institutional Single Sign-On</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-[2.5rem] border border-white/20 p-8 shadow-3xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Employee ID Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Employee ID</label>
                {detectedRole && (
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest anime-scale-up ${
                    detectedRole === 'ADMIN' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {detectedRole === 'ADMIN' ? <Shield className="w-3 h-3" /> : <Briefcase className="w-3 h-3" />}
                    {detectedRole}
                  </div>
                )}
              </div>
              <div className="relative group/input">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within/input:text-emerald-500 transition-colors" />
                <input 
                  type="text"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value.toUpperCase())}
                  placeholder="e.g. EMP001"
                  className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:bg-black/40 transition-all font-medium"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Security Key</label>
              <div className="relative group/input">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within/input:text-emerald-500 transition-colors" />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:bg-black/40 transition-all font-medium"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 anime-shake">
                <p className="text-red-400 text-xs font-bold flex items-center gap-2 uppercase tracking-tight">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={signingIn}
              className="w-full group bg-white hover:bg-emerald-500 text-slate-950 hover:text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden relative active:scale-[0.98]"
            >
              {signingIn ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign Into Dashboard
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
            Authorized Personnel Only <br />
            <span className="text-slate-600">Contact admin for Employee ID recovery</span>
          </p>
        </div>
      </div>
      
      {/* Visual Overlay Grains Removed for Stability */}
    </div>
  );
}
