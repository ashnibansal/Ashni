import React, { useState, useEffect } from 'react';
import { User, ViewState, DesignRequest, Designer } from './types';
import { MOCK_DESIGNERS } from './constants';
import { analyzeJewelryImage, generateJewelryDesign } from './services/geminiService';
import { NavBar, BottomNav } from './components/NavBar';

// -- Page Components --

const LandingPage = ({ onGetStarted }: { onGetStarted: () => void }) => (
  <div className="flex flex-col min-h-screen bg-[#FDFCF8] pb-20 font-sans">
    <div className="relative h-[550px] overflow-hidden rounded-b-[3rem] shadow-2xl shadow-stone-900/10">
      <div className="absolute inset-0 bg-stone-900/20 z-10 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent z-10"></div>
      <img 
        src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
        alt="Luxury Jewelry" 
        className="w-full h-full object-cover animate-fade-in-slow scale-105"
      />
      <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white">
        <h1 className="text-5xl font-serif font-bold mb-4 tracking-wide leading-[1.1] drop-shadow-lg">
          Curate Your <br/><span className="text-amber-200 italic">Legacy.</span>
        </h1>
        <p className="text-lg text-stone-100 mb-8 font-light max-w-xs leading-relaxed opacity-90">
          Connect with India's finest artisans or craft your own masterpiece with AI.
        </p>
        <button 
          onClick={onGetStarted} 
          className="w-full bg-white text-stone-900 py-4 rounded-xl font-bold tracking-widest uppercase text-sm shadow-2xl hover:bg-amber-50 active:scale-[0.98] transition-all duration-300"
        >
          Begin Journey
        </button>
      </div>
    </div>

    <div className="p-6 -mt-8 relative z-30 space-y-4">
      <div className="bg-white rounded-2xl p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] backdrop-blur-sm border border-stone-50 transform hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center gap-4 mb-3">
              <div className="bg-amber-50 w-12 h-12 rounded-full flex items-center justify-center text-amber-700 text-xl border border-amber-100">
                <i className="fa-solid fa-gem"></i>
              </div>
              <h3 className="font-serif font-bold text-xl text-stone-900">Expert Artisans</h3>
          </div>
          <p className="text-stone-500 text-sm leading-relaxed font-light">Discover top-tier designers from Jaipur to Mumbai. Custom pieces made just for you.</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] backdrop-blur-sm border border-stone-50 transform hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center gap-4 mb-3">
              <div className="bg-stone-100 w-12 h-12 rounded-full flex items-center justify-center text-stone-700 text-xl border border-stone-200">
                 <i className="fa-solid fa-wand-magic-sparkles"></i>
              </div>
              <h3 className="font-serif font-bold text-xl text-stone-900">AI Design Studio</h3>
          </div>
          <p className="text-stone-500 text-sm leading-relaxed font-light">Visualize intricate designs instantly before commissioning the real piece.</p>
      </div>
    </div>
  </div>
);

