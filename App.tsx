import React, { useState, useEffect } from 'react';
import { 
  Leaf, 
  ShieldCheck, 
  Zap, 
  Heart, 
  Menu, 
  X, 
  CheckCircle, 
  ArrowRight,
  Microscope,
  Clock,
  MessageCircle,
  Star,
  ChevronRight
} from 'lucide-react';

// --- Components ---

/**
 * Brand Logo Component
 * 
 * GUIA PARA O USUÁRIO:
 * Este componente busca o arquivo 'logo.png' na sua pasta 'public'.
 * Certifique-se de que o arquivo existe e tem fundo transparente.
 */
const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`relative ${className}`}>
    <img 
      src="/logo.png" 
      alt="Mini Flora Logo" 
      className="w-32 md:w-40 h-auto object-contain select-none"
      onError={(e) => {
        // Fallback apenas para você saber se a imagem não carregou
        e.currentTarget.style.display = 'none';
        e.currentTarget.parentElement?.classList.add('bg-gray-200', 'flex', 'items-center', 'justify-center', 'text-xs', 'text-gray-500', 'p-2');
        if(e.currentTarget.parentElement) e.currentTarget.parentElement.innerText = "Logo não encontrado (adicione logo.png na pasta public)";
      }}
    />
  </div>
);

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick 
}: { 
  children?: React.ReactNode, 
  variant?: 'primary' | 'secondary' | 'outline' | 'text', 
  className?: string,
  onClick?: () => void
}) => {
  const baseStyles = "font-sans font-bold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 transform active:scale-95";
  
  const variants = {
    primary: "bg-brand-orange text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20 hover:shadow-xl",
    secondary: "bg-brand-blue text-white hover:bg-blue-900 shadow-md",
    outline: "border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white",
    text: "text-brand-blue hover:bg-blue-50 px-4 py-2"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

const SectionHeading = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-12 text-center max-w-3xl mx-auto px-4">
    <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-blue mb-4">
      {title}
    </h2>
    {subtitle && (
      <p className="text-lg text-slate-600 font-sans leading-relaxed">
        {subtitle}
      </p>
    )}
  </div>
);

const Card: React.FC<{ children?: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-100 p-6 md:p-8 hover:shadow-md transition-all duration-300 ${className}`}>
    {children}
  </div>
);

// --- Sections ---

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Logo />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <button onClick={() => scrollToSection('benefits')} className="text-brand-blue font-medium hover:text-brand-orange transition-colors">Benefícios</button>
          <button onClick={() => scrollToSection('science')} className="text-brand-blue font-medium hover:text-brand-orange transition-colors">Ciência</button>
          <button onClick={() => scrollToSection('living')} className="text-brand-blue font-medium hover:text-brand-orange transition-colors">Alimento Vivo</button>
          <Button variant="primary" className="py-2.5 px-5 text-sm rounded-full" onClick={() => scrollToSection('contact')}>
            Comprar Agora
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-brand-blue p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-slate-100 p-6 flex flex-col gap-4 animate-in slide-in-from-top-5">
          <button onClick={() => scrollToSection('benefits')} className="text-left text-lg font-medium text-brand-blue py-2 border-b border-slate-50">Benefícios</button>
          <button onClick={() => scrollToSection('science')} className="text-left text-lg font-medium text-brand-blue py-2 border-b border-slate-50">Ciência</button>
          <button onClick={() => scrollToSection('living')} className="text-left text-lg font-medium text-brand-blue py-2 border-b border-slate-50">Alimento Vivo</button>
          <Button variant="primary" className="w-full justify-center mt-2" onClick={() => scrollToSection('contact')}>
            Falar no WhatsApp
          </Button>
        </div>
      )}
    </header>
  );
};

const Hero = () => {
  return (
    <section className="pt-32 pb-16 md:pt-48 md:pb-32 bg-brand-cream relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full translate-x-1/3 -translate-y-1/4 opacity-50 blur-3xl pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="order-2 md:order-1 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white border border-brand-green/20 text-brand-green px-4 py-1.5 rounded-full text-sm font-bold mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
            100% Orgânico e Fresco
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-brand-blue leading-[1.1] mb-6">
            Pequenos no Tamanho, <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-red-500">Gigantes</span> na Nutrição.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-lg">
            A forma mais concentrada de vitaminas e antioxidantes que você pode consumir. Direto da nossa horta urbana para sua mesa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="rounded-full px-8">
              <MessageCircle size={20} />
              Pedir Cardápio
            </Button>
            <Button variant="text" onClick={() => document.getElementById('science')?.scrollIntoView({ behavior: 'smooth' })} className="group">
              Como funciona
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          <div className="mt-12 flex items-center gap-4 text-sm text-slate-500 font-medium">
             <div className="flex -space-x-3">
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                   <img src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${30 + i}.jpg`} alt="User" className="w-full h-full object-cover" />
                 </div>
               ))}
             </div>
             <div>
               <div className="flex text-brand-orange mb-0.5">
                 {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
               </div>
               <p>+500 Clientes Satisfeitos</p>
             </div>
          </div>
        </div>
        
        <div className="order-1 md:order-2 relative">
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-[6px] border-white transform rotate-1 hover:rotate-0 transition-transform duration-700 hover:shadow-orange-500/10">
            {/* 
              IMAGEM HERO 
              Nome do arquivo: hero-image.jpg
            */}
            <img 
              src="/hero-image.jpg" 
              alt="Microverdes frescos e vibrantes" 
              className="w-full h-auto object-cover scale-105 hover:scale-100 transition-transform duration-1000 bg-slate-200"
              onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1533622597524-a1215e26c0a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" }}
            />
            {/* Overlay card */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-5 rounded-xl shadow-lg border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-2.5 rounded-full text-brand-green">
                  <Leaf size={24} />
                </div>
                <div>
                  <p className="font-bold text-brand-blue leading-tight">Colhido hoje</p>
                  <p className="text-xs text-slate-500">Máximo frescor garantido</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-brand-orange rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-brand-green rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        </div>
      </div>
    </section>
  );
};

