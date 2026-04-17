import { LayoutDashboard, ShoppingCart, User, Activity } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 font-sans antialiased text-slate-900 dark:text-slate-50">
      <main className="flex-grow flex flex-col items-center justify-center p-8 max-w-6xl mx-auto w-full">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mb-2">
            Platform Analysis System Ready
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Platform.UI
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            The next-generation frontend for your microservices ecosystem.
            Optimized for performance, scale, and premium user experience.
          </p>
        </div>

        {/* Quick Access Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          <DashboardCard
            title="Catalog"
            description="Manage your product inventory and attributes."
            icon={<ShoppingCart className="w-6 h-6" />}
            href="/catalog"
            color="bg-blue-500"
          />
          <DashboardCard
            title="Profile"
            description="User management and organizational structure."
            icon={<User className="w-6 h-6" />}
            href="/profile"
            color="bg-emerald-500"
          />
          <DashboardCard
            title="Identity"
            description="Authentication, authorization, and security logs."
            icon={<Activity className="w-6 h-6" />}
            href="/identity"
            color="bg-purple-500"
          />
          <DashboardCard
            title="System"
            description="Real-time health monitoring of microservices."
            icon={<LayoutDashboard className="w-6 h-6" />}
            href="/system"
            color="bg-slate-800"
          />
        </div>

        {/* Status Bar */}
        <div className="mt-16 w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm flex items-center justify-between transition-all hover:shadow-lg">
          <div className="flex items-center gap-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-medium">All Microservices Online</span>
          </div>
          <div className="hidden sm:flex gap-6 text-sm text-slate-500">
            <span>v1.0.0-beta</span>
            <span>Local: Port 3000</span>
          </div>
        </div>
      </main>
    </div>
  );
}

function DashboardCard({ title, description, icon, href, color }: any) {
  return (
    <a
      href={href}
      className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all hover:border-transparent hover:ring-2 hover:ring-blue-500 hover:shadow-2xl hover:-translate-y-1 block"
    >
      <div className={`${color} w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
        {description}
      </p>
    </a>
  );
}