const DesignerList = ({ designers }: { designers: Designer[] }) => (
  <div className="p-4 pb-32 space-y-8 bg-[#FDFCF8] min-h-screen">
    <div className="flex justify-between items-end px-2 pt-4">
      <div>
        <h2 className="text-4xl font-bold text-stone-900 font-serif">Artisans</h2>
        <p className="text-stone-400 text-xs font-bold tracking-widest uppercase mt-2">Curated list of masters</p>
      </div>
    </div>
    
    {designers.map((designer) => (
      <div key={designer.id} className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-stone-200/40 border border-stone-100 flex flex-col group transition-all duration-300 hover:shadow-2xl">
        <div className="relative h-80 overflow-hidden">
          <img 
            src={designer.imageUrl} 
            alt={designer.name} 
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>
          
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold shadow-sm flex items-center gap-1.5 border border-white/20">
              {designer.rating} <i className="fa-solid fa-star text-amber-500 text-[10px]"></i>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
             <div className="flex items-center gap-2 text-amber-200 text-xs font-bold tracking-wider uppercase mb-1">
                <i className="fa-solid fa-location-dot"></i>
                {designer.location}
            </div>
             <h3 className="text-3xl font-serif font-bold mb-1">{designer.name}</h3>
             <p className="text-stone-300 text-sm font-light line-clamp-2">{designer.description}</p>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-[10px] font-bold tracking-widest text-stone-500 uppercase border border-stone-200 px-3 py-1 rounded-full">{designer.specialty}</span>
            <span className="text-stone-900 font-bold font-serif text-lg">{designer.priceRange}</span>
          </div>
          
          <button 
            onClick={() => {
                const btn = document.getElementById(`book-btn-${designer.id}`);
                if(btn) {
                    btn.innerHTML = '<i class="fa-solid fa-check"></i> Request Sent';
                    btn.classList.add('bg-green-700', 'border-green-700');
                    setTimeout(() => {
                        btn.innerHTML = 'Book Consultation';
                        btn.classList.remove('bg-green-700', 'border-green-700');
                    }, 3000);
                }
            }}
            id={`book-btn-${designer.id}`}
            className="w-full bg-stone-900 text-white py-4 rounded-xl text-sm font-bold tracking-widest uppercase hover:bg-stone-800 transition-all shadow-lg shadow-stone-900/20 active:scale-[0.98] border border-stone-900"
          >
              Book Consultation
          </button>
        </div>
      </div>
    ))}
  </div>
);

