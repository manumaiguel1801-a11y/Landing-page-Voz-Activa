/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from 'motion/react';
import { Logo } from './components/Logo';
import { 
  Mic, 
  ScanLine, 
  LayoutDashboard, 
  FileText, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Menu, 
  X,
  Smartphone,
  PieChart,
  History,
  CreditCard
} from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-cream/80 backdrop-blur-md border-b border-gold/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo className="w-10 h-10 shadow-gold" />
          <span className="text-xl font-bold tracking-tight uppercase text-charcoal">Voz<span className="font-light">Activa</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Inicio', 'Funciones', 'Pasaporte', 'Nosotros'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-neutral-600 hover:text-gold transition-colors">
              {item}
            </a>
          ))}
          <button className="gold-gradient text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-gold/30 hover:scale-105 transition-transform">
            Empezar ahora
          </button>
        </div>

        <button className="md:hidden text-neutral-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-cream border-b border-gold/10 p-6 flex flex-col gap-4"
        >
          {['Inicio', 'Funciones', 'Pasaporte', 'Nosotros'].map((item) => (
            <a key={item} href="#" className="text-lg font-medium text-neutral-900" onClick={() => setMobileMenuOpen(false)}>
              {item}
            </a>
          ))}
          <button className="gold-gradient text-white px-6 py-3 rounded-xl text-center font-semibold">
            Empezar ahora
          </button>
        </motion.div>
      )}
    </nav>
  );
};

