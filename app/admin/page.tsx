import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/auth';
import { countSubscribers, listSubscribers, listVideos } from '@/lib/db';
import AdminDashboard from './AdminDashboard';

export const dynamic = 'force-dynamic';

export default function AdminPage() {
  if (!isAdminAuthenticated()) {
    redirect('/admin/login');
  }
  // Load initial data on the server so the dashboard renders immediately.
  const subscribers = listSubscribers();
  const videos = listVideos();
  const total = countSubscribers();
  return <AdminDashboard initialSubscribers={subscribers} initialVideos={videos} initialTotal={total} />;
}