const PlansPage = ({ onSelectPlan }: { onSelectPlan: (plan: string, price: string) => void }) => (
  <div className="p-4 pb-32 bg-[#FDFCF8] min-h-screen">
    <div className="text-center mb-10 mt-8">
       <span className="text-amber-600 font-bold tracking-widest text-xs uppercase">Unlock Potential</span>
       <h2 className="text-3xl font-bold font-serif text-stone-900 mt-2 mb-3">Premium Access</h2>
       <p className="text-stone-500 text-sm max-w-xs mx-auto leading-relaxed font-light">Choose a plan that suits your creative needs.</p>
    </div>

    <div className="space-y-6 max-w-sm mx-auto">
      {/* Basic Plan */}
      <button 
        onClick={() => onSelectPlan('Platinum Plan', '₹199')}
        className="w-full text-left bg-white border border-stone-100 rounded-3xl p-6 shadow-lg shadow-stone-200/50 relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 group active:scale-[0.99]"
      >
        <div className="flex justify-between items-start mb-6">
            <div>
                <h3 className="text-xl font-serif font-bold text-stone-800">Platinum</h3>
                <div className="flex items-baseline mt-2">
                    <span className="text-3xl font-bold text-stone-900 font-serif">₹199</span>
                    <span className="text-stone-400 text-sm ml-1">/mo</span>
                </div>
            </div>
            <div className="bg-stone-100 text-stone-500 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase">Starter</div>
        </div>
        <div className="space-y-3">
          <li className="flex items-center text-sm text-stone-600"><i className="fa-solid fa-image text-stone-400 w-6"></i> 5 AI Designs / month</li>
          <li className="flex items-center text-sm text-stone-600"><i className="fa-solid fa-gauge-simple text-stone-400 w-6"></i> Standard Speed</li>
          <li className="flex items-center text-sm text-stone-600"><i className="fa-regular fa-comments text-stone-400 w-6"></i> Limited Conversations</li>
        </div>
        <div className="mt-6 pt-4 border-t border-stone-100 text-center">
             <span className="text-xs font-bold text-stone-400 group-hover:text-stone-900 transition-colors uppercase tracking-widest">Select Plan</span>
        </div>
      </button>

      {/* Standard Plan */}
      <button 
        onClick={() => onSelectPlan('Silver Plan', '₹399')}
        className="w-full text-left bg-gradient-to-br from-stone-800 to-stone-900 border border-stone-700 rounded-3xl p-6 shadow-xl shadow-stone-900/20 relative overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-1 group active:scale-[0.99]"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10">
            <i className="fa-solid fa-star text-6xl text-white"></i>
        </div>
        <div className="flex justify-between items-start mb-6 relative z-10">
            <div>
                <h3 className="text-xl font-serif font-bold text-white">Silver</h3>
                <div className="flex items-baseline mt-2">
                    <span className="text-3xl font-bold text-white font-serif">₹399</span>
                    <span className="text-stone-400 text-sm ml-1">/mo</span>
                </div>
            </div>
            <div className="bg-amber-500 text-white px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-lg shadow-amber-500/30">Popular</div>
        </div>
        <div className="space-y-3 relative z-10">
          <li className="flex items-center text-sm text-stone-300"><i className="fa-solid fa-image text-amber-500 w-6"></i> 50 AI Designs / month</li>
          <li className="flex items-center text-sm text-stone-300"><i className="fa-solid fa-bolt text-amber-500 w-6"></i> Faster Generations</li>
          <li className="flex items-center text-sm text-stone-300"><i className="fa-regular fa-comments text-amber-500 w-6"></i> Priority Chat Support</li>
        </div>
        <div className="mt-6 pt-4 border-t border-stone-700 text-center relative z-10">
             <span className="text-xs font-bold text-amber-500 group-hover:text-amber-400 transition-colors uppercase tracking-widest">Select Plan</span>
        </div>
      </button>

      {/* Premium Plan */}
      <button 
        onClick={() => onSelectPlan('Gold Plan', '₹599')}
        className="w-full text-left bg-white border-2 border-amber-100 rounded-3xl p-6 shadow-xl shadow-amber-100/50 relative overflow-hidden transition-all hover:shadow-2xl hover:border-amber-300 hover:-translate-y-1 group active:scale-[0.99]"
      >
        <div className="flex justify-between items-start mb-6">
            <div>
                <h3 className="text-xl font-serif font-bold text-amber-900">Gold</h3>
                <div className="flex items-baseline mt-2">
                    <span className="text-3xl font-bold text-amber-600 font-serif">₹599</span>
                    <span className="text-stone-400 text-sm ml-1">/mo</span>
                </div>
            </div>
            <div className="bg-amber-100 text-amber-800 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase">Elite</div>
        </div>
        <div className="space-y-3">
          <li className="flex items-center text-sm text-stone-700"><i className="fa-solid fa-infinity text-amber-600 w-6"></i> Unlimited AI Designs</li>
          <li className="flex items-center text-sm text-stone-700"><i className="fa-solid fa-bolt-lightning text-amber-600 w-6"></i> Instant Generations</li>
          <li className="flex items-center text-sm text-stone-700"><i className="fa-solid fa-video text-amber-600 w-6"></i> Video Consultations</li>
        </div>
         <div className="mt-6 pt-4 border-t border-amber-100 text-center">
             <span className="text-xs font-bold text-amber-700 group-hover:text-amber-800 transition-colors uppercase tracking-widest">Select Plan</span>
        </div>
      </button>
    </div>
  </div>
);