const FeatureCard = ({ icon: Icon, title, description, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="glass-card p-8 rounded-[32px] shadow-sm hover:shadow-gold transition-all duration-300 group"
  >
    <div className="w-14 h-14 bg-gold/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
      <Icon className="text-gold w-7 h-7" />
    </div>
    <h3 className="text-xl font-bold mb-3 text-charcoal uppercase tracking-tight">{title}</h3>
    <p className="text-charcoal/70 leading-relaxed text-sm">{description}</p>
  </motion.div>
);

const PhoneMockup = () => {
  return (
    <div className="relative w-[300px] h-[600px] bg-neutral-900 rounded-[3rem] border-[8px] border-neutral-800 shadow-2xl overflow-hidden">
      {/* Screen content */}
      <div className="w-full h-full bg-cream p-4 flex flex-col gap-4 overflow-hidden">
        {/* Status Bar */}
        <div className="flex justify-between items-center px-4 pt-4 pb-2">
          <div className="text-[10px] font-bold">9:41</div>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-neutral-300" />
            <div className="w-3 h-3 rounded-full bg-neutral-300" />
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="space-y-4 pt-2">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider">Balance Total</p>
              <h4 className="text-2xl font-bold">$1.250.000</h4>
            </div>
            <div className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
              +12.5%
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-3 rounded-2xl border border-neutral-100 shadow-sm">
              <TrendingUp className="text-gold w-4 h-4 mb-2" />
              <p className="text-[10px] text-neutral-400">Ingresos</p>
              <p className="text-sm font-bold">$850k</p>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-neutral-100 shadow-sm">
              <TrendingUp className="text-red-400 w-4 h-4 mb-2 rotate-180" />
              <p className="text-[10px] text-neutral-400">Gastos</p>
              <p className="text-sm font-bold text-neutral-900">$210k</p>
            </div>
          </div>

          <div className="bg-gold-dark/10 p-4 rounded-2xl border border-gold/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-6 bg-gold rounded-lg flex items-center justify-center">
                <Mic className="text-white w-3 h-3" />
              </div>
              <p className="text-[10px] font-medium text-gold-dark italic">"Vendí 15 almuerzos por $180.000"</p>
            </div>
            <div className="h-1 bg-gold/20 rounded-full overflow-hidden">
              <motion.div 
                animate={{ width: ['0%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-full bg-gold"
              />
            </div>
          </div>

          <p className="text-[10px] font-bold text-neutral-900 uppercase tracking-widest mt-4">Actividad Reciente</p>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between bg-white p-3 rounded-xl border border-neutral-100 italic opacity-60">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-soft-gray rounded-lg" />
                  <div className="w-20 h-2 bg-neutral-200 rounded" />
                </div>
                <div className="w-10 h-2 bg-neutral-200 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Tab Bar placeholder */}
        <div className="absolute bottom-4 left-6 right-6 h-12 bg-white rounded-2xl shadow-lg border border-neutral-100 flex justify-around items-center px-4">
          <LayoutDashboard className="w-5 h-5 text-gold" />
          <History className="w-5 h-5 text-neutral-300" />
          <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center -mt-8 border-4 border-cream shadow-lg shadow-gold/30">
            <Mic className="text-white w-5 h-5" />
          </div>
          <ScanLine className="w-5 h-5 text-neutral-300" />
          <CreditCard className="w-5 h-5 text-neutral-300" />
        </div>
      </div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/0 via-white/5 to-white/0" />
    </div>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="relative min-h-screen selection:bg-gold/30">
      <Navbar />

      {/* Hero Section */}
      <section id="inicio" className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-16">
          <motion.div 
            style={{ opacity, scale }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 mb-8">
              <Zap className="w-4 h-4 text-gold fill-gold" />
              <span className="text-xs font-bold text-gold uppercase tracking-wider">IA Especializada para el comercio</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-charcoal leading-[1.05] tracking-tight mb-8">
              Convierte tu <span className="gold-text-gradient italic">voz</span> en control financiero
            </h1>
            <p className="text-lg text-charcoal/80 mb-10 max-w-lg leading-relaxed">
              La primera solución de inclusión financiera diseñada para el comercio informal en Colombia. Registra, digitaliza y crece sin complicaciones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="gold-gradient text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-gold hover:scale-105 transition-transform flex items-center justify-center gap-2">
                Empezar ahora
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 rounded-2xl bg-white border border-gray-200 text-lg font-bold hover:bg-gray-50 transition-all text-charcoal text-center">
                Ver demo
              </button>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-8 border-t border-gray-100 pt-8">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-charcoal tracking-tight">10k+</span>
                <span className="text-[10px] uppercase opacity-50 font-bold tracking-widest">Vendedores</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-charcoal tracking-tight">98%</span>
                <span className="text-[10px] uppercase opacity-50 font-bold tracking-widest">Precisión Voz</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-charcoal tracking-tight">24/7</span>
                <span className="text-[10px] uppercase opacity-50 font-bold tracking-widest">Soporte</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "backOut" }}
            className="flex justify-center relative"
          >
            <div className="absolute -inset-10 bg-gold/20 blur-[100px] rounded-full" />
            <PhoneMockup />
            {/* Floating badges */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-12 top-20 bg-white p-4 rounded-2xl shadow-xl border border-neutral-100 hidden lg:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center">
                  <Mic className="text-gold w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-neutral-400 font-medium">Reconocimiento</p>
                  <p className="text-sm font-bold">Voz Activa</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, delay: 1, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-8 bottom-20 bg-white p-4 rounded-2xl shadow-xl border border-neutral-100 hidden lg:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <ScanLine className="text-blue-500 w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-neutral-400 font-medium">OCR Inteligente</p>
                  <p className="text-sm font-bold">Cuaderno → App</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section Removal (Merged into Hero) */}
      
      {/* Problem Section */}
      <section className="py-24 md:py-40 bg-cream/50">
        <div className="max-w-7xl mx-auto px-6 text-center max-w-4xl">
          <div className="inline-block px-3 py-1 bg-gold/10 text-gold font-bold rounded-full text-[10px] uppercase tracking-widest mb-6">Hecho en Colombia</div>
          <h3 className="text-4xl md:text-6xl font-bold mb-10 leading-tight tracking-tight text-charcoal">
            ¿Por qué es tan difícil llevar las cuentas?
          </h3>
          <p className="text-xl text-charcoal/60 leading-relaxed max-w-3xl mx-auto">
            Sabemos que tu cuaderno no siempre es suficiente. Voz-Activa es el puente hacia tu crecimiento, transformando la informalidad en oportunidad tangible.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section id="funciones" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold mb-6 italic text-charcoal tracking-tight">Tecnología humana para el día a día</h2>
              <p className="text-lg text-charcoal/60">Diseñamos cada función pensando en la rapidez que exige tu negocio.</p>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 glass-card rounded-full flex items-center justify-center cursor-pointer hover:bg-gold/10 transition-colors">
                <ArrowRight className="w-5 h-5 rotate-180" />
              </div>
              <div className="w-12 h-12 rounded-full gold-gradient text-white flex items-center justify-center cursor-pointer shadow-gold">
                <ArrowRight className="w-5 h-5 font-bold" />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Mic}
              title="Registro por Voz"
              description="Dile a la app: 'Vendí 5 arepas a 3.000 pesos' y listo. Nuestra IA procesa y categoriza todo automáticamente."
              delay={0}
            />
            <FeatureCard 
              icon={ScanLine}
              title="Escaneo de Cuadernos"
              description="Sigue usando tu cuaderno si quieres. Tómale una foto y nosotros digitalizamos tus registros históricos con OCR."
              delay={0.1}
            />
            <FeatureCard 
              icon={LayoutDashboard}
              title="Panel Simple"
              description="Visualiza tus ganancias del día, semana o mes sin complicaciones. Gráficos claros que entiendes al instante."
              delay={0.2}
            />
            <FeatureCard 
              icon={FileText}
              title="Pasaporte Financiero"
              description="Generamos un reporte oficial de tu actividad comercial que puedes presentar en bancos para solicitar microcréditos."
              delay={0.3}
            />
            <FeatureCard 
              icon={Zap}
              title="Inventario Inteligente"
              description="Alertas cuando tus productos estrella se están agotando, basándonos en tu ritmo real de ventas."
              delay={0.4}
            />
            <FeatureCard 
              icon={ShieldCheck}
              title="Privacidad Total"
              description="Tus datos son tuyos. Encriptación de nivel bancario para que tu información comercial esté siempre protegida."
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Financial Passport Spotlight */}
      <section id="pasaporte" className="py-24 md:py-40 bg-cream/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-16">
          <div className="relative">
            <motion.div 
              initial={{ rotate: -5 }}
              whileInView={{ rotate: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-[40px] shadow-gold border border-gold/10 relative z-10"
            >
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 gold-gradient rounded-full" />
                  <h4 className="font-bold text-charcoal tracking-tight uppercase text-xs">Certificado de Actividad</h4>
                </div>
                <div className="bg-gold/10 text-gold px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Oficial</div>
              </div>

              <div className="space-y-6">
                <div className="h-4 bg-neutral-100 rounded-full w-3/4" />
                <div className="h-4 bg-neutral-100 rounded-full w-1/2" />
                <div className="grid grid-cols-3 gap-4 pt-4">
                  {[1, 2, 3].map(i => <div key={i} className="h-20 bg-cream rounded-2xl border border-gray-100" />)}
                </div>
                <div className="pt-8 border-t border-neutral-100 flex justify-between items-center">
                  <div className="space-y-2">
                    <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Score de Confianza</p>
                    <p className="text-2xl font-bold text-gold">A+</p>
                  </div>
                  <div className="w-16 h-16 bg-gold/5 rounded-full flex items-center justify-center">
                    <FileText className="text-gold w-8 h-8 opacity-40" />
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] aspect-square bg-gold/5 blur-[120px] rounded-full" />
          </div>

          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight text-charcoal tracking-tight">
              Tu <span className="gold-text-gradient italic">Pasaporte</span> Financiero
            </h2>
            <p className="text-lg text-charcoal/60 mb-10 leading-relaxed">
              No más rechazos bancarios por "falta de evidencia". Voz-Activa transforma tus registros diarios en un historial formal que demuestra la solidez de tu negocio.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                'Reporte descargable en PDF',
                'Validado por entidades aliadas',
                'Historial de ingresos verificable',
                'Score de salud financiera'
              ].map(item => (
                <li key={item} className="flex items-center gap-3 text-charcoal font-semibold text-sm">
                  <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-gold" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <button className="gold-gradient text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-gold flex items-center gap-3 hover:scale-105 transition-transform">
              Descargar ejemplo
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Trust Section / Colombian Context */}
      <section id="nosotros" className="py-24 bg-charcoal text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight tracking-tight">
              Hecho para el corazón de <span className="gold-text-gradient italic">Colombia</span>
            </h2>
            <p className="text-lg text-white/60 mb-10 leading-relaxed">
              Voz-Activa nace en las plazas de mercado, en los carritos de tinto y en las tiendas de barrio. Entendemos que tu tiempo es dinero y tu voz es tu herramienta más poderosa.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-5xl font-bold gold-text-gradient mb-2">+40k</p>
                <p className="text-[10px] text-white/40 uppercase tracking-[2px] font-bold">Vendedores</p>
              </div>
              <div>
                <p className="text-5xl font-bold gold-text-gradient mb-2">98%</p>
                <p className="text-[10px] text-white/40 uppercase tracking-[2px] font-bold">Precisión Voz</p>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="aspect-square bg-gradient-to-br from-gold/40 to-neutral-800 rounded-[64px] overflow-hidden rotate-3 group-hover:rotate-0 transition-transform duration-700 shadow-gold">
               <img 
                src="https://picsum.photos/seed/colombia/1000/1000" 
                alt="Comerciante colombiano" 
                className="w-full h-full object-cover mix-blend-overlay opacity-60"
                referrerPolicy="no-referrer"
               />
            </div>
            <div className="absolute -bottom-8 -left-8 glass-card p-6 rounded-3xl text-charcoal shadow-2xl max-w-[220px] -rotate-3">
              <p className="text-xs italic leading-tight">"Desde que uso Voz-Activa, entiendo por fin a dónde se va mi plata."</p>
              <p className="text-[10px] font-bold mt-4 text-gold uppercase tracking-[2px]">— Doña Sofía, Emprendedora</p>
            </div>
          </div>
        </div>
      </section>

      {/* CEOs Section */}
      <section className="py-24 md:py-40 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-block px-3 py-1 bg-gold/10 text-gold font-bold rounded-full text-[10px] uppercase tracking-widest mb-6">Liderazgo</div>
            <h2 className="text-4xl md:text-6xl font-bold italic tracking-tight text-charcoal">Las mentes detrás de Voz-Activa</h2>
            <p className="text-lg text-charcoal/60 mt-6 max-w-2xl mx-auto leading-relaxed">
              Creemos en una Colombia donde el éxito financiero no dependa de un cuaderno, sino de la visión y el esfuerzo de cada comerciante.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                name: "Manuela Maiguel",
                role: "Co-Fundadora & CEO",
                image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Manuela",
                quote: "Diseñamos para las manos que trabajan y las voces que sueñan. Voz-Activa es mi compromiso con la equidad financiera en Colombia."
              },
              {
                name: "Co-Fundadora",
                role: "Co-Fundadora & Producto",
                image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Partner",
                quote: "Creemos que la tecnología debe adaptarse al ser humano, no al revés. Por eso construimos desde la empatía."
              }
            ].map((ceo, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="glass-card p-12 rounded-[48px] flex flex-col md:flex-row items-center gap-8 group hover:shadow-gold transition-all duration-500"
              >
                <div className="relative">
                  <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-gold/20 p-1 group-hover:border-gold transition-colors duration-500">
                    <img src={ceo.image} alt={ceo.name} className="w-full h-full rounded-full object-cover bg-gold/5" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 gold-gradient rounded-full flex items-center justify-center text-white shadow-lg">
                    <Zap className="w-5 h-5 fill-white" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-2xl font-bold text-charcoal tracking-tight italic uppercase">{ceo.name}</h4>
                  <p className="text-gold font-bold text-xs uppercase tracking-widest mt-1">{ceo.role}</p>
                  <p className="text-charcoal/70 mt-6 leading-relaxed italic">"{ceo.quote}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-40">
        <div className="max-w-5xl mx-auto px-6">
          <div className="gold-gradient p-12 md:p-24 rounded-[64px] text-center text-white relative overflow-hidden shadow-gold">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] -mr-48 -mt-48 rounded-full" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 blur-[100px] -ml-48 -mb-48 rounded-full" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-7xl font-bold mb-8 leading-[1.1] tracking-tight">
                El futuro de tu negocio empieza hoy
              </h2>
              <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
                Únete a miles de colombianos que ya están digitalizando su éxito con la potencia de su voz.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="bg-white text-gold-dark px-10 py-5 rounded-2xl text-xl font-bold shadow-2xl shadow-black/10 hover:scale-105 transition-all">
                  Empieza ahora gratis
                </button>
                <button className="bg-black/20 backdrop-blur-md text-white border border-white/30 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-black/30 transition-all">
                  Ver demo interactiva
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-gray-100 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 text-charcoal/40 font-bold uppercase tracking-[2px] text-[11px]">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6 grayscale brightness-0 opacity-80">
               <Logo className="w-8 h-8" />
               <span className="text-xl font-bold tracking-tight uppercase">Voz<span className="font-light">Activa</span></span>
            </div>
            <p className="leading-relaxed opacity-60">Digitalizando el corazón del comercio colombiano.</p>
          </div>
          <div>
            <p className="text-charcoal mb-6">Producto</p>
            <ul className="space-y-4">
              <li className="hover:text-gold transition-colors cursor-pointer">Funciones</li>
              <li className="hover:text-gold transition-colors cursor-pointer">Pasaporte</li>
              <li className="hover:text-gold transition-colors cursor-pointer">Seguridad</li>
            </ul>
          </div>
          <div>
            <p className="text-charcoal mb-6">Inclusión</p>
            <ul className="space-y-4">
              <li className="hover:text-gold transition-colors cursor-pointer">Casos de Éxito</li>
              <li className="hover:text-gold transition-colors cursor-pointer">Impacto</li>
              <li className="hover:text-gold transition-colors cursor-pointer">Nosotros</li>
            </ul>
          </div>
          <div>
            <p className="text-charcoal mb-6">Legal</p>
            <ul className="space-y-4">
              <li className="hover:text-gold transition-colors cursor-pointer">Privacidad</li>
              <li className="hover:text-gold transition-colors cursor-pointer">Términos</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-charcoal/30 font-bold uppercase tracking-[3px]">
          <p>© 2024 Voz-Activa Colombia. Todos los derechos reservados.</p>
          <div className="flex gap-8">
            <span className="hover:text-gold transition-colors cursor-pointer">LinkedIn</span>
            <span className="hover:text-gold transition-colors cursor-pointer">Instagram</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