const ValueProposition = () => {
  return (
    <section id="science" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading 
          title="Por que Microverdes?" 
          subtitle="Ciência comprovada. Não é apenas uma tendência, é uma necessidade nutricional."
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="grid gap-6">
            <Card className="flex flex-col sm:flex-row gap-5 items-start border-l-4 border-l-brand-green hover:translate-x-2 transition-transform duration-300">
              <div className="bg-brand-green/10 p-3 rounded-full text-brand-green shrink-0">
                <Microscope size={28} />
              </div>
              <div>
                <h3 className="font-bold text-brand-blue text-xl mb-2">40x Mais Nutrientes</h3>
                <p className="text-slate-600 leading-relaxed">
                  Estudos da <strong>Universidade de Maryland</strong> mostram que microverdes contêm até 40 vezes mais vitaminas do que a planta adulta. É como comer um brócolis inteiro em um punhado.
                </p>
              </div>
            </Card>

            <Card className="flex flex-col sm:flex-row gap-5 items-start border-l-4 border-l-brand-blue hover:translate-x-2 transition-transform duration-300">
              <div className="bg-brand-blue/10 p-3 rounded-full text-brand-blue shrink-0">
                <ShieldCheck size={28} />
              </div>
              <div>
                <h3 className="font-bold text-brand-blue text-xl mb-2">Sulforafano: O Escudo</h3>
                <p className="text-slate-600 leading-relaxed">
                  Este composto poderoso ativa as enzimas de desintoxicação do corpo. É seu aliado natural mais forte na prevenção de doenças crônicas e inflamação.
                </p>
              </div>
            </Card>

            <Card className="flex flex-col sm:flex-row gap-5 items-start border-l-4 border-l-brand-orange hover:translate-x-2 transition-transform duration-300">
              <div className="bg-brand-orange/10 p-3 rounded-full text-brand-orange shrink-0">
                <Heart size={28} />
              </div>
              <div>
                <h3 className="font-bold text-brand-blue text-xl mb-2">Biodisponibilidade</h3>
                <p className="text-slate-600 leading-relaxed">
                  Nutrientes vivos são absorvidos quase instantaneamente pelo corpo. Ao contrário das vitaminas sintéticas, seu corpo reconhece e usa 100% do que você ingere.
                </p>
              </div>
            </Card>
          </div>

          <div className="relative">
             <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue to-brand-green rounded-2xl transform rotate-2 opacity-20"></div>
             {/* 
               IMAGEM CIENTISTA/ANÁLISE 
               Nome do arquivo: analise-nutrientes.jpg
             */}
             <img 
              src="/analise-nutrientes.jpg" 
              alt="Cientista analisando plantas" 
              className="relative rounded-2xl shadow-2xl w-full object-cover aspect-[4/5] object-center bg-slate-200"
              onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1515688594390-b649af70d282?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" }} 
            />
            <div className="absolute bottom-8 -left-6 bg-white p-6 rounded-xl shadow-xl max-w-xs border border-slate-100 hidden md:block">
              <div className="flex items-center gap-3 mb-2">
                 <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                 <p className="text-brand-blue font-bold">Livre de Pesticidas</p>
              </div>
              <p className="text-slate-500 text-sm">Nosso cultivo indoor controlado elimina a necessidade de agrotóxicos.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const benefits = [
    {
      title: "Anti-Envelhecimento",
      desc: "Antioxidantes que combatem radicais livres e renovam a pele.",
      icon: <Clock size={28} />,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Digestão Leve",
      desc: "Ricos em fibras e enzimas vivas que facilitam o processo digestivo.",
      icon: <Leaf size={28} />,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Imunidade",
      desc: "Superdosagem natural de Vitamina C, E e K para blindar sua saúde.",
      icon: <ShieldCheck size={28} />,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Energia Vital",
      desc: "Nutrição densa que combate a fadiga crônica e dá disposição.",
      icon: <Zap size={28} />,
      color: "bg-yellow-100 text-yellow-600"
    }
  ];

  return (
    <section id="benefits" className="py-24 bg-brand-cream relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
           <span className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-2 block">Benefícios Reais</span>
           <h2 className="font-display text-4xl font-bold text-brand-blue">Sua Farmácia Natural</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border border-transparent hover:border-slate-100">
              <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {item.icon}
              </div>
              <h4 className="font-bold text-brand-blue text-xl mb-3">{item.title}</h4>
              <p className="text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div id="living" className="mt-24">
          <div className="bg-brand-blue rounded-3xl p-8 md:p-16 text-white relative overflow-hidden shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="font-display text-3xl md:text-4xl font-bold mb-6">O Conceito "Alimento Vivo"</h3>
                <p className="text-blue-100 mb-8 text-lg leading-relaxed">
                  A maioria das verduras no mercado foi colhida dias atrás. Elas estão "morrendo" e perdendo nutrientes a cada hora.
                  <br/><br/>
                  A <strong>Mini Flora</strong> entrega vida. Nossos microverdes são colhidos horas antes da entrega ou entregues ainda plantados. Você consome a planta no seu pico máximo de força vital.
                </p>
                <div className="flex flex-col gap-4">
                  {[
                    "Colheita feita apenas no dia da entrega",
                    "Cultivo 100% orgânico livre de químicos",
                    "Sementes 'Heirloom' de alta genética"
                  ].map((point, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                      <div className="bg-brand-lightGreen rounded-full p-1">
                        <CheckCircle className="text-brand-blue w-4 h-4" />
                      </div>
                      <span className="font-medium">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                 <div className="absolute -inset-4 bg-brand-lightGreen/20 rounded-full blur-xl animate-pulse"></div>
                 {/* 
                    IMAGEM ALIMENTO VIVO 
                    Nome do arquivo: microverdes-vivos.jpg
                 */}
                 <img 
                  src="/microverdes-vivos.jpg" 
                  alt="Bandeja de microverdes vivos" 
                  className="relative rounded-2xl shadow-2xl border-4 border-white/20 rotate-1 hover:rotate-0 transition-transform duration-500 bg-slate-700"
                  onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1585827552668-d0728b355e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading title="Quem experimenta, se apaixona" />
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Dra. Ana Clara",
              role: "Nutricionista Funcional",
              text: "Indico a Mini Flora para todos os pacientes. A qualidade é incomparável e a facilidade de ter nutrientes concentrados na salada faz toda diferença no tratamento.",
              img: "https://randomuser.me/api/portraits/women/44.jpg"
            },
            {
              name: "Chef Roberto",
              role: "Gastronomia",
              text: "Além da saúde, o sabor é incrível. O micro coentro e o rabanete dão uma explosão de sabor e cor nos pratos que sirvo no meu restaurante.",
              img: "https://randomuser.me/api/portraits/men/32.jpg"
            },
            {
              name: "Juliana Mendes",
              role: "Mãe de 2",
              text: "Meu filho não comia vegetais. Com os microverdes, ele adora colocar 'as arvorezinhas' na comida. Melhorou a imunidade de toda a casa.",
              img: "https://randomuser.me/api/portraits/women/68.jpg"
            }
          ].map((t, i) => (
            <Card key={i} className="bg-brand-cream border-none">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="text-slate-700 italic mb-6 text-lg leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-4 border-t border-slate-200 pt-6">
                <img src={t.img} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md" />
                <div>
                  <p className="font-bold text-brand-blue text-lg">{t.name}</p>
                  <p className="text-xs text-brand-orange uppercase font-bold tracking-wider">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-brand-cream">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-5xl mx-auto bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[500px]">
          <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-brand-blue relative overflow-hidden">
             {/* Decorative BG */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-lightGreen rounded-full blur-[80px] opacity-20 pointer-events-none"></div>
            
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6 leading-tight relative z-10">
              Comece sua revolução saudável.
            </h2>
            <p className="text-blue-100 mb-10 text-lg relative z-10">
              Fale diretamente conosco pelo WhatsApp. Tire suas dúvidas, peça nosso catálogo e agende sua primeira entrega.
            </p>
            
            <a 
              href="https://wa.me/5511999999999" // Replace with actual number
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-orange text-white font-bold py-5 px-8 rounded-2xl hover:bg-orange-600 transition-all hover:scale-105 flex items-center justify-center gap-4 shadow-xl shadow-orange-900/20 group relative z-10"
            >
              <MessageCircle size={28} />
              <span className="text-lg">Chamar no WhatsApp</span>
              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </a>

            <p className="mt-8 text-blue-300 text-sm text-center relative z-10">Resposta média em 5 minutos.</p>
          </div>
          
          <div className="md:w-1/2 bg-brand-cream relative group">
            {/* 
               IMAGEM CONTATO
               Nome do arquivo: contato-bg.jpg
            */}
            <img 
              src="/contato-bg.jpg" 
              alt="Mão segurando microverdes" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 bg-slate-200"
              onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/50 to-transparent"></div>
            <div className="absolute bottom-10 left-10 text-white">
              <p className="font-bold text-2xl">Plano Mensal</p>
              <p className="opacity-90">Receba toda semana sem se preocupar.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start gap-4">
            <Logo className="w-32" />
            <p className="text-slate-500 text-sm max-w-xs text-center md:text-left">
              Cultivando saúde, colhendo vitalidade. Sua dose diária de natureza concentrada.
            </p>
          </div>
          
          <div className="flex gap-8 text-sm font-medium text-slate-600">
            <a href="#benefits" className="hover:text-brand-orange transition-colors">Benefícios</a>
            <a href="#science" className="hover:text-brand-orange transition-colors">Ciência</a>
            <a href="#contact" className="hover:text-brand-orange transition-colors">Contato</a>
            <a href="#" className="hover:text-brand-orange transition-colors">Termos</a>
          </div>

          <div className="flex gap-4">
             {/* Social placeholders */}
             <div className="w-10 h-10 bg-brand-cream rounded-full flex items-center justify-center text-brand-blue hover:bg-brand-orange hover:text-white transition-all cursor-pointer">
               <span className="font-bold text-xs">IG</span>
             </div>
             <div className="w-10 h-10 bg-brand-cream rounded-full flex items-center justify-center text-brand-blue hover:bg-brand-orange hover:text-white transition-all cursor-pointer">
               <span className="font-bold text-xs">FB</span>
             </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-100 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Mini Flora. Microverdes Orgânicos.
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 bg-white">
      <Header />
      <main className="flex-grow">
        <Hero />
        <ValueProposition />
        <Features />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      
      {/* Sticky WhatsApp Button for Mobile */}
      <a 
        href="https://wa.me/5511999999999"
        className="fixed bottom-6 right-6 md:hidden z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all hover:scale-110 active:scale-95"
        aria-label="Fale conosco no WhatsApp"
      >
        <MessageCircle size={32} fill="white" className="text-white" />
      </a>
    </div>
  );
}