const PaymentPage = ({ plan, price, onCancel, onSuccess }: { plan: string, price: string, onCancel: () => void, onSuccess: () => void }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div className="p-6 pb-24 min-h-screen bg-[#FDFCF8] flex flex-col font-sans">
       <div className="mb-8 pt-4">
          <button onClick={onCancel} className="text-stone-400 hover:text-stone-900 transition-colors flex items-center gap-2 text-sm font-bold">
             <i className="fa-solid fa-arrow-left"></i> Back
          </button>
       </div>
       
       <h2 className="text-3xl font-serif font-bold text-stone-900 mb-8">Checkout</h2>
       
       <div className="bg-white p-8 rounded-3xl shadow-lg shadow-stone-200/40 border border-stone-100 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-full -mr-12 -mt-12 opacity-50"></div>
          <div className="flex justify-between items-center mb-1 relative z-10">
            <h3 className="text-xl font-bold text-stone-800 font-serif">{plan}</h3>
            <span className="text-2xl font-bold text-amber-600 font-serif">{price}</span>
          </div>
          <p className="text-stone-400 text-sm font-medium relative z-10">Monthly subscription</p>
       </div>

       <form onSubmit={handlePayment} className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">Card Holder</label>
            <input type="text" required placeholder="Name on card" className="w-full bg-white border border-stone-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none transition-all placeholder-stone-300 text-stone-800 font-medium" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">Card Number</label>
            <div className="relative">
               <input type="text" required placeholder="0000 0000 0000 0000" className="w-full bg-white border border-stone-200 rounded-xl px-5 py-4 pl-12 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none transition-all placeholder-stone-300 text-stone-800 font-medium font-mono" />
               <i className="fa-regular fa-credit-card absolute left-5 top-5 text-stone-400"></i>
            </div>
          </div>
          <div className="flex gap-4">
             <div className="flex-1 space-y-1">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">Expiry</label>
                <input type="text" required placeholder="MM/YY" className="w-full bg-white border border-stone-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none transition-all placeholder-stone-300 text-stone-800 font-medium text-center" />
             </div>
             <div className="flex-1 space-y-1">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">CVV</label>
                <input type="password" required placeholder="123" className="w-full bg-white border border-stone-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none transition-all placeholder-stone-300 text-stone-800 font-medium text-center" />
             </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold mt-4 shadow-xl shadow-stone-900/30 hover:bg-stone-800 hover:shadow-2xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 active:scale-[0.98] active:shadow-sm"
          >
             {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : `Pay ${price}`}
          </button>
       </form>

       <div className="mt-8 text-center">
         <p className="text-xs text-stone-400 flex items-center justify-center gap-2">
           <i className="fa-solid fa-lock text-stone-300"></i> SSL Encrypted Transaction
         </p>
       </div>
    </div>
  );
};

