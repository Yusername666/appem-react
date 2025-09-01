import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Database, Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Wilayah',
    href: '/wilayah',
  },
];

export default function Wilayah() {
  const cardData = [
    {
      title: 'Provinsi',
      count: 34,
      icon: Database,
      link: '/provinsi',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-gradient-to-br from-blue-500/20 to-blue-600/10',
      glowColor: 'shadow-blue-500/20',
    },
    {
      title: 'Kabupaten/Kota',
      count: 514,
      icon: Database,
      link: '/kabkot',
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-gradient-to-br from-emerald-500/20 to-emerald-600/10',
      glowColor: 'shadow-emerald-500/20',
    },
    {
      title: 'Kecamatan',
      count: 7230,
      icon: Database,
      link: '/kecamatan',
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-gradient-to-br from-orange-500/20 to-orange-600/10',
      glowColor: 'shadow-orange-500/20',
    },
    {
      title: 'Kelurahan',
      count: 83931,
      icon: Database,
      link: '/kelurahan',
      color: 'text-violet-600 dark:text-violet-400',
      bgColor: 'bg-gradient-to-br from-violet-500/20 to-violet-600/10',
      glowColor: 'shadow-violet-500/20',
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Wilayah" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {cardData.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className={`group relative aspect-video overflow-hidden rounded-2xl backdrop-blur-xl bg-white/40 dark:bg-slate-800/20 border border-slate-300/60 dark:border-slate-700/30 hover:bg-white/60 dark:hover:bg-slate-800/30 hover:border-slate-300/80 dark:hover:border-slate-600/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${card.glowColor}`}
              >
                {/* Animated background pattern */}
                <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/10 dark:stroke-neutral-100/10 opacity-20 group-hover:opacity-30 transition-opacity duration-500" />

                {/* Gradient overlay */}
                <div className={`absolute inset-0 ${card.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />

                <div className="relative z-10 flex h-full flex-col justify-between p-6">
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-xl backdrop-blur-sm border border-slate-300/50 dark:border-slate-700/30 group-hover:scale-110 transition-transform duration-300 ${card.bgColor}`}>
                      <Icon className={`h-6 w-6 ${card.color} group-hover:animate-pulse`} />
                    </div>
                    <Link href={card.link} className="p-2 rounded-xl backdrop-blur-sm bg-white/30 dark:bg-slate-700/20 border border-slate-300/50 dark:border-slate-600/30 hover:bg-white/50 dark:hover:bg-slate-700/30 transition-all duration-200 hover:scale-110 cursor-pointer group">
                      <Plus className="h-4 w-4 text-slate-600 dark:text-slate-400 group-hover:rotate-90 transition-transform duration-300" />
                    </Link>
                  </div>

                  <div className="space-y-2">
                    <div className="space-y-1">
                      <p className="text-2xl font-bold bg-gradient-to-br from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                        {card.count.toLocaleString('id-ID')}
                      </p>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">
                        {card.title}
                      </p>
                    </div>

                    {/* Progress indicator */}
                    <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-transparent via-current to-transparent opacity-50 transition-all duration-700 rounded-full" style={{ color: card.color.includes('blue') ? '#3b82f6' : card.color.includes('emerald') ? '#10b981' : card.color.includes('orange') ? '#f97316' : '#8b5cf6' }} />
                  </div>
                </div>

                {/* Corner decorations */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/5 to-transparent rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
