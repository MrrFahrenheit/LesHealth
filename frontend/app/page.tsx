import { getMe } from '@/components/api/get-user-me';
import { redirect } from 'next/navigation';

export default async function RootPage() {
    const user = await getMe();

    if (user) {
        redirect('/les');
    } else {
        redirect('/get-started');
    }
}