const AuthForm = ({ type, onComplete, onSwitch }: { type: 'login' | 'register' | 'forgot', onComplete: (u: User) => void, onSwitch: (view: ViewState) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === 'forgot') {
        if (!email) {
            setError("Please enter your email");
            return;
        }
        setResetSent(true);
        return;
    }

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    // Simulate Auth
    const user: User = {
      id: Date.now().toString(),
      name: name || email.split('@')[0],
      email: email
    };
    localStorage.setItem('aurai_user', JSON.stringify(user));
    onComplete(user);
  };

  if (type === 'forgot') {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDFCF8] px-6">
            <div className="w-full max-w-sm bg-white p-8 rounded-3xl shadow-xl shadow-stone-200/40 border border-stone-50">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-100">
                        <i className="fa-solid fa-key text-amber-600 text-2xl"></i>
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-stone-900">Recovery</h2>
                    <p className="text-stone-500 mt-2 text-sm font-light">Enter your email to receive a reset link</p>
                </div>

                {!resetSent ? (
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {error && <div className="text-red-500 text-center text-xs bg-red-50 py-2 rounded-lg border border-red-100">{error}</div>}
                        <div>
                            <input
                                type="email"
                                required
                                className="w-full px-5 py-4 rounded-xl bg-stone-50 border border-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-stone-800 placeholder-stone-400 font-medium"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-4 px-4 bg-stone-900 text-white font-bold rounded-xl shadow-lg shadow-stone-900/20 hover:bg-stone-800 transition-all transform active:scale-[0.98] hover:-translate-y-0.5 mt-2"
                        >
                            Send Reset Link
                        </button>
                    </form>
                ) : (
                    <div className="text-center bg-green-50 p-6 rounded-2xl border border-green-100 animate-fade-in">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <i className="fa-solid fa-check text-green-600 text-xl"></i>
                        </div>
                        <h3 className="text-lg font-bold text-green-800">Check your inbox</h3>
                        <p className="text-sm text-green-700 mt-1">We've sent you instructions to reset your password.</p>
                    </div>
                )}

                <div className="text-center mt-8">
                    <button onClick={() => onSwitch(ViewState.LOGIN)} className="text-xs text-stone-400 hover:text-stone-900 font-bold transition-colors uppercase tracking-wider">
                        <i className="fa-solid fa-arrow-left mr-2"></i> Back to Sign In
                    </button>
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFCF8] px-6">
      <div className="w-full max-w-sm bg-white p-8 rounded-3xl shadow-xl shadow-stone-200/40 border border-stone-50">
        <div className="text-center mb-10">
          <i className="fa-regular fa-gem text-amber-600 text-4xl mb-6 inline-block drop-shadow-sm"></i>
          <h2 className="text-3xl font-serif font-bold text-stone-900 tracking-tight">
            {type === 'login' ? 'Welcome Back' : 'Join AurAI'}
          </h2>
          <p className="text-stone-400 mt-2 text-sm font-light">
            {type === 'login' ? 'Sign in to continue your legacy' : 'Create an account to begin'}
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && <div className="text-red-500 text-center text-xs bg-red-50 py-2 rounded-lg border border-red-100">{error}</div>}
          
          {type === 'register' && (
            <div>
              <input
                type="text"
                required
                className="w-full px-5 py-4 rounded-xl bg-stone-50 border border-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-stone-800 placeholder-stone-400 font-medium"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          
          <div>
            <input
              type="email"
              required
              className="w-full px-5 py-4 rounded-xl bg-stone-50 border border-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-stone-800 placeholder-stone-400 font-medium"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <input
              type="password"
              required
              className="w-full px-5 py-4 rounded-xl bg-stone-50 border border-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-stone-800 placeholder-stone-400 font-medium"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {type === 'login' && (
              <div className="flex justify-end">
                  <button type="button" onClick={() => onSwitch(ViewState.FORGOT_PASSWORD)} className="text-xs text-amber-600 font-bold hover:text-amber-700 transition-colors">
                      Forgot Password?
                  </button>
              </div>
          )}

          <button
            type="submit"
            className="w-full py-4 px-4 bg-stone-900 text-white font-bold rounded-xl shadow-lg shadow-stone-900/20 hover:bg-stone-800 transition-all transform active:scale-[0.98] hover:-translate-y-0.5 mt-6 tracking-wide"
          >
            {type === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="text-center mt-8 pt-6 border-t border-stone-100">
          <p className="text-xs text-stone-400 mb-3">
              {type === 'login' ? "New to AurAI?" : "Already have an account?"}
          </p>
          <button 
            onClick={() => onSwitch(type === 'login' ? ViewState.REGISTER : ViewState.LOGIN)} 
            className="text-sm text-stone-900 font-bold hover:text-amber-600 transition-colors"
          >
            {type === 'login' ? "Create an account" : "Sign in here"}
          </button>
        </div>
      </div>
    </div>
  );
};

const AITool = ({ onSave }: { onSave: (design: DesignRequest) => void }) => {
  const [activeTab, setActiveTab] = useState<'analyze' | 'generate'>('generate');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!preview) return;
    setLoading(true);
    setResult(null);
    try {
      const analysis = await analyzeJewelryImage(preview);
      setResult(analysis);
    } catch (e) {
      alert("Failed to analyze image");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    setResult(null);
    setResultImage(null);
    try {
      const response = await generateJewelryDesign(prompt);
      setResult(response.text);
      if (response.imageUrl) setResultImage(response.imageUrl);
    } catch (e) {
      alert("Failed to generate design");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!result) return;
    const newDesign: DesignRequest = {
      id: Date.now().toString(),
      type: activeTab === 'analyze' ? 'analysis' : 'generation',
      title: activeTab === 'analyze' ? 'Jewelry Analysis' : 'Custom AI Design',
      description: activeTab === 'analyze' ? 'Image Analysis' : prompt,
      aiResponse: result,
      imageUrl: activeTab === 'analyze' ? (preview || undefined) : resultImage,
      createdAt: Date.now()
    };
    onSave(newDesign);
    alert("Saved to Profile!");
  };

  return (
    <div className="p-4 pb-32 bg-[#FDFCF8] min-h-screen">
      <div className="bg-white rounded-[2rem] shadow-xl shadow-stone-200/50 overflow-hidden border border-stone-100">
        <div className="flex border-b border-stone-100">
          <button
            onClick={() => setActiveTab('generate')}
            className={`flex-1 py-6 text-xs font-bold tracking-widest uppercase transition-all ${activeTab === 'generate' ? 'bg-amber-50/50 text-amber-900 border-b-2 border-amber-600' : 'text-stone-400 hover:bg-stone-50 hover:text-stone-600'}`}
          >
            Create
          </button>
          <button
            onClick={() => setActiveTab('analyze')}
            className={`flex-1 py-6 text-xs font-bold tracking-widest uppercase transition-all ${activeTab === 'analyze' ? 'bg-amber-50/50 text-amber-900 border-b-2 border-amber-600' : 'text-stone-400 hover:bg-stone-50 hover:text-stone-600'}`}
          >
            Analyze
          </button>
        </div>

        <div className="p-8">
          {activeTab === 'analyze' && (
            <div className="space-y-6">
              <div className="aspect-square bg-stone-50 border-2 border-dashed border-stone-200 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden transition-all hover:bg-stone-100 hover:border-stone-300 group cursor-pointer">
                <input type="file" onChange={handleFileChange} accept="image/*" className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer" />
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg shadow-stone-200 mb-4 group-hover:scale-110 transition-transform duration-300">
                        <i className="fa-solid fa-camera text-3xl text-stone-300 group-hover:text-amber-500 transition-colors"></i>
                    </div>
                    <p className="text-xs font-bold text-stone-400 uppercase tracking-widest group-hover:text-stone-600">Upload Photo</p>
                  </>
                )}
              </div>
              <button 
                onClick={handleAnalyze} 
                disabled={!preview || loading}
                className="w-full py-4 bg-stone-900 text-white rounded-xl font-bold disabled:opacity-50 shadow-lg shadow-stone-900/20 hover:bg-stone-800 transition-all"
              >
                {loading ? <span className="flex items-center justify-center gap-2"><i className="fa-solid fa-circle-notch fa-spin"></i> Analyzing...</span> : 'Analyze Jewelry'}
              </button>
            </div>
          )}

          {activeTab === 'generate' && (
            <div className="space-y-6">
              <div>
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2 ml-1">Vision Description</label>
                  <textarea 
                    rows={4}
                    className="w-full border border-stone-200 bg-stone-50 rounded-2xl p-5 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none resize-none placeholder-stone-400 transition-all font-medium text-stone-700"
                    placeholder="E.g. A vintage gold ring with an oval emerald surrounded by small diamonds..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  ></textarea>
              </div>
              <button 
                onClick={handleGenerate} 
                disabled={!prompt || loading}
                className="w-full py-4 bg-stone-900 text-white rounded-xl font-bold disabled:opacity-50 shadow-lg shadow-stone-900/20 hover:bg-stone-800 transition-all hover:-translate-y-0.5 active:scale-[0.98]"
              >
                {loading ? <span className="flex items-center justify-center gap-2"><i className="fa-solid fa-wand-magic-sparkles fa-flip"></i> Designing...</span> : 'Generate Design'}
              </button>
            </div>
          )}

          {(result || resultImage) && (
            <div className="mt-8 pt-8 border-t border-stone-100 animate-fade-in">
              <h3 className="text-sm font-bold text-stone-900 mb-4 font-serif">AI Analysis Result</h3>
              <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
                {resultImage && <div className="rounded-xl overflow-hidden shadow-md mb-6"><img src={resultImage} className="w-full object-cover" /></div>}
                <div className="whitespace-pre-wrap text-sm text-stone-600 leading-loose font-light">{result}</div>
                <button onClick={handleSave} className="mt-6 w-full py-4 border border-stone-200 text-stone-600 font-bold rounded-xl hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all">
                  <i className="fa-regular fa-bookmark mr-2"></i> Save to Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProfilePage = ({ savedDesigns, onDelete, user, onLogout }: { savedDesigns: DesignRequest[], onDelete: (id: string) => void, user: User, onLogout: () => void }) => (
  <div className="p-4 pb-32 bg-[#FDFCF8] min-h-screen">
    <div className="bg-white rounded-3xl p-6 shadow-lg shadow-stone-200/50 border border-stone-100 mb-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 text-amber-800 flex items-center justify-center text-2xl font-bold border-4 border-stone-50 shadow-inner">
            {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
            <h2 className="text-xl font-bold text-stone-900 font-serif">{user.name}</h2>
            <p className="text-[10px] text-stone-400 font-bold tracking-widest uppercase mt-1">{user.email}</p>
        </div>
      </div>
      <button onClick={onLogout} className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 hover:text-red-500 hover:bg-red-50 transition-colors">
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
      </button>
    </div>

    <div className="flex items-center justify-between mb-6 px-2">
        <h3 className="text-2xl font-bold text-stone-900 font-serif">Saved Designs</h3>
        <span className="text-[10px] font-bold text-stone-400 bg-stone-100 px-3 py-1 rounded-full">{savedDesigns.length} ITEMS</span>
    </div>
    
    {savedDesigns.length === 0 ? (
      <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-200">
        <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4">
             <i className="fa-regular fa-folder-open text-2xl text-stone-300"></i>
        </div>
        <p className="text-stone-400 font-medium text-sm">No designs saved yet.</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 gap-6">
        {savedDesigns.map((design) => (
          <div key={design.id} className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-stone-200/30 border border-stone-100 group hover:shadow-xl transition-all">
             {design.imageUrl && (
                <div className="h-56 w-full bg-stone-100 relative overflow-hidden">
                    <img src={design.imageUrl} alt={design.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                     <span className={`absolute top-4 left-4 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm backdrop-blur-md ${design.type === 'generation' ? 'bg-white/90 text-purple-900' : 'bg-white/90 text-blue-900'} uppercase tracking-wider`}>
                        {design.type === 'generation' ? 'AI Design' : 'Analysis'}
                     </span>
                </div>
             )}
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                 <h4 className="font-serif font-bold text-lg text-stone-900">{design.title}</h4>
                 <button onClick={() => onDelete(design.id)} className="text-stone-300 hover:text-red-500 transition-colors px-2">
                    <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
              <p className="text-xs text-stone-500 mb-4 leading-relaxed line-clamp-2 font-light">{design.aiResponse}</p>
              <div className="flex items-center justify-between border-t border-stone-50 pt-4">
                  <div className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">
                      {new Date(design.createdAt).toLocaleDateString()}
                  </div>
                  <button className="text-xs font-bold text-stone-900 hover:text-amber-600 transition-colors">
                      View Details <i className="fa-solid fa-arrow-right ml-1 text-[10px]"></i>
                  </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.LANDING);
  const [user, setUser] = useState<User | null>(null);
  const [savedDesigns, setSavedDesigns] = useState<DesignRequest[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<{name: string, price: string} | null>(null);

  // Load initial state
  useEffect(() => {
    const storedUser = localStorage.getItem('aurai_user');
    if (storedUser) {
        setUser(JSON.parse(storedUser));
    }

    const storedDesigns = localStorage.getItem('aurai_designs');
    if (storedDesigns) setSavedDesigns(JSON.parse(storedDesigns));
  }, []);

  // Save designs when changed
  useEffect(() => {
    localStorage.setItem('aurai_designs', JSON.stringify(savedDesigns));
  }, [savedDesigns]);

  const handleAuthComplete = (newUser: User) => {
    setUser(newUser);
    setCurrentView(ViewState.HOME);
  };

  const handleLogout = () => {
    localStorage.removeItem('aurai_user');
    setUser(null);
    setCurrentView(ViewState.LANDING);
  };

  const saveDesign = (design: DesignRequest) => {
    setSavedDesigns([design, ...savedDesigns]);
  };

  const deleteDesign = (id: string) => {
    if (confirm("Delete this design?")) {
      setSavedDesigns(savedDesigns.filter(d => d.id !== id));
    }
  };

  const handlePlanSelection = (plan: string, price: string) => {
      setSelectedPlan({ name: plan, price });
      setCurrentView(ViewState.PAYMENT);
  };

  const handlePaymentSuccess = () => {
      alert("Payment Successful! Welcome to Premium.");
      setCurrentView(ViewState.PROFILE);
      setSelectedPlan(null);
  }

  const renderContent = () => {
    switch (currentView) {
      case ViewState.LANDING:
        return <LandingPage onGetStarted={() => setCurrentView(user ? ViewState.HOME : ViewState.LOGIN)} />;
      case ViewState.LOGIN:
        return <AuthForm type="login" onComplete={handleAuthComplete} onSwitch={(view) => setCurrentView(view)} />;
      case ViewState.REGISTER:
        return <AuthForm type="register" onComplete={handleAuthComplete} onSwitch={(view) => setCurrentView(view)} />;
      case ViewState.FORGOT_PASSWORD:
        return <AuthForm type="forgot" onComplete={handleAuthComplete} onSwitch={(view) => setCurrentView(view)} />;
      case ViewState.HOME:
        return <DesignerList designers={MOCK_DESIGNERS} />;
      case ViewState.AI_TOOL:
        return <AITool onSave={saveDesign} />;
      case ViewState.PLANS:
        return <PlansPage onSelectPlan={handlePlanSelection} />;
      case ViewState.PAYMENT:
        return selectedPlan ? (
            <PaymentPage 
                plan={selectedPlan.name} 
                price={selectedPlan.price} 
                onCancel={() => setCurrentView(ViewState.PLANS)} 
                onSuccess={handlePaymentSuccess}
            />
        ) : <PlansPage onSelectPlan={handlePlanSelection} />;
      case ViewState.PROFILE:
        return user ? <ProfilePage user={user} savedDesigns={savedDesigns} onDelete={deleteDesign} onLogout={handleLogout} /> : <AuthForm type="login" onComplete={handleAuthComplete} onSwitch={(view) => setCurrentView(view)} />;
      default:
        return <LandingPage onGetStarted={() => setCurrentView(ViewState.LOGIN)} />;
    }
  };

  return (
    // App Container - Simulating a mobile app wrapper
    <div className="bg-[#E5E4E0] min-h-screen font-sans flex justify-center items-center py-0 sm:py-8">
      <div className="w-full max-w-[420px] bg-[#FDFCF8] h-[100vh] sm:h-[850px] sm:rounded-[3rem] shadow-2xl shadow-stone-900/20 relative overflow-hidden flex flex-col border-0 sm:border-8 border-stone-900 ring-4 ring-stone-900/10">
        {/* Dynamic Island Notch Simulation (Desktop only) */}
        <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-stone-900 rounded-b-2xl z-[60]"></div>
        
        <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar bg-[#FDFCF8]">
            <NavBar user={user} setView={setCurrentView} onLogout={handleLogout} currentView={currentView} />
            
            <main className="animate-fade-in">
            {renderContent()}
            </main>
        </div>
        
        {user && currentView !== ViewState.LANDING && currentView !== ViewState.LOGIN && currentView !== ViewState.REGISTER && currentView !== ViewState.FORGOT_PASSWORD && currentView !== ViewState.PAYMENT && (
          <BottomNav user={user} setView={setCurrentView} onLogout={handleLogout} currentView={currentView} />
        )}
      </div>
    </div>
  );
